import type { GameState } from '../game/types';

type Props = { state: GameState };

const has = (state: GameState, id: string) => state.history.some((event) => event.id === id);

export default function GameHud({ state }: Props) {
  const job = has(state, 'got_hotel_job')
    ? 'Bellweather Hotel'
    : has(state, 'got_cafe_job')
      ? 'Calder Café'
      : has(state, 'job_search_started')
        ? 'Job hunting'
        : 'Unemployed';

  const social = has(state, 'completed_week2')
    ? (has(state, 'skipped_bellweather') ? 'Prioritized other goals' : 'Bellweather reached')
    : has(state, 'bellweather_access_work') || has(state, 'bellweather_access_ava') || has(state, 'bellweather_access_mara') || has(state, 'bellweather_access_nia') || has(state, 'bellweather_access_celeste')
      ? 'Bellweather secured'
      : has(state, 'entered_better_social_circle')
        ? 'Juniper reached'
        : has(state, 'skipped_juniper')
          ? 'Skipped Juniper'
          : state.accessRoute
            ? 'Invitation secured'
            : has(state, 'met_nia') || has(state, 'helped_ava')
              ? 'Building connections'
              : 'Starting out';

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      <Stat label="Cash" value={`$${state.cash}`} />
      <Stat label="Free time" value={`${state.timeRemaining}h`} />
      <Stat label="Job" value={job} />
      <Stat label="Housing" value={has(state, 'apartment_target_known') ? 'Nia’s place · $600 goal' : 'Nia’s place'} />
      <Stat label="Social life" value={social} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-stone-400">{label}</div>
      <div className="mt-1 text-lg font-medium">{value}</div>
    </div>
  );
}
