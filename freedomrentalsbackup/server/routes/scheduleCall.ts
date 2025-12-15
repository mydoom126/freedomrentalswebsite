import type { RequestHandler } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const N8N_BASE = "https://n8n.srv1189320.hstgr.cloud";
const PROD_PATH = "/webhook/book-consultation";
const TEST_PATH = "/webhook-test/book-consultation";
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

async function tryForwardToUrls(urls: string[], payload: any) {
  for (const url of urls) {
    try {
      console.log("Attempting forward to:", url);
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await resp.text();
      let data: any = null;
      try { data = text ? JSON.parse(text) : null; } catch { data = text; }

      if (resp.ok) return { ok: true, url, status: resp.status, data };

      if (resp.status === 404) {
        console.warn("Webhook returned 404 at", url, "— trying next if available");
        continue;
      }

      return { ok: false, url, status: resp.status, data };
    } catch (err) {
      console.error("Fetch error forwarding to", url, err);
      continue;
    }
  }
  return { ok: false, status: 404, data: "No registered webhook found on configured paths" };
}

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

    console.log("Payload:", JSON.stringify(payload, null, 2));

    const urls = [N8N_BASE + PROD_PATH, N8N_BASE + TEST_PATH];
    const result = await tryForwardToUrls(urls, payload);

    if (!result.ok) {
      console.error("All webhook forwarding attempts failed:", result);
      await persistFailure({ type: "schedule-call", payload, forwardResult: result });
      const status = result.status || 500;
      return res.status(status).json({ result: "error", message: "Failed to deliver to n8n", details: result.data });
    }

    console.log("Forward successful to", result.url, "status", result.status);
    return res.status(200).json({ result: "success", message: "Schedule data sent to n8n successfully", forwardedTo: result.url, n8nResponse: result.data });
  } catch (error) {
    console.error("Failed to forward schedule call submission:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ result: "error", message });
  }
};
