import type { GameState } from '../game/types';

type Props = { state: GameState };

const has = (state: GameState, id: string) => state.history.some((event) => event.id === id);

export default function EndingSummary({ state }: Props) {
  const job = has(state, 'got_hotel_job')
    ? 'You moved up to guest services at the Bellweather Hotel.'
    : has(state, 'got_cafe_job')
      ? 'You found steady part-time work at Calder Café.'
      : 'You are still looking for steady work.';

  const housing = has(state, 'apartment_target_known')
    ? `You have $${state.cash} toward the $600 move-out fund.`
    : `You have $${state.cash} saved, but you have not priced out your first move yet.`;

  const dating = has(state, 'went_on_week2_date')
    ? 'You made room for dating, even though the latest date did not turn into anything serious.'
    : has(state, 'went_on_dud_date')
      ? 'You tried dating once and got a good story out of a bad date.'
      : 'You did not spend time dating yet.';

  const social = has(state, 'bellweather_access_work') || has(state, 'bellweather_access_ava') || has(state, 'bellweather_access_mara') || has(state, 'bellweather_access_nia')
    ? 'Your social world expanded from Juniper House to the Bellweather benefit.'
    : 'You made progress socially, but Bellweather is still ahead of you.';

  const rumor = has(state, 'rumor_repeated')
    ? 'Mara remembers that you helped spread the false cuff story.'
    : has(state, 'rumor_questioned')
      ? 'Mara remembers that you asked her directly before believing the cuff rumor.'
      : has(state, 'rumor_kept_private')
        ? 'You kept the cuff rumor private when you did not know whether it was true.'
        : null;

  return (
    <section className="mt-5 rounded-2xl border border-stone-300 bg-white p-5 md:p-6">
      <div className="text-xs uppercase tracking-[0.18em] text-stone-400">What changed</div>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
        <li>{job}</li>
        <li>{housing}</li>
        <li>{dating}</li>
        <li>{social}</li>
        {rumor && <li>{rumor}</li>}
      </ul>
    </section>
  );
}
