import type { Scene } from '../game/types';

export const scenes: Record<string, Scene> = {
  morning: {
    id: 'morning',
    eyebrow: 'Day 1 · Morning',
    title: 'Nia’s couch, for now',
    body: `Your suitcase is still half-unpacked beside Nia's couch. She told you not to rush, but you have been here long enough to know you want a place of your own.

A rerun of Main Character plays quietly while you get ready for work. You have wanted that life for years. Right now, though, you have $120, eight free hours before tonight, and a much smaller goal: save for a deposit and start meeting people outside your usual circle.

Ava, an events consultant you know through work, mentioned a small opening tonight at Juniper House. It is not a TV event. It is just the kind of place where people with better invitations meet each other.`,
    choices: [
      {
        id: 'work',
        label: 'Take an extra shift',
        description: 'Spend 4 hours working and earn $80 toward your own place.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 4 }, { type: 'notHistory', id: 'worked_extra_shift' }],
        effects: [
          { type: 'time', amount: -4 },
          { type: 'cash', amount: 80 },
          { type: 'history', id: 'worked_extra_shift', note: 'Worked an extra shift instead of using the afternoon socially.' },
        ],
      },
      {
        id: 'nia',
        label: 'Get lunch with Nia',
        description: 'Spend 2 hours and $12 catching up with the friend letting you stay with her.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 2 }, { type: 'notHistory', id: 'met_nia' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -12 },
          { type: 'relationship', characterId: 'nia', metric: 'affection', amount: 8 },
          { type: 'relationship', characterId: 'nia', metric: 'trust', amount: 5 },
          { type: 'history', id: 'met_nia' },
        ],
      },
      {
        id: 'ava',
        label: 'Help Ava finish a client presentation',
        description: 'Spend 3 hours helping Ava fix a last-minute work problem. She may owe you one.',
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
        label: 'Find something better to wear',
        description: 'Spend $45 and 2 hours on an outfit that will help you fit in if you get invited.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minCash', amount: 45 }, { type: 'minTime', amount: 2 }, { type: 'notHistory', id: 'bought_look' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -45 },
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
    title: 'Can you get into Juniper House tonight?',
    body: `The opening starts tonight. You still need an invitation or a reason to be there.

You can spend more of the afternoon preparing, or use a connection you have already built. Whatever you spend now is money and time you are not putting toward your own apartment.`,
    choices: [
      {
        id: 'work-again',
        label: 'Take an extra shift',
        description: 'Spend 4 hours working and earn $80. Your manager may also need help at tonight’s opening.',
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
        label: 'Get lunch with Nia',
        description: 'Spend 2 hours and $12 together. She knows someone helping with the opening.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 2 }, { type: 'notHistory', id: 'met_nia' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -12 },
          { type: 'relationship', characterId: 'nia', metric: 'affection', amount: 8 },
          { type: 'relationship', characterId: 'nia', metric: 'trust', amount: 5 },
          { type: 'history', id: 'met_nia' },
        ],
      },
      {
        id: 'ava-again',
        label: 'Help Ava finish her presentation',
        description: 'Spend 3 hours helping Ava. If it goes well, she can put your name on tonight’s guest list.',
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
        label: 'Shop for a better outfit',
        description: 'Spend $45 and 2 hours. It will help once you are inside, but it will not get you through the door.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minCash', amount: 45 }, { type: 'minTime', amount: 2 }, { type: 'notHistory', id: 'bought_look' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -45 },
          { type: 'lifestyle', amount: 1 },
          { type: 'reputation', amount: 1 },
          { type: 'history', id: 'bought_look' },
        ],
      },
      {
        id: 'friend-route',
        label: 'Go as Nia’s plus-one',
        description: 'Nia’s friend has a spare invitation. You will arrive as someone’s guest, not as a VIP.',
        nextSceneId: 'event_arrival',
        conditions: [{ type: 'history', id: 'met_nia' }],
        effects: [
          { type: 'accessRoute', route: 'friend' },
          { type: 'relationshipTag', characterId: 'nia', tag: 'helped_with_access' },
          { type: 'history', id: 'access_friend' },
        ],
      },
      {
        id: 'favor-route',
        label: 'Ask Ava to put you on the guest list',
        description: 'Ava can get you in because you helped her today. You will owe some of that access to the favor.',
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
        label: 'Work the opening',
        description: 'Your manager needs an extra pair of hands. You will get inside, but you will be there as staff.',
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
    eyebrow: 'Juniper House Opening',
    title: 'A nicer room than you are used to',
    body: `Juniper House is packed with local business owners, stylists, restaurateurs, people with family money, and people who are very good at looking like they have family money.

This is not Main Character. No one is filming. But you recognize one woman from a photo Nia once showed you: Mara Solis, who has been seen at parties with the cast. For the first time, the world you watch on TV feels only a few rooms away instead of completely imaginary.`,
    variants: [
      {
        conditions: [{ type: 'history', id: 'access_friend' }],
        body: `Nia introduces you around casually. You are here because somebody actually wanted you with them, which makes the room easier to enter.`,
      },
      {
        conditions: [{ type: 'history', id: 'access_favor' }],
        body: `Your name is on Ava’s list. The host does not know you, but Ava does, and tonight that is enough.`,
      },
      {
        conditions: [{ type: 'history', id: 'access_work' }],
        body: `You spend the first hour carrying trays and solving small problems. People barely notice staff, which means they also forget to lower their voices around you.`,
      },
    ],
    choices: [
      {
        id: 'talk-mara',
        label: 'Introduce yourself to Mara',
        description: 'She is connected to people you would like to know, but you have no reason to pretend you are already part of her world.',
        nextSceneId: 'event_rumor',
        effects: [
          { type: 'relationship', characterId: 'mara', metric: 'affection', amount: 8 },
          { type: 'relationship', characterId: 'mara', metric: 'socialValue', amount: 5 },
          { type: 'history', id: 'chose_mara' },
        ],
      },
      {
        id: 'talk-celeste',
        label: 'Join Celeste’s conversation',
        description: 'She runs a local foundation and seems to know everyone worth knowing.',
        nextSceneId: 'event_rumor',
        effects: [
          { type: 'reputation', amount: 2 },
          { type: 'history', id: 'chose_celeste' },
        ],
      },
      {
        id: 'observe-room',
        label: 'Listen before you introduce yourself',
        description: 'Spend a few minutes figuring out who actually matters in the room and who only looks important.',
        nextSceneId: 'event_rumor',
        effects: [
          { type: 'relevance', amount: 1 },
          { type: 'history', id: 'watched_room' },
        ],
      },
    ],
  },
  event_rumor: {
    id: 'event_rumor',
    eyebrow: 'Later · Juniper House',
    title: 'A rumor starts moving',
    body: `Near the coat check, you hear two guests whisper that a diamond cuff from a display table is missing. One insists she saw Mara carrying a velvet case upstairs. Another says Mara never left the main room.

Neither person saw the cuff disappear. Ten minutes later, people are repeating the story as though someone caught Mara with it in her pocket.`,
    choices: [
      {
        id: 'keep-private',
        label: 'Do not repeat it',
        description: 'You heard a rumor. You did not see what happened.',
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
        label: 'Ask Mara what happened',
        description: 'Talk to her privately before deciding whether you believe the story.',
        nextSceneId: 'event_finale',
        effects: [
          {
            type: 'knowledge',
            item: { id: 'missing_cuff_rumor', kind: 'rumor', claim: 'Mara may have taken the missing diamond cuff.', confidence: 'low', public: false },
          },
          {
            type: 'knowledge',
            item: { id: 'mara_denial', kind: 'evidence', claim: 'Mara says she went upstairs to retrieve a donor envelope, not the cuff.', confidence: 'medium', public: false },
          },
          { type: 'relationship', characterId: 'mara', metric: 'trust', amount: 8 },
          { type: 'history', id: 'rumor_questioned' },
        ],
      },
      {
        id: 'repeat-rumor',
        label: 'Tell someone else what you heard',
        description: 'The story may make you part of the conversation, but people may remember who helped spread it.',
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
    title: 'You leave with another invitation',
    body: `The cuff turns up under a stack of event materials. The accusation was wrong, but the people who repeated it do not all look embarrassed.

Before you leave, Ava mentions another opening next month and says she can introduce you to the organizer. Nia points out that six months ago you would not have known anyone in this room.

On a television over the bar, a muted Main Character promo starts playing. That dream is still far away. Tonight was not about getting cast. It was about getting one rung closer to the kind of life where that dream might eventually become realistic.`,
    variants: [
      {
        conditions: [{ type: 'history', id: 'rumor_questioned' }],
        body: `Mara remembers that you asked her directly instead of joining the pile-on. That is not friendship yet, but it is a better beginning than gossip would have given you.`,
      },
      {
        conditions: [{ type: 'history', id: 'rumor_repeated' }],
        body: `You got pulled into the room faster by repeating the story, but Mara is colder with you now. Getting noticed and getting trusted are already proving to be different things.`,
      },
      {
        conditions: [{ type: 'history', id: 'rumor_kept_private' }],
        body: `You leave knowing something about how this crowd works: a story can become social currency long before anyone knows whether it is true.`,
      },
    ],
    choices: [
      {
        id: 'finish',
        label: 'Head back to Nia’s place',
        description: 'You still need your own apartment. But now you also have a reason to believe you can keep climbing.',
        nextSceneId: 'ending',
        effects: [
          { type: 'history', id: 'entered_better_social_circle' },
        ],
      },
    ],
  },
  ending: {
    id: 'ending',
    eyebrow: 'Vertical slice complete',
    title: 'One rung up',
    body: `You are still sleeping at Nia’s place. You are still saving for your own apartment. Nobody from Main Character knows your name.

But you now know people who can get you into places you could not enter yesterday, and one of those people has already mentioned another invitation.

The show is still the long-term goal. For now, your job is to build a life that can actually get you there.`,
    choices: [],
  },
};
