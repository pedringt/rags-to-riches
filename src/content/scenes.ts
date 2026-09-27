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
        id: 'cafe-first-shift',
        label: 'Work your first Calder Café shift',
        description: 'Spend 2 hours learning the job and earn $45. It is just a normal shift, not a social event.',
        nextSceneId: 'prep',
        conditions: [
          { type: 'minTime', amount: 2 },
          { type: 'history', id: 'got_cafe_job' },
          { type: 'notHistory', id: 'worked_cafe_once' },
        ],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: 45 },
          { type: 'history', id: 'worked_cafe_once', note: 'Completed a first ordinary shift at Calder Café.' },
        ],
      },
      {
        id: 'work-route',
        label: 'Take a Calder Café catering shift at Juniper House',
        description: 'After your first regular shift, the café offers you event work. Take it if you want the money and a staff-side way into Juniper House.',
        nextSceneId: 'event_arrival',
        conditions: [{ type: 'history', id: 'worked_cafe_once' }],
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
        nextSceneId: 'week2_start',
        effects: [
          { type: 'history', id: 'entered_better_social_circle' },
          { type: 'newWeek', time: 10 },
        ],
      },
    ],
  },

  week2_start: {
    id: 'week2_start',
    eyebrow: 'The next week',
    title: 'A little more to work with',
    body: `You wake up on Nia's couch with the same basic problems, but they feel slightly different now. You know more people. You may have a job. You have proof that saying yes to the right thing can actually change what comes next.

Nia sends you a listing for a tiny studio and says, "Just so you know what you're aiming at." Between the deposit, first month, and basic moving costs, you decide $600 is the first realistic move-out fund.

You have ten free hours this week. Work, savings, dating, Nia, and another better room are all competing for them.`,
    choices: [
      {
        id: 'week2-job-search',
        label: 'Apply for jobs',
        description: 'Spend 3 hours getting applications out. You still need a steady first job.',
        nextSceneId: 'week2_hub',
        conditions: [
          { type: 'minTime', amount: 3 },
          { type: 'notHistory', id: 'job_search_started' },
          { type: 'notHistory', id: 'got_cafe_job' },
        ],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'history', id: 'job_search_started' },
        ],
      },
      {
        id: 'week2-look-apartment',
        label: 'Look at apartments with Nia',
        description: 'Spend 2 hours seeing what $600 actually gets you into. No purchase yet, just a real target.',
        nextSceneId: 'week2_hub',
        conditions: [{ type: 'minTime', amount: 2 }, { type: 'notHistory', id: 'apartment_target_known' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'history', id: 'apartment_target_known', note: 'Set a first move-out fund target of $600.' },
        ],
      },
      {
        id: 'week2-nia',
        label: 'Buy groceries and cook for Nia',
        description: 'Spend 2 hours and $25 contributing to the home instead of treating the couch like free lodging.',
        nextSceneId: 'week2_hub',
        conditions: [{ type: 'minTime', amount: 2 }, { type: 'minCash', amount: 25 }, { type: 'notHistory', id: 'contributed_to_nia' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -25 },
          { type: 'relationship', characterId: 'nia', metric: 'affection', amount: 6 },
          { type: 'relationship', characterId: 'nia', metric: 'trust', amount: 8 },
          { type: 'history', id: 'contributed_to_nia' },
        ],
      },
      {
        id: 'week2-first-date',
        label: 'Try a dating-app date',
        description: 'Spend 2 hours and $22 meeting someone who seems normal enough to be worth one drink.',
        nextSceneId: 'week2_date',
        conditions: [
          { type: 'minTime', amount: 2 },
          { type: 'minCash', amount: 22 },
          { type: 'notHistory', id: 'went_on_dud_date' },
          { type: 'notHistory', id: 'went_on_week2_date' },
        ],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -22 },
        ],
      },
      {
        id: 'week2-another-date',
        label: 'Try another date',
        description: 'Spend 2 hours and $22 giving the apps another shot after last week’s dud.',
        nextSceneId: 'week2_date',
        conditions: [
          { type: 'minTime', amount: 2 },
          { type: 'minCash', amount: 22 },
          { type: 'history', id: 'went_on_dud_date' },
          { type: 'notHistory', id: 'went_on_week2_date' },
        ],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -22 },
        ],
      },
    ],
  },

  week2_date: {
    id: 'week2_date',
    eyebrow: 'Tuesday night',
    title: 'Perfectly fine is not the same as chemistry',
    body: `This one is not a disaster. He has a real job, asks you questions, and never mentions an ex.

You spend an hour talking easily and realize you are both waiting for the date to become interesting. It never quite does. When he says you should do this again sometime, both of you sound polite rather than excited.`,
    choices: [
      {
        id: 'week2-date-end',
        label: 'Call it a decent night and go home',
        description: 'No catastrophe, no shortcut, no spark. Dating can just be part of your life.',
        nextSceneId: 'week2_hub',
        effects: [{ type: 'history', id: 'went_on_week2_date', note: 'A perfectly decent date had no real chemistry.' }],
      },
    ],
  },

  week2_hub: {
    id: 'week2_hub',
    eyebrow: 'Week two',
    title: 'What moves you forward?',
    body: `The $600 move-out fund is now a real number instead of a vague someday goal. Every shift helps. Every social plan costs time. Every purchase is also money that is not going toward your own front door.

Ava mentions a benefit at the Bellweather Hotel this weekend. It is a step above Juniper House: established donors, local business owners, gallery people, and the sort of guests whose assistants answer invitations for them.`,
    choices: [
      {
        id: 'week2-interview-cafe',
        label: 'Interview at Calder Café',
        description: 'Spend 3 hours on the interview you opened up with last week’s applications.',
        nextSceneId: 'week2_hub',
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
        id: 'week2-work-cafe',
        label: 'Work a Calder Café shift',
        description: 'Spend 3 hours working and add $75 to the move-out fund.',
        nextSceneId: 'week2_hub',
        conditions: [
          { type: 'minTime', amount: 3 },
          { type: 'history', id: 'got_cafe_job' },
          { type: 'notHistory', id: 'worked_cafe_week2' },
        ],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'cash', amount: 75 },
          { type: 'history', id: 'worked_cafe_week2' },
        ],
      },
      {
        id: 'week2-better-job',
        label: 'Interview for guest services at Bellweather Hotel',
        description: 'Spend 3 hours chasing a better-paying job. Your café experience gets you the interview, but the schedule would be busier.',
        nextSceneId: 'week2_hub',
        conditions: [
          { type: 'minTime', amount: 3 },
          { type: 'history', id: 'got_cafe_job' },
          { type: 'notHistory', id: 'got_hotel_job' },
        ],
        effects: [
          { type: 'time', amount: -3 },
          { type: 'history', id: 'got_hotel_job', note: 'Hired for guest-services shifts at the Bellweather Hotel.' },
        ],
      },
      {
        id: 'week2-apartment',
        label: 'Look at apartments with Nia',
        description: 'Spend 2 hours seeing what the $600 move-out target needs to cover.',
        nextSceneId: 'week2_hub',
        conditions: [{ type: 'minTime', amount: 2 }, { type: 'notHistory', id: 'apartment_target_known' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'history', id: 'apartment_target_known', note: 'Set a first move-out fund target of $600.' },
        ],
      },
      {
        id: 'week2-nia-again',
        label: 'Buy groceries and cook for Nia',
        description: 'Spend 2 hours and $25 contributing at home. It is money not going into savings, but living together is a relationship too.',
        nextSceneId: 'week2_hub',
        conditions: [{ type: 'minTime', amount: 2 }, { type: 'minCash', amount: 25 }, { type: 'notHistory', id: 'contributed_to_nia' }],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -25 },
          { type: 'relationship', characterId: 'nia', metric: 'affection', amount: 6 },
          { type: 'relationship', characterId: 'nia', metric: 'trust', amount: 8 },
          { type: 'history', id: 'contributed_to_nia' },
        ],
      },
      {
        id: 'week2-first-date-hub',
        label: 'Try a dating-app date',
        description: 'Spend 2 hours and $22. You skipped dating last week, so this is your first try.',
        nextSceneId: 'week2_date',
        conditions: [
          { type: 'minTime', amount: 2 },
          { type: 'minCash', amount: 22 },
          { type: 'notHistory', id: 'went_on_dud_date' },
          { type: 'notHistory', id: 'went_on_week2_date' },
        ],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -22 },
        ],
      },
      {
        id: 'week2-another-date-hub',
        label: 'Try another date',
        description: 'Spend 2 hours and $22. This one looks more promising than last week’s dud.',
        nextSceneId: 'week2_date',
        conditions: [
          { type: 'minTime', amount: 2 },
          { type: 'minCash', amount: 22 },
          { type: 'history', id: 'went_on_dud_date' },
          { type: 'notHistory', id: 'went_on_week2_date' },
        ],
        effects: [
          { type: 'time', amount: -2 },
          { type: 'cash', amount: -22 },
        ],
      },
      {
        id: 'week2-ava-route',
        label: 'Take Ava’s invitation to the Bellweather benefit',
        description: 'Ava trusts you enough to bring you into a more established room.',
        nextSceneId: 'event2_arrival',
        conditions: [{ type: 'relationshipMin', characterId: 'ava', metric: 'socialValue', amount: 55 }],
        effects: [
          { type: 'accessRoute', route: 'favor' },
          { type: 'history', id: 'bellweather_access_ava' },
        ],
      },
      {
        id: 'week2-mara-route',
        label: 'Accept Mara’s invitation to the Bellweather benefit',
        description: 'Because you asked before repeating the cuff rumor, Mara is willing to put your name down as her guest.',
        nextSceneId: 'event2_arrival',
        conditions: [{ type: 'history', id: 'rumor_questioned' }],
        effects: [
          { type: 'accessRoute', route: 'friend' },
          { type: 'history', id: 'bellweather_access_mara' },
        ],
      },
      {
        id: 'week2-nia-route',
        label: 'Use Nia’s extra invitation',
        description: 'After you contribute at home, Nia offers the spare invitation she was going to give someone else.',
        nextSceneId: 'event2_arrival',
        conditions: [{ type: 'history', id: 'contributed_to_nia' }],
        effects: [
          { type: 'accessRoute', route: 'friend' },
          { type: 'history', id: 'bellweather_access_nia' },
        ],
      },
      {
        id: 'week2-work-route',
        label: 'Work the Bellweather benefit',
        description: 'Your new guest-services job puts you inside the event as staff. You earn $95, but you are working while everyone else socializes.',
        nextSceneId: 'event2_arrival',
        conditions: [{ type: 'history', id: 'got_hotel_job' }],
        effects: [
          { type: 'cash', amount: 95 },
          { type: 'accessRoute', route: 'work' },
          { type: 'history', id: 'bellweather_access_work' },
        ],
      },
    ],
  },

  event2_arrival: {
    id: 'event2_arrival',
    eyebrow: 'Bellweather Hotel Benefit',
    title: 'The room got better',
    body: `Juniper House felt like a lucky invitation. Bellweather feels like a place people expect to be invited to.

Nobody here is famous. That almost makes it more useful. These are the people who own things, fund things, hire people, introduce people, and decide which names keep appearing on guest lists.`,
    variants: [
      {
        conditions: [{ type: 'history', id: 'bellweather_access_work' }],
        body: `You are wearing a Bellweather name tag instead of carrying a drink. The tradeoff is obvious: you are earning money and meeting people, but every conversation can be interrupted by someone asking where the coat check is.`,
      },
      {
        conditions: [{ type: 'history', id: 'bellweather_access_ava' }],
        body: `Ava introduces you as someone who helped her when she was in a bind. It is a better introduction than simply being someone's plus-one.`,
      },
      {
        conditions: [{ type: 'history', id: 'bellweather_access_mara' }],
        body: `Mara makes a point of introducing you to two people before she disappears into the room. Trust bought you access this time.`,
      },
      {
        conditions: [{ type: 'history', id: 'bellweather_access_nia' }],
        body: `Nia is with you again, but this time you do not feel like you are hiding behind her invitation. You already recognize a few faces.`,
      },
    ],
    choices: [
      {
        id: 'event2-organizer',
        label: 'Talk to the event organizer',
        description: 'Ask about the benefit and the work behind it instead of trying to sound important.',
        nextSceneId: 'event2_finale',
        effects: [
          { type: 'reputation', amount: 2 },
          { type: 'history', id: 'met_bellweather_organizer' },
        ],
      },
      {
        id: 'event2-mara',
        label: 'Spend time with Mara',
        description: 'Strengthen a relationship that already affected whether you could get into this room.',
        nextSceneId: 'event2_finale',
        effects: [
          { type: 'relationship', characterId: 'mara', metric: 'affection', amount: 7 },
          { type: 'relationship', characterId: 'mara', metric: 'socialValue', amount: 8 },
          { type: 'history', id: 'deepened_mara_connection' },
        ],
      },
      {
        id: 'event2-circulate',
        label: 'Circulate and learn names',
        description: 'Do not attach yourself to one person. Spend the night building a wider map of the room.',
        nextSceneId: 'event2_finale',
        effects: [
          { type: 'relevance', amount: 1 },
          { type: 'history', id: 'circulated_bellweather' },
        ],
      },
    ],
  },

  event2_finale: {
    id: 'event2_finale',
    eyebrow: 'End of week two',
    title: 'Still ordinary. Less stuck.',
    body: `By the end of the night, the biggest change is not that anyone important suddenly knows your name. It is that this no longer feels like a world that only exists on the other side of a screen.

You still sleep at Nia's. Six hundred dollars is still a real obstacle. Work still takes time you could spend somewhere else. Dating is still mostly just dating.

But the choices are starting to connect. Work can lead to better work. Relationships can lead to rooms. Money can buy independence, or disappear into the life you are trying to build.`,
    variants: [
      {
        conditions: [{ type: 'history', id: 'got_hotel_job' }],
        body: `The Bellweather job is your first obvious career step up. It pays better and puts you around more connected people, but it is also going to ask for more of your schedule.`,
      },
      {
        conditions: [{ type: 'history', id: 'rumor_repeated' }],
        body: `Mara never forgot that you helped spread the cuff story. Moving up socially does not erase what people remember about how you got there.`,
      },
      {
        conditions: [{ type: 'history', id: 'apartment_target_known' }],
        body: `You also know exactly what moving out requires now. The $600 target is sitting there waiting for you to choose it over something else.`,
      },
    ],
    choices: [
      {
        id: 'finish-week2',
        label: 'Head home and look at what changed',
        description: 'Week two ends with more options, not a solved life.',
        nextSceneId: 'ending',
        effects: [{ type: 'history', id: 'completed_week2' }],
      },
    ],
  },

  ending: {
    id: 'ending',
    eyebrow: 'Week two complete',
    title: 'The climb is starting to connect',
    body: `You are still pre-show. That is intentional.

The question now is whether balancing work, savings, housing, dating, friendships, and better social opportunities is interesting enough to carry the game before cameras ever become part of your life.`,
    choices: [],
  },
};
