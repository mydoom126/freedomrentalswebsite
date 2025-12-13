import type { RequestHandler } from "express";

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const handleBookConsultationSubmission: RequestHandler = async (
  req,
  res,
) => {
  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.error("Google Apps Script URL is not configured (GOOGLE_APPS_SCRIPT_URL)");
      return res.status(500).json({ result: "error", message: "Google Apps Script URL not configured" });
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

    // Basic required fields validation
    const required = ["firstName", "lastName", "email", "phone"];
    const missing = required.filter((k) => !payload[k]);
    if (missing.length > 0) {
      return res.status(400).json({ result: "error", message: `Missing required fields: ${missing.join(", ")}` });
    }

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
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
      const message = raw || `Google Apps Script returned ${response.status}`;
      console.error("Apps Script error:", message);
      return res.status(502).json({ result: "error", message });
    }

    const result =
      parsed && typeof parsed === "object" && "result" in parsed
        ? (parsed as { result?: string }).result
        : undefined;

    if (result !== "success") {
      console.warn(
        "Google Apps Script responded without explicit success flag. Raw:",
        raw,
      );
    }

    // Return the parsed result to client where possible
    return res.status(200).json(parsed && typeof parsed === "object" ? parsed : { result: "success" });
  } catch (error) {
    console.error("Failed to forward consultation submission:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(502).json({ result: "error", message });
  }
};
