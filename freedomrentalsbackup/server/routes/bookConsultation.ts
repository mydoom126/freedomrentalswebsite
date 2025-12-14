import type { RequestHandler } from "express";

// Webhook URLs
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || undefined;
const N8N_TEST_WEBHOOK_URL = process.env.N8N_TEST_WEBHOOK_URL || "https://n8n.srv1189320.hstgr.cloud/webhook/book-consultation";
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const handleBookConsultationSubmission: RequestHandler = async (
  req,
  res,
) => {
  try {
    // Determine destination candidates: prefer configured N8N_WEBHOOK_URL, then N8N test URL, then Google Apps Script
    const candidates: string[] = [];
    if (N8N_WEBHOOK_URL) candidates.push(N8N_WEBHOOK_URL);
    if (N8N_TEST_WEBHOOK_URL) candidates.push(N8N_TEST_WEBHOOK_URL);
    if (GOOGLE_APPS_SCRIPT_URL) candidates.push(GOOGLE_APPS_SCRIPT_URL);

    if (candidates.length === 0) {
      console.error("No destination webhook configured (N8N_WEBHOOK_URL, N8N_TEST_WEBHOOK_URL or GOOGLE_APPS_SCRIPT_URL)");
      return res.status(500).json({ result: "error", message: "Destination webhook not configured" });
    }

    // Optional secret verification to prevent abuse
    if (WEBHOOK_SECRET) {
      const provided = (req.headers["x-webhook-secret"] as string) || req.query?.token;
      if (!provided || provided !== WEBHOOK_SECRET) {
        console.warn("Invalid or missing webhook secret for book consultation submission");
        return res.status(401).json({ result: "error", message: "Invalid webhook token" });
      }
    }

    const payload = req.body ?? {};

    // Basic required fields validation for initial submissions
    const required = ["firstName", "lastName", "email", "phone"];
    const missing = required.filter((k) => !payload[k]);
    if (missing.length > 0 && payload.stage === "initial") {
      return res.status(400).json({ result: "error", message: `Missing required fields: ${missing.join(", ")}` });
    }

    // Try each candidate in order until one succeeds
    let lastError: any = null;
    const fs = await import("fs/promises");
    const file = new URL("../../.local_submissions.json", import.meta.url);

    for (const destination of candidates) {
      try {
        console.log("Forwarding book consultation submission to:", destination);
        const response = await fetch(destination, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const raw = await response.text();
        let parsed: unknown = null;
        try {
          parsed = raw ? JSON.parse(raw) : null;
        } catch {
          parsed = null;
        }

        if (!response.ok) {
          const message = raw || `Destination returned ${response.status}`;
          console.error("Destination error:", destination, message);

          // If this looks like n8n 'webhook not registered', save locally and continue to next candidate
          let parsedRaw: any = null;
          try {
            parsedRaw = raw ? JSON.parse(raw) : null;
          } catch {
            parsedRaw = null;
          }

          const looksLikeN8n404 =
            (destination.includes("n8n") && response.status === 404) ||
            (parsedRaw && typeof parsedRaw === "object" && (parsedRaw.code === 404 || /not registered/i.test(String(parsedRaw.message || parsedRaw))));

          if (looksLikeN8n404) {
            try {
              let existing: any[] = [];
              try {
                const text = await fs.readFile(file, "utf8");
                existing = JSON.parse(text || "[]");
              } catch {
                existing = [];
              }
              existing.push({ receivedAt: new Date().toISOString(), payload, destination, raw });
              await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
              console.warn("n8n webhook not registered or inactive — saved submission to .local_submissions.json");
              // continue to next candidate in case test/prod differs
              lastError = { destination, message: raw };
              continue;
            } catch (e) {
              console.error("Failed to save fallback submission:", e);
              lastError = e;
              continue;
            }
          }

          // Non-n8n failure, record and try next
          lastError = { destination, message: raw };
          continue;
        }

        // Success — return parsed or success
        return res.status(200).json(parsed && typeof parsed === "object" ? parsed : { result: "success" });
      } catch (error) {
        console.error("Error forwarding to destination:", destination, error);
        lastError = error;
        continue;
      }
    }

    // If we get here, all candidates failed — save locally as fallback
    try {
      let existing: any[] = [];
      try {
        const text = await fs.readFile(file, "utf8");
        existing = JSON.parse(text || "[]");
      } catch {
        existing = [];
      }
      const errorMsg = lastError instanceof Error ? lastError.message : typeof lastError === "string" ? lastError : JSON.stringify(lastError);
      existing.push({ receivedAt: new Date().toISOString(), payload, attempted: candidates, error: errorMsg });
      await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
      console.warn("All webhook destinations failed — saved submission to .local_submissions.json");
    } catch (e) {
      console.error("Failed to save fallback submission:", e);
    }

    const errorMsg = lastError instanceof Error ? lastError.message : typeof lastError === "string" ? lastError : JSON.stringify(lastError);
    return res.status(502).json({ result: "error", message: errorMsg });
  } catch (error) {
    console.error("Failed to forward consultation submission:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(502).json({ result: "error", message });
  }
};
