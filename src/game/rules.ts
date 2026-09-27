import type { Condition, GameState, SceneChoice } from './types';

export const hasHistory = (state: GameState, id: string) => state.history.some((event) => event.id === id);
export const hasKnowledge = (state: GameState, id: string) => state.knowledge.some((item) => item.id === id);

export const conditionPasses = (state: GameState, condition: Condition): boolean => {
  switch (condition.type) {
    case 'minCash':
      return state.cash >= condition.amount;
    case 'minTime':
      return state.timeRemaining >= condition.amount;
    case 'history':
      return hasHistory(state, condition.id);
    case 'notHistory':
      return !hasHistory(state, condition.id);
    case 'knowledge':
      return hasKnowledge(state, condition.id);
    case 'relationshipMin':
      return state.relationships[condition.characterId]?.[condition.metric] >= condition.amount;
    default:
      return false;
  }
};

export const choiceAvailable = (state: GameState, choice: SceneChoice) =>
  (choice.conditions ?? []).every((condition) => conditionPasses(state, condition));

export const clampRelationship = (value: number) => Math.max(0, Math.min(100, value));
