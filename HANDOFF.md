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

`main` / production still reflects the inherited prototype.

On the authorized implementation branch `feature/vertical-slice`, issue #15 replaces the working UI with the first slice of the new direction:

1. **Ordinary-life starting point** — the player is staying at Nia's place, unemployed, short on savings, and trying to get back on their feet.
2. **First social climb** — use limited time, money, work, relationships, and presentation to reach a better local social event.
3. **Better social tier** — meet more connected people and make an information-handling choice without directly pursuing the show.
4. **Slice endpoint** — the player earns another invitation and moves one rung up socially; `Main Character` remains the long-term dream, not an immediately actionable casting goal.

The original inherited prototype remains preserved at `originals/rags-to-riches-v3.tsx`.

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

Initial repository setup remains on `main` with Vite + React + TypeScript + Tailwind + Three.js and a working production deployment.

### Current implementation branch

`feature/vertical-slice` implements issue #15 and introduces:

- serializable typed `GameState`
- reducer-style domain actions
- separated `game/`, `content/`, and `components/` layers
- three access routes into the same major social event
- early UI centered on cash, free time, job status, housing, and social footing rather than future show metrics
- persistent relationship, reputation/relevance, history, and knowledge state
- Fact/Evidence/Rumor/Public Narrative-compatible information modeling
- local browser save / continue / reset with schema version
- Vitest test files for state, routes, and save behavior
- no backend, database, accounts, cloud saves, AI API, Ink, Zustand, or engine migration

Three.js remains available in the project but is not a dependency of the new game-state layer.

Local verification completed for domain TypeScript, three end-to-end state routes, route gating, rumor consequences, and save/load/reset logic. Full dependency-backed `npm test` / Vite build still need to run in an environment where project packages are installed.

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

The project is now in **implementation and verification of the first playable vertical slice** under issue #15.

The goal of this slice is to prove the ordinary-life → first social climb → better social tier loop before expanding toward the show, full seasons, cast trips, reunions, or the final mystery.

The player may want to be on `Main Character` from the beginning, but cannot meaningfully pursue casting yet. The show should appear only through background aspiration and hints until the player has built enough money, access, relationships, and social position to enter the show-adjacent tier.

Do not silently broaden this slice into the full game. Final title, city, cast roster, season count, credits motif, and final mystery remain intentionally unresolved.

Do not merge to `main` or deploy any environment without Paige's explicit destination-specific authorization.

## Recommended Next Step

Verify the latest `feature/vertical-slice` build, then have Paige replay at least two routes with special attention to whether the early job/housing/dating/social tradeoffs now feel like one coherent life-sim loop. Keep the full career ladder in issue #17 rather than expanding it into this slice.



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
- Use Vite + React + TypeScript + Tailwind; keep Three.js optional at the presentation layer.
- Separate feedback, implementation, verification, and promotion authority.
- Working player fantasy: ordinary person → elite reality-TV social world → maintain relevance without losing money/relationships/identity → later use accumulated social knowledge in a real mystery.
- Persistent system families: Money/Lifestyle, Access/Cast Status, Relationships, Reputation/Relevance, Secrets/Information.
- Time is the main scarcity constraint; no mobile-style energy meter in the first slice.
- Core relationship values: Affection, Trust, Social Value; other relationship conditions are tags/states.
- Cast Status and Relevance are separate.
- Working status ladder: Outsider → Guest → Friend Of → Full-Time → Veteran.
- Money and perceived wealth are distinct; money alone does not guarantee access.
- Information distinguishes Fact, Evidence, Rumor, and Public Narrative.
- Branch meaningfully and reconverge deliberately while preserving consequences.
- First slice uses local saves only and plain typed state/reducer architecture.
- No backend, database, accounts, cloud saves, AI API, Ink, Zustand, or engine migration unless a concrete future need appears.
- `Main Character` is the strongest current working title/show-name candidate, but remains provisional.
- The player can begin with `Main Character` as an ultimate ambition, but direct pursuit of casting is gated behind substantial social/lifestyle progression.
- The starting situation is intentionally low-status: the player is living with Nia, begins unemployed with thin savings, and is trying to establish income before an independent home is realistic.
- Early play should balance job hunting, savings, friendships, dating, presentation, and social opportunities. Pushing hard on one area should slow progress elsewhere.
- Dating begins as ordinary life rather than a social-climbing shortcut. Early app dates can be duds; stronger romantic options can emerge later as the player's world expands.
- Career is a persistent progression track, not a tutorial system. Jobs should improve and branch across the game, with tradeoffs among pay, flexibility, stability, status, and access.
- A player may keep a serious job during the show. Filming can compete with work and show behavior can help or hurt an employer, career, or later business. Long-running career design is tracked in issue #17.
- Reality-TV inspiration should borrow social dynamics, not reproduce real cast members or storylines wholesale.

## Open Questions

These remain intentionally unresolved and should not be silently settled by an implementation agent:

- final game title and whether it matches the in-universe show title
- exact invented city / social scene
- signature credits motif
- final cast roster and names
- exact number of seasons
- exact promotion/demotion thresholds
- final anonymous-account structure
- final murder victim / culprit structure and degree of variation
- long-term marriage, business, debt, property, and sponsorship depth
- final visual direction and how much of the experience is 2D, 3D, or mixed
- eventual desktop packaging / cloud-save needs

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

### 2026-09-27 — First vertical-slice implementation

- Began issue #15 on `feature/vertical-slice` after explicit implementation authorization.
- Replaced the inherited working UI on that branch with a bounded social-climbing slice while preserving the archival original.
- Added typed game state, reducer/rules, authored scene content, relationships, information state, local saves, and test files.
- Implemented friend, favor, and work access routes that reconverge at the same event while preserving different state.
- Added a low-stakes missing-jewelry rumor with keep/question/repeat outcomes to teach the future information loop.
- After Paige's first playtest, revised the pacing so the show is a distant long-term objective rather than the first immediate goal.
- Changed the starting situation so the player is staying with Nia and saving for an apartment; the first slice now ends with entry into a better social tier instead of production noticing the player.
- Rewrote choice copy to describe concrete player actions, costs, and likely outcomes more clearly.
- Revised the start again so the player has no job yet. Job search and an interview now compete with social plans, wardrobe spending, and an optional early dud dating-app date.
- Updated the player-facing HUD/sidebar so the first slice foregrounds job, housing, cash, free time, and social footing instead of abstract future-facing relevance metrics.
- Expanded the game vision with persistent career progression and show-era work/business conflicts; created issue #17 for the future career system.
- Verified the domain model and route logic locally without promoting or deploying the branch.
