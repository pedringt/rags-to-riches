import { describe, expect, it } from 'vitest';
import { createInitialGameState } from './initialState';
import { gameReducer } from './reducer';

describe('gameReducer', () => {
  it('applies money, time, and history effects', () => {
    const state = createInitialGameState();
    const next = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [
        { type: 'time', amount: -4 },
        { type: 'cash', amount: 80 },
        { type: 'history', id: 'worked_extra_shift' },
      ],
    });

    expect(next.timeRemaining).toBe(4);
    expect(next.cash).toBe(260);
    expect(next.history.some((event) => event.id === 'worked_extra_shift')).toBe(true);
  });

  it('changes relationship values without exceeding bounds', () => {
    const state = createInitialGameState();
    const next = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [
        { type: 'relationship', characterId: 'nia', metric: 'affection', amount: 100 },
        { type: 'relationship', characterId: 'mara', metric: 'trust', amount: -25 },
      ],
    });

    expect(next.relationships.nia.affection).toBe(100);
    expect(next.relationships.mara.trust).toBe(0);
  });

  it('preserves distinct access routes in state', () => {
    const friend = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'event_arrival',
      effects: [{ type: 'accessRoute', route: 'friend' }, { type: 'history', id: 'access_friend' }],
    });
    const work = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'event_arrival',
      effects: [{ type: 'accessRoute', route: 'work' }, { type: 'history', id: 'access_work' }],
    });

    expect(friend.accessRoute).toBe('friend');
    expect(work.accessRoute).toBe('work');
    expect(friend.history).not.toEqual(work.history);
  });

  it('stores rumor handling as different persistent state', () => {
    const privateRoute = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'event_finale',
      effects: [
        { type: 'knowledge', item: { id: 'missing_cuff_rumor', kind: 'rumor', claim: 'Mara may have taken it.', confidence: 'low', public: false } },
        { type: 'history', id: 'rumor_kept_private' },
      ],
    });
    const publicRoute = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'event_finale',
      effects: [
        { type: 'knowledge', item: { id: 'missing_cuff_rumor', kind: 'publicNarrative', claim: 'Mara is being blamed.', confidence: 'low', public: true } },
        { type: 'history', id: 'rumor_repeated' },
        { type: 'relevance', amount: 2 },
      ],
    });

    expect(privateRoute.knowledge[0].kind).toBe('rumor');
    expect(publicRoute.knowledge[0].kind).toBe('publicNarrative');
    expect(publicRoute.relevance).toBe(2);
  });
});
