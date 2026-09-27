import type { Scene } from '../game/types';

export const scenes: Record<string, Scene> = {
  morning: {
    id: 'morning',
    eyebrow: 'Monday morning',
    title: 'Nia’s couch, for now',
    body: `Your suitcase is still half-unpacked beside Nia's couch. She keeps telling you not to worry about it, but you need work, you need savings, and eventually you need a place of your own.

You still have the long-term dream of ending up on Main Character someday. Right now that is almost beside the point. You have $90, eight free hours this week, and several ordinary problems competing for them.`,
    choices: [
      {
        id: 'job-search',
        label: 'Apply for jobs',
        description: 'Spend 3 hours updating applications and sending them out. No money now, but it could lead to steady income.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 3 }, { type: 'notHistory', id: 'job_search_started' }],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'history', id: 'job_search_started', note: 'Spent time applying for entry-level local jobs.' },
        ],
      },
      {
        id: 'nia',
        label: 'Get lunch with Nia',
        description: 'Spend 2 hours and $12 with the friend letting you stay with her. She knows people outside your usual circle.',
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
        label: 'Help Ava with a client presentation',
        description: 'Spend 3 hours helping an acquaintance fix a last-minute problem. She works around local events and may remember the favor.',
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
        id: 'date',
        label: 'Go on a dating-app coffee',
        description: 'Spend 2 hours and about $18. It might be fun. It might just be two hours you could have spent job hunting.',
        nextSceneId: 'date_dud',
        conditions: [{ type: 'minTime', amount: 2 }, { type: 'minCash', amount: 18 }, { type: 'notHistory', id: 'went_on_dud_date' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -18 },
        ],
      },
    ],
  },

  date_dud: {
    id: 'date_dud',
    eyebrow: 'Coffee date',
    title: 'Not every date is a connection',
    body: `His profile said "entrepreneur." Twenty minutes in, you learn that means he is between jobs, building an app he cannot explain, and currently sleeping in his cousin's game room.

He spends most of the date talking about his ex. When he finally asks about you, it is to see whether Nia charges you rent.`,
    choices: [
      {
        id: 'end-date',
        label: 'Finish your coffee and head out',
        description: 'No romance, no useful connection. Just a mildly funny story for Nia.',
        nextSceneId: 'prep',
        effects: [
          { type: 'relationship', characterId: 'nia', metric: 'affection', amount: 2 },
          { type: 'history', id: 'went_on_dud_date', note: 'An early dating-app date went nowhere.' },
        ],
      },
    ],
  },

  prep: {
    id: 'prep',
    eyebrow: 'Later this week',
    title: 'What gets your time next?',
    body: `You cannot fix everything at once. Job hunting helps your bank account later. Social plans cost money now. Dating may lead somewhere eventually, or nowhere at all.

Nia also mentions a Juniper House opening this weekend. It is not especially glamorous by the standards you daydream about, but it is a better room than the ones you usually get invited into.`,
    choices: [
      {
        id: 'job-search-again',
        label: 'Apply for jobs',
        description: 'Spend 3 hours sending applications. This needs to happen before you can land an interview.',
        nextSceneId: 'prep',
        conditions: [{ type: 'minTime', amount: 3 }, { type: 'notHistory', id: 'job_search_started' }],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'history', id: 'job_search_started' },
        ],
      },
      {
        id: 'interview',
        label: 'Interview at Calder Café',
        description: 'Spend 3 hours getting ready, traveling, and interviewing for a steady front-of-house job.',
        nextSceneId: 'prep',
        conditions: [
          { type: 'minTime', amount: 3 },
          { type: 'history', id: 'job_search_started' },
          { type: 'notHistory', id: 'got_cafe_job' },
        ],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'history', id: 'got_cafe_job', note: 'Hired for part-time front-of-house work at Calder Café.' },
        ],
      },
      {
        id: 'nia-again',
        label: 'Get lunch with Nia',
        description: 'Spend 2 hours and $12 together. She has a friend with an extra invitation to Juniper House.',
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
        description: 'Spend 3 hours helping Ava. If it goes well, she can put your name on the Juniper House guest list.',
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
        id: 'date-again',
        label: 'Try the dating app',
        description: 'Spend 2 hours and $18 on a coffee date. Your dating options are pretty ordinary right now.',
        nextSceneId: 'date_dud',
        conditions: [{ type: 'minTime', amount: 2 }, { type: 'minCash', amount: 18 }, { type: 'notHistory', id: 'went_on_dud_date' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -18 },
        ],
      },
      {
        id: 'wardrobe',
        label: 'Buy something nicer to wear',
        description: 'Spend $45 and 2 hours. It may help you feel less out of place at Juniper House, but it slows your apartment savings.',
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
        label: 'Go to Juniper House as Nia’s plus-one',
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
        description: 'Ava can get you in because you helped her. You will owe some of that access to the favor.',
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
        label: 'Take Calder Café’s catering shift at the opening',
        description: 'You got the job. Your first paid shift happens to be at Juniper House. You will get inside as staff and earn $65.',
        nextSceneId: 'event_arrival',
        conditions: [{ type: 'history', id: 'got_cafe_job' }],
        effects: [
          { type: 'cash', amount: 65 },
          { type: 'accessRoute', route: 'work' },
          { type: 'history', id: 'access_work' },
        ],
      },
    ],
  },

  event_arrival: {
    id: 'event_arrival',
    eyebrow: 'Juniper House Opening',
    title: 'A better room than usual',
    body: `Juniper House is crowded with local business owners, stylists, restaurateurs, people with family money, and people who are very good at looking like they have family money.

For now, this is enough. You are trying to learn how rooms like this work and whether you can become someone who gets invited back.`,
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
        body: `You spend the first hour carrying trays and solving small problems. It is your first paid shift in a while, and people also forget to lower their voices around staff.`,
      },
    ],
    choices: [
      {
        id: 'talk-mara',
        label: 'Introduce yourself to Mara',
        description: 'She runs a small design business and seems to know half the room.',
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
        description: 'She runs a local foundation and seems established enough that nobody is trying to impress her.',
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
    title: 'A small step forward',
    body: `The cuff turns up under a stack of event materials. The accusation was wrong, but the people who repeated it do not all look embarrassed.

Before you leave, Ava mentions another opening next month and says she can introduce you to the organizer. Nia points out that a week ago you were mostly thinking about applications, rent, and whether sleeping on her couch was becoming permanent.

Those problems are not solved. You have just added one useful thing to your life: a slightly better circle of people.`,
    variants: [
      {
        conditions: [{ type: 'history', id: 'got_cafe_job' }],
        body: `You also have a job now. It is not glamorous, but steady income changes what you can realistically do next.`,
      },
      {
        conditions: [{ type: 'history', id: 'rumor_questioned' }],
        body: `Mara remembers that you asked her directly instead of joining the pile-on. That is not friendship yet, but it is a decent start.`,
      },
      {
        conditions: [{ type: 'history', id: 'rumor_repeated' }],
        body: `You got pulled into the conversation faster by repeating the story, but Mara is colder with you now. Getting noticed and getting trusted are already different things.`,
      },
    ],
    choices: [
      {
        id: 'finish',
        label: 'Head back to Nia’s place',
        description: 'You still need savings and your own apartment. Now you also have another invitation to look forward to.',
        nextSceneId: 'ending',
        effects: [{ type: 'history', id: 'entered_better_social_circle' }],
      },
    ],
  },

  ending: {
    id: 'ending',
    eyebrow: 'Vertical slice complete',
    title: 'Still at the beginning',
    body: `You are still staying with Nia. Your savings are still thin. Depending on how you spent the week, you may have found work, gone on a terrible date, made a useful connection, or traded one kind of progress for another.

That is the climb for now: build enough stability that you can afford to keep saying yes when better opportunities appear.`,
    choices: [],
  },
};
