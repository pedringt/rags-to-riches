import type { GameState } from './types';

export const createInitialGameState = (): GameState => ({
  saveVersion: 2,
  phase: 'prep',
  sceneId: 'morning',
  day: 1,
  timeRemaining: 16,
  cash: 90,
  income: 0,
  lifestyle: 0,
  reputation: 0,
  relevance: 0,
  accessRoute: null,
  relationships: {
    nia: { affection: 70, trust: 75, socialValue: 10, tags: ['friend', 'roommate'] },
    ava: { affection: 25, trust: 30, socialValue: 35, tags: ['acquaintance'] },
    mara: { affection: 0, trust: 0, socialValue: 0, tags: [] },
    celeste: { affection: 0, trust: 0, socialValue: 25, tags: ['acquaintance'] },
  },
  knowledge: [],
  history: [
    { id: 'living_with_nia', day: 1, note: 'Staying at Nia’s place while unemployed and trying to get back on your feet.' },
    { id: 'unemployed', day: 1, note: 'No current job at the start of the game.' },
  ],
});
