import type { RequestHandler } from "express";

// Schedule Call webhook URLs
const SCHEDULE_CALL_WEBHOOK_URL = process.env.SCHEDULE_CALL_WEBHOOK_URL || undefined;
const SCHEDULE_CALL_TEST_WEBHOOK_URL = process.env.SCHEDULE_CALL_TEST_WEBHOOK_URL || "https://n8n.srv1189320.hstgr.cloud/webhook-test/schedule-call";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const handleScheduleCallSubmission: RequestHandler = async (
  req,
  res,
) => {
  try {
    const candidates: string[] = [];
    if (SCHEDULE_CALL_WEBHOOK_URL) candidates.push(SCHEDULE_CALL_WEBHOOK_URL);
    if (SCHEDULE_CALL_TEST_WEBHOOK_URL) candidates.push(SCHEDULE_CALL_TEST_WEBHOOK_URL);

    if (candidates.length === 0) {
      console.error("No schedule call webhook configured (SCHEDULE_CALL_WEBHOOK_URL or SCHEDULE_CALL_TEST_WEBHOOK_URL)");
      return res.status(500).json({ result: "error", message: "Schedule call webhook not configured" });
    }

    // Optional secret verification to prevent abuse
    if (WEBHOOK_SECRET) {
      const provided = (req.headers["x-webhook-secret"] as string) || req.query?.token;
      if (!provided || provided !== WEBHOOK_SECRET) {
        console.warn("Invalid or missing webhook secret for schedule call submission");
        return res.status(401).json({ result: "error", message: "Invalid webhook token" });
      }
    }

    const payload = req.body ?? {};

    // Basic required fields validation for schedule submissions
    const required = ["scheduledDate", "scheduledTime"];
    const missing = required.filter((k) => !payload[k]);
    if (missing.length > 0) {
      return res.status(400).json({ result: "error", message: `Missing required fields: ${missing.join(", ")}` });
    }

    const fs = await import("fs/promises");
    const file = new URL("../../.local_submissions.json", import.meta.url);
    let lastError: any = null;

    for (const destination of candidates) {
      try {
        console.log("Forwarding schedule call submission to:", destination);
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
          console.error("Schedule call webhook error:", destination, message);

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
              existing.push({ receivedAt: new Date().toISOString(), type: "schedule-call", payload, destination, raw });
              await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
              console.warn("n8n schedule call webhook not registered or inactive — saved submission to .local_submissions.json");
              lastError = { destination, message: raw };
              continue;
            } catch (e) {
              console.error("Failed to save fallback submission:", e);
              lastError = e;
              continue;
            }
          }

          lastError = { destination, message };
          continue;
        }

        return res.status(200).json(parsed && typeof parsed === "object" ? parsed : { result: "success" });
      } catch (error) {
        console.error("Error forwarding to schedule destination:", destination, error);
        lastError = error;
        continue;
      }
    }

    try {
      let existing: any[] = [];
      try {
        const text = await fs.readFile(file, "utf8");
        existing = JSON.parse(text || "[]");
      } catch {
        existing = [];
      }
      existing.push({ receivedAt: new Date().toISOString(), type: "schedule-call", payload, attempted: candidates, error: String(lastError) });
      await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
      console.warn("All schedule call webhook destinations failed — saved submission to .local_submissions.json");
    } catch (e) {
      console.error("Failed to save fallback submission:", e);
    }

    return res.status(502).json({ result: "error", message: String(lastError) });
  } catch (error) {
    console.error("Failed to forward schedule call submission:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(502).json({ result: "error", message });
  }
};
