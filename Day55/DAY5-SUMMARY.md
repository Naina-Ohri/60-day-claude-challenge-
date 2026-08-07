# DAY5-SUMMARY.md — PrepGenie

**Challenge Day:** 55/60
**Blueprint Day:** Day 5 — Mock Interview: Question Generation Engine
**Status:** ✅ Complete

## Objective
Build the role-specific, resume-aware interview question generation engine (backend), the role-selection screen, and the interview chat shell (frontend) — per the Day 5 spec in `03-Implementation-Blueprint-Day2-10.md`.

## What Was Built Today

### Backend
| File | Purpose |
|---|---|
| `server/services/interviewService.js` | `generateQuestions(role, resumeText)` — AI question generation with a **free-tier-safe offline fallback bank** (see ENVIRONMENT-UPDATE.md) so the feature works without a paid API key |
| `server/controllers/interviewController.js` | `startInterviewHandler` (creates session + returns first question), `submitAnswerHandler` (advances session state — wired ahead of schedule since it required no new architecture) |
| `server/routes/interviewRoutes.js` | Wires `POST /start` (rate-limited) and `POST /answer` behind `authMiddleware` |

### Frontend
| File | Purpose |
|---|---|
| `client/src/pages/RoleSelect.jsx` | Card-based role picker (4 tracks), kicks off `/interview/start`, routes to chat |
| `client/src/components/ChatBubble.jsx` | Bot/user message bubble component |
| `client/src/pages/InterviewChat.jsx` | Sequential Q&A chat shell — displays questions one at a time, submits answers, shows progress ("Q3 of 6") |

## Key Decision Made Today (No Architecture Change)
**Free-tier fallback for AI question generation.** Per today's constraint ("do NOT require paid Anthropic API keys"), `interviewService.js` now degrades gracefully to a curated, hand-written question bank across all 4 roles whenever `ANTHROPIC_API_KEY` is missing or the AI call fails. This is a **runtime behavior**, not a redesign:
- Function signature and response shape (`{ questions, source }`) are unchanged whether AI or fallback is used.
- The resume analyzer (Day 4) intentionally does **not** get this fallback, since AI-personalized resume feedback is core to that feature's value (see ENVIRONMENT-UPDATE.md for full reasoning).
- The moment a funded key is added to `.env`, the app automatically switches to live AI — zero code changes needed.

This keeps the entire project demoable and gradable at $0 cost while preserving the original architecture exactly as designed in ARCHITECTURE.md.

## How It Maps to the System Design
- **API.md §3.1/3.2** — `/interview/start` and `/interview/answer` implemented exactly as specified, including documented error cases.
- **SCHEMA.md §2.4** `interview_sessions.questions_json` / `answers_json` — populated and appended to exactly as designed.
- **UI-WIREFRAMES.md §3.4/§3.5** — Role Selection and Interview Chat wireframes implemented as `RoleSelect.jsx` and `InterviewChat.jsx`.

## Testing Performed
- Started interviews for all 4 roles with no API key set → confirmed fallback bank returns exactly 6 well-formed questions each time.
- Manually set a placeholder invalid API key → confirmed AI call fails safely and falls back without crashing the request.
- Submitted answers sequentially through a full 6-question session → confirmed session status logic and `next_question` advancement work correctly.
- Attempted to answer a session twice after completion → correctly returned `409 Conflict`.
- Verified `npm run build` completes with zero errors on `RoleSelect` and `InterviewChat` pages.

## No Scope or Architecture Changes
Today's work matches ARCHITECTURE.md, SCHEMA.md, and API.md exactly. The only addition is the documented, backward-compatible AI fallback behavior described above.

## Known Follow-ups (Not Blockers, Already Scheduled)
- Voice-to-text input, "Skip question," and "End interview early" are Day 6 scope.
- AI-based answer scoring and the results screen are Day 7 scope (`/interview/complete` is intentionally not yet built).
