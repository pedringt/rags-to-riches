import type { GameState } from './types';

export const createInitialGameState = (): GameState => ({
  saveVersion: 1,
  phase: 'prep',
  sceneId: 'morning',
  day: 1,
  timeRemaining: 8,
  cash: 180,
  income: 80,
  lifestyle: 0,
  reputation: 0,
  relevance: 0,
  accessRoute: null,
  relationships: {
    nia: { affection: 45, trust: 55, socialValue: 10, tags: ['friend'] },
    ava: { affection: 25, trust: 30, socialValue: 35, tags: ['acquaintance'] },
    mara: { affection: 0, trust: 0, socialValue: 0, tags: [] },
  },
  knowledge: [],
  history: [],
});
