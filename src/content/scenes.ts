import type { Scene } from '../game/types';

export const scenes: Record<string, Scene> = {
  morning: {
    id: 'morning',
    eyebrow: 'Day 1 · Morning',
    title: 'A door you cannot open yet',
    body: `Your apartment is small, your bank balance is ordinary, and tonight Halcyon House is hosting the Meridian Benefit — the kind of event where people become connections just by being seen together.

You do not have an invitation. You do have eight hours, $180, a job that could use you, an old friend who knows everybody by accident, and an acquaintance who only calls when she needs something.`,
    choices: [
      {
        id: 'work',
        label: 'Take the extra shift',
        description: 'Lose four hours, earn $80, and make yourself useful at work.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 4 }, { type: 'notHistory', id: 'worked_extra_shift' }],
        effects: [
          { type: 'time', amount: -4 },
          { type: 'cash', amount: 80 },
          { type: 'history', id: 'worked_extra_shift' },
        ],
      },
      {
        id: 'nia',
        label: 'Meet Nia for coffee',
        description: 'Spend three hours on someone who knew you before status mattered.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 3 }, { type: 'notHistory', id: 'met_nia' }],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'cash', amount: -12 },
          { type: 'relationship', characterId: 'nia', metric: 'affection', amount: 10 },
          { type: 'relationship', characterId: 'nia', metric: 'trust', amount: 5 },
          { type: 'history', id: 'met_nia' },
        ],
      },
      {
        id: 'ava',
        label: 'Rescue Ava’s launch deck',
        description: 'Spend three hours fixing a last-minute mess for a connected acquaintance.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 3 }, { type: 'notHistory', id: 'helped_ava' }],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'relationship', characterId: 'ava', metric: 'socialValue', amount: 20 },
          { type: 'relationship', characterId: 'ava', metric: 'trust', amount: 5 },
          { type: 'relationshipTag', characterId: 'ava', tag: 'owes_favor' },
          { type: 'history', id: 'helped_ava' },
        ],
      },
      {
        id: 'wardrobe',
        label: 'Buy one thing that changes the room',
        description: 'Spend $90 on a sharp, event-ready look. It cannot get you invited by itself.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minCash', amount: 90 }, { type: 'minTime', amount: 2 }, { type: 'notHistory', id: 'bought_look' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -90 },
          { type: 'lifestyle', amount: 1 },
          { type: 'reputation', amount: 1 },
          { type: 'history', id: 'bought_look' },
        ],
      },
    ],
  },
  prep: {
    id: 'prep',
    eyebrow: 'Day 1 · Afternoon',
    title: 'Decide what tonight is worth',
    body: `The Benefit gets closer. You can keep preparing, or cash in whichever connection you have earned. There is no time to do everything.`,
    choices: [
      {
        id: 'work-again',
        label: 'Take the extra shift',
        description: 'Earn $80 and a work-earned route into the event.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 4 }, { type: 'notHistory', id: 'worked_extra_shift' }],
        effects: [
          { type: 'time', amount: -4 },
          { type: 'cash', amount: 80 },
          { type: 'history', id: 'worked_extra_shift' },
        ],
      },
      {
        id: 'nia-again',
        label: 'Meet Nia for coffee',
        description: 'Strengthen a relationship that is not transactional.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 3 }, { type: 'notHistory', id: 'met_nia' }],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'cash', amount: -12 },
          { type: 'relationship', characterId: 'nia', metric: 'affection', amount: 10 },
          { type: 'relationship', characterId: 'nia', metric: 'trust', amount: 5 },
          { type: 'history', id: 'met_nia' },
        ],
      },
      {
        id: 'ava-again',
        label: 'Rescue Ava’s launch deck',
        description: 'Become useful to someone with a list.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 3 }, { type: 'notHistory', id: 'helped_ava' }],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'relationship', characterId: 'ava', metric: 'socialValue', amount: 20 },
          { type: 'relationship', characterId: 'ava', metric: 'trust', amount: 5 },
          { type: 'relationshipTag', characterId: 'ava', tag: 'owes_favor' },
          { type: 'history', id: 'helped_ava' },
        ],
      },
      {
        id: 'wardrobe-again',
        label: 'Upgrade your look',
        description: 'Spend $90 and two hours. Helpful once you are inside, useless as an invitation.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minCash', amount: 90 }, { type: 'minTime', amount: 2 }, { type: 'notHistory', id: 'bought_look' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -90 },
          { type: 'lifestyle', amount: 1 },
          { type: 'reputation', amount: 1 },
          { type: 'history', id: 'bought_look' },
        ],
      },
      {
        id: 'friend-route',
        label: 'Ask Nia for the introduction',
        description: 'She knows a volunteer coordinator and can get you in without pretending you belong there.',
        nextSceneId: 'event_arrival',
        conditions: [{ type: 'relationshipMin', characterId: 'nia', metric: 'affection', amount: 55 }],
        effects: [
          { type: 'accessRoute', route: 'friend' },
          { type: 'relationshipTag', characterId: 'nia', tag: 'called_in_favor' },
          { type: 'history', id: 'access_friend' },
        ],
      },
      {
        id: 'favor-route',
        label: 'Call in Ava’s favor',
        description: 'Ava can put your name on the list. You both know why she is doing it.',
        nextSceneId: 'event_arrival',
        conditions: [{ type: 'relationshipMin', characterId: 'ava', metric: 'socialValue', amount: 55 }],
        effects: [
          { type: 'accessRoute', route: 'favor' },
          { type: 'relationshipTag', characterId: 'ava', tag: 'favor_collected' },
          { type: 'history', id: 'access_favor' },
        ],
      },
      {
        id: 'work-route',
        label: 'Take the staff invitation',
        description: 'Your extra shift put you in the right place when a sponsor needed one more reliable person.',
        nextSceneId: 'event_arrival',
        conditions: [{ type: 'history', id: 'worked_extra_shift' }],
        effects: [
          { type: 'accessRoute', route: 'work' },
          { type: 'history', id: 'access_work' },
        ],
      },
    ],
  },
  event_arrival: {
    id: 'event_arrival',
    eyebrow: 'The Meridian Benefit',
    title: 'Inside',
    body: `Halcyon House is all glass, stone, and people acting as though they have never checked a price. Somewhere upstairs, a field producer from Main Character is talking to two women everyone else keeps glancing toward.`,
    variants: [
      {
        conditions: [{ type: 'history', id: 'access_friend' }],
        body: `Nia walks you through the side entrance and introduces you by your first name, not your résumé. You arrive attached to a real person, which makes you harder to dismiss.`,
      },
      {
        conditions: [{ type: 'history', id: 'access_favor' }],
        body: `Your name is exactly where Ava promised it would be. The check-in host smiles a little too knowingly. You are inside because someone decided you were useful.`,
      },
      {
        conditions: [{ type: 'history', id: 'access_work' }],
        body: `You enter with a sponsor credential and a job to do. It is not glamorous, but people speak freely around someone they think is working.`,
      },
    ],
    choices: [
      {
        id: 'talk-mara',
        label: 'Talk to Mara Solis',
        description: 'She is polished, self-possessed, and being watched by production.',
        nextSceneId: 'event_rumor',
        effects: [
          { type: 'relationship', characterId: 'mara', metric: 'affection', amount: 8 },
          { type: 'relationship', characterId: 'mara', metric: 'socialValue', amount: 5 },
          { type: 'history', id: 'chose_mara' },
        ],
      },
      {
        id: 'talk-celeste',
        label: 'Stay near Celeste Arden',
        description: 'She seems unimpressed by the cameras, which makes everyone else more interested in her.',
        nextSceneId: 'event_rumor',
        effects: [
          { type: 'reputation', amount: 2 },
          { type: 'history', id: 'chose_celeste' },
        ],
      },
      {
        id: 'observe-production',
        label: 'Watch the producer instead',
        description: 'Tamsin Reed notices who creates a scene and who understands one.',
        nextSceneId: 'event_rumor',
        effects: [
          { type: 'relevance', amount: 1 },
          { type: 'history', id: 'watched_production' },
        ],
      },
    ],
  },
  event_rumor: {
    id: 'event_rumor',
    eyebrow: 'Later · Halcyon House',
    title: 'A story arrives before the facts do',
    body: `Near the powder room, you hear two guests whisper that a diamond cuff from the silent-auction display is missing. One insists she saw Mara leaving the upstairs hall with a velvet case. Another says Mara was downstairs the entire time.

Neither person actually saw the cuff disappear. By the time the champagne is refilled, three people are repeating the accusation as if it were settled.`,
    choices: [
      {
        id: 'keep-private',
        label: 'Keep it to yourself',
        description: 'Knowing something is not the same as knowing it is true.',
        nextSceneId: 'event_finale',
        effects: [
          {
            type: 'knowledge',
            item: { id: 'missing_cuff_rumor', kind: 'rumor', claim: 'Mara may have taken the missing diamond cuff.', confidence: 'low', public: false },
          },
          { type: 'history', id: 'rumor_kept_private' },
        ],
      },
      {
        id: 'ask-mara',
        label: 'Ask Mara privately',
        description: 'Risk awkwardness in exchange for a better read on the claim.',
        nextSceneId: 'event_finale',
        effects: [
          {
            type: 'knowledge',
            item: { id: 'missing_cuff_rumor', kind: 'rumor', claim: 'Mara may have taken the missing diamond cuff.', confidence: 'low', public: false },
          },
          {
            type: 'knowledge',
            item: { id: 'mara_denial', kind: 'evidence', claim: 'Mara says she was sent upstairs to retrieve a donor envelope, not the cuff.', confidence: 'medium', public: false },
          },
          { type: 'relationship', characterId: 'mara', metric: 'trust', amount: 8 },
          { type: 'history', id: 'rumor_questioned' },
        ],
      },
      {
        id: 'repeat-rumor',
        label: 'Repeat it to someone connected',
        description: 'It may make you interesting. It may also make you the person who spread it.',
        nextSceneId: 'event_finale',
        effects: [
          {
            type: 'knowledge',
            item: { id: 'missing_cuff_rumor', kind: 'publicNarrative', claim: 'Mara is being blamed for the missing diamond cuff.', confidence: 'low', public: true },
          },
          { type: 'relevance', amount: 2 },
          { type: 'reputation', amount: -1 },
          { type: 'relationship', characterId: 'mara', metric: 'trust', amount: -10 },
          { type: 'history', id: 'rumor_repeated' },
        ],
      },
    ],
  },
  event_finale: {
    id: 'event_finale',
    eyebrow: 'End of the night',
    title: 'Someone asks who you are',
    body: `By midnight, the cuff has been found under a stack of auction materials. That does not stop the story. It only changes who looks foolish for believing it.

Across the room, Tamsin Reed — the field producer — asks someone your name. Not because you are famous. Because you were in the middle of a room full of people trying to become memorable, and somehow you registered.`,
    variants: [
      {
        conditions: [{ type: 'history', id: 'rumor_questioned' }],
        body: `Mara remembers that you asked her before repeating anything. In this room, restraint is unusual enough to be interesting.`,
      },
      {
        conditions: [{ type: 'history', id: 'rumor_repeated' }],
        body: `The rumor moved faster after you touched it. Tamsin noticed that too. Being useful to television and being trusted are already beginning to pull in different directions.`,
      },
      {
        conditions: [{ type: 'history', id: 'rumor_kept_private' }],
        body: `You leave with information you chose not to spend. Nobody applauds restraint, but somebody notices you were listening.`,
      },
    ],
    choices: [
      {
        id: 'finish',
        label: 'Go home',
        description: 'You are not on the show. But now the show knows who you are.',
        nextSceneId: 'ending',
        effects: [
          { type: 'relevance', amount: 1 },
          { type: 'history', id: 'show_noticed_player' },
        ],
      },
    ],
  },
  ending: {
    id: 'ending',
    eyebrow: 'Vertical slice complete',
    title: 'The door is open a crack',
    body: `You started the day outside the room. You end it with a connection, a reputation beginning to form, and at least one story you now understand differently than everyone repeating it.

You are not on Main Character. Not yet.`,
    choices: [],
  },
};
