# Rags to Riches

A developing social-climbing life-sim prototype that starts with ordinary survival and relationship choices, then gradually opens into higher-status social spaces and a later mystery arc.

## Project origin

This repository preserves the original prototype Paige received from her husband and then chose to continue exploring.

The original single-file React/TypeScript version remains unchanged in:

`originals/rags-to-riches-v3.tsx`

Later product direction and implementation are kept separate from that archival source so the project history and attribution stay clear.

## Current playable shape

The current build now extends through **Week 3**.

The player is balancing:
- money and housing progress
- work and career choices
- friendships and home obligations
- dating and social access
- limited weekly time
- increasingly valuable social opportunities

Recent work made time a more meaningful constraint:
- small admin actions are relatively cheap
- ordinary shifts take believable blocks of time
- some work commitments can conflict directly with fixed social events
- better jobs can give the player more control over their schedule
- Week 3 introduces the first clearly show-adjacent social event without jumping straight into casting

The current design goal is to make career progress, access, relationships, and social ambition compete with one another rather than letting the player optimize everything at once.

## Product direction

The longer-term direction is documented in [`docs/specs/game-vision.md`](docs/specs/game-vision.md).

The working player fantasy is roughly:

**ordinary life -> social access -> reality-TV world -> maintain status without losing money, relationships, or identity -> later use accumulated social knowledge in a real mystery**

The current build is intentionally much earlier than that full arc. It is still testing the life-sim and social-progression foundation.

## Current systems

The evolving implementation includes:
- serializable typed game state
- reducer-style domain actions
- persistent local save / continue / reset
- relationships and social standing
- money, jobs, housing, and home-life pressure
- limited weekly time
- fixed-time event conflicts
- branching choices with carried-forward consequences
- Fact / Evidence / Rumor / Public Narrative-compatible information modeling

The project currently uses local browser state only. There is no backend, account system, database, cloud save, or AI API in the live game loop.

## Tech

- React
- TypeScript
- Vite
- Tailwind CSS
- Three.js

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Development controls

Developer controls remain intentionally available during early QA and product exploration. They support shortcuts such as:
- jumping between major phases
- adding money
- changing needs or relationship values
- moving through visual-novel scenes
- adjusting status

They should stay available until the product direction is stable enough to justify a separate player-facing build.

## Current development focus

Week 3 is now merged to `main`.

The next useful work is **playtesting the time economy and schedule tradeoffs**, especially:
- whether the 16 -> 18 -> 20 hour weekly budgets feel right
- whether small actions feel cheap enough relative to work
- whether 4- and 8-hour shifts feel believable
- whether fixed-time conflicts are understandable
- whether players can make meaningful progress without doing everything
- whether the first show-adjacent social event feels earned
- whether the abstract weekly-hours model is still sufficient or needs a simple calendar view

The project should not silently expand into the full reality-show or murder-mystery game before those earlier systems prove themselves.

## Working across AI coding agents

Project continuity is maintained in [`HANDOFF.md`](HANDOFF.md).

ChatGPT, Claude Code, and other coding agents should read it before substantial work, preserve attribution, keep feedback separate from implementation, and update the handoff after meaningful authorized changes.
