import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as THREE from 'three';

const NEEDS_DECAY_RATE = 0.5;
const DATE_READINESS_THRESHOLD = 70;
const MARRIAGE_THRESHOLD = 100;

const initialSimState = {
  hunger: 50, energy: 50, hygiene: 50, mood: 50, money: 100, day: 1, time: 8,
};

const initialApartment = {
  cleanliness: 60,
  objects: [
    { id: 'bed', name: 'Bed', position: [-3, 0, -3], action: 'sleep', icon: '🛏️', needsAffected: { energy: 30 }, timeCost: 6 },
    { id: 'fridge', name: 'Fridge', position: [3, 0, -3], action: 'eat', icon: '🍽️', needsAffected: { hunger: 25 }, timeCost: 1, moneyCost: 5 },
    { id: 'shower', name: 'Shower', position: [-3, 0, 3], action: 'shower', icon: '🚿', needsAffected: { hygiene: 40 }, timeCost: 1 },
    { id: 'tv', name: 'TV', position: [3, 0, 3], action: 'relax', icon: '📺', needsAffected: { mood: 20, energy: -5 }, timeCost: 2 },
    { id: 'mirror', name: 'Mirror', position: [0, 0, -3.5], action: 'primp', icon: '🪞', needsAffected: { mood: 10 }, timeCost: 1 },
    { id: 'broom', name: 'Cleaning', position: [4, 0, 0], action: 'clean', icon: '🧹', needsAffected: {}, timeCost: 2, cleanBonus: 20 },
    { id: 'laptop', name: 'Work', position: [-4, 0, 0], action: 'work', icon: '💼', needsAffected: { energy: -15, mood: -10 }, timeCost: 4, moneyGain: 50 },
  ],
};

const datingProfiles = [
  { id: 1, name: 'Brad Sterling', age: 35, wealth: 'Millionaire', emoji: '👨‍💼', requiredStatus: 30, compatibility: 75, bio: 'Tech entrepreneur. Loves yachts.' },
  { id: 2, name: 'Marcus Van Der Berg', age: 42, wealth: 'Old Money', emoji: '🎩', requiredStatus: 50, compatibility: 60, bio: 'Third generation wealth.' },
  { id: 3, name: 'Jayden Rockwell', age: 29, wealth: 'Crypto Rich', emoji: '😎', requiredStatus: 20, compatibility: 85, bio: 'Made it big in crypto.' },
  { id: 4, name: 'Theodore Ashworth III', age: 55, wealth: 'Billionaire', emoji: '🧐', requiredStatus: 80, compatibility: 40, bio: 'Media mogul.' },
];

const storyScript = {
  'start': {
    chapter: 'Chapter One',
    title: 'The Vanderpump Gala',
    location: 'Vanderpump Manor Ballroom',
    mood: 'gala',
    text: `The chandeliers of Vanderpump Manor cast prismatic light across three hundred of society's most important faces. You smooth the silk of your gown—a daring choice, borrowed confidence for a woman still learning the rules of this world.

Your husband squeezes your hand. "You belong here," he whispers, though you both know the other women don't agree. Not yet.

Victoria Vanderpump holds court by the grand staircase. Beside her stands Richard Ashford—tech billionaire, philanthropist, and according to whispered rumors, the man who knows where all the bodies are buried.

Then, at precisely 11:47 PM, the lights flicker. When they return, Richard Ashford lies crumpled at the foot of the staircase. His eyes stare at nothing. A single red rose rests on his chest.

Someone screams. You realize it might have been you.`,
    choices: [
      { text: 'Rush to check his pulse', next: 'check_body', consequence: 'Your quick action will be noted—as either compassion or suspicious proximity.', effect: { status: 5, clue: 'body_examined' } },
      { text: 'Watch the other women\'s reactions', next: 'observe', consequence: 'Staying back lets you observe who looks guilty—and who looks relieved.', effect: { status: 10, clue: 'reactions_noted' } },
      { text: 'Look for your husband in the crowd', next: 'find_husband', consequence: 'Seeking safety is natural—but where was he when the lights went out?', effect: { clue: 'husband_alibi' } }
    ]
  },

  'check_body': {
    title: 'First on Scene',
    location: 'The Crime Scene',
    mood: 'danger',
    text: `You push through the frozen crowd. Kneeling beside Richard, you press two fingers to his neck. Nothing.

But something else catches your eye. A folded paper, barely visible beneath his jacket. Your fingers brush against it—

"Don't touch anything!" Victoria's voice cuts like a knife. She's descending the staircase, her face a mask of practiced grief. "The police will want everything preserved."

Her eyes meet yours. In them, you see something that doesn't match her trembling lip: calculation.

Detective Morrison arrives within the hour. He interviews everyone, but his gaze keeps returning to you.

"You were the first to reach him," he says. It's not a question.`,
    choices: [
      { text: '"Someone had to help him. No one else moved."', next: 'defensive', consequence: 'Defending yourself plants seeds of doubt.', effect: { status: -5 } },
      { text: '"I saw something under his jacket. A note, perhaps."', next: 'helpful', consequence: 'Sharing information builds trust with the detective.', effect: { status: 15, clue: 'note_mentioned' } },
      { text: '"Victoria seemed eager to stop me from examining him."', next: 'deflect', consequence: 'Redirecting suspicion toward Victoria is dangerous—but effective.', effect: { status: 10, clue: 'victoria_suspicious' } }
    ]
  },

  'observe': {
    title: 'The Watcher',
    location: 'The Gala',
    mood: 'gala',
    text: `You step back and watch.

Charlize Montgomery's hand flies to her pearls—but her eyes are dry. She and Richard had been seen arguing at the club last week.

Bianca Del Rio-Smith pushes toward the body, then stops abruptly. Her face cycles through emotions too quickly to read.

Penelope Worthington simply... smiles. It's gone in an instant, replaced by appropriate horror, but you saw it.

And Victoria. Victoria stands on the staircase like a queen surveying fallen soldiers. Her grief is immaculate. Too immaculate.

When Detective Morrison arrives, several people point to you—the newcomer, lingering at the edges, watching everyone.

"Interesting position you chose," he observes.`,
    choices: [
      { text: '"I\'m new to this world. Watching is how I learn."', next: 'humble', consequence: 'Humility disarms suspicion—and makes people underestimate you.', effect: { status: 5 } },
      { text: 'Share what you observed about the other women.', next: 'informant', consequence: 'Becoming the detective\'s informant grants power—and makes enemies.', effect: { status: 20, clue: 'observations_shared' } },
      { text: '"I saw Penelope smile when the body was discovered."', next: 'accuse_penelope', consequence: 'A direct accusation could expose the truth—or make you a target.', effect: { status: 15, clue: 'penelope_accused' } }
    ]
  },

  'find_husband': {
    title: 'Missing Pieces',
    location: 'The Night',
    mood: 'dark',
    text: `You scan the crowd desperately. There—by the French doors. Your husband stands with two men you don't recognize, his face pale.

When your eyes meet, something passes across his features. Fear? Warning?

He crosses to you quickly, taking your arm. "We should go," he murmurs.

"Someone just died. We can't just—"

"We need to go. Now." His grip tightens.

It's only when you're home that you notice: his cufflink is missing. The distinctive gold one. The one you've never seen him without.

The news the next morning confirms your worst fear: a gold cufflink was found clutched in Richard Ashford's hand.`,
    choices: [
      { text: 'Confront your husband immediately.', next: 'confront_husband', consequence: 'Demanding truth could save you both—or tear your new life apart.', effect: { clue: 'husband_confronted' } },
      { text: 'Say nothing and begin your own investigation.', next: 'secret_investigation', consequence: 'Protecting him blindly makes you complicit—but knowledge is power.', effect: { clue: 'independent_investigation', status: 10 } },
      { text: 'Go to Victoria and ask what she knows.', next: 'approach_victoria', consequence: 'Seeking Victoria\'s counsel is bold—she rewards boldness, or destroys it.', effect: { clue: 'victoria_intel' } }
    ]
  },

  'helpful': {
    chapter: 'Chapter Two',
    title: 'The Investigation',
    location: 'Police Station',
    mood: 'neutral',
    text: `Detective Morrison's eyes sharpen. "A note? Tell me more."

"I only glimpsed it," you say carefully. "Paper, folded, tucked inside his jacket. Victoria stopped me before I could see more."

The next morning, you receive two visitors.

First: Detective Morrison, who informs you the note contained a single line: "I know what you did at the Worthington Estate."

Second: Penelope Worthington herself, in a cloud of Chanel No. 5 and barely concealed panic.

"I need to know," she says, gripping your hands, "exactly what you told the police."

Her eyes are wild. This is not the composed socialite from the party. This is a woman cornered.`,
    choices: [
      { text: '"Only what I saw. What happened at your estate?"', next: 'penelope_confession', consequence: 'Pressing Penelope could reveal the truth.', effect: { status: 20, clue: 'worthington_secret' } },
      { text: '"I told him everything. Get a lawyer."', next: 'penelope_panic', consequence: 'Scaring her might make her desperate.', effect: { status: 15 } },
      { text: '"I protected you. But loyalty has a price."', next: 'penelope_alliance', consequence: 'Leveraging her fear creates a powerful alliance.', effect: { status: 25, clue: 'penelope_debt' } }
    ]
  },

  'deflect': {
    chapter: 'Chapter Two',
    title: 'Dangerous Games',
    location: 'Le Cirque Private Room',
    mood: 'romantic',
    text: `Word travels fast in high society. By the next evening, everyone knows you've cast suspicion on the queen herself.

Victoria sends a card, hand-delivered: "Brave girl. Let's have lunch."

It's not a request.

Her private dining room at Le Cirque is intimate. The kind of room where secrets are traded like currency.

"You accused me of murder," she says conversationally. "In front of a police detective. That took either courage or stupidity."

"Then what am I?"

"Hungry." She smiles. "I recognize it. I was hungry once too."

She slides a folder across the table. Inside: photographs. Richard meeting with various women. Dates, times, locations.

"Richard was a collector of secrets. He had something on everyone. Including—" she taps a photo of your husband "—people you care about."`,
    choices: [
      { text: '"What did he have on my husband?"', next: 'husband_secret', consequence: 'Learning the truth could save or damn you both.', effect: { clue: 'husband_secret_revealed', status: 20 } },
      { text: '"What did he have on you?"', next: 'victoria_secret', consequence: 'Demanding Victoria\'s secret shifts the power.', effect: { clue: 'victoria_secret', status: 30 } },
      { text: '"Who benefits most from his death?"', next: 'follow_money', consequence: 'Following the money—Victoria respects the approach.', effect: { clue: 'beneficiaries', status: 25 } }
    ]
  },

  'humble': {
    chapter: 'Chapter Two',
    title: 'The Outsider\'s Advantage',
    location: 'Police Station',
    mood: 'neutral',
    text: `"I'm new to this world," you say. "Watching is how I learn."

Something shifts in Detective Morrison's expression. Respect, perhaps.

"You're observant and honest about it. That's rare in this crowd."

He hands you a card. "If you notice anything else—call me directly."

Victoria intercepts you in the hallway. "The detective seemed to like you. How unusual."`,
    choices: [
      { text: '"He appreciated my honesty. You should try it."', next: 'challenge_victoria', consequence: 'Challenging Victoria directly is bold.', effect: { status: 20 } },
      { text: '"I told him I\'m just trying to learn."', next: 'play_innocent', consequence: 'Playing innocent keeps you underestimated.', effect: { status: 5 } },
      { text: '"He asked about you, actually."', next: 'imply_suspicion', consequence: 'Implying Victoria is a suspect puts you in a dangerous game.', effect: { clue: 'victoria_worried', status: 15 } }
    ]
  },

  'informant': {
    chapter: 'Chapter Two',
    title: 'The Informant',
    location: 'Charity Luncheon',
    mood: 'social',
    text: `You tell the detective everything. Charlize's dry eyes. Bianca's hesitation. Penelope's smile. Victoria's performance.

Three days later, the society pages run a story: someone is feeding information to the police.

At the next charity luncheon, conversations stop when you enter.

Only Bianca approaches you, her expression unreadable.

"So you're the spy," she says, loud enough for nearby tables to hear. "I respect that, actually. Takes guts." She raises her glass. "To guts. They'll get you killed in this town, but at least you'll die interesting."`,
    choices: [
      { text: '"I\'m not a spy. I\'m a witness."', next: 'deny_spy', consequence: 'Denying it makes you look weak.', effect: { status: -10 } },
      { text: '"A spy works for someone else. I work for myself."', next: 'own_it', consequence: 'Owning your power publicly is bold.', effect: { status: 30 } },
      { text: '"Let me buy you a drink."', next: 'bianca_alliance', consequence: 'Bianca respects audacity.', effect: { status: 20, clue: 'bianca_ally' } }
    ]
  },

  'penelope_confession': {
    chapter: 'Chapter Three',
    title: 'The Truth Beneath',
    location: 'Your Parlor',
    mood: 'intimate',
    text: `Penelope's composure cracks. She sinks onto your settee.

"The Worthington Estate," she whispers. "Three years ago. There was an accident."

"What kind of accident?"

"The kind where someone falls from a balcony during an argument. The kind where money makes problems disappear." Her laugh is bitter. "Richard was there. He saw everything. He's been bleeding me dry ever since."

"Did you—"

"No! I wanted to. But I didn't." She grabs your hands. "Someone else killed him. Someone who knew about the blackmail. Help me find out who. And in return..." She straightens. "I'll make sure you become one of us. Really one of us."`,
    choices: [
      { text: 'Agree to help her investigate.', next: 'investigate_together', consequence: 'Allying with a suspect is risky—but her resources are invaluable.', effect: { status: 30, clue: 'penelope_alliance' } },
      { text: 'Tell her you\'ll think about it—then go to Victoria.', next: 'double_agent', consequence: 'Playing both sides is dangerous—but powerful.', effect: { clue: 'double_agent', status: 25 } },
      { text: 'Report everything to Detective Morrison.', next: 'betray_penelope', consequence: 'Betraying Penelope makes you a pariah.', effect: { status: 10 } }
    ]
  },

  'husband_secret': {
    chapter: 'Chapter Three',
    title: 'The Price of Love',
    location: 'Victoria\'s Dining Room',
    mood: 'romantic',
    text: `Victoria's expression softens—genuine sympathy, or its perfect imitation.

"Your husband's first wife. The one who died in the car accident, five years before he met you."

"What about her?"

"It wasn't an accident. At least, that's what Richard believed. He had evidence that your husband tampered with the brakes."

The room tilts. You grip the edge of the table.

"I don't believe you."

"You don't have to. But ask yourself: why was your husband so desperate to leave the party that night? Why did his cufflink end up in a dead man's hand?"

That night, you lie awake beside your sleeping husband. The man you thought you knew. The man who might be a murderer.

Or the man being framed by one.`,
    choices: [
      { text: 'Search your husband\'s office while he sleeps.', next: 'search_office', consequence: 'Searching could reveal the truth—or destroy your marriage.', effect: { clue: 'office_searched', status: 15 } },
      { text: 'Wake him and demand the truth.', next: 'demand_truth', consequence: 'Confrontation is honest—but frightening.', effect: { clue: 'husband_confession' } },
      { text: 'Investigate the first wife\'s death independently.', next: 'investigate_wife', consequence: 'Independent investigation preserves your options.', effect: { clue: 'first_wife_investigation', status: 25 } }
    ]
  },

  'investigate_together': {
    chapter: 'Chapter Four',
    title: 'Unlikely Partners',
    location: 'Richard\'s Hidden Office',
    mood: 'dark',
    text: `You and Penelope become an unlikely team. Her money opens doors; your outsider's perspective sees what she's learned to ignore.

Together, you piece together Richard's web of blackmail. It's staggering. Half the names in the social register, entangled in secrets ranging from tax fraud to affairs to worse.

Then you find it. A folder labeled simply: V.V.

Victoria Vanderpump.

Inside: evidence of a fraud scheme spanning decades. If this went public, Victoria wouldn't just lose her crown—she'd lose her freedom.

"My God," Penelope breathes. "She had the most to lose."

But something bothers you. The folder is too neat. Too convenient. Almost as if it was meant to be found.`,
    choices: [
      { text: 'Take the evidence to Detective Morrison.', next: 'evidence_to_police', consequence: 'This could solve the case—or trigger something worse.', effect: { clue: 'evidence_presented', status: 30 } },
      { text: 'Confront Victoria directly with the evidence.', next: 'confront_victoria', consequence: 'Direct confrontation is dangerous—but Victoria might bargain.', effect: { status: 35 } },
      { text: 'Keep investigating—this feels like a setup.', next: 'suspect_setup', consequence: 'Trusting your instincts could reveal the true killer.', effect: { clue: 'setup_suspected', status: 20 } }
    ]
  },

  'suspect_setup': {
    chapter: 'Chapter Five',
    title: 'The Real Killer',
    location: 'Late Night Discovery',
    mood: 'danger',
    text: `You dig deeper. Who had access to Richard's files? Who could have planted the evidence against Victoria?

The answer comes at 3 AM, piecing together security footage.

A figure entering Richard's office the night before the party. Planting the folder. Removing other files.

The figure turns toward the camera, and your blood freezes.

It's you.

No—not you. But someone wearing your distinctive coat.

"Someone's framing you," Penelope whispers. "Setting you up to take the fall."

Then you remember: your husband's cufflink in Richard's hand. Victoria's information about his first wife. The way everyone's been watching you since the moment you arrived.

You were never meant to solve this mystery. You were meant to be consumed by it.

Unless you flip the board entirely.`,
    choices: [
      { text: 'Call an emergency gathering of all the housewives.', next: 'finale_gathering', consequence: 'Forcing everyone into one room could expose the truth.', effect: { status: 40 } },
      { text: 'Go to the police with everything.', next: 'finale_confession', consequence: 'Complete honesty might save you—at the cost of everything else.', effect: { status: 30 } },
      { text: 'Disappear. Take the evidence and vanish.', next: 'finale_vanish', consequence: 'Running suggests guilt—but survival matters more.', effect: { status: -50 } }
    ]
  },

  'finale_gathering': {
    chapter: 'The Final Chapter',
    title: 'The Reckoning',
    location: 'Vanderpump Manor Salon',
    mood: 'gala',
    text: `You send the invitations yourself: "I know who killed Richard Ashford. Vanderpump Manor. 8 PM. Come alone."

They all come. In this world, secrets are the only currency that matters.

Victoria's grand salon becomes a courtroom. You stand before them—the women who dismissed you, underestimated you, tried to destroy you.

"One of us killed Richard Ashford," you begin. "But all of us are guilty of something."

You lay it out. Penelope's manslaughter. Victoria's fraud. Charlize's theft. Bianca's fabricated identity.

"Richard knew everything. He was bleeding all of you dry. So which of you finally decided to make it stop?"

Victoria laughs—cold, brittle.

"Clever girl. But you've missed one thing. The person who benefits most from Richard's death isn't anyone in this room."

She's looking at the door. Where your husband stands.`,
    choices: [
      { text: '"My husband didn\'t kill Richard. Someone is framing him."', next: 'ending_loyal_wife', consequence: 'Defending your husband to the end.', effect: { ending: 'loyal' } },
      { text: '"You\'re right. I should have seen it sooner."', next: 'ending_truth_seeker', consequence: 'Choosing truth over loyalty.', effect: { ending: 'truth' } },
      { text: '"Actually, Victoria, I found your insurance policy."', next: 'ending_queen', consequence: 'Play the final card no one expected.', effect: { ending: 'queen' } }
    ]
  },

  'ending_loyal_wife': {
    chapter: 'Epilogue',
    title: 'The Loyal Wife',
    location: 'A New Dawn',
    mood: 'romantic',
    text: `You stand by your husband through the trial. The evidence is circumstantial—the cufflink could have been planted, the footage was doctored.

He's acquitted. Barely.

The truth, you learn later, is more complicated than anyone knew. Richard's death was a conspiracy—multiple parties, multiple motives, overlapping plans.

Your husband may or may not have been involved. You never ask.

But your loyalty is noted. Victoria invites you to brunch. The other women make room at the table.

You've earned your place. Whether you want it anymore is another question entirely.`,
    choices: [],
    isEnding: true,
    statusChange: 75
  },

  'ending_truth_seeker': {
    chapter: 'Epilogue',
    title: 'The Truth Seeker',
    location: 'The Courthouse Steps',
    mood: 'neutral',
    text: `"Tell them," you say to your husband. "Tell them everything, or I will."

The room holds its breath.

"Richard was blackmailing me," he says quietly. "About my first wife. It wasn't murder—it was negligence. I knew the brakes were failing and didn't fix them in time."

"Then who killed Richard?"

"I did."

Everyone turns. Bianca stands in the corner, a small pistol in her hand.

"Richard was going to expose me. Everything I've built—twenty years of reinvention—gone."

The police arrive before she can shoot. The divorce is finalized six months later.

The truth cost you your marriage, but you can sleep at night.`,
    choices: [],
    isEnding: true,
    statusChange: 100
  },

  'ending_queen': {
    chapter: 'Epilogue',
    title: 'The New Queen',
    location: 'The Throne Room',
    mood: 'gala',
    text: `You reach into your clutch and produce a flash drive.

"This contains Richard's full archive. Every secret. I've had it since the night of the party." You pause. "I took it from his body before anyone else arrived."

The room erupts.

You wait for silence.

"Richard was a monster. He hurt all of you for years. So I made sure he stopped. Now I have everything he had."

Victoria recovers first. "What kind of understanding?"

"The kind where I become one of you. Really one of you. And in exchange, this drive stays locked in my safe."

A long pause. Then Victoria smiles—genuine respect.

"Ladies, I believe we have a new member."`,
    choices: [],
    isEnding: true,
    statusChange: 150
  },

  'finale_vanish': {
    chapter: 'Epilogue',
    title: 'The Ghost',
    location: 'Somewhere Warm',
    mood: 'escape',
    text: `You pack a single bag. Cash, passport, the evidence drive.

By morning, you're on a plane to somewhere warm. By next week, you're someone else entirely.

The news reaches you eventually. Victoria arrested. Penelope exposed. Your husband questioned, released, divorced in absentia.

You're suspected of the murder, of course. The woman who disappeared with all the secrets.

But you're free. Free of the lies, the games, the endless performance.

Some nights, you wonder if you did the right thing. Most nights, you don't wonder at all.`,
    choices: [],
    isEnding: true,
    statusChange: -50
  },

  // Connectors
  'defensive': { title: 'Continue', text: 'The investigation continues...', mood: 'neutral', choices: [{ text: 'Continue', next: 'helpful', effect: { status: 5 } }] },
  'penelope_panic': { title: 'Continue', text: 'Penelope flees in panic...', mood: 'neutral', choices: [{ text: 'Continue', next: 'investigate_together', effect: { status: 5 } }] },
  'penelope_alliance': { title: 'Continue', text: 'You form an alliance...', mood: 'neutral', choices: [{ text: 'Continue', next: 'investigate_together', effect: { status: 5 } }] },
  'accuse_penelope': { title: 'Continue', text: 'Penelope is questioned...', mood: 'neutral', choices: [{ text: 'Continue', next: 'penelope_confession', effect: { status: 5 } }] },
  'confront_husband': { title: 'Continue', text: 'Your husband\'s face crumbles...', mood: 'dark', choices: [{ text: 'Continue', next: 'husband_secret', effect: { status: 5 } }] },
  'secret_investigation': { title: 'Continue', text: 'You begin investigating...', mood: 'dark', choices: [{ text: 'Continue', next: 'investigate_together', effect: { status: 5 } }] },
  'approach_victoria': { title: 'Continue', text: 'Victoria agrees to meet...', mood: 'romantic', choices: [{ text: 'Continue', next: 'deflect', effect: { status: 5 } }] },
  'victoria_secret': { title: 'Continue', text: 'Victoria reveals a dark truth...', mood: 'dark', choices: [{ text: 'Continue', next: 'investigate_together', effect: { status: 5 } }] },
  'follow_money': { title: 'Continue', text: 'You follow the money...', mood: 'neutral', choices: [{ text: 'Continue', next: 'investigate_together', effect: { status: 5 } }] },
  'challenge_victoria': { title: 'Continue', text: 'Victoria accepts your challenge...', mood: 'danger', choices: [{ text: 'Continue', next: 'deflect', effect: { status: 5 } }] },
  'play_innocent': { title: 'Continue', text: 'Your innocent act works...', mood: 'neutral', choices: [{ text: 'Continue', next: 'helpful', effect: { status: 5 } }] },
  'imply_suspicion': { title: 'Continue', text: 'Victoria narrows her eyes...', mood: 'danger', choices: [{ text: 'Continue', next: 'deflect', effect: { status: 5 } }] },
  'deny_spy': { title: 'Continue', text: 'Your denial falls flat...', mood: 'neutral', choices: [{ text: 'Continue', next: 'investigate_together', effect: { status: 5 } }] },
  'own_it': { title: 'Continue', text: 'You own your power...', mood: 'gala', choices: [{ text: 'Continue', next: 'investigate_together', effect: { status: 5 } }] },
  'bianca_alliance': { title: 'Continue', text: 'Bianca becomes an ally...', mood: 'social', choices: [{ text: 'Continue', next: 'investigate_together', effect: { status: 5 } }] },
  'double_agent': { title: 'Continue', text: 'You play both sides...', mood: 'dark', choices: [{ text: 'Continue', next: 'suspect_setup', effect: { status: 5 } }] },
  'betray_penelope': { title: 'Continue', text: 'The police take your statement...', mood: 'neutral', choices: [{ text: 'Continue', next: 'suspect_setup', effect: { status: 5 } }] },
  'search_office': { title: 'Continue', text: 'You find disturbing evidence...', mood: 'dark', choices: [{ text: 'Continue', next: 'suspect_setup', effect: { status: 5 } }] },
  'demand_truth': { title: 'Continue', text: 'Your husband confesses...', mood: 'intimate', choices: [{ text: 'Continue', next: 'suspect_setup', effect: { status: 5 } }] },
  'investigate_wife': { title: 'Continue', text: 'Dark secrets emerge...', mood: 'dark', choices: [{ text: 'Continue', next: 'suspect_setup', effect: { status: 5 } }] },
  'evidence_to_police': { title: 'Continue', text: 'Morrison examines evidence...', mood: 'neutral', choices: [{ text: 'Continue', next: 'finale_gathering', effect: { status: 5 } }] },
  'confront_victoria': { title: 'Continue', text: 'Victoria makes a counter-offer...', mood: 'danger', choices: [{ text: 'Continue', next: 'finale_gathering', effect: { status: 5 } }] },
  'finale_confession': { title: 'Redirect', text: 'The truth comes out...', mood: 'neutral', choices: [{ text: 'Continue', next: 'ending_truth_seeker', effect: { status: 5 } }] },
};

// Components
const StatBar = ({ label, value, color, icon }) => (
  <div className="mb-2">
    <div className="flex justify-between text-xs mb-1">
      <span>{icon} {label}</span>
      <span>{Math.round(value)}%</span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }} />
    </div>
  </div>
);

// 3D Scene
const Apartment3D = ({ objects, characterPos, timeOfDay }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const characterRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const isNight = timeOfDay >= 20 || timeOfDay < 6;
    const isEvening = timeOfDay >= 17 && timeOfDay < 20;
    scene.background = new THREE.Color(isNight ? 0x0a0a15 : isEvening ? 0x2d1f3d : 0x87CEEB);

    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.OrthographicCamera(-7 * aspect, 7 * aspect, 7, -7, 0.1, 1000);
    camera.position.set(12, 12, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    scene.add(new THREE.AmbientLight(isNight ? 0x404080 : 0xffffff, isNight ? 0.3 : 0.5));
    
    const sunLight = new THREE.DirectionalLight(isNight ? 0x6666aa : isEvening ? 0xffaa66 : 0xffffff, isNight ? 0.3 : 0.8);
    sunLight.position.set(5, 15, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const warmLight = new THREE.PointLight(0xffaa55, isNight ? 1.2 : 0.4, 15);
    warmLight.position.set(0, 3, 0);
    scene.add(warmLight);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Floor planks
    for (let i = -4; i <= 4; i++) {
      const plank = new THREE.Mesh(
        new THREE.PlaneGeometry(0.03, 10),
        new THREE.MeshBasicMaterial({ color: 0x5D4037 })
      );
      plank.rotation.x = -Math.PI / 2;
      plank.position.set(i, 0.001, 0);
      scene.add(plank);
    }

    // Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xF5F0E6 });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(10.4, 4, 0.2), wallMat);
    backWall.position.set(0, 2, -5.1);
    backWall.receiveShadow = true;
    scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4, 10.4), wallMat);
    leftWall.position.set(-5.1, 2, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Window
    const windowFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.8, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x4A3728 })
    );
    windowFrame.position.set(0, 2.5, -4.95);
    scene.add(windowFrame);

    const windowGlass = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1.5, 0.05),
      new THREE.MeshStandardMaterial({
        color: isNight ? 0x1a1a3a : 0x87CEEB,
        transparent: true,
        opacity: 0.6,
        emissive: isNight ? 0x1a1a3a : 0x87CEEB,
        emissiveIntensity: 0.3
      })
    );
    windowGlass.position.set(0, 2.5, -4.9);
    scene.add(windowGlass);

    // Ceiling light
    const shade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.5, 0.4, 16),
      new THREE.MeshStandardMaterial({ color: 0xFFE4B5, emissive: 0xFFE4B5, emissiveIntensity: isNight ? 0.8 : 0.2 })
    );
    shade.position.set(0, 3.2, 0);
    scene.add(shade);

    // Character
    const charGroup = new THREE.Group();
    
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.35, 0.7, 12),
      new THREE.MeshStandardMaterial({ color: 0xFF69B4 })
    );
    body.position.y = 0.75;
    body.castShadow = true;
    charGroup.add(body);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xFFDBB4 })
    );
    head.position.y = 1.4;
    head.castShadow = true;
    charGroup.add(head);

    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x2a1810 })
    );
    hair.position.y = 1.45;
    charGroup.add(hair);

    scene.add(charGroup);
    characterRef.current = charGroup;

    // Furniture
    objects.forEach(obj => {
      const group = new THREE.Group();

      if (obj.id === 'bed') {
        const frame = new THREE.Mesh(new THREE.BoxGeometry(2, 0.35, 2.4), new THREE.MeshStandardMaterial({ color: 0x5D4037 }));
        frame.position.y = 0.175;
        frame.castShadow = true;
        group.add(frame);
        
        const headboard = new THREE.Mesh(new THREE.BoxGeometry(2, 0.8, 0.1), new THREE.MeshStandardMaterial({ color: 0x5D4037 }));
        headboard.position.set(0, 0.6, -1.15);
        group.add(headboard);
        
        const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.25, 2.1), new THREE.MeshStandardMaterial({ color: 0xFFF5EE }));
        mattress.position.y = 0.45;
        group.add(mattress);
        
        const blanket = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 1.5), new THREE.MeshStandardMaterial({ color: 0xFFB6C1 }));
        blanket.position.set(0, 0.58, 0.25);
        group.add(blanket);
      }
      else if (obj.id === 'fridge') {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.1, 0.75), new THREE.MeshStandardMaterial({ color: 0xE8E8E8, metalness: 0.3 }));
        body.position.y = 1.05;
        body.castShadow = true;
        group.add(body);
        
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.4, 0.04), new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5 }));
        handle.position.set(0.38, 1.2, 0.4);
        group.add(handle);
      }
      else if (obj.id === 'shower') {
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.08, 24), new THREE.MeshStandardMaterial({ color: 0xF5F5F5 }));
        base.position.y = 0.04;
        group.add(base);
        
        const glassMat = new THREE.MeshStandardMaterial({ color: 0xADD8E6, transparent: true, opacity: 0.3 });
        const wall1 = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), glassMat);
        wall1.position.set(0, 1.1, -0.65);
        group.add(wall1);
        
        const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.8, 8), new THREE.MeshStandardMaterial({ color: 0xC0C0C0, metalness: 0.7 }));
        pipe.position.set(-0.5, 1.1, -0.5);
        group.add(pipe);
      }
      else if (obj.id === 'tv') {
        const stand = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 0.5), new THREE.MeshStandardMaterial({ color: 0x3E2723 }));
        stand.position.y = 0.225;
        stand.castShadow = true;
        group.add(stand);
        
        const tv = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 0.08), new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
        tv.position.set(0, 0.95, 0);
        group.add(tv);
        
        const screen = new THREE.Mesh(
          new THREE.BoxGeometry(1.35, 0.78, 0.01),
          new THREE.MeshStandardMaterial({ color: 0x2a4a6a, emissive: 0x2a4a6a, emissiveIntensity: isNight ? 0.5 : 0.2 })
        );
        screen.position.set(0, 0.95, 0.05);
        group.add(screen);
      }
      else if (obj.id === 'mirror') {
        const table = new THREE.Mesh(new THREE.BoxGeometry(1, 0.8, 0.5), new THREE.MeshStandardMaterial({ color: 0xF5F0E8 }));
        table.position.y = 0.4;
        table.castShadow = true;
        group.add(table);
        
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.1, 0.08), new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.5 }));
        frame.position.set(0, 1.35, 0);
        group.add(frame);
        
        const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.95, 0.02), new THREE.MeshStandardMaterial({ color: 0xE8E8E8, metalness: 0.9, roughness: 0.1 }));
        mirror.position.set(0, 1.35, 0.05);
        group.add(mirror);
        
        const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 16), new THREE.MeshStandardMaterial({ color: 0xFFB6C1 }));
        stool.position.set(0, 0.45, 0.6);
        group.add(stool);
      }
      else if (obj.id === 'broom') {
        const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.35, 12), new THREE.MeshStandardMaterial({ color: 0x2196F3 }));
        bucket.position.y = 0.175;
        bucket.castShadow = true;
        group.add(bucket);
        
        const mopStick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
        mopStick.position.set(0.3, 0.7, 0);
        mopStick.rotation.z = 0.15;
        group.add(mopStick);
      }
      else if (obj.id === 'laptop') {
        const desk = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.75), new THREE.MeshStandardMaterial({ color: 0x5D4037 }));
        desk.position.y = 0.77;
        desk.castShadow = true;
        group.add(desk);
        
        const legs = [[-0.6, 0.37, 0.3], [0.6, 0.37, 0.3], [-0.6, 0.37, -0.3], [0.6, 0.37, -0.3]];
        legs.forEach(pos => {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.74, 0.06), new THREE.MeshStandardMaterial({ color: 0x5D4037 }));
          leg.position.set(pos[0], pos[1], pos[2]);
          group.add(leg);
        });
        
        const chair = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.45), new THREE.MeshStandardMaterial({ color: 0x2a2a2a }));
        chair.position.set(0, 0.48, 0.75);
        group.add(chair);
        
        const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.28), new THREE.MeshStandardMaterial({ color: 0x4a4a4a }));
        laptopBase.position.set(0, 0.81, 0);
        group.add(laptopBase);
        
        const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.26, 0.015), new THREE.MeshStandardMaterial({ color: 0x4a4a4a }));
        laptopScreen.position.set(0, 0.95, -0.13);
        laptopScreen.rotation.x = -0.25;
        group.add(laptopScreen);
        
        const display = new THREE.Mesh(
          new THREE.BoxGeometry(0.36, 0.22, 0.005),
          new THREE.MeshStandardMaterial({ color: 0x1a3a1a, emissive: 0x1a3a1a, emissiveIntensity: isNight ? 0.6 : 0.3 })
        );
        display.position.set(0, 0.95, -0.12);
        display.rotation.x = -0.25;
        group.add(display);
      }

      group.position.set(obj.position[0], obj.position[1], obj.position[2]);
      scene.add(group);
    });

    // Rug
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(3, 2), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
    rug.rotation.x = -Math.PI / 2;
    rug.position.y = 0.01;
    scene.add(rug);

    // Plant
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.3, 12), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
    pot.position.set(4.2, 0.15, -4.2);
    scene.add(pot);
    const plant = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), new THREE.MeshStandardMaterial({ color: 0x228B22 }));
    plant.position.set(4.2, 0.55, -4.2);
    scene.add(plant);

    // Animation
    let animId;
    let time = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.02;
      
      if (characterRef.current) {
        characterRef.current.position.x = characterPos.x;
        characterRef.current.position.z = characterPos.z;
        characterRef.current.position.y = Math.sin(time * 2) * 0.02;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [timeOfDay]);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: '450px' }} />;
};

// Novel Background
const NovelBackground = ({ mood }) => {
  const configs = {
    gala: { gradient: 'from-amber-950/50 via-transparent to-transparent', elements: (
      <>
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-300/5 rounded-full blur-3xl" />
      </>
    )},
    danger: { gradient: 'from-red-950/50 via-transparent to-transparent', elements: (
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-900/20 rounded-full blur-3xl animate-pulse" />
    )},
    dark: { gradient: 'from-slate-950/70 via-transparent to-transparent', elements: (
      <>
        <div className="absolute top-10 right-10 w-24 h-24 bg-blue-200/10 rounded-full blur-2xl" />
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white/20 rounded-full" style={{ top: `${Math.random() * 30}%`, left: `${Math.random() * 100}%` }} />
        ))}
      </>
    )},
    romantic: { gradient: 'from-rose-950/40 via-transparent to-transparent', elements: (
      <>
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
      </>
    )},
    neutral: { gradient: 'from-slate-900/50 via-transparent to-transparent', elements: (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-96 bg-gradient-to-b from-white/5 to-transparent" />
    )},
    social: { gradient: 'from-pink-950/40 via-transparent to-transparent', elements: (
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-rose-950/20 to-transparent" />
    )},
    intimate: { gradient: 'from-purple-950/40 via-transparent to-transparent', elements: (
      <>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-purple-950/40 to-transparent" />
      </>
    )},
    escape: { gradient: 'from-cyan-900/40 via-transparent to-transparent', elements: (
      <>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyan-900/30 to-transparent" />
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-32 h-48 bg-amber-400/20 rounded-full blur-3xl" />
      </>
    )},
  };

  const config = configs[mood] || configs.neutral;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient}`} />
      {config.elements}
    </div>
  );
};

// Main Game
export default function RagsToRichesGame() {
  const [gamePhase, setGamePhase] = useState('intro');
  const [simState, setSimState] = useState(initialSimState);
  const [apartment, setApartment] = useState(initialApartment);
  const [currentAction, setCurrentAction] = useState(null);
  const [actionProgress, setActionProgress] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [relationship, setRelationship] = useState({ partner: null, level: 0 });
  const [playerStatus, setPlayerStatus] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [characterPos, setCharacterPos] = useState({ x: 0, z: 0 });
  const [novelState, setNovelState] = useState({ currentScene: 'start', cluesFound: [], path: [] });

  const DEV_MODE = true;

  const dateReadiness = Math.min(100, (simState.hunger + simState.energy + simState.hygiene + simState.mood + apartment.cleanliness) / 5);
  const overallStatus = Math.min(100, (dateReadiness + simState.money / 10 + relationship.level / 2) / 2);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(p => [...p, { id, message, type }]);
    setTimeout(() => setNotifications(p => p.filter(n => n.id !== id)), 3000);
  }, []);

  useEffect(() => {
    if (gamePhase !== 'sim' || currentAction) return;
    const interval = setInterval(() => {
      setSimState(p => ({
        ...p,
        hunger: Math.max(0, p.hunger - NEEDS_DECAY_RATE),
        energy: Math.max(0, p.energy - NEEDS_DECAY_RATE * 0.5),
        hygiene: Math.max(0, p.hygiene - NEEDS_DECAY_RATE * 0.3),
        mood: Math.max(0, p.mood - NEEDS_DECAY_RATE * 0.2),
      }));
      setApartment(p => ({ ...p, cleanliness: Math.max(0, p.cleanliness - 0.1) }));
    }, 1000);
    return () => clearInterval(interval);
  }, [gamePhase, currentAction]);

  const handleObjectClick = (obj) => {
    if (currentAction) return;
    if (obj.moneyCost && simState.money < obj.moneyCost) {
      addNotification('💸 Not enough money!', 'danger');
      return;
    }
    setCharacterPos({ x: obj.position[0] * 0.8, z: obj.position[2] * 0.8 });
    setCurrentAction(obj);
    setActionProgress(0);
    const totalTime = obj.timeCost * 1000;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const progress = ((Date.now() - startTime) / totalTime) * 100;
      if (progress >= 100) {
        clearInterval(interval);
        setSimState(p => {
          const n = { ...p };
          Object.entries(obj.needsAffected).forEach(([k, v]) => n[k] = Math.min(100, Math.max(0, p[k] + v)));
          if (obj.moneyCost) n.money -= obj.moneyCost;
          if (obj.moneyGain) n.money += obj.moneyGain;
          n.time = (p.time + obj.timeCost) % 24;
          if (p.time + obj.timeCost >= 24) n.day += 1;
          return n;
        });
        if (obj.cleanBonus) setApartment(p => ({ ...p, cleanliness: Math.min(100, p.cleanliness + obj.cleanBonus) }));
        addNotification(`✓ Finished ${obj.action}!`, 'success');
        setCurrentAction(null);
        setActionProgress(0);
      } else {
        setActionProgress(progress);
      }
    }, 50);
  };

  const attemptDate = (profile) => {
    const chance = Math.min(95, Math.max(5, overallStatus - profile.requiredStatus + 50 + profile.compatibility / 2));
    if (Math.random() * 100 < chance) {
      setRelationship({ partner: profile, level: 10 });
      addNotification(`💕 ${profile.name} said YES!`, 'success');
    } else {
      addNotification(`💔 ${profile.name} isn't interested...`, 'danger');
    }
  };

  const goOnDate = () => {
    if (simState.money < 50) { addNotification('💸 Need $50!', 'danger'); return; }
    setSimState(p => ({ ...p, money: p.money - 50 }));
    if (Math.random() * 100 < (simState.mood + simState.hygiene) / 2) {
      setRelationship(p => ({ ...p, level: Math.min(100, p.level + 15) }));
      addNotification('💕 Amazing date!', 'success');
    } else {
      setRelationship(p => ({ ...p, level: Math.max(0, p.level - 5) }));
      addNotification('😬 Awkward date...', 'danger');
    }
  };

  const handleNovelChoice = (choice) => {
    if (choice.effect?.status) setPlayerStatus(p => Math.max(0, p + choice.effect.status));
    if (choice.effect?.clue) setNovelState(p => ({ ...p, cluesFound: [...p.cluesFound, choice.effect.clue] }));
    setNovelState(p => ({ ...p, path: [...p.path, choice.text], currentScene: choice.next }));
    const nextScene = storyScript[choice.next];
    if (nextScene?.statusChange) setPlayerStatus(p => Math.max(0, p + nextScene.statusChange));
  };

  const skipToPhase = (phase) => {
    if (!playerName) setPlayerName('TestPlayer');
    if (phase === 'dating' || phase === 'housewife') {
      setSimState(p => ({ ...p, hunger: 100, energy: 100, hygiene: 100, mood: 100 }));
      setApartment(p => ({ ...p, cleanliness: 100 }));
    }
    if (phase === 'housewife') {
      setRelationship({ partner: datingProfiles[0], level: 100 });
      setPlayerStatus(50);
    }
    setGamePhase(phase);
  };

  // Render Intro
  if (gamePhase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-900 via-purple-900 to-black flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 mb-2">💎 RAGS TO RICHES 💎</h1>
            <p className="text-pink-300 text-lg italic">From Studio Apartment to Mansion Dreams</p>
          </div>
          <div className="bg-black/40 backdrop-blur rounded-2xl p-6 border border-pink-500/30">
            <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Enter your name..." className="w-full p-3 rounded-lg bg-purple-900/50 border border-pink-500/30 text-white mb-4 focus:outline-none focus:border-pink-400" />
            <div className="text-gray-300 text-sm space-y-2 mb-4">
              <p>🏠 <strong>Phase 1:</strong> Manage your apartment and needs</p>
              <p>💕 <strong>Phase 2:</strong> Find your wealthy match</p>
              <p>👑 <strong>Phase 3:</strong> Solve a murder. Become Queen.</p>
            </div>
            <button onClick={() => playerName.trim() && setGamePhase('sim')} disabled={!playerName.trim()} className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold disabled:opacity-50 hover:from-pink-500 hover:to-rose-500 transition-all">
              Begin Your Journey ✨
            </button>
          </div>
        </div>
        {DEV_MODE && (
          <div className="fixed bottom-4 left-4 bg-gray-900/95 border border-yellow-500/50 rounded-lg p-3 text-xs">
            <div className="text-yellow-400 font-bold mb-2">🛠️ DEV</div>
            <div className="grid grid-cols-2 gap-1">
              {['sim', 'dating', 'housewife'].map(phase => (
                <button key={phase} onClick={() => skipToPhase(phase)} className="px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">{phase}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Sim
  if (gamePhase === 'sim') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <div className="max-w-6xl mx-auto mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{playerName}'s Studio</h2>
            <p className="text-gray-400">Day {simState.day} • {simState.time}:00 {simState.time >= 20 || simState.time < 6 ? '🌙' : simState.time >= 17 ? '🌅' : '☀️'}</p>
          </div>
          <div className="text-right">
            <p className="text-green-400 text-xl font-bold">${simState.money}</p>
            <p className="text-pink-400 text-sm">Status: {Math.round(overallStatus)}%</p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl" style={{ height: '480px' }}>
              <Apartment3D objects={apartment.objects} characterPos={characterPos} timeOfDay={simState.time} />
            </div>
            
            {currentAction && (
              <div className="mt-4 bg-black/60 backdrop-blur rounded-lg p-4">
                <p className="text-white text-sm mb-2">{currentAction.icon} {currentAction.action}...</p>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all" style={{ width: `${actionProgress}%` }} />
                </div>
              </div>
            )}
            
            <div className="mt-4 grid grid-cols-7 gap-2">
              {apartment.objects.map(obj => (
                <button key={obj.id} onClick={() => handleObjectClick(obj)} disabled={!!currentAction} className="p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 text-center transition-all hover:scale-105 border border-transparent hover:border-slate-500">
                  <span className="text-2xl block mb-1">{obj.icon}</span>
                  <span className="text-xs text-gray-300">{obj.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h3 className="text-white font-bold mb-3">Needs</h3>
              <StatBar label="Hunger" value={simState.hunger} color="#ef4444" icon="🍔" />
              <StatBar label="Energy" value={simState.energy} color="#3b82f6" icon="⚡" />
              <StatBar label="Hygiene" value={simState.hygiene} color="#06b6d4" icon="🧼" />
              <StatBar label="Mood" value={simState.mood} color="#a855f7" icon="😊" />
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <StatBar label="Cleanliness" value={apartment.cleanliness} color="#22c55e" icon="🏠" />
            </div>
            <div className="bg-gradient-to-br from-pink-900/50 to-rose-900/50 rounded-xl p-4 border border-pink-700/30">
              <h3 className="text-pink-300 font-bold mb-3">💕 Date Readiness</h3>
              <StatBar label="Ready" value={dateReadiness} color="#ec4899" icon="💋" />
              {dateReadiness >= DATE_READINESS_THRESHOLD ? (
                <button onClick={() => setGamePhase('dating')} className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold hover:from-pink-500 hover:to-rose-500 transition-all">Start Dating! 💕</button>
              ) : (
                <p className="text-pink-300/60 text-xs mt-2 text-center">Reach {DATE_READINESS_THRESHOLD}% to unlock dating</p>
              )}
            </div>
          </div>
        </div>

        <div className="fixed top-4 right-4 space-y-2 z-50">
          {notifications.map(n => (
            <div key={n.id} className={`px-4 py-2 rounded-lg text-white text-sm shadow-lg backdrop-blur ${n.type === 'danger' ? 'bg-red-600/90' : n.type === 'success' ? 'bg-green-600/90' : 'bg-blue-600/90'}`}>{n.message}</div>
          ))}
        </div>

        {DEV_MODE && (
          <div className="fixed bottom-4 left-4 bg-gray-900/95 border border-yellow-500/50 rounded-lg p-3 text-xs">
            <div className="text-yellow-400 font-bold mb-2">🛠️ DEV</div>
            <button onClick={() => setSimState(p => ({ ...p, hunger: 100, energy: 100, hygiene: 100, mood: 100 }))} className="w-full px-2 py-1 rounded bg-green-700 text-white mb-1">Max Needs</button>
            <button onClick={() => setSimState(p => ({ ...p, money: p.money + 500 }))} className="w-full px-2 py-1 rounded bg-emerald-700 text-white mb-1">+$500</button>
            <button onClick={() => skipToPhase('dating')} className="w-full px-2 py-1 rounded bg-pink-700 text-white mb-1">→ Dating</button>
            <button onClick={() => skipToPhase('housewife')} className="w-full px-2 py-1 rounded bg-purple-700 text-white">→ Housewife</button>
          </div>
        )}
      </div>
    );
  }

  // Render Dating
  if (gamePhase === 'dating') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-950 via-rose-950 to-black p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">💕 Luxe Match</h2>
              <p className="text-pink-300/60">Find your wealthy soulmate</p>
            </div>
            <div className="text-right">
              <p className="text-amber-400 font-bold">Status: {Math.round(overallStatus)}%</p>
              <button onClick={() => setGamePhase('sim')} className="text-pink-400 text-sm hover:underline">← Back</button>
            </div>
          </div>
          
          {relationship.partner ? (
            <div className="bg-black/40 backdrop-blur rounded-2xl p-6 border border-pink-500/30">
              <div className="text-center mb-6">
                <span className="text-8xl">{relationship.partner.emoji}</span>
                <h3 className="text-2xl font-bold text-white mt-4">{relationship.partner.name}</h3>
                <p className="text-pink-300">{relationship.partner.wealth}</p>
              </div>
              <StatBar label="Relationship" value={relationship.level} color="#ec4899" icon="💕" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button onClick={goOnDate} className="py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold hover:from-pink-500 hover:to-rose-500 transition-all">Go on Date ($50)</button>
                {relationship.level >= MARRIAGE_THRESHOLD && (
                  <button onClick={() => { setPlayerStatus(50); setGamePhase('housewife'); }} className="py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold animate-pulse hover:from-amber-500 hover:to-yellow-500">💍 Get Married!</button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {datingProfiles.map(profile => {
                const canMatch = overallStatus >= profile.requiredStatus;
                return (
                  <div key={profile.id} className={`bg-black/40 backdrop-blur rounded-xl p-4 border transition-all ${canMatch ? 'border-pink-500/50 hover:border-pink-400' : 'border-gray-700/30 opacity-60'}`}>
                    <div className="flex items-start gap-4">
                      <span className="text-5xl">{profile.emoji}</span>
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{profile.name}, {profile.age}</h3>
                        <p className="text-amber-400 text-sm">{profile.wealth}</p>
                        <p className="text-gray-400 text-xs mt-1">{profile.bio}</p>
                      </div>
                    </div>
                    <button onClick={() => canMatch && attemptDate(profile)} disabled={!canMatch} className={`w-full mt-3 py-2 rounded-lg font-bold text-sm transition-all ${canMatch ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-500 hover:to-rose-500' : 'bg-gray-700 text-gray-500'}`}>
                      {canMatch ? 'Request Date 💌' : `Need ${profile.requiredStatus}% status`}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {DEV_MODE && (
          <div className="fixed bottom-4 left-4 bg-gray-900/95 border border-yellow-500/50 rounded-lg p-3 text-xs">
            <div className="text-yellow-400 font-bold mb-2">🛠️ DEV</div>
            <button onClick={() => setRelationship(p => ({ ...p, level: 100 }))} className="w-full px-2 py-1 rounded bg-pink-700 text-white mb-1">Max Relationship</button>
            <button onClick={() => skipToPhase('housewife')} className="w-full px-2 py-1 rounded bg-purple-700 text-white">→ Housewife</button>
          </div>
        )}
      </div>
    );
  }

  // Render Housewife (Visual Novel)
  if (gamePhase === 'housewife') {
    const scene = storyScript[novelState.currentScene] || storyScript['start'];
    const isEnding = scene.isEnding;

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-black relative">
        <NovelBackground mood={scene.mood || 'neutral'} />
        
        <div className="relative z-10 bg-black/60 backdrop-blur-sm border-b border-amber-900/30 px-6 py-3">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-amber-400 font-serif">{playerName}</span>
              <span className="text-stone-600">|</span>
              <span className="text-stone-400 text-sm">Married to {relationship.partner?.name}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs text-stone-500 block">STATUS</span>
                <span className="text-amber-400 font-bold">{playerStatus}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-500 block">CLUES</span>
                <span className="text-cyan-400 font-bold">{novelState.cluesFound.length}</span>
              </div>
            </div>
          </div>
        </div>

        {scene.location && (
          <div className="relative z-10 text-center py-2">
            <span className="text-stone-500 text-xs tracking-widest uppercase">{scene.location}</span>
          </div>
        )}

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-6">
          {scene.chapter && (
            <div className="text-center mb-8">
              <p className="text-amber-600/60 text-sm tracking-widest uppercase mb-2">{scene.chapter}</p>
              <h2 className="text-3xl font-serif text-stone-200 italic">{scene.title}</h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto mt-4" />
            </div>
          )}

          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-stone-800/50 p-8 mb-8 shadow-2xl">
            <div className="font-serif text-stone-300 leading-relaxed text-lg space-y-4">
              {scene.text.split('\n\n').map((p, i) => (
                <p key={i} className={p.startsWith('"') ? 'text-stone-100 pl-4 border-l-2 border-amber-700/50' : ''}>{p}</p>
              ))}
            </div>
            {isEnding && scene.statusChange && (
              <div className={`mt-8 p-4 rounded-lg border ${scene.statusChange > 0 ? 'bg-emerald-900/30 border-emerald-700/30' : 'bg-red-900/30 border-red-700/30'}`}>
                <p className={`text-center font-bold text-xl ${scene.statusChange > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {scene.statusChange > 0 ? '+' : ''}{scene.statusChange} STATUS
                </p>
              </div>
            )}
          </div>

          {scene.choices?.length > 0 && (
            <div className="space-y-3">
              <p className="text-stone-500 text-sm text-center mb-4 tracking-wide">What do you do?</p>
              {scene.choices.map((choice, i) => (
                <button key={i} onClick={() => handleNovelChoice(choice)} className="w-full text-left group">
                  <div className="bg-black/40 backdrop-blur-sm hover:bg-amber-900/20 border border-stone-700/30 hover:border-amber-700/50 rounded-lg p-4 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <span className="text-amber-600 font-serif text-lg">❧</span>
                      <div className="flex-1">
                        <p className="text-stone-200 group-hover:text-amber-200 transition-colors">{choice.text}</p>
                        {choice.consequence && <p className="text-stone-500 text-sm mt-2 italic">{choice.consequence}</p>}
                        {choice.effect && (
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {choice.effect.status && (
                              <span className={`text-xs px-2 py-0.5 rounded ${choice.effect.status > 0 ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'}`}>
                                {choice.effect.status > 0 ? '+' : ''}{choice.effect.status} status
                              </span>
                            )}
                            {choice.effect.clue && <span className="text-xs px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-400">+ clue</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {isEnding && (
            <div className="mt-8 text-center">
              <button onClick={() => { setNovelState({ currentScene: 'start', cluesFound: [], path: [] }); setPlayerStatus(50); }} className="px-8 py-3 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-medium transition-colors">Play Again</button>
            </div>
          )}

          {novelState.cluesFound.length > 0 && (
            <div className="mt-8 border-t border-stone-800/50 pt-6">
              <p className="text-stone-500 text-xs uppercase mb-3 tracking-wide">Clues Discovered</p>
              <div className="flex flex-wrap gap-2">
                {novelState.cluesFound.map((clue, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-800/30">{clue.replace(/_/g, ' ')}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {DEV_MODE && (
          <div className="fixed bottom-4 left-4 bg-gray-900/95 border border-yellow-500/50 rounded-lg p-3 text-xs max-h-64 overflow-y-auto">
            <div className="text-yellow-400 font-bold mb-2">🛠️ DEV</div>
            <select value={novelState.currentScene} onChange={(e) => setNovelState(p => ({ ...p, currentScene: e.target.value }))} className="w-full px-2 py-1 rounded bg-gray-700 text-white mb-2 text-xs">
              {Object.keys(storyScript).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={() => setPlayerStatus(p => p + 50)} className="w-full px-2 py-1 rounded bg-amber-700 text-white mb-1">+50 Status</button>
            <div className="text-gray-500 mt-2">Scene: {novelState.currentScene}</div>
          </div>
        )}
      </div>
    );
  }

  return null;
}