# Rags to Riches

A game prototype that moves through three phases:

1. Manage a studio apartment and personal needs.
2. Date and build a relationship with a wealthy partner.
3. Enter a high-society murder mystery and make branching narrative choices.

## Project origin

This repository preserves the original prototype that Paige's husband created and sent to her to play and potentially continue developing. The original single-file React/TypeScript prototype is preserved unchanged in `originals/rags-to-riches-v3.tsx`.

The initial repository setup wraps that prototype in a minimal Vite + React + TypeScript application with Tailwind CSS and Three.js so it can run and be developed normally. The game behavior and story content are intentionally unchanged in this baseline setup.

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

## Development notes

The current game component still contains its built-in developer controls. These are useful while testing the simulation, dating, and visual-novel phases and should remain enabled during the initial feedback period.

The main game remains intentionally unsplit in `src/RagsToRichesGame.tsx` so the first working version stays close to the original handoff. Refactoring can happen later as a separate, deliberate change.
