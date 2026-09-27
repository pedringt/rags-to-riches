import { useEffect, useMemo, useReducer, useState } from 'react';
import GameHud from './components/GameHud';
import RelationshipStrip from './components/RelationshipStrip';
import ScenePanel from './components/ScenePanel';
import StartScreen from './components/StartScreen';
import { scenes } from './content/scenes';
import { createInitialGameState } from './game/initialState';
import { gameReducer } from './game/reducer';
import { clearSave, loadGame, saveGame } from './game/save';
import type { SceneChoice } from './game/types';

export default function RagsToRichesGame() {
  const [saved, setSaved] = useState(() => loadGame());
  const [started, setStarted] = useState(false);
  const [state, dispatch] = useReducer(gameReducer, createInitialGameState());

  useEffect(() => {
    if (started) {
      saveGame(state);
      setSaved(state);
    }
  }, [state, started]);

  const scene = useMemo(() => scenes[state.sceneId] ?? scenes.morning, [state.sceneId]);

  const startNew = () => {
    const fresh = createInitialGameState();
    dispatch({ type: 'reset', state: fresh });
    saveGame(fresh);
    setSaved(fresh);
    setStarted(true);
  };

  const continueGame = () => {
    const current = loadGame();
    if (current) dispatch({ type: 'load', state: current });
    setStarted(true);
  };

  const resetSave = () => {
    clearSave();
    setSaved(null);
    setStarted(false);
  };

  const choose = (choice: SceneChoice) => {
    dispatch({ type: 'applyChoice', effects: choice.effects, nextSceneId: choice.nextSceneId });
  };

  if (!started) {
    return <StartScreen hasSave={Boolean(saved)} onNewGame={startNew} onContinue={continueGame} onReset={resetSave} />;
  }

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <header className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-stone-400">Working title</div>
            <h1 className="text-2xl font-serif">Main Character</h1>
          </div>
          <button className="text-sm text-stone-500 underline underline-offset-4" onClick={() => setStarted(false)}>Menu</button>
        </header>

        <GameHud state={state} />

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ScenePanel scene={scene} state={state} onChoose={choose} />
          <aside className="space-y-5">
            <section className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-stone-400">Access route</div>
              <div className="mt-2 text-lg capitalize">{state.accessRoute ?? 'Not secured yet'}</div>
            </section>

            <section className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-stone-400">What you know</div>
              {state.knowledge.length === 0 ? (
                <p className="mt-2 text-sm leading-6 text-stone-500">Nothing important yet.</p>
              ) : (
                <ul className="mt-3 space-y-3 text-sm leading-6">
                  {state.knowledge.map((item) => (
                    <li key={item.id} className="rounded-xl bg-stone-100 p-3">
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-stone-400">{item.kind} · {item.confidence}</span>
                      {item.claim}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </aside>
        </div>

        <div className="mt-5"><RelationshipStrip state={state} /></div>

        {state.phase === 'ending' && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-stone-900 px-5 py-3 text-white" onClick={startNew}>Play another route</button>
            <button className="rounded-full border border-stone-400 px-5 py-3" onClick={resetSave}>Reset save</button>
          </div>
        )}
      </div>
    </main>
  );
}
