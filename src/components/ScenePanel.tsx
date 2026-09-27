import type { GameState, Scene, SceneChoice } from '../game/types';
import { choiceAvailable, conditionPasses } from '../game/rules';

type Props = {
  scene: Scene;
  state: GameState;
  onChoose: (choice: SceneChoice) => void;
};

export default function ScenePanel({ scene, state, onChoose }: Props) {
  const variants = scene.variants?.filter((candidate) => candidate.conditions.every((condition) => conditionPasses(state, condition))) ?? [];
  const body = [scene.body, ...variants.map((variant) => variant.body)].filter(Boolean).join('\n\n');
  const available = scene.choices.filter((choice) => choiceAvailable(state, choice));

  return (
    <section className="rounded-[2rem] border border-stone-300 bg-white p-6 md:p-10 shadow-sm">
      {scene.eyebrow && <div className="text-xs uppercase tracking-[0.22em] text-stone-400">{scene.eyebrow}</div>}
      <h2 className="mt-2 text-3xl md:text-5xl font-serif">{scene.title}</h2>
      <div className="mt-6 space-y-4 text-base md:text-lg leading-8 text-stone-700">
        {body.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      {available.length > 0 && (
        <div className="mt-8 grid gap-3">
          {available.map((choice) => (
            <button
              key={choice.id}
              className="rounded-2xl border border-stone-300 p-4 text-left transition hover:border-stone-900 hover:bg-stone-50"
              onClick={() => onChoose(choice)}
            >
              <div className="font-medium">{choice.label}</div>
              {choice.description && <div className="mt-1 text-sm leading-6 text-stone-500">{choice.description}</div>}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
