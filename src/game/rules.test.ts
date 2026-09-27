import { describe, expect, it } from 'vitest';
import { scenes } from '../content/scenes';
import { createInitialGameState } from './initialState';
import { gameReducer } from './reducer';
import { choiceAvailable } from './rules';

const choice = (sceneId: string, choiceId: string) => scenes[sceneId].choices.find((item) => item.id === choiceId)!;

describe('vertical slice route rules', () => {
  it('does not allow money alone to unlock social access', () => {
    const wealthy = { ...createInitialGameState(), cash: 9999 };
    expect(choiceAvailable(wealthy, choice('prep', 'friend-route'))).toBe(false);
    expect(choiceAvailable(wealthy, choice('prep', 'favor-route'))).toBe(false);
    expect(choiceAvailable(wealthy, choice('prep', 'work-route'))).toBe(false);
  });

  it('unlocks the friend route after spending time with Nia', () => {
    const state = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'met_nia' }],
    });
    expect(choiceAvailable(state, choice('prep', 'friend-route'))).toBe(true);
  });

  it('requires job search before the café interview', () => {
    const initial = createInitialGameState();
    expect(choiceAvailable(initial, choice('prep', 'interview'))).toBe(false);

    const afterSearch = gameReducer(initial, {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'job_search_started' }],
    });
    expect(choiceAvailable(afterSearch, choice('prep', 'interview'))).toBe(true);
  });

  it('unlocks the work route only after getting the café job', () => {
    const state = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'got_cafe_job' }],
    });
    expect(choiceAvailable(state, choice('prep', 'work-route'))).toBe(true);
  });

  it('allows the dud date only while the player can afford its time and cost', () => {
    const state = createInitialGameState();
    expect(choiceAvailable(state, choice('prep', 'date-again'))).toBe(true);

    const afterDate = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'went_on_dud_date' }],
    });
    expect(choiceAvailable(afterDate, choice('prep', 'date-again'))).toBe(false);
  });
});
