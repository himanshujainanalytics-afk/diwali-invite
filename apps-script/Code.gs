/**
 * RSVP collector for the Jain Family Housewarming & Diwali invite.
 * Bound to a Google Sheet (Extensions > Apps Script). Deploy as a Web App.
 */
const SHEET_NAME = 'RSVPs';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = e.parameter || {};
    const name = String(p.name || '').trim().slice(0, 80);
    const adults = clamp(parseInt(p.adults, 10), 1, 20);
    const children = clamp(parseInt(p.children, 10), 0, 20);
    if (!name) return json({ ok: false, error: 'name required' });

    const sheet = getSheet();
    sheet.appendRow([new Date(), name, adults, children, adults + children]);
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the Web App URL in a browser shows running totals (no names).
function doGet() {
  const rows = getSheet().getDataRange().getValues().slice(1);
  const adults = rows.reduce((s, r) => s + Number(r[2] || 0), 0);
  const children = rows.reduce((s, r) => s + Number(r[3] || 0), 0);
  return json({ responses: rows.length, adults, children, total: adults + children });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Timestamp', 'Name', 'Adults', 'Children', 'Total']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function clamp(n, lo, hi) { return isNaN(n) ? lo : Math.min(hi, Math.max(lo, n)); }
function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
