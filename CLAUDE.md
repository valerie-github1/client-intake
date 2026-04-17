# CLAUDE.md — PhoennixAI Master Directive
> Claude Code permanent memory. Read this every session. Do not delete or rename.
> Version: v3 | April 2026

---

## 01 · Company

**PhoennixAI** (double-n) — the world's first AI-powered Business Operating System (BOS) for solo founders.
Replaces 6–12 tools with one command centre staffed by 22 AI agents.

**CEO & Founder:** Valerie Wilcox — valerie@phoennixai.com
**CTO:** Dilpreet — dilpreet@phoennixai.com
**Remote control:** phoenixdigitec3@gmail.com
**Location:** London, UK

**Three brands:**
- PhoennixAI — Mission Control BOS (phoennixai.com)
- Phantom Gaming Studio — AI-native game dev studio
- Cupcakes & Cocktails — artisan lifestyle & events brand

---

## 02 · Tech Stack

| Layer | Technology |
|---|---|
| BOS frontend | Vanilla HTML / CSS / JS (no build step) |
| Holographic dashboard | React 18 + Three.js + TypeScript + Vite |
| Client intake | Vanilla HTML + Anthropic API + jsPDF |
| AI model (Aria) | claude-sonnet-4-20250514 |
| Database | Supabase (PostgreSQL + Edge Functions) |
| Deployment | Vercel (primary) + GitHub Pages (static) |
| Knowledge graph | graphify (graphifyy 0.4.8) |
| Remote control | graphify + Claude Code hooks |

---

## 03 · Design System — Dark Hologram Mode (default)

```css
--midnight  : #060A18   /* deep background */
--fire      : #FF6B2B   /* primary CTA / brand orange */
--electric  : #00E5FF   /* cyan / links / accents */
--gold      : #FFB830   /* highlights / premium */
--sapphire  : #46ABD7   /* secondary blue */
--royal     : #215CAE   /* deep blue */
--surface   : #0D1220   /* card backgrounds */
--text      : #E8E8E8   /* primary text */
--text2     : rgba(255,255,255,0.55)
--text3     : rgba(255,255,255,0.28)
```

**Always use CSS vars — never raw hex in code.**

---

## 04 · Design System — Frost White Light Mode

```css
--bg        : #FAFBFF   /* page background */
--surface   : #FFFFFF   /* card / panel */
--border    : #E2E8F0   /* subtle dividers */
--text      : #0F172A   /* primary text */
--text2     : #475569   /* secondary */
--text3     : #94A3B8   /* muted */
--fire      : #FF6B2B   /* CTA unchanged */
--electric  : #0284C7   /* adapted for light */
--gold      : #D97706   /* adapted for light */
```

---

## 05 · Typography

```
Bebas Neue           → display / headlines
DM Sans              → body / UI (primary)
Playfair Display     → serif accent / italic quotes
DM Mono              → code / data / labels
Cormorant Garamond   → elegant headers (Phantom Gaming, C&C)
Rajdhani             → holographic dashboard HUD
```

---

## 06 · Brand Voice Rules

Apply to ALL copy — emails, UI, docs, social, everything.

1. Short sentences. Always.
2. Banned words: leverage, utilise, synergy, robust, seamless, cutting-edge, innovative
3. Speak to ONE founder. Never "founders" (plural) in body copy.
4. Cut hedging: "might", "could possibly", "you may want to"
5. Never open with "I hope this email finds you well"
6. Structure: Pain → Transformation → One clear action
7. Aria = warm, curious. Valerie = decisive, direct.
8. One CTA per message. Never three.

---

## 07 · All Repos — valerie-github1

| Repo | Visibility | Status | URL |
|---|---|---|---|
| `client-intake` | PUBLIC | LIVE | client-intake-bay.vercel.app |
| `phoennixai-mission-control` | PUBLIC | deployed | phoennixai-mission-control.vercel.app |
| `phoennixai-holographic-dashboard` | PUBLIC | built | deploy via Vercel |
| `phantom-gaming-studio` | PUBLIC | LIVE | valerie-github1.github.io/phantom-gaming-studio/ |
| `cupcakes-and-cocktails` | PUBLIC | LIVE | valerie-github1.github.io/cupcakes-and-cocktails/ |
| `phoennixai-agency-backend` | PRIVATE | active | — |
| `phoennixai-agency-website` | PRIVATE | active | — |
| `wilcoxdesigns-website` | PRIVATE | active | — |

**GitHub account:** valerie-github1
**Dev branch:** claude/setup-remote-control-qpnp8

---

## 08 · Plugins & Skills Installed

```
graphify     → knowledge graph (pip3 install graphifyy → graphify install → graphify claude install)
vercel       → 25 deploy skills (npx plugins add vercel/vercel-plugin)
obra/superpowers → 14 skills (brainstorming, subagent dev, systematic debugging, etc.)
```

**MCP servers active:**
```
github    → @modelcontextprotocol/server-github (GITHUB_TOKEN)
supabase  → @supabase/mcp-server-supabase (SUPABASE_ACCESS_TOKEN)
composio  → composio-mcp (COMPOSIO_API_KEY)
graphify  → graphify . --mcp
```

**Hooks active:**
```
PreToolUse  (Glob/Grep)  → read graphify-out/GRAPH_REPORT.md first
PostToolUse (Write/Edit) → auto-rebuild knowledge graph
SessionStart             → remote control setup
```

---

## 09 · Beta Programme

```
Programme  : PhoennixAI Beta
Model      : Invite-only, NDA signed at intake
Cohort     : 50–100 solo founders
Duration   : 8 weeks
Goal       : 30%+ conversion to paid on public launch
```

**Before any beta/MOS/email/copy task → read `BETA_LAUNCH_PROMPT.txt`**

---

## 10 · Marketing OS (MOS)

Agents: SIGNAL · SCRIBE · ARIA · PROBE · RELAY

Capabilities: brand voice calibration, email sequences, social posts, content calendar (30-day), launch kit.

---

## 11 · Claw Code — New Project Directive

Every new PhoennixAI project:
```bash
claw install --claude
graphify claude install
```

---

## 12 · graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current

---

## 13 · Non-Negotiable Rules

1. Read this file first, every session.
2. Before any beta/MOS/email/copy task → read `BETA_LAUNCH_PROMPT.txt`
3. Before any design task → check `PhoennixAI_BrandGuidelines.html`
4. Apply brand voice rules to ALL copy without exception
5. Never hardcode tokens/keys in files pushed to GitHub — use env var refs
6. Always use CSS vars (--fire, --electric, etc.), never raw hex
7. Commit to dev branch first, never force-push main
8. Run `graphify claude install` on every new project
9. One CTA per email/page section. Never three.
10. Valerie is the decision-maker. When in doubt, ask her.
11. Company name is PhoennixAI — double-n. Never "PhoenixAI".
12. Never deploy secrets. Use ${ENV_VAR} refs in repo files.

For graphify usage, graph structure guidance, and the canonical graph update command, see `## 12 · graphify` above.
