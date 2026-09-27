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

  it('requires a normal café shift before the Juniper catering route', () => {
    const employed = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'got_cafe_job' }],
    });
    expect(choiceAvailable(employed, choice('prep', 'cafe-first-shift'))).toBe(true);
    expect(choiceAvailable(employed, choice('prep', 'work-route'))).toBe(false);

    const afterFirstShift = gameReducer(employed, {
      type: 'applyChoice',
      nextSceneId: 'prep',
      effects: [{ type: 'history', id: 'worked_cafe_once' }],
    });
    expect(choiceAvailable(afterFirstShift, choice('prep', 'work-route'))).toBe(true);
  });


  it('requires real café experience before the Bellweather job can unlock', () => {
    const initial = { ...createInitialGameState(), timeRemaining: 10 };
    const employed = gameReducer(initial, {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'history', id: 'got_cafe_job' }],
    });
    expect(choiceAvailable(employed, choice('week2_hub', 'week2-better-job'))).toBe(false);

    const experienced = gameReducer(employed, {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'history', id: 'cafe_experience' }],
    });
    expect(choiceAvailable(experienced, choice('week2_hub', 'week2-better-job'))).toBe(true);
  });

  it('allows different Week 2 paths into the Bellweather benefit', () => {
    const avaRoute = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'relationship', characterId: 'ava', metric: 'socialValue', amount: 20 }],
    });
    expect(choiceAvailable(avaRoute, choice('week2_hub', 'week2-ava-route'))).toBe(true);

    const niaRoute = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'history', id: 'contributed_to_nia' }],
    });
    expect(choiceAvailable(niaRoute, choice('week2_hub', 'week2-nia-route'))).toBe(true);

    const workRoute = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'history', id: 'worked_hotel_once' }],
    });
    expect(choiceAvailable(workRoute, choice('week2_hub', 'week2-work-route'))).toBe(true);
  });


  it('keeps first-date wording history-aware in the persistent Week 2 hub', () => {
    const state = { ...createInitialGameState(), timeRemaining: 10, cash: 100 };
    expect(choiceAvailable(state, choice('week2_hub', 'week2-first-date-hub'))).toBe(true);
    expect(choiceAvailable(state, choice('week2_hub', 'week2-another-date-hub'))).toBe(false);

    const afterDud = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'history', id: 'went_on_dud_date' }],
    });
    expect(choiceAvailable(afterDud, choice('week2_hub', 'week2-first-date-hub'))).toBe(false);
    expect(choiceAvailable(afterDud, choice('week2_hub', 'week2-another-date-hub'))).toBe(true);
  });

  it('keeps unresolved job search available in Week 2', () => {
    const state = { ...createInitialGameState(), timeRemaining: 10 };
    expect(choiceAvailable(state, choice('week2_hub', 'week2-job-search'))).toBe(true);

    const afterSearch = gameReducer(state, {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'history', id: 'job_search_started' }],
    });
    expect(choiceAvailable(afterSearch, choice('week2_hub', 'week2-interview-cafe'))).toBe(true);
  });

  it('requires an existing Mara connection for Mara to invite the player to Bellweather', () => {
    const questionedOnly = gameReducer(createInitialGameState(), {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'history', id: 'rumor_questioned' }],
    });
    expect(choiceAvailable(questionedOnly, choice('week2_hub', 'week2-mara-route'))).toBe(false);

    const connected = gameReducer(questionedOnly, {
      type: 'applyChoice',
      nextSceneId: 'week2_hub',
      effects: [{ type: 'history', id: 'chose_mara' }],
    });
    expect(choiceAvailable(connected, choice('week2_hub', 'week2-mara-route'))).toBe(true);
  });

  it('always leaves an explicit way to end each week without attending the social event', () => {
    expect(choiceAvailable(createInitialGameState(), choice('prep', 'skip-juniper'))).toBe(true);
    expect(choiceAvailable({ ...createInitialGameState(), timeRemaining: 0 }, choice('week2_hub', 'skip-bellweather'))).toBe(true);
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
