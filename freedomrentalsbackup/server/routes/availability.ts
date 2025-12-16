import type { RequestHandler } from "express";
import { fileURLToPath } from "url";
import path from "path";
import { readFile, writeFile } from "fs/promises";

const N8N_WEBHOOK_URL =
  "https://n8n.srv1189320.hstgr.cloud/webhook/availability";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
    console.warn("Failed to persist availability fetch failure:", err);
  }
}

function buildDefaultAvailability(days = 21) {
  const slots = ["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
  const map: Record<string,string[]> = {};
  for (let i=0;i<days;i++){
    const d = new Date();
    d.setDate(d.getDate()+i);
    d.setHours(0,0,0,0);
    const key = d.toISOString().slice(0,10);
    map[key] = [...slots];
  }
  return map;
}

export const handleGetAvailability: RequestHandler = async (req, res) => {
  try {
    try {
      const resp = await fetch(N8N_WEBHOOK_URL, { method: "GET" });
      if (resp.ok) {
        const data = await resp.json();
        return res
          .status(200)
          .json({ source: N8N_WEBHOOK_URL, availability: data });
      }
    } catch (err) {
      // fall through to fallback below
    }

    // Fallback default availability
    const fallback = buildDefaultAvailability(21);
    return res.status(200).json({ source: 'fallback', availability: fallback });
  } catch (err) {
    await persistFailure({ type: 'availability-fetch', error: String(err) });
    return res.status(500).json({ result: 'error', message: 'Unable to fetch availability' });
  }
};
