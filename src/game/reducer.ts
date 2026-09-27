import { clampRelationship } from './rules';
import type { Effect, GameState } from './types';

export type GameAction =
  | { type: 'applyChoice'; effects?: Effect[]; nextSceneId: string }
  | { type: 'load'; state: GameState }
  | { type: 'reset'; state: GameState };

const applyEffect = (state: GameState, effect: Effect): GameState => {
  switch (effect.type) {
    case 'cash':
      return { ...state, cash: Math.max(0, state.cash + effect.amount) };
    case 'lifestyle':
      return { ...state, lifestyle: Math.max(0, state.lifestyle + effect.amount) };
    case 'reputation':
      return { ...state, reputation: state.reputation + effect.amount };
    case 'relevance':
      return { ...state, relevance: state.relevance + effect.amount };
    case 'time':
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining + effect.amount) };
    case 'accessRoute':
      return { ...state, accessRoute: effect.route };
    case 'history':
      if (state.history.some((event) => event.id === effect.id)) return state;
      return { ...state, history: [...state.history, { id: effect.id, day: state.day, note: effect.note }] };
    case 'knowledge':
      if (state.knowledge.some((item) => item.id === effect.item.id)) return state;
      return { ...state, knowledge: [...state.knowledge, effect.item] };
    case 'relationshipTag': {
      const current = state.relationships[effect.characterId];
      if (!current || current.tags.includes(effect.tag)) return state;
      return {
        ...state,
        relationships: {
          ...state.relationships,
          [effect.characterId]: { ...current, tags: [...current.tags, effect.tag] },
        },
      };
    }
    case 'relationship': {
      const current = state.relationships[effect.characterId];
      if (!current) return state;
      return {
        ...state,
        relationships: {
          ...state.relationships,
          [effect.characterId]: {
            ...current,
            [effect.metric]: clampRelationship(current[effect.metric] + effect.amount),
          },
        },
      };
    }
    default:
      return state;
  }
};

const inferPhase = (sceneId: string): GameState['phase'] => {
  if (sceneId === 'ending') return 'ending';
  if (sceneId.startsWith('event_')) return 'event';
  return 'prep';
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'load':
    case 'reset':
      return action.state;
    case 'applyChoice': {
      const next = (action.effects ?? []).reduce(applyEffect, state);
      return { ...next, sceneId: action.nextSceneId, phase: inferPhase(action.nextSceneId) };
    }
    default:
      return state;
  }
};
