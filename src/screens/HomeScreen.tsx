import React, { useState } from 'react';
import { ASSETS } from '../assets';
import { Story, TabType } from '../types';
import { Sparkles, Heart, Clock, Play, ArrowRight, Share2, Plus, Volume2, ShieldAlert } from 'lucide-react';

interface HomeScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onSelectFeelingForCheckIn: (feelingId: string) => void;
  onOpenStoryReader: (story: Story) => void;
  onPlayStoryAudio: (story: Story) => void;
  onOpenCrisis: () => void;
  featuredStory: Story;
  onToggleBookmark: (storyId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onSelectFeelingForCheckIn,
  onOpenStoryReader,
  onPlayStoryAudio,
  onOpenCrisis,
  featuredStory,
  onToggleBookmark,
}) => {
  const [selectedFeeling, setSelectedFeeling] = useState<string>('hopeful');
  const [quoteCopied, setQuoteCopied] = useState(false);
  const [selectedDayNote, setSelectedDayNote] = useState<string | null>(null);

  const homeFeelings = [
    { id: 'hopeful', label: 'I feel hopeful', emoji: '🌱' },
    { id: 'anxious', label: 'I feel anxious', emoji: '🌧️' },
    { id: 'overwhelmed', label: 'I feel overwhelmed', emoji: '🌊' },
    { id: 'lonely', label: 'I feel lonely', emoji: '🕯️' },
    { id: 'stuck', label: 'I feel stuck', emoji: '🍂' },
    { id: 'encouragement', label: 'I need encouragement', emoji: '✨' },
  ];

  const handleStartCheckIn = () => {
    onSelectFeelingForCheckIn(selectedFeeling);
    onNavigateTab('checkin');
  };

  const handleShareQuote = () => {
    const text = `“You don’t have to carry tomorrow until tomorrow arrives. Today is enough.” — Pema Chödrön inspired (via Solace)`;
    if (navigator.share) {
      navigator.share({ title: 'Solace Gentle Whisper', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setQuoteCopied(true);
      setTimeout(() => setQuoteCopied(false), 2000);
    }
  };

  const footprints = [
    { day: 'M', label: 'Grounded', emoji: '🌱', bg: 'bg-[#EBF1EA]', text: 'text-[#445E40]', note: 'Monday: Grounded 8/10. Sipped tea listening to rain.' },
    { day: 'T', label: 'Bright', emoji: '☀️', bg: 'bg-[#FDF3E7]', text: 'text-[#8A5A2B]', note: 'Tuesday: Bright 7/10. Lightness in morning walk.' },
    { day: 'W', label: 'Tender', emoji: '☁️', bg: 'bg-[#EAF3F2]', text: 'text-[#3E6563]', note: 'Wednesday: Tender 4/10. Work deadlines piled up, took evening bath.' },
    { day: 'T', label: 'Reflective', emoji: '🧘', bg: 'bg-[#F9ECEB]', text: 'text-[#824744]', note: 'Thursday: Reflective 6/10. Finished chapter in novel.' },
    { day: 'F', label: 'Warm', emoji: '🧡', bg: 'bg-[#FAECE3]', text: 'text-[#8C5237]', note: 'Friday: Warm 8/10. Shared dinner with friend.' },
    { day: 'S', label: 'Peaceful', emoji: '🌿', bg: 'bg-[#EBF1EA]', text: 'text-[#445E40]', note: 'Saturday: Peak Joy 9/10. Autumn forest trail hike.' },
    { day: 'Sun', label: 'Today', emoji: '+', bg: 'bg-[#BD5B3E]', text: 'text-white', isToday: true, note: 'Sunday: Ready for today’s reflection.' },
  ];

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto px-4 pt-3">
      {/* Top Banner & Greeting */}
      <div className="space-y-2 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1EA] text-[#445E40] text-xs font-semibold tracking-wider">
          <span className="text-sm">🌿</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">MORNING SANCTUARY</span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#2E2A27] tracking-tight flex items-center gap-2">
          Good morning, Maya <span className="inline-block transform hover:rotate-12 transition-transform">🌿</span>
        </h1>
        <p className="text-sm text-[#7A7166] font-normal leading-relaxed">
          Take a soft breath. There is no rush here.
        </p>
      </div>

      {/* Daily Presence Card */}
      <div className="p-5 rounded-3xl bg-[#FAF5EE] border border-[#EBE1D2] shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BD5B3E] shrink-0" />
            <span className="font-bold text-[11px] tracking-wider text-[#A34E34] uppercase">
              DAILY PRESENCE
            </span>
          </div>
          <span className="text-xs text-[#8A8177] font-medium">Day 14 streak</span>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2E2A27] leading-tight">
            How are you feeling today?
          </h2>
          <p className="text-xs text-[#7A7167] mt-1 leading-relaxed">
            Tap what feels closest right now, without judgement.
          </p>
        </div>

        {/* Emotion Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {homeFeelings.map((f) => {
            const isSelected = selectedFeeling === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFeeling(f.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white border-2 border-[#BD5B3E] text-[#933D24] shadow-xs scale-102'
                    : 'bg-white/80 border border-[#E6DCD0] text-[#4F463E] hover:bg-white hover:border-[#D8CBC0]'
                } active:scale-95`}
              >
                <span className="text-sm">{f.emoji}</span>
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Primary CTA */}
        <button
          onClick={handleStartCheckIn}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#BD5B3E] hover:bg-[#A94C31] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-[#BD5B3E]/20 transition-all active:scale-[0.98]"
        >
          <span>Begin 60-Second Check In</span>
          <Sparkles className="w-4 h-4 fill-white/80" />
        </button>
      </div>

      {/* Morning Offering - Stories for Your Soul */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A34E34] block">
              MORNING OFFERING
            </span>
            <h3 className="font-serif text-xl font-bold text-[#2E2A27]">
              Stories for Your Soul
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('stories')}
            className="text-xs font-semibold text-[#BD5B3E] hover:underline flex items-center gap-0.5"
          >
            <span>View library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Story Card */}
        <div className="rounded-3xl bg-white border border-[#EAE1D3] overflow-hidden shadow-xs space-y-4 p-4 transition-shadow hover:shadow-md">
          {/* Image with badges */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xs border border-[#ECE3D6]">
            <img
              src={featuredStory.image}
              alt={featuredStory.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

            {/* Badges on top */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium">
                <Clock className="w-3 h-3" /> {featuredStory.readTime}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#EBF1EA]/90 backdrop-blur-md text-[#445E40] text-[11px] font-semibold">
                {featuredStory.category}
              </span>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(featuredStory.id)}
              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-700 hover:bg-white transition-colors"
              aria-label="Save story"
            >
              <Heart
                className={`w-4 h-4 ${
                  featuredStory.isSaved
                    ? 'fill-[#BD5B3E] text-[#BD5B3E]'
                    : 'text-[#61574E]'
                }`}
              />
            </button>
          </div>

          {/* Story Text */}
          <div className="space-y-1.5 px-1">
            <span className="text-[10px] font-bold tracking-widest text-[#A34E34] uppercase">
              GENERATED FOR YOUR MORNING REFLECTION
            </span>
            <h4 className="font-serif text-xl font-bold text-[#2E2A27] leading-snug">
              {featuredStory.title}
            </h4>
            <p className="text-xs text-[#7A7166] leading-relaxed line-clamp-2">
              "{featuredStory.excerpt}"
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-1 px-1 border-t border-[#F2ECE4]">
            <button
              onClick={() => onOpenStoryReader(featuredStory)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#BD5B3E] hover:underline"
            >
              <span>Read story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onPlayStoryAudio(featuredStory)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF5EE] border border-[#E6DCD0] text-xs font-medium text-[#483F37] hover:bg-[#F3ECE1] transition-colors"
            >
              <Play className="w-3 h-3 fill-current text-[#BD5B3E]" />
              <span>Listen ({featuredStory.audioDuration})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gentle Whisper Quote Card */}
      <div className="p-5 rounded-3xl bg-[#EBF1EA]/70 border border-[#D5E3D2] space-y-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#445E40]">
            <span className="font-serif text-lg leading-none font-bold">99</span>
            <span className="text-[11px] uppercase tracking-wider font-bold">GENTLE WHISPER</span>
          </div>
          <button
            onClick={handleShareQuote}
            className="w-7 h-7 rounded-full bg-white/70 text-[#445E40] hover:bg-white flex items-center justify-center transition-colors relative"
            title="Share quote"
          >
            <Share2 className="w-3.5 h-3.5" />
            {quoteCopied && (
              <span className="absolute -top-7 right-0 text-[10px] bg-stone-800 text-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </div>

        <blockquote className="font-serif text-lg text-[#2A3B28] italic leading-snug">
          “You don’t have to carry tomorrow until tomorrow arrives. Today is enough.”
        </blockquote>

        <p className="text-xs text-[#526D4D] font-medium">— Pema Chödrön inspired</p>
      </div>

      {/* Weekly Rhythm - Your Gentle Footprints */}
      <div className="p-5 rounded-3xl bg-white border border-[#EAE1D3] space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34E34]">
              WEEKLY RHYTHM
            </span>
            <h3 className="font-serif text-xl font-bold text-[#2E2A27]">
              Your Gentle Footprints
            </h3>
          </div>
          <span className="text-xs text-[#8A8177]">Last 7 days</span>
        </div>

        {/* 7 Days Row */}
        <div className="grid grid-cols-7 gap-1 pt-2">
          {footprints.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDayNote(item.note)}
              className="flex flex-col items-center gap-1.5 focus:outline-none group active:scale-95 transition-transform"
            >
              <span className="text-xs font-medium text-[#7D7368]">{item.day}</span>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-xs transition-transform group-hover:scale-105 ${item.bg} ${item.text}`}
              >
                {item.emoji}
              </div>
              <span className="text-[10px] text-[#8C8379] truncate max-w-full text-center">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {selectedDayNote && (
          <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#EBE1D2] text-xs text-[#574D43] animate-fade-in flex justify-between items-center">
            <span>{selectedDayNote}</span>
            <button
              onClick={() => setSelectedDayNote(null)}
              className="text-[#9E9488] hover:text-[#2E2A27] text-xs ml-2"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Feeling in Distress? Support Banner */}
      <div className="p-4 rounded-2xl bg-[#FDF2EE] border border-[#F6D3C6] flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#BD5B3E]/15 text-[#BD5B3E] flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#933D24]">Feeling in distress?</h5>
            <p className="text-[11px] text-[#7A5A4E]">
              Peaceful crisis support is always here for you
            </p>
          </div>
        </div>
        <button
          onClick={onOpenCrisis}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-[#EFC0B0] text-xs font-semibold text-[#BD5B3E] hover:bg-[#FDF6F2] transition-colors shrink-0 shadow-2xs"
        >
          Get Help
        </button>
      </div>
    </div>
  );
};
