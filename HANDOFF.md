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

`main` / production now contains the first playable pre-show vertical slice from issue #15.

On the authorized implementation branch `feature/week-2-slice`, issue #18 extends that slice into a second week:

1. **Week 1** — the player starts unemployed, staying with Nia, and reaches Juniper House through friend, favor, or work access.
2. **Week transition** — persistent cash, relationships, history, and information carry forward while a fresh 10-hour Week 2 budget begins.
3. **Housing target** — the player can make a $600 move-out fund concrete by looking at apartments with Nia.
4. **Career step** — Calder Café can lead to paid shifts and a better guest-services opportunity at the Bellweather Hotel.
5. **Ordinary life continues** — dating and contributing at Nia's home compete with work and savings.
6. **Second social tier** — the Bellweather benefit is a better local room, still explicitly pre-show, with multiple access paths tied to prior choices.

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

`feature/week-2-slice` extends the issue #15 foundation for issue #18 and currently includes:

- serializable typed `GameState`
- reducer-style domain actions
- separated `game/`, `content/`, and `components/` layers
- multiple access routes across two escalating local social events
- early UI centered on cash, free time, job status, housing, and social footing rather than future show metrics
- persistent relationship, reputation/relevance, history, and knowledge state
- Fact/Evidence/Rumor/Public Narrative-compatible information modeling
- local browser save / continue / reset with schema version
- Vitest test files for state, routes, and save behavior
- no backend, database, accounts, cloud saves, AI API, Ink, Zustand, or engine migration

Three.js remains available in the project but is not a dependency of the new game-state layer.

Week 2 adds a bounded `newWeek` state effect, a $600 housing target, paid café work, a first better-job step, a second ordinary date, a Nia/home contribution choice, and the Bellweather benefit. Dependency-backed tests/build are verified through the Vercel Git build gate when the branch reaches READY.

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

The project is now in **implementation and verification of Week 2** under issue #18.

The goal is to test whether the pre-show life-sim remains interesting for another week by connecting work, savings, housing, dating, friendships, and a second social opportunity before expanding toward casting.

The player may want to be on `Main Character` from the beginning, but cannot meaningfully pursue casting yet. The show should appear only through background aspiration and hints until the player has built enough money, access, relationships, and social position to enter the show-adjacent tier.

Do not silently broaden this slice into the full game. Final title, city, cast roster, season count, credits motif, and final mystery remain intentionally unresolved.

Do not merge to `main` or deploy any environment without Paige's explicit destination-specific authorization.

## Recommended Next Step

Verify the latest `feature/week-2-slice` build, then have Paige play at least two Week 2 routes. Pay special attention to whether career progress, the $600 move-out target, dating/home choices, and Bellweather access feel like one coherent loop. Keep the full career ladder in issue #17.



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
- Time is the main scarcity constraint in the current slices. Energy/fatigue is a future mechanic to evaluate, not currently implemented; avoid real-world waiting/mobile-grind patterns if revisited.
- Core unresolved problems persist until the player deals with them. Skipping job search, housing research, dating, or a social event must not silently erase that thread.
- Social events are opportunities, not mandatory progression gates. The player can end a week without attending Juniper House or Bellweather and keep progress made elsewhere.
- Core relationship values remain Affection, Trust, and Social Value internally; player-facing UI describes them as Affection, Trust, and Connection with qualitative labels instead of unexplained raw numbers.
- Multiple compatible story consequences should be shown together rather than only the first matching consequence.
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


### 2026-09-27 — Week 2 slice implementation

- Created issue #18 and branch `feature/week-2-slice` from the merged Week 1 main state.
- Added a Week 1 → Week 2 transition that preserves persistent progress and refreshes a 10-hour weekly time budget.
- Added a concrete $600 move-out fund target and an apartment-looking action.
- Added paid Calder Café work plus a first better-job step at the Bellweather Hotel.
- Revised the Week 1 work route after playtest: getting hired no longer sends the player straight into Juniper House. The player now completes a normal café shift first, then separately chooses whether to take an event-catering opportunity.
- Added a second ordinary dating interaction and a Nia/home contribution tradeoff.
- Made Week 2 dating copy history-aware so players who skipped Week 1 see a first-date prompt instead of "Try another date."
- Added the Bellweather Hotel benefit as a second, better local social room with Ava, Mara, Nia, and work-based access paths.
- Kept the entire slice pre-show; no casting or filming progression was added.
- Replaced raw relationship numbers in the player UI with descriptive states for Affection, Trust, and Connection, while keeping numeric values internally for rules.
- Added a plain-language end-of-run summary for job, savings/housing, dating, social progress, and the Week 1 rumor consequence.
- Logged energy/fatigue as a future mechanic to evaluate rather than adding it now.


### 2026-09-27 — Branch/story consistency audit fixes

- Audited Week 1 and Week 2 story/state branches for continuity, dead-end paths, and choices whose copy did not match actual state.
- Reworked Week 2 into a persistent hub so unresolved job search and interviews remain available after other choices.
- Added explicit end-the-week options so Juniper House and Bellweather are optional opportunities rather than mandatory gates, eliminating soft-lock paths when time runs out.
- Required real café experience before the Bellweather job interview and a normal Bellweather Hotel shift before event staffing.
- Made Celeste a real tracked relationship and added a Bellweather introduction route from that branch.
- Made Juniper observation produce persistent knowledge and surfaced wardrobe/observation consequences later instead of leaving them as hidden numbers only.
- Made Juniper finale copy route-aware and changed scene rendering to show all compatible consequence paragraphs.
- Added a resolved-cuff fact and hid the stale unresolved rumor once the resolution is known.
- Corrected Week 2 date scene copy for players who skipped Week 1 dating.
- Corrected Ava and Mara Bellweather route logic/copy; Mara now needs an actual prior connection plus thoughtful rumor handling.
- Preserved Juniper social progress in the HUD across the week transition.
- Fixed Week 2 event-phase classification.
- Bumped the local save schema/key to v2 so incompatible old prototype saves do not load into the new story structure.
- Updated automated tests for persistent goals, career gating, optional event skips, Mara access, and incompatible saves.
