import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { ENERGY_LEVEL_DESCRIPTIONS } from '../data/mockData';
import { Mic, MicOff, Lock, Sparkles, BookOpen, Check, Heart, Wind, Waves, Home, Hourglass, Sun, Flower2, Moon } from 'lucide-react';

interface CheckInScreenProps {
  initialFeeling?: string;
  onStoryGenerated: (story: Story) => void;
  onSaveCheckInOnly: (entry: {
    score: number;
    tags: string[];
    note: string;
    stateLabel: string;
  }) => void;
}

export const CheckInScreen: React.FC<CheckInScreenProps> = ({
  initialFeeling,
  onStoryGenerated,
  onSaveCheckInOnly,
}) => {
  const [selectedStates, setSelectedStates] = useState<string[]>(['overwhelmed', 'encouragement']);
  const [energyScore, setEnergyScore] = useState<number>(6);
  const [reflectionText, setReflectionText] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync initial feeling passed from Home if any
  useEffect(() => {
    if (initialFeeling && !selectedStates.includes(initialFeeling)) {
      setSelectedStates((prev) => [...prev, initialFeeling]);
    }
  }, [initialFeeling]);

  const emotionList = [
    { id: 'encouragement', label: 'I need encouragement', icon: Heart },
    { id: 'anxious', label: 'I feel anxious', icon: Wind },
    { id: 'overwhelmed', label: 'I feel overwhelmed', icon: Waves },
    { id: 'lonely', label: 'I feel lonely', icon: Home },
    { id: 'stuck', label: 'I feel stuck', icon: Hourglass },
    { id: 'hopeful', label: 'I feel hopeful', icon: Sun },
    { id: 'grateful', label: 'I feel grateful', icon: Flower2 },
    { id: 'exhausted', label: 'I feel exhausted', icon: Moon },
  ];

  const toggleState = (id: string) => {
    setSelectedStates((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleVoiceInput = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your reflection.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setReflectionText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const wordCount = reflectionText.trim() ? reflectionText.trim().split(/\s+/).length : 0;
  const currentDialInfo = ENERGY_LEVEL_DESCRIPTIONS[energyScore] || ENERGY_LEVEL_DESCRIPTIONS[6];

  const selectedLabels = emotionList
    .filter((e) => selectedStates.includes(e.id))
    .map((e) => e.label);

  const handleGenerateStory = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feelings: selectedLabels,
          score: energyScore,
          reflection: reflectionText,
          resonanceCategory: currentDialInfo.title,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onStoryGenerated(data.story);
        setIsGenerating(false);
        return;
      }
    } catch {
      // Fallback to local intelligent generative story
    }

    // Local instant empathetic story creation
    setTimeout(() => {
      const primaryFeeling = selectedLabels[0] || 'I feel overwhelmed';
      const secondaryFeeling = selectedLabels[1] || 'I need encouragement';

      const tailoredStory: Story = {
        id: `story-${Date.now()}`,
        title: 'The Shelter of the Willow',
        subtitle: `Generated for Maya · ${currentDialInfo.title}`,
        excerpt: 'When the wind bends the branch toward the brook, it is not breaking; it is drinking from the current.',
        fullStory: `Across the meadow, where the wild clover met the cool winding stream, grew an ancient silver willow. For seventy summers, storms had surged across the valley, and on days when the gale raged loudest, the other trees held rigid, trembling with the strain of resisting every gust.

The willow, however, had learned a secret rhythm. When the tempest gathered, she did not stiffen her spine. She let her longest boughs dip downward, brushing the glass surface of the stream, bowing with the wind rather than bruising against it.

A small thrush, exhausted from flying against the headwinds, nested deep inside the willow’s hollow trunk. "Tree," the bird tweeted through the rain, "are you not terrified that the torrent will tear your roots from the soil?"

The willow answered with a low, woody hum that vibrated through the earth: "When you feel overwhelmed, little one, do not waste your breath fighting the entire sky. Let your branches bend. The bend is not your ruin; it is how you keep your roots in the dark earth while the sky clears."

As twilight arrived, the wind subsided into a warm, gentle draft. The willow stood intact, her leaves glistening like silver coins in the evening light.

Whatever weight you hold today (${primaryFeeling}), remember: you do not have to carry the whole storm. Give yourself permission to bend, to breathe, and to trust your roots.`,
        readTime: '4 min read',
        audioDuration: '4:10',
        category: 'Compassion & Peace',
        tag: primaryFeeling,
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'The silver willow by the riverbank',
        quote: '“When you feel overwhelmed, do not waste your breath fighting the entire sky. Let your branches bend. The bend is how you keep your roots.”',
        date: 'Just now',
        isSaved: true,
        tailoredFor: [...selectedLabels, `${energyScore}/10 mood resonance`],
      };

      onStoryGenerated(tailoredStory);
      setIsGenerating(false);
    }, 1200);
  };

  const handleSaveOnly = () => {
    onSaveCheckInOnly({
      score: energyScore,
      tags: selectedLabels,
      note: reflectionText || 'Quiet mindful pause taken.',
      stateLabel: currentDialInfo.title,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto px-4 pt-3">
      {/* Header step progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BD5B3E]" />
            <span className="font-bold text-[11px] tracking-wider text-[#A34E34] uppercase">
              STEP 1 OF 3 • Emotional Weather
            </span>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF1EA] text-[#445E40] text-[11px] font-semibold">
            <span>🌿</span>
            <span>Safe Sanctuary</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#EFE8DC] overflow-hidden">
          <div className="h-full bg-[#BD5B3E] rounded-full transition-all duration-500 w-1/3" />
        </div>
      </div>

      {/* Main Title & Prompt */}
      <div className="space-y-1.5">
        <h1 className="font-serif text-3xl font-bold text-[#2E2A27] tracking-tight leading-tight">
          How does your inner sky feel right now?
        </h1>
        <p className="text-xs text-[#7A7166] leading-relaxed">
          There are no wrong answers here. Take a breath and choose what speaks softly to you.
        </p>
      </div>

      {/* Section 1: Emotional Needs & Current State */}
      <div className="p-5 rounded-3xl bg-white border border-[#EAE1D3] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#BD5B3E]/60" />
            <h3 className="font-serif text-sm font-semibold text-[#2E2A27]">
              Emotional Needs & Current State
            </h3>
          </div>
          <span className="text-[11px] text-[#8C8379]">Select all that apply</span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {emotionList.map((item) => {
            const isSelected = selectedStates.includes(item.id);
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => toggleState(item.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#FBECE6] border border-[#E4957D] text-[#963E27] shadow-xs'
                    : 'bg-[#FAF5EE] border border-[#EBE1D3] text-[#554C43] hover:bg-[#F3EBE0]'
                } active:scale-95`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#BD5B3E]' : 'text-[#8A8177]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Energy & Resonance Dial */}
      <div className="p-5 rounded-3xl bg-white border border-[#EAE1D3] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs">🌅</span>
            <h3 className="font-serif text-sm font-semibold text-[#2E2A27]">
              Energy & Resonance Dial
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FAF5EE] text-[#7A6F64] font-mono text-xs font-semibold">
            {energyScore} / 10
          </span>
        </div>

        {/* Dynamic Descriptive State Card */}
        <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EBE1D2] text-center space-y-1">
          <h4 className="font-serif text-xl font-bold text-[#A34E34]">
            {currentDialInfo.title}
          </h4>
          <p className="text-xs text-[#7A7166] leading-relaxed max-w-xs mx-auto">
            {currentDialInfo.subtitle}
          </p>
        </div>

        {/* Slider Input */}
        <div className="space-y-2 pt-1">
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={energyScore}
            onChange={(e) => setEnergyScore(parseInt(e.target.value))}
            className="w-full h-2 bg-[#EAE2D5] rounded-lg appearance-none cursor-pointer accent-[#BD5B3E]"
          />
          <div className="flex justify-between text-[10px] text-[#8C8276] font-medium px-1">
            <span>Heavy & Foggy (1–3)</span>
            <span>Steady & Grounded (4–7)</span>
            <span>Luminous (8–10)</span>
          </div>
        </div>
      </div>

      {/* Section 3: Mindful Reflection (Optional) */}
      <div className="p-5 rounded-3xl bg-white border border-[#EAE1D3] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs">📝</span>
            <h3 className="font-serif text-sm font-semibold text-[#2E2A27]">
              Mindful Reflection <span className="text-[11px] font-normal text-[#8A8177]">(Optional)</span>
            </h3>
          </div>
          <button
            onClick={handleVoiceInput}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              isRecording
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-[#FAF5EE] border-[#E8DED1] text-[#61574D] hover:bg-[#F2EAE0]'
            }`}
          >
            {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span>{isRecording ? 'Listening...' : 'Speak'}</span>
          </button>
        </div>

        {/* Prompt suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setReflectionText((prev) => (prev ? `${prev} ` : '') + 'What weighed on me was ')}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-[#FAF5EE] border border-[#ECE2D5] text-[#61574E] text-[11px] hover:bg-[#F3ECE1]"
          >
            “What weighed on you today?”
          </button>
          <button
            onClick={() => setReflectionText((prev) => (prev ? `${prev} ` : '') + 'A tiny spark was ')}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-[#FAF5EE] border border-[#ECE2D5] text-[#61574E] text-[11px] hover:bg-[#F3ECE1]"
          >
            “What brought a tiny spark?”
          </button>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={3}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Write what's on your heart, or leave this blank. Even a single word is enough..."
            className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE0D3] text-xs text-[#2E2A27] placeholder:text-[#9A9084] focus:outline-none focus:ring-2 focus:ring-[#BD5B3E]/30 resize-none font-serif leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#8C8379] px-1">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#7B9277]" />
            <span>Encrypted & private</span>
          </div>
          <span>{wordCount} words</span>
        </div>
      </div>

      {/* Section 4: Personalised Solace Story Companion CTA */}
      <div className="p-5 rounded-3xl bg-[#FAF5EE] border border-[#EBE1D2] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#BD5B3E]" />
          <div>
            <h3 className="font-serif text-lg font-bold text-[#2E2A27]">
              Personalised Solace Story
            </h3>
            <p className="text-[11px] text-[#8A8177]">Immediate Narrative Companion</p>
          </div>
        </div>

        {/* Tailoring badges */}
        <div className="p-3 rounded-2xl bg-white border border-[#EBE1D3] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34E34] block">
            TAILORING NARRATIVE USING:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {selectedLabels.map((lbl, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#63594F] text-[11px] font-medium"
              >
                • {lbl}
              </span>
            ))}
            <span className="px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#63594F] text-[11px] font-medium">
              • {energyScore}/10 mood resonance
            </span>
          </div>
        </div>

        {/* Generate Story Button */}
        <button
          onClick={handleGenerateStory}
          disabled={isGenerating}
          className="w-full py-4 px-4 rounded-2xl bg-[#BD5B3E] hover:bg-[#A94C31] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-[#BD5B3E]/20 transition-all active:scale-[0.98] disabled:opacity-75"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Weaving your personal fable...</span>
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              <span>Generate My Story 🪄</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-[#8A8177] leading-relaxed">
          Crafted with empathy, human warmth, and hopeful perspective.
        </p>

        {/* Skip & save link */}
        <div className="text-center pt-1 border-t border-[#EDE5DA]">
          <button
            onClick={handleSaveOnly}
            className="text-xs font-semibold text-[#8A8177] hover:text-[#2E2A27] underline decoration-[#D0C5B7]"
          >
            Skip story and save check-in only
          </button>
        </div>

        {savedNotice && (
          <div className="p-2.5 rounded-xl bg-[#EBF1EA] text-[#3B5438] text-xs font-medium text-center animate-fade-in flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5" /> Check-in saved to your sanctuary rhythm!
          </div>
        )}
      </div>
    </div>
  );
};
