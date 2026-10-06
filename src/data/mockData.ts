import { ASSETS } from '../assets';
import { Story, MoodLogEntry, DailyFootprint, FeelingOption } from '../types';

export const INITIAL_FEELINGS: FeelingOption[] = [
  { id: 'hopeful', label: 'I feel hopeful', emoji: '🌱', category: 'hopeful' },
  { id: 'anxious', label: 'I feel anxious', emoji: '🌧️', category: 'heavy' },
  { id: 'overwhelmed', label: 'I feel overwhelmed', emoji: '🌊', category: 'heavy' },
  { id: 'lonely', label: 'I feel lonely', emoji: '🕯️', category: 'tender' },
  { id: 'stuck', label: 'I feel stuck', emoji: '🍂', category: 'heavy' },
  { id: 'encouragement', label: 'I need encouragement', emoji: '✨', category: 'tender' },
  { id: 'grateful', label: 'I feel grateful', emoji: '🌻', category: 'grounding' },
  { id: 'exhausted', label: 'I feel exhausted', emoji: '🌙', category: 'heavy' },
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'weaver-broken-thread',
    title: 'The Weaver and the Broken Thread',
    subtitle: 'Generated Oct 24 · After you felt stuck',
    excerpt: 'She looked at the knot in the wool and realized: the tapestry wasn’t ruined by the pause; it was where the pattern learned patience.',
    fullStory: `Early in the autumn mist, inside an old attic studio where golden daylight filtered through diamond-paned glass, Master Weaver Corinne sat before her upright loom. Her fingers usually flew like swallows over cedar warp threads. But this morning, a thick indigo yarn snagged, tension snapped, and a jagged knot stood in the middle of weeks of careful craftsmanship.

Her first impulse was grief—to pull hard, to slice the thread, to declare the cloth ruined and discard the loom’s patient work. The silence of the studio felt suddenly accusing.

Instead of fighting the tangled knot, Corinne set down her wooden shuttle. She pressed both palms against the cool cedar beam and let out the breath she had held since sunrise. The air smelled of sheep's wool, dried lavender bundles, and damp earth from the orchard outside.

"When thread catches," her elder teacher had once told her by the river, "it is not an enemy. It is the yarn asking you to match its pace."

Slowly, with needle and fingerpad, Corinne didn't hide the knot. She took a thread of honey-dyed silk and wrapped it tenderly around the break. What was meant to be a hidden flaw became the brightest constellation in the twilight fabric.

She looked at the knot in the wool and realized: the tapestry wasn’t ruined by the pause; it was where the pattern learned patience. What feels tangled in your chest today does not ruin your life's cloth. It is simply the place where the thread pauses to make room for grace.`,
    readTime: '4 min read',
    audioDuration: '4:15',
    category: 'Encouragement',
    tag: 'After you felt stuck',
    image: ASSETS.weaverLoom,
    imageCaption: 'Weaving patience from pause',
    quote: '“She looked at the knot in the wool and realized: the tapestry wasn’t ruined by the pause; it was where the pattern learned patience.”',
    date: 'Oct 24',
    isSaved: true,
    tailoredFor: ['I feel stuck', 'Need encouragement', 'Gentle patience'],
  },
  {
    id: 'lantern-clearing',
    title: 'The Lantern in the Clearing',
    subtitle: 'Generated for your morning reflection',
    excerpt: 'When the fog settles over the path, you don\'t need to see the entire mountain — only enough ground for your next single step.',
    fullStory: `The trail through the old cedar forest had vanished beneath a thick quilt of silver dawn fog. It was the kind of mist that muffles every birdcall and makes the familiar world feel vast and uncertain.

A traveler stood at the edge of the grove, clutching a small brass lantern. The wick burned with a quiet, steady flame—not a blazing bonfire that could illuminate the miles ahead, but an amber pool just wide enough to reveal three stones on the damp earth.

The traveler hesitated, paralyzed by the invisible bends, the unseen roots, and the distant crest hidden deep in the gray clouds. "How can I proceed," they whispered, "when I cannot see where I am going?"

From beneath the mossy roots of an ancient spruce, an old forest warden approached, carrying an identical small lantern.

"Child," the warden spoke gently, with eyes like still river water, "the lantern was never forged to reveal the destination. It was crafted only to keep your feet company. When the fog settles over the path, you don't need to see the entire mountain—only enough ground for your next single step."

The traveler looked down at their boots. The next stone was smooth and dry. Taking one breath, they lifted a foot and stepped forward. And as they stepped, the light obediently moved with them, uncovering the next stone, and the next.

Whatever fog clings to your morning, you are not asked to solve tomorrow. You only need light for this immediate breath.`,
    readTime: '5 min read',
    audioDuration: '4:30',
    category: 'Anxiety relief',
    tag: 'Anxiety relief',
    image: ASSETS.lanternClearing,
    imageCaption: 'Light for the immediate step',
    quote: '“When the fog settles over the path, you don’t need to see the entire mountain — only enough ground for your next single step.”',
    date: 'Today',
    isSaved: true,
    tailoredFor: ['I feel anxious', 'I feel overwhelmed'],
  },
  {
    id: 'lighthouse-fog',
    title: 'The Lighthouse That Watched the Fog',
    subtitle: 'Created Oct 21 · For moments when you feel adrift',
    excerpt: 'The tower does not fight the tempest or shout down the waves. It simply stands, anchored to stone, holding steady warmth through the squall.',
    fullStory: `High on the windswept headland of Cape Sorrow, the white stones of the beacon tower had endured ninety winters. Some nights the sea was glass; on other nights, the tide roared against the basalt cliffs with enough thunder to rattle the iron lantern room.

A young apprentice keeper paced the iron gallery, terrified by the sudden descent of a nor'easter. Waves crested fifty feet below in frothing white foam.

"Keeper Julian," the boy cried, "should we not ring the warning bells louder? Should we not send signal flares into the dark?"

Julian, who had watched forty seasons of winter gale, placed a weathered hand upon the bronze lamp housing. "The light does not fight the storm, son. It does not argue with the wind. The light’s only task is to remain incandescent."

Through the long howling hours, the light revolved in its brass gears, sweeping a beam of warm reassurance through sheets of rain. Ships fifty miles out did not see the rocks; they saw the steady pulse that reminded them there was solid ground waiting.

When anxiety swirls like winter squalls around your mind, remember: you do not have to fight the turmoil. Anchor yourself to this quiet moment. Be the light that simply breathes.`,
    readTime: '3 min read',
    audioDuration: '3:45',
    category: 'Anxiety Relief',
    tag: 'Anxiety Relief',
    image: ASSETS.lighthouseFog,
    imageCaption: 'Steady presence on the cliff',
    quote: '“The tower does not fight the tempest. It simply stands, anchored to stone, holding steady warmth through the squall.”',
    date: 'Oct 21',
    isSaved: true,
    tailoredFor: ['I feel anxious', 'I need encouragement'],
  },
  {
    id: 'letters-quiet-night',
    title: 'Letters to the Quiet Night',
    subtitle: 'Created Oct 18 · For feeling lonely',
    excerpt: 'Solitude is not an empty room; it is an unhurried sanctuary where your truest self has room to sit down beside you.',
    fullStory: `Night rain tapped like soft fingertips upon the double glass panes of the library. Outside, the city streets were empty, washed in amber streetlamp reflections. Inside, tea steam curled upward in delicate ribbons from a heavy ceramic mug.

For a long time, the quiet had felt heavy to David—like an absence, a reminder of rooms where laughter was happening elsewhere without him. He sat with his pen suspended over creamy rag paper, unable to begin.

Then the rain slowed to a whisper. A solitary bird fluttered beneath the eaves, resting its feathers in dry safety.

David wrote one sentence: "I am not alone in this quiet; I am simply keeping company with my own heartbeat."

With that thought, the silence transformed. It ceased to be an empty vacuum and became a warm blanket. He brewed fresh peppermint tea, touched the smooth worn leather of his favorite books, and felt an unexpected kindness toward himself.

Solitude is not an empty room; it is an unhurried sanctuary where your truest self finally has room to sit down beside you.`,
    readTime: '5 min read',
    audioDuration: '5:10',
    category: 'Comfort & Solitude',
    tag: 'Comfort & Solitude',
    image: ASSETS.lettersQuiet,
    imageCaption: 'Gentle warmth in evening solitude',
    quote: '“Solitude is not an empty room; it is an unhurried sanctuary where your truest self has room to sit down beside you.”',
    date: 'Oct 18',
    isSaved: false,
    tailoredFor: ['I feel lonely', 'Need encouragement'],
  },
  {
    id: 'dawn-meadow',
    title: 'Dawn Over Whispering Meadow',
    subtitle: 'Created Oct 12 · For rebuilding hope',
    excerpt: 'Night never wins the argument against dawn. Even through frost, the wild clover knows how to wake up to the sun.',
    fullStory: `Before the sun breached the eastern ridge of the valley, the world was steeped in deep violet shadows. Dewdrops hung heavy like tiny glass spheres from each blade of orchard grass.

To look across the meadow in that predawn chill, one might have thought summer was gone forever. The birds were silent, the flowers closed their petals tight against the cold mist, and the ground was stiff.

Yet beneath the cold topsoil, the roots were quietly drinking the nighttime dew. Without fanfare, without a sudden trumpet blast, a rim of pale gold spilled over the pine ridge.

First it touched the highest oak. Then the meadow grass. As warmth touched the clover, millions of tiny dew pearls caught the light, turning the valley into a carpet of living diamonds.

Night never wins the argument against dawn. Whatever dormancy or heavy season you find yourself traversing, your season of warmth is already cresting the ridge.`,
    readTime: '4 min read',
    audioDuration: '3:50',
    category: 'Hope & Renewal',
    tag: 'Hope & Renewal',
    image: ASSETS.dawnMeadow,
    imageCaption: 'Morning gold across the grass',
    quote: '“Night never wins the argument against dawn. Even through frost, the wild clover knows how to wake up to the sun.”',
    date: 'Oct 12',
    isSaved: true,
    tailoredFor: ['I feel hopeful', 'I feel stuck'],
  },
];

export const INITIAL_MOOD_HISTORY: MoodLogEntry[] = [
  {
    id: 'log-1',
    date: 'Yesterday',
    time: '4:20 PM',
    score: 7,
    label: 'Steady',
    tagline: 'I feel hopeful & deeply grounded',
    quote: 'Went for a slow autumn walk, kicked some dry leaves and left phone in my pocket.',
    linkedStoryTitle: 'The Whispering Pines',
    tags: ['Hopeful', 'Grounded', 'Nature'],
  },
  {
    id: 'log-2',
    date: 'Tuesday',
    time: '8:15 PM',
    score: 4,
    label: 'Tender',
    tagline: 'I feel overwhelmed with clutter',
    quote: 'Work deadlines piled up, but brewed warm chamomile and sat in the dark for five minutes.',
    linkedStoryTitle: 'The Weaver',
    tags: ['Overwhelmed', 'Tender', 'Rest Needed'],
  },
  {
    id: 'log-3',
    date: 'Monday',
    time: '10:45 AM',
    score: 8,
    label: 'Peaceful',
    tagline: 'Gently aligned and unhurried',
    quote: 'Woke up without an alarm buzzing. Sipped tea listening to rain on the glass.',
    linkedStoryTitle: 'The Quiet Hearth',
    tags: ['Peaceful', 'Aligned', 'Unhurried'],
  },
  {
    id: 'log-4',
    date: 'Sunday',
    time: '7:30 PM',
    score: 9,
    label: 'Peak Joy',
    tagline: 'Heart full of quiet wonder',
    quote: 'Cooked soup from scratch and listened to old acoustic guitar records with a candle lit.',
    linkedStoryTitle: 'The Gathering Hearth',
    tags: ['Joyful', 'Nourished', 'Warm'],
  },
];

export const WEEKLY_FOOTPRINTS: DailyFootprint[] = [
  { dayLetter: 'M', name: 'Mon', score: 8, moodName: 'Grounded', iconName: 'leaf', colorClass: 'text-emerald-700', bgClass: 'bg-[#EBF1EA]' },
  { dayLetter: 'T', name: 'Tue', score: 7, moodName: 'Bright', iconName: 'sun', colorClass: 'text-amber-700', bgClass: 'bg-[#FDF3E7]' },
  { dayLetter: 'W', name: 'Wed', score: 4, moodName: 'Tender', iconName: 'cloud', colorClass: 'text-teal-700', bgClass: 'bg-[#EAF3F2]' },
  { dayLetter: 'T', name: 'Thu', score: 6, moodName: 'Reflective', iconName: 'lotus', colorClass: 'text-rose-700', bgClass: 'bg-[#F9ECEB]' },
  { dayLetter: 'F', name: 'Fri', score: 8, moodName: 'Warm', iconName: 'heart', colorClass: 'text-amber-800', bgClass: 'bg-[#FAECE3]' },
  { dayLetter: 'S', name: 'Sat', score: 9, moodName: 'Peaceful', iconName: 'flower', colorClass: 'text-emerald-700', bgClass: 'bg-[#EBF1EA]' },
  { dayLetter: 'Sun', name: 'Sun', score: 7, moodName: 'Today', iconName: 'plus', colorClass: 'text-white', bgClass: 'bg-[#C26145]', isToday: true },
];

export const ENERGY_LEVEL_DESCRIPTIONS: Record<number, { title: string; subtitle: string; category: string }> = {
  1: { title: 'Deeply Fragile', subtitle: 'Exhausted down to the marrow. All you need to do right now is rest.', category: 'Heavy & Foggy (1-3)' },
  2: { title: 'Heavy & Foggy', subtitle: 'Thoughts feel slowed, energy like walking through knee-deep water.', category: 'Heavy & Foggy (1-3)' },
  3: { title: 'Quiet & Sheltered', subtitle: 'Guarding energy carefully; seeking softness and zero pressure.', category: 'Heavy & Foggy (1-3)' },
  4: { title: 'Tender & Receptive', subtitle: 'A gentle sensitivity to the world, needing gentle words and kindness.', category: 'Steady & Grounded (4-7)' },
  5: { title: 'Grounded & Centered', subtitle: 'Finding your footing. Balanced between rest and gentle movement.', category: 'Steady & Grounded (4-7)' },
  6: { title: 'Gentle & Reflective', subtitle: 'Tired around the edges, but tenderly receptive to comfort.', category: 'Steady & Grounded (4-7)' },
  7: { title: 'Steady & Aligned', subtitle: 'Clear-eyed and capable of holding space for yourself and others.', category: 'Steady & Grounded (4-7)' },
  8: { title: 'Luminous & Warm', subtitle: 'An open heart and a deep sense of peaceful presence.', category: 'Luminous (8-10)' },
  9: { title: 'Radiant Joy', subtitle: 'Vibrant lightness in the chest, filled with quiet gratitude.', category: 'Luminous (8-10)' },
  10: { title: 'Full Bloom', subtitle: 'Abundant vitality, deeply inspired and connected to life.', category: 'Luminous (8-10)' },
};
