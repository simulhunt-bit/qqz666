import fs from 'fs';
import path from 'path';

const LOG_PATH = path.join(process.cwd(), 'data', 'generation-log.jsonl');

// No database, so this logs two ways:
// 1. console.log — works everywhere, including serverless hosts like Vercel,
//    where it shows up in the platform's own Runtime Logs / dashboard. This
//    is the reliable path and needs no filesystem write.
// 2. A local file write — a nice-to-have for local development only (gives
//    you a queryable .jsonl swipe file on your own machine). This silently
//    no-ops in serverless production, since that filesystem is read-only,
//    but it's wrapped so it can never break the actual request either way.
export function logGeneration(entry) {
  const record = { ...entry, timestamp: new Date().toISOString() };

  // Reliable path: always works, viewable in your host's log dashboard.
  console.log('[generation]', JSON.stringify(record));

  // Best-effort path: only really useful when running locally.
  try {
    fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
    fs.appendFileSync(LOG_PATH, JSON.stringify(record) + '\n');
  } catch (e) {
    // Expected to fail on serverless/read-only filesystems — that's fine,
    // console.log above already captured the same data.
  }
}
