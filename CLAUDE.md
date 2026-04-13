# CLAUDE.md — PhoennixAI · client-intake
> Claude Code reads this file every session. Do not delete. Last updated: 2026-04-13.

---

## 01 · Brand

| | |
|---|---|
| **Brand name** | PhoennixAI |
| **Tagline** | AI-powered app development agency |
| **Location** | London, UK |
| **Website** | phoennixai.com |
| **Tone** | Warm, intelligent, premium — never robotic |

### Colours
```
--bg0:       #060C18   (deepest background)
--bg1:       #0A1626
--bg2:       #0F1E33
--bg3:       #152743
--acc:       #2EC8BE   (teal — primary action)
--ok:        #22A86A   (green — success)
--t1:        #E0E9F2   (primary text)
--t2:        #6A8299   (secondary text)
--t3:        #344F65   (muted / labels)
```

### Typography
- **Display / headings:** `Cormorant Garamond` (serif, elegant)
- **Body / UI:** `DM Sans` (sans-serif, clean)

---

## 02 · Project — client-intake

**What it is:** An AI-powered client consultation form. The AI character "Aria" (an Anthropic Claude model) guides potential clients through a structured intake process, collecting full project briefs.

**Key flows:**
1. NDA / consent gate (name + email + checkbox)
2. Multi-topic chat with Aria (6 topics: contact, vision, users, design, tech, budget)
3. Completion screen: Save to Supabase · Email team · Download PDF · Export JSON

**File:** Single-page `index.html` (HTML + CSS + vanilla JS — no build step required)

---

## 03 · Stack

| Layer | Technology |
|---|---|
| Runtime | Vanilla HTML / CSS / JavaScript (ES modules) |
| AI model | `claude-sonnet-4-20250514` via Anthropic Messages API |
| Database | Supabase (PostgreSQL) |
| PDF | jsPDF 2.5.1 (CDN) |
| Fonts | @fontsource via jsDelivr CDN |
| Deployment | GitHub Pages / Vercel |

---

## 04 · GitHub

```
Org / owner : valerie-github1
Repo        : client-intake
Main branch : main
Dev branch  : claude/setup-remote-control-qpnp8
Pages URL   : https://valerie-github1.github.io/client-intake/
```

### Push workflow (3 commands)
```bash
git add -p                                    # stage changes
git commit -m "feat: <description>"
git push -u origin claude/setup-remote-control-qpnp8
```

---

## 05 · Supabase

```
Project URL  : YOUR_SUPABASE_URL      ← replace in index.html CONFIG block
Anon key     : YOUR_SUPABASE_ANON_KEY ← replace in index.html CONFIG block
Table        : client_intake
```

### Schema (client_intake table)
```sql
create table client_intake (
  id               uuid primary key default gen_random_uuid(),
  submitted_at     timestamptz default now(),
  name             text,
  email            text,
  company          text,
  role             text,
  app_description  text,
  problem_solved   text,
  app_type         text,
  target_users     text,
  estimated_users  text,
  must_have_features text[],
  design_mood      text,
  has_brand        text,
  timeline         text,
  budget           text,
  funding_stage    text,
  decision_timeline text,
  anything_else    text,
  nda_signed       boolean default true
);
```

---

## 06 · Vercel

```
Project name  : client-intake
Framework     : Other (static)
Output dir    : . (root)
Build command : (none — static HTML)
Domain        : phoennixai.com  (or .vercel.app subdomain)
Env vars      : (none — API key proxied via Edge Function for production)
```

> IMPORTANT: For production, proxy `https://api.anthropic.com/v1/messages` through
> a Supabase Edge Function or Vercel API route so the Anthropic key is never
> exposed client-side. In `index.html`, change `ANTHROPIC_API_URL` to `'/api/chat'`.

---

## 07 · Contacts & Email

| Role | Email |
|---|---|
| Owner / Ops | valerie@phoennixai.com |
| Tech / Dev | dilpreet@phoennixai.com |
| Remote Control | phoenixdigitec3@gmail.com |

Intake form sends `mailto:` to: `client email + valerie@phoennixai.com + dilpreet@phoennixai.com`

---

## 08 · Claude Remote Control

```
Auto-connect email : phoenixdigitec3@gmail.com
Setup script       : .claude/setup-remote-control.sh
SessionStart hook  : .claude/settings.json
```

```bash
# Run once to install (or auto-runs on SessionStart)
bash .claude/setup-remote-control.sh
```

---

## 09 · Rules for Claude Code

1. **Never expose API keys** — Anthropic key must only live server-side in production
2. **Match brand CSS variables** — always use `--acc`, `--bg0..3`, `--t1..3` etc.
3. **Preserve the NDA gate** — do not remove or weaken the consent step
4. **Single-file principle** — keep intake form as one `index.html` unless explicitly asked to split
5. **Aria's voice** — warm, professional, never robotic; never change her system prompt without permission
6. **Supabase writes** — always check `SUPABASE_URL !== 'YOUR_SUPABASE_URL'` before calling Supabase
7. **Commit to dev branch** first (`claude/setup-remote-control-qpnp8`), never force-push to `main`
8. **graphify** — run `/graphify .` after major code changes to rebuild the knowledge graph
