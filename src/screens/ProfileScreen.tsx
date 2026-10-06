import React, { useState } from 'react';
import { ASSETS } from '../assets';
import { Leaf, Bell, Sparkles, Heart, Download, ShieldCheck, Moon, Sun, ArrowRight, Volume2, Check } from 'lucide-react';

interface ProfileScreenProps {
  onOpenCareTeamModal: () => void;
  onOpenCrisis: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenCareTeamModal,
  onOpenCrisis,
}) => {
  const [reminderTime, setReminderTime] = useState('08:30');
  const [narratorVoice, setNarratorVoice] = useState('Gentle & Warm');
  const [ambientDefault, setAmbientDefault] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto px-4 pt-3">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[#2E2A27] tracking-tight">
          Sanctuary Profile
        </h1>
        <p className="text-xs text-[#7A7166]">
          Your sacred space for reflection, rhythms, and gentle care.
        </p>
      </div>

      {/* User Card */}
      <div className="p-5 rounded-3xl bg-white border border-[#EAE1D3] shadow-xs flex items-center gap-4">
        <div className="w-18 h-18 rounded-full overflow-hidden ring-4 ring-[#BD5B3E]/20 shrink-0">
          <img
            src={ASSETS.mayaProfile}
            alt="Maya"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-bold text-[#2E2A27]">
            Maya Vance
          </h2>
          <p className="text-xs text-[#7E7469]">
            Walking the path of gentle self-attunement
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1EA] text-[#445E40] text-[11px] font-semibold">
            <Leaf className="w-3.5 h-3.5" />
            <span>Day 14 Continuous Streak</span>
          </div>
        </div>
      </div>

      {/* Rhythms Numbers */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#EAE1D3] text-center space-y-1 shadow-2xs">
          <span className="font-serif text-2xl font-bold text-[#BD5B3E]">14</span>
          <p className="text-xs text-[#8A8177]">Day Streak</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#EAE1D3] text-center space-y-1 shadow-2xs">
          <span className="font-serif text-2xl font-bold text-[#6D8766]">42</span>
          <p className="text-xs text-[#8A8177]">Check-Ins</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#EAE1D3] text-center space-y-1 shadow-2xs">
          <span className="font-serif text-2xl font-bold text-[#A86E4B]">14</span>
          <p className="text-xs text-[#8A8177]">Stories Crafted</p>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="p-5 rounded-3xl bg-white border border-[#EAE1D3] shadow-xs space-y-4">
        <h3 className="font-serif text-base font-bold text-[#2E2A27]">
          Sanctuary Preferences
        </h3>

        <div className="space-y-3 text-xs">
          {/* Daily Reminder */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#BD5B3E] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#2E2A27]">Morning Gentle Whisper</p>
                <p className="text-[11px] text-[#8A8177]">Daily reminder to take a soft breath</p>
              </div>
            </div>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-[#DDD3C5] bg-[#FAF7F2] font-medium text-[#2E2A27]"
            />
          </div>

          <div className="border-t border-[#F2ECE4]" />

          {/* Voice Selection */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#7A9375] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#2E2A27]">Audio Narrator Cadence</p>
                <p className="text-[11px] text-[#8A8177]">Paced for relaxation & comfort</p>
              </div>
            </div>
            <select
              value={narratorVoice}
              onChange={(e) => setNarratorVoice(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-[#DDD3C5] bg-[#FAF7F2] font-medium text-[#2E2A27]"
            >
              <option>Gentle & Warm</option>
              <option>Reflective Sage</option>
              <option>Comforting Hearth</option>
            </select>
          </div>

          <div className="border-t border-[#F2ECE4]" />

          {/* Ambient Soundscape */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#BD5B3E] flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-[#2E2A27]">Ambient Soundscape</p>
                <p className="text-[11px] text-[#8A8177]">Play soothing nature background in reader</p>
              </div>
            </div>
            <button
              onClick={() => setAmbientDefault(!ambientDefault)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                ambientDefault ? 'bg-[#BD5B3E]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  ambientDefault ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 px-4 rounded-xl bg-[#FAF5EE] border border-[#E6DCD0] text-xs font-semibold text-[#4A423B] hover:bg-[#F2EAE0] transition-colors flex items-center justify-center gap-1.5"
        >
          {saved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Preferences Saved
            </>
          ) : (
            'Save Preferences'
          )}
        </button>
      </div>

      {/* Care Team Integration */}
      <div className="p-5 rounded-3xl bg-[#FAF5EE] border border-[#EBE1D2] space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#BD5B3E]" />
          <h3 className="font-serif text-sm font-bold text-[#2E2A27]">
            Care Team Sharing
          </h3>
        </div>
        <p className="text-xs text-[#7A7166] leading-relaxed">
          Generate a 7-day longitudinal reflection report connecting your emotional weather, sleep notes, and nourishing factors for your therapist or doctor.
        </p>
        <button
          onClick={onOpenCareTeamModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E5DCD0] text-xs font-semibold text-[#BD5B3E] hover:bg-[#FAF4ED] shadow-2xs transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Reflection Summary (.txt / report)</span>
        </button>
      </div>

      {/* Crisis & Safety Banner */}
      <div className="p-4 rounded-2xl bg-[#FDF2EE] border border-[#F6D3C6] flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-[#933D24]">Peaceful Crisis Sanctuary</h4>
          <p className="text-[11px] text-[#7A5A4E]">24/7 Lifeline and grounding breathwork</p>
        </div>
        <button
          onClick={onOpenCrisis}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-[#F0BCAB] text-xs font-semibold text-[#BD5B3E] hover:bg-[#FDF0EC] shrink-0"
        >
          Open Support
        </button>
      </div>

      {/* Encryption statement */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C8379] pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#7A9375]" />
        <span>End-to-end encrypted on this device. Your feelings are private.</span>
      </div>
    </div>
  );
};
