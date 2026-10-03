# Housewarming & Diwali Invite — The Jain Family

Oct 31, 2026 · 12 PM · 15798 Mandrake Trail, Frisco, TX 75033

A single-page invite (`index.html`) that records RSVPs (name, adults, children) into a Google Sheet.

## 1. Connect RSVPs to a Google Sheet (5 min)

1. Create a new Google Sheet (e.g. "Diwali RSVPs").
2. **Extensions → Apps Script**. Replace the contents with `apps-script/Code.gs`. Save.
3. **Deploy → New deployment → type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Authorize when prompted, then copy the **Web app URL** (ends in `/exec`).
5. In `index.html`, set `RSVP_ENDPOINT` to that URL.

Test: open the invite, submit an RSVP, and check that a row appears in the `RSVPs` tab.
Opening the Web app URL in a browser shows running totals (responses / adults / children).

> If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version**; the URL stays the same.

## 2. Host on GitHub Pages

```bash
cd "House Warming"
git init && git add . && git commit -m "Diwali invite"
gh repo create diwali-invite --public --source=. --push
gh api -X POST repos/:owner/diwali-invite/pages -f 'source[branch]=main' -f 'source[path]=/'
```

Or in the GitHub UI: repo **Settings → Pages → Deploy from branch → main / (root)**.
Your link will be `https://<your-username>.github.io/diwali-invite/` after a minute or two.

## 3. Send it

Paste the link into email, text or WhatsApp — WhatsApp/iMessage show a preview card with the title and description.
Personalised link (pre-fills the name): `https://<you>.github.io/diwali-invite/?name=Priya%20Sharma`

## Notes

- The calendar event is set to 12–4 PM; change `endUTC` in `index.html` if you prefer.
- Guests can re-submit to update; each submission is a new row, so use the latest row per name.
- The page can't be exploited to read other guests' data — the Web app only returns totals.
