type Props = {
  hasSave: boolean;
  onNewGame: () => void;
  onContinue: () => void;
  onReset: () => void;
};

export default function StartScreen({ hasSave, onNewGame, onContinue, onReset }: Props) {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 flex items-center justify-center p-6">
      <section className="w-full max-w-2xl rounded-[2rem] border border-stone-300 bg-white p-8 md:p-12 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Working title</p>
        <h1 className="mt-3 text-5xl md:text-7xl font-serif leading-none">Main Character</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
          Start outside the room. Decide what access is worth. Learn which parts of yourself become more valuable once someone points a camera at them.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button className="rounded-full bg-stone-900 px-6 py-3 text-white" onClick={onNewGame}>New game</button>
          {hasSave && <button className="rounded-full border border-stone-900 px-6 py-3" onClick={onContinue}>Continue</button>}
          {hasSave && <button className="rounded-full px-6 py-3 text-stone-500" onClick={onReset}>Reset save</button>}
        </div>
      </section>
    </main>
  );
}
