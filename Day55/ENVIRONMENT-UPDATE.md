# ENVIRONMENT.md — Update (Day 55 / Blueprint Day 5)

This is an **addendum** to the existing `ENVIRONMENT.md` from Day 53. No prior variables were removed or renamed — this only documents new behavior around `ANTHROPIC_API_KEY`.

## New Behavior: Free-Tier Safe AI Fallback

As of Day 5 (mock interview question generation), the project **no longer requires a funded Anthropic API key to run or demo end-to-end.**

### How it works
- `server/services/interviewService.js` checks `process.env.ANTHROPIC_API_KEY` at request time.
- **If unset (or if the AI call fails for any reason** — network error, rate limit, malformed JSON), the service automatically falls back to a curated, offline question bank (`FALLBACK_QUESTIONS`) covering all 4 supported roles.
- The API response includes a `question_source` field (`"ai"` or `"fallback"`) so the frontend/developer can always see which path was used — full transparency, no silent behavior change.
- This is a **runtime fallback, not a redesign**: the function signature, response shape, and downstream DB writes are identical regardless of source.

### Recommended local setup
| Scenario | `.env` setting | Result |
|---|---|---|
| No Anthropic account yet | Omit `ANTHROPIC_API_KEY` entirely | App runs fully, resume analyzer will return a clear error on `/resume/analyze` (that endpoint has no fallback by design, per PRD — resume feedback must be AI-generated to be meaningful), interview questions use the fallback bank |
| Anthropic free trial credits available | Set `ANTHROPIC_API_KEY=sk-ant-...` | Both resume analysis and interview questions use live AI |

### Why the Resume Analyzer Still Requires a Key
Per PRD §5.2, resume feedback must be personalized and AI-generated to provide real value — a static fallback would be misleading to the user about their actual resume quality. The **mock interview questions**, by contrast, are reasonable to serve from a curated bank as a graceful degradation, since interview practice value comes primarily from the practice itself, not perfect personalization.

### `.env.example` (server) — no changes required
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=        # optional as of Day 5 — see fallback behavior above
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

## No Other Environment Changes
All Supabase, Storage, and CORS configuration from Day 53's `ENVIRONMENT.md` remains unchanged.
