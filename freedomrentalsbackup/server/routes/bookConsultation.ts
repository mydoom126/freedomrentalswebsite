import type { RequestHandler } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const N8N_WEBHOOK_URL =
  "https://n8n.srv1189320.hstgr.cloud/webhook/availability";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const storageFile = path.resolve(__dirname, "../../.local_submissions.json");

async function persistFailure(entry: any) {
  try {
    let list: any[] = [];
    try {
      const existing = await readFile(storageFile, "utf8");
      list = existing ? JSON.parse(existing) : [];
    } catch {
      list = [];
    }
    list.push({ timestamp: new Date().toISOString(), entry });
    await writeFile(storageFile, JSON.stringify(list, null, 2), "utf8");
  } catch (err) {
    console.warn("Failed to persist submission locally:", err);
  }
}

async function forwardToWebhook(url: string, payload: any) {
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await resp.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  return { ok: resp.ok, url, status: resp.status, data };
}

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

    console.log("Payload:", JSON.stringify(payload, null, 2));

    const result = await forwardToWebhook(N8N_WEBHOOK_URL, payload);

    if (!result.ok) {
      console.error("All webhook forwarding attempts failed:", result);
      await persistFailure({ type: "book-consultation", payload, forwardResult: result });
      const status = result.status || 500;
      return res.status(status).json({ result: "error", message: "Failed to deliver to n8n", details: result.data });
    }

    console.log("Forward successful to", result.url, "status", result.status);
    return res.status(200).json({ result: "success", message: "Data sent to n8n successfully", forwardedTo: result.url, n8nResponse: result.data });
  } catch (error) {
    console.error("Failed to forward consultation submission:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ result: "error", message });
  }
};
