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
    ? has(state, 'got_cafe_job') || has(state, 'got_hotel_job')
      ? `You have ${state.cash} toward the $600 move-out fund.`
      : `You learned that moving out will take about $600, but without steady income it is still a research goal. You currently have ${state.cash}.`
    : `You have ${state.cash} saved, but you have not priced out your first move yet.`;

  const dating = has(state, 'went_on_week2_date')
    ? 'You made room for dating, even though the latest date did not turn into anything serious.'
    : has(state, 'went_on_dud_date')
      ? 'You tried dating once and got a good story out of a bad date.'
      : 'You did not spend time dating yet.';

  const reachedBellweather = has(state, 'bellweather_access_work') || has(state, 'bellweather_access_ava') || has(state, 'bellweather_access_mara') || has(state, 'bellweather_access_nia') || has(state, 'bellweather_access_celeste');
  const social = reachedBellweather
    ? 'Your social world expanded to the Bellweather benefit.'
    : has(state, 'skipped_bellweather')
      ? 'You chose not to spend this week on the Bellweather benefit and kept your progress in other areas.'
      : has(state, 'entered_better_social_circle')
        ? 'You reached Juniper House, but Bellweather is still ahead of you.'
        : has(state, 'skipped_juniper')
          ? 'You skipped Juniper House and prioritized other parts of your life instead.'
          : 'You are still building your first meaningful social access.';

  const presentation = has(state, 'bought_look')
    ? 'You spent money on presentation. It did not buy access by itself, but it made social rooms easier to navigate.'
    : null;

  const observation = has(state, 'watched_room')
    ? 'You learned to separate visible attention from real influence in a social room.'
    : null;

  const celeste = has(state, 'chose_celeste')
    ? 'You built a real connection with Celeste instead of that conversation disappearing after Juniper.'
    : null;

  const schedule = has(state, 'week3_event_conflict_work')
    ? 'Your assigned Calder shift took Saturday night, so you earned the money and missed the gallery supper.'
    : has(state, 'week3_cafe_called_out')
      ? 'You kept Saturday night free by calling out of Calder, which may hurt your reliability there.'
      : has(state, 'week3_hotel_flexible_schedule')
        ? 'Bellweather let you choose your shift, so you could work without giving up Saturday night.'
        : null;

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
        {presentation && <li>{presentation}</li>}
        {observation && <li>{observation}</li>}
        {celeste && <li>{celeste}</li>}
        {schedule && <li>{schedule}</li>}
        {rumor && <li>{rumor}</li>}
      </ul>
    </section>
  );
}
