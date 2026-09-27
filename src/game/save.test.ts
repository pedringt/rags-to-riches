import { beforeEach, describe, expect, it } from 'vitest';
import { createInitialGameState } from './initialState';
import { clearSave, loadGame, SAVE_KEY, saveGame } from './save';

class MemoryStorage {
  private data = new Map<string, string>();
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
  clear() { this.data.clear(); }
}

Object.defineProperty(globalThis, 'localStorage', { value: new MemoryStorage(), configurable: true });

describe('local save', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips current state', () => {
    const state = { ...createInitialGameState(), cash: 321, sceneId: 'event_arrival' };
    saveGame(state);
    expect(loadGame()).toEqual(state);
  });

  it('rejects incompatible older save versions', () => {
    const old = { ...createInitialGameState(), saveVersion: 1 };
    localStorage.setItem(SAVE_KEY, JSON.stringify(old));
    expect(loadGame()).toBeNull();
  });

  it('clears the active save', () => {
    saveGame(createInitialGameState());
    clearSave();
    expect(localStorage.getItem(SAVE_KEY)).toBeNull();
    expect(loadGame()).toBeNull();
  });
});
