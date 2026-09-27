import { useEffect, useMemo, useReducer, useState } from 'react';
import EndingSummary from './components/EndingSummary';
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
            <h1 className="text-2xl font-serif">Rags to Riches</h1>
          </div>
          <button className="text-sm text-stone-500 underline underline-offset-4" onClick={() => setStarted(false)}>Menu</button>
        </header>

        <GameHud state={state} />

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ScenePanel scene={scene} state={state} onChoose={choose} />
          <aside className="space-y-5">
            <section className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-stone-400">Right now</div>
              <div className="mt-3 space-y-3 text-sm leading-6">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-stone-400">Work</span>
                  {state.history.some((event) => event.id === 'got_hotel_job')
                    ? 'You moved up to guest-services shifts at the Bellweather Hotel.'
                    : state.history.some((event) => event.id === 'got_cafe_job')
                      ? 'You have a part-time job at Calder Café.'
                      : state.history.some((event) => event.id === 'job_search_started')
                        ? 'You have started applying. An interview is the next step.'
                        : 'You need income. Job hunting is still waiting.'}
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-stone-400">Housing</span>
                  {state.history.some((event) => event.id === 'apartment_target_known')
                    ? 'You are staying with Nia. Your first move-out fund target is $600.'
                    : 'You are staying with Nia. Your own place is an early goal, but you need steadier income and savings first.'}
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-stone-400">Social</span>
                  {state.history.some((event) => event.id === 'week3_show_adjacent_event')
                    ? state.history.some((event) => event.id === 'met_tamsin_socially')
                      ? 'You reached a show-adjacent room and met Main Character field producer Tamsin socially.'
                      : 'You reached your first clearly show-adjacent room without entering casting.'
                    : state.history.some((event) => event.id === 'week3_event_conflict_work')
                      ? 'Your assigned Calder shift overlapped the gallery supper, so work won this week.'
                      : state.history.some((event) => event.id === 'completed_week2')
                        ? state.history.some((event) => event.id === 'skipped_bellweather')
                          ? 'You chose other priorities over the Bellweather benefit.'
                          : 'You made it through a second, better social room without reaching the show yet.'
                        : state.history.some((event) => event.id.startsWith('bellweather_access_'))
                      ? 'You found a way into the Bellweather benefit.'
                      : state.history.some((event) => event.id === 'entered_better_social_circle')
                        ? 'You made it into Juniper House last week. That progress still counts.'
                        : state.history.some((event) => event.id === 'skipped_juniper')
                          ? 'You skipped Juniper House and kept your time for other priorities.'
                          : state.accessRoute
                            ? 'You found a way into Juniper House.'
                            : 'You are still building the relationships that get you into better rooms.'}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-stone-400">What you know</div>
              {state.knowledge.length === 0 ? (
                <p className="mt-2 text-sm leading-6 text-stone-500">Nothing important yet.</p>
              ) : (
                <ul className="mt-3 space-y-3 text-sm leading-6">
                  {state.knowledge
                    .filter((item) => !(item.id === 'missing_cuff_rumor' && state.knowledge.some((known) => known.id === 'missing_cuff_resolved')))
                    .map((item) => (
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

        {state.phase === 'ending' && <EndingSummary state={state} />}

        {state.phase === 'ending' && scene.choices.length === 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-stone-900 px-5 py-3 text-white" onClick={startNew}>Play another route</button>
            <button className="rounded-full border border-stone-400 px-5 py-3" onClick={resetSave}>Reset save</button>
          </div>
        )}
      </div>
    </main>
  );
}
