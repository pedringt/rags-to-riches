# Rags to Riches Handoff

## Purpose

This file is the shared continuity document for work on **Rags to Riches** across ChatGPT, Claude Code, and future coding sessions.

Read this file before making project decisions. Update it after any substantial implementation, QA pass, architectural change, or product decision so the next agent can continue without reconstructing prior context.

## Project

**Repository:** `pedringt/rags-to-riches`

**Current production site:** `https://rags-to-riches-five.vercel.app`

**Stack:** Vite, React, TypeScript, Tailwind CSS, Three.js

## Origin

The original prototype was created by Paige's husband and sent to Paige to play and potentially continue developing.

The original single-file prototype is preserved at:

`originals/rags-to-riches-v3.tsx`

The working game began as an exact copy at:

`src/RagsToRichesGame.tsx`

The initial setup intentionally preserved the original gameplay and story rather than redesigning it during project bootstrap.


## Product Vision Document

The evolving design direction is documented in `docs/specs/game-vision.md`. Read it before proposing or implementing major product changes. It captures the social-climbing sim, reality-show career, branching season structure, money/status systems, marriage/family pressure, gossip and smaller mysteries, cast trip, murder-mystery transition, originality boundary, and unresolved design questions.

## Current Product Shape

The game currently has three phases:

1. **Life sim** — manage a studio apartment, personal needs, money, cleanliness, time, and date readiness.
2. **Dating** — choose among wealthy matches, go on dates, build the relationship meter, and marry.
3. **Housewife / murder mystery** — a branching visual-novel story centered on a high-society murder, clues, status, alliances, and multiple endings.

The current experience is still effectively the original prototype. No product-direction pass has been completed yet.

## Important Current Mechanics

### Life Sim

- Needs: hunger, energy, hygiene, mood
- Apartment cleanliness
- Money
- Time/day progression
- Apartment interactions rendered with Three.js
- Date readiness threshold gates the dating phase

### Dating

- Four initial dating profiles
- Match eligibility uses player status/readiness
- Dating costs money
- Relationship progress gates marriage

### Visual Novel

- Story is stored in the `storyScript` object inside `src/RagsToRichesGame.tsx`
- Player choices can modify status and add clues
- Branches currently reconverge frequently through connector scenes
- Several endings exist
- A replay control exists at endings

## Development Controls

Developer mode is currently enabled in the game.

It includes shortcuts for:

- jumping between sim, dating, and housewife phases
- maxing needs
- adding money
- maxing relationship
- changing visual-novel scenes
- adding status

Keep these controls available during early QA and product exploration unless Paige explicitly asks to remove or redesign them.

## Repository State

Initial repository setup is complete.

The project has:

- Vite + React + TypeScript
- Tailwind CSS
- Three.js
- Vercel Git integration
- working production build

The initial Vercel build exposed TypeScript errors. They were fixed without changing gameplay:

- Three.js `position.set(...array)` calls were replaced with explicit x/y/z arguments
- Vite client types were added so TypeScript recognizes CSS imports

Those fixes are on `main`.

## Working Agreement

Paige wants to be able to move between ChatGPT and Claude Code without losing intent or having either agent silently reinterpret the project.

### Feedback and implementation are separate phases

When Paige is reviewing, playing, brainstorming, reporting bugs, or saying things like "collect feedback," do **not** immediately edit code.

Use these phases:

1. **Feedback** — inspect, discuss, test, and collect findings only.
2. **Agreed scope** — summarize the accepted changes once Paige says the feedback round is done.
3. **Implementation** — edit only after Paige authorizes making those changes.
4. **Verification** — test the changed behavior and relevant regressions.
5. **Promotion** — push/merge/deploy only when Paige explicitly authorizes the destination.

Do not treat approval of an idea as permission to implement it.

### Deployment authority

- Do not push or merge to `main` unless Paige explicitly authorizes `main`.
- Do not deploy or promote to production unless Paige explicitly authorizes production.
- Preview/staging authorization does not imply production authorization.
- Preserve unrelated user or agent changes.

### Scope control

Do not use a requested fix as permission for opportunistic refactoring, dependency upgrades, copy rewrites, or product changes.

If cleanup would materially help, recommend it separately.

## Attribution

Preserve clear attribution between:

- the original game prototype Paige received from her husband
- later product decisions made by Paige
- implementation work performed by AI tools or coding agents

Do not rewrite project history in a way that implies Paige personally authored code or content she did not create.

## Current Objective

The immediate product phase is **define the new product direction before major implementation**. The inherited prototype remains useful as a reference, but the intended game direction is now substantially clearer and is documented in `docs/specs/game-vision.md`.

Do not assume the current mechanics, tone, story structure, visual design, or three-phase progression are settled product decisions simply because they exist in the prototype.

The next meaningful work should generally be one of:

- Paige playing and reporting reactions
- a read-only QA pass
- a product/structure discussion
- organizing feedback into an agreed implementation scope

Large refactors should wait until there is a reason grounded in actual product feedback.

## Recommended Next Step

Have Paige play through the current build and collect observations about:

- what is fun
- what feels tedious
- what is confusing
- what feels disconnected between phases
- which systems have meaningful choices versus busywork
- pacing
- tone
- replayability
- story branches and consequences
- mobile/layout issues
- bugs

Do not turn that list into code until Paige explicitly closes the feedback round and authorizes implementation.

## Risks / Watchouts

- The working game is still concentrated in one large component. This is a maintainability issue, but refactoring it before product direction is clearer could create churn.
- Story branches often reconverge through short connector scenes, so apparent choice depth may be greater than actual outcome depth.
- The sim, dating, and murder-mystery phases may feel like separate games. Treat this as a product question to evaluate, not automatically a defect.
- Developer controls are intentionally visible during this stage.
- Avoid "improving" the original writing or tone without Paige's direction.

## Handoff Update Protocol

After meaningful work, update this document rather than creating competing handoff files.

At minimum, update:

- **Repository State** when implementation/deployment changes
- **Current Objective** when the active phase changes
- **Decisions Made** when Paige settles product direction
- **Open Questions** when meaningful uncertainties remain
- **Recent Work Log** with a concise entry

Keep the file current and concise. Remove stale details when they stop being useful.

## Decisions Made

- Preserve the original prototype as an archival file.
- Keep the working game close to the inherited prototype during initial setup.
- Use Vite + React + TypeScript + Tailwind + Three.js.
- Keep developer shortcuts enabled during early evaluation.
- Separate feedback collection from implementation.
- Use preview verification before production changes when practical.

## Open Questions

These are intentionally unresolved:

- What is the core fantasy or identity of the game?
- Should all three phases remain major parts of the experience?
- How much depth should the life-sim section have?
- How strategic should dating be?
- Is the murder mystery the main game, the payoff, or one episode?
- How much should early choices materially alter later story outcomes?
- What tone should dominate: camp, satire, melodrama, mystery, life sim, or a blend?
- How long should a full playthrough take?
- What should motivate replay?

Do not settle these without Paige.

## Authority / Credentials

Do not store raw credentials, tokens, cookies, API keys, session values, private keys, or `.env` contents in this repository or handoff.

If authenticated access is needed, use approved GitHub/Vercel integrations or another platform-provided or human-mediated access path.

Required access may include:

- **GitHub** — inspect branches/files, create branches/PRs, and make authorized repository changes
- **Vercel** — inspect preview/production deployments and logs

External or destructive actions require Paige's explicit authorization at the appropriate phase. Credential availability never implies authorization.

## Recent Work Log

### 2026-09-27 — Repository bootstrap

- Created the GitHub repository baseline from the inherited prototype.
- Preserved the original source in `originals/rags-to-riches-v3.tsx`.
- Added Vite, React, TypeScript, Tailwind, and Three.js project scaffolding.
- Connected the repository to Vercel.
- Fixed three TypeScript build errors without changing gameplay.
- Verified a successful preview build.
- Merged the verified build fixes to `main`.
- Verified the Vercel production deployment reached READY.

### 2026-09-27 — Cross-agent handoff setup

- Added this canonical handoff document.
- Added root agent-instruction files that direct coding agents to this handoff.
