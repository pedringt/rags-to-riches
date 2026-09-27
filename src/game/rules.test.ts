import { describe, expect, it } from 'vitest';
import { scenes } from '../content/scenes';
import { createInitialGameState } from './initialState';
import { gameReducer } from './reducer';
import { choiceAvailable } from './rules';

const choice = (sceneId: string, choiceId: string) => scenes[sceneId].choices.find((item) => item.id === choiceId)!;

describe('vertical slice route rules', () => {
  it('does not allow money alone to unlock the friend or favor route', () => {
    const wealthy = { ...createInitialGameState(), cash: 9999 };
    expect(choiceAvailable(wealthy, choice('prep', 'friend-route'))).toBe(false);
    expect(choiceAvailable(wealthy, choice('prep', 'favor-route'))).toBe(false);
  });

  it('unlocks the friend route after spending time with Nia', () => {
    const state = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'met_nia' }],
    });
    expect(choiceAvailable(state, choice('prep', 'friend-route'))).toBe(true);
  });

  it('unlocks the work route after the extra shift', () => {
    const state = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'worked_extra_shift' }],
    });
    expect(choiceAvailable(state, choice('prep', 'work-route'))).toBe(true);
  });
});
