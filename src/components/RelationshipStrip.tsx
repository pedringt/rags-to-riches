import { characters } from '../content/characters';
import type { GameState } from '../game/types';

type Props = { state: GameState };

const affectionLabel = (value: number) => value >= 70 ? 'Close' : value >= 40 ? 'Warm' : 'Distant';
const trustLabel = (value: number) => value >= 70 ? 'Trusting' : value >= 40 ? 'Cautious' : 'Wary';
const connectionLabel = (value: number) => value >= 70 ? 'Strong connection' : value >= 40 ? 'Useful connection' : 'Limited connection';

export default function RelationshipStrip({ state }: Props) {
  return (
    <div>
      <div className="mb-3">
        <div className="text-xs uppercase tracking-[0.18em] text-stone-400">Relationships</div>
        <p className="mt-1 text-sm text-stone-500">
          Affection is how much they like you. Trust is how safe you feel to them. Connection is how much social access you have through each other.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {Object.entries(state.relationships).map(([id, relationship]) => {
          const character = characters[id as keyof typeof characters];
          if (!character) return null;
          return (
            <article key={id} className="rounded-2xl border border-stone-200 bg-white p-4">
              <div className="font-medium">{character.name}</div>
              <div className="text-sm text-stone-500">{character.role}</div>
              <div className="mt-3 grid gap-2 text-sm">
                <Metric label="Affection" value={affectionLabel(relationship.affection)} />
                <Metric label="Trust" value={trustLabel(relationship.trust)} />
                <Metric label="Connection" value={connectionLabel(relationship.socialValue)} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-stone-100 px-3 py-2">
      <span className="text-xs uppercase tracking-[0.12em] text-stone-400">{label}</span>
      <span className="font-medium text-stone-700">{value}</span>
    </div>
  );
}
