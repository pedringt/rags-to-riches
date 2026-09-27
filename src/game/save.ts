import type { GameState } from './types';

export const SAVE_KEY = 'main-character-vertical-slice-v1';

export const saveGame = (state: GameState) => {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
};

export const loadGame = (): GameState | null => {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as GameState;
    return parsed?.saveVersion === 1 ? parsed : null;
  } catch {
    return null;
  }
};

export const clearSave = () => localStorage.removeItem(SAVE_KEY);
