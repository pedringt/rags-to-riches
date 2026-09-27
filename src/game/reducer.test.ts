import { describe, expect, it } from 'vitest';
import { createInitialGameState } from './initialState';
import { gameReducer } from './reducer';

describe('gameReducer', () => {
  it('starts unemployed, living with Nia, and with thin savings', () => {
    const state = createInitialGameState();
    expect(state.cash).toBe(90);
    expect(state.income).toBe(0);
    expect(state.history.some((event) => event.id === 'living_with_nia')).toBe(true);
    expect(state.history.some((event) => event.id === 'unemployed')).toBe(true);
    expect(state.relationships.nia.tags).toContain('roommate');
  });

  it('applies job-search time and history effects', () => {
    const state = createInitialGameState();
    const next = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [
        { type: 'time', amount: -1 },
        { type: 'history', id: 'job_search_started' },
      ],
    });

    expect(next.timeRemaining).toBe(15);
    expect(next.history.some((event) => event.id === 'job_search_started')).toBe(true);
  });

  it('records getting a job separately from the starting unemployment history', () => {
    const state = createInitialGameState();
    const next = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'got_cafe_job' }],
    });

    expect(next.history.some((event) => event.id === 'got_cafe_job')).toBe(true);
    expect(next.history.some((event) => event.id === 'unemployed')).toBe(true);
  });


  it('starts a new week without resetting persistent progress', () => {
    const state = {
      ...createInitialGameState(),
      cash: 140,
      timeRemaining: 1,
      accessRoute: 'friend' as const,
    };
    const next = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'week2_start',
      effects: [{ type: 'history', id: 'entered_better_social_circle' }, { type: 'newWeek', time: 10 }],
    });

    expect(next.day).toBe(8);
    expect(next.timeRemaining).toBe(10);
    expect(next.cash).toBe(140);
    expect(next.accessRoute).toBe(null);
    expect(next.history.some((event) => event.id === 'entered_better_social_circle')).toBe(true);
    expect(next.history.some((event) => event.id === 'living_with_nia')).toBe(true);
  });

  it('starts Week 3 with a larger usable-time budget while preserving progress', () => {
    const state = {
      ...createInitialGameState(),
      cash: 420,
      timeRemaining: 2,
      sceneId: 'ending',
    };
    const next = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'week3_start',
      effects: [{ type: 'newWeek', time: 20 }],
    });

    expect(next.day).toBe(8);
    expect(next.timeRemaining).toBe(20);
    expect(next.cash).toBe(420);
    expect(next.sceneId).toBe('week3_start');
  });

  it('recognizes the Week 3 ending as an ending phase', () => {
    const next = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'week3_ending',
      effects: [{ type: 'history', id: 'completed_week3' }],
    });
    expect(next.phase).toBe('ending');
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
