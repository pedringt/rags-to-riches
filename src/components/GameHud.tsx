import type { GameState } from '../game/types';

type Props = { state: GameState };

export default function GameHud({ state }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      <Stat label="Cash" value={`$${state.cash}`} />
      <Stat label="Time" value={`${state.timeRemaining}h`} />
      <Stat label="Lifestyle" value={state.lifestyle} />
      <Stat label="Reputation" value={state.reputation} />
      <Stat label="Relevance" value={state.relevance} />
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
