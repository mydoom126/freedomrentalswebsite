import type { RequestHandler } from "express";

// Webhook URLs - use the exact n8n webhook provided
const N8N_WEBHOOK_URL = "https://n8n.srv1189320.hstgr.cloud/webhook/book-consultation";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const handleBookConsultationSubmission: RequestHandler = async (
  req,
  res,
) => {
  try {
    const payload = req.body ?? {};

    // Optional secret verification to prevent abuse
    if (WEBHOOK_SECRET) {
      const provided = (req.headers["x-webhook-secret"] as string) || req.query?.token;
      if (!provided || provided !== WEBHOOK_SECRET) {
        console.warn("Invalid or missing webhook secret for book consultation submission");
        return res.status(401).json({ result: "error", message: "Invalid webhook token" });
      }
    }

    // Basic required fields validation
    const required = ["firstName", "lastName", "email", "phone"];
    const missing = required.filter((k) => !payload[k]);
    if (missing.length > 0 && payload.stage === "initial") {
      return res.status(400).json({ result: "error", message: `Missing required fields: ${missing.join(", ")}` });
    }

    console.log("Forwarding book consultation submission to n8n:", N8N_WEBHOOK_URL);
    console.log("Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(N8N_WEBHOOK_URL, {
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
    console.error("Failed to forward consultation submission:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ result: "error", message });
  }
};
