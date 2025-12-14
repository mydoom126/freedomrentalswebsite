import type { RequestHandler } from "express";

// Schedule Call webhook URL - using the same n8n webhook
const SCHEDULE_CALL_WEBHOOK_URL = "https://n8n.srv1189320.hstgr.cloud/webhook/book-consultation";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const handleScheduleCallSubmission: RequestHandler = async (
  req,
  res,
) => {
  try {
    const payload = req.body ?? {};

    // Optional secret verification to prevent abuse
    if (WEBHOOK_SECRET) {
      const provided = (req.headers["x-webhook-secret"] as string) || req.query?.token;
      if (!provided || provided !== WEBHOOK_SECRET) {
        console.warn("Invalid or missing webhook secret for schedule call submission");
        return res.status(401).json({ result: "error", message: "Invalid webhook token" });
      }
    }

    // Basic required fields validation for schedule submissions
    const required = ["scheduledDate", "scheduledTime"];
    const missing = required.filter((k) => !payload[k]);
    if (missing.length > 0) {
      return res.status(400).json({ result: "error", message: `Missing required fields: ${missing.join(", ")}` });
    }

    console.log("Forwarding schedule call submission to n8n:", SCHEDULE_CALL_WEBHOOK_URL);
    console.log("Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(SCHEDULE_CALL_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("n8n Response Status:", response.status);
    console.log("n8n Response Body:", responseText);

    let responseData: any = null;
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseData = responseText;
    }

    if (!response.ok) {
      console.error("n8n webhook error:", response.status, responseData);
      return res.status(response.status).json({
        result: "error",
        message: `n8n returned ${response.status}`,
        details: responseData,
      });
    }

    console.log("Successfully forwarded to n8n");
    return res.status(200).json(responseData || { result: "success" });
  } catch (error) {
    console.error("Failed to forward schedule call submission:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ result: "error", message });
  }
};
