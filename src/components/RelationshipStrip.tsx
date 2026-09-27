import { characters } from '../content/characters';
import type { GameState } from '../game/types';

type Props = { state: GameState };

export default function RelationshipStrip({ state }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {Object.entries(state.relationships).map(([id, relationship]) => {
        const character = characters[id as keyof typeof characters];
        if (!character) return null;
        return (
          <article key={id} className="rounded-2xl border border-stone-200 bg-white p-4">
            <div className="font-medium">{character.name}</div>
            <div className="text-sm text-stone-500">{character.role}</div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <Metric label="Aff" value={relationship.affection} />
              <Metric label="Trust" value={relationship.trust} />
              <Metric label="Value" value={relationship.socialValue} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl bg-stone-100 px-2 py-2 text-center"><span className="block text-stone-400">{label}</span>{value}</div>;
}
