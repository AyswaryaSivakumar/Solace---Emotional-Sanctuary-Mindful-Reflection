import React, { useState } from 'react';
import { ASSETS } from '../assets';
import { X, Sparkles, Bell, Shield, Download, Heart, Leaf, BookOpen, Check } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportCareTeam: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onExportCareTeam,
}) => {
  const [reminderTime, setReminderTime] = useState('08:30');
  const [ambientVoice, setAmbientVoice] = useState('Gentle & Warm');
  const [savedSettings, setSavedSettings] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSettings(true);
    setTimeout(() => {
      setSavedSettings(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-md rounded-3xl shadow-2xl border border-[#EDE4D8] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-[#EAE1D3]">
          <h3 className="font-serif text-lg font-semibold text-[#2E2A27]">
            Sanctuary Profile
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E5DCD0] text-stone-600 flex items-center justify-center hover:bg-stone-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          {/* User Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#EAE1D3] shadow-xs">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-3 ring-[#BD5B3E]/30 shrink-0">
              <img
                src={ASSETS.mayaProfile}
                alt="Maya"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#2E2A27]">Maya Vance</h4>
              <p className="text-xs text-[#7F766C]">Walking the path of gentle self-attunement</p>
              <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-[#EBF1EA] text-[#445E40] text-[11px] font-semibold">
                <Leaf className="w-3 h-3" /> Day 14 Continuous Streak
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-2xl bg-white border border-[#EAE1D3]">
              <span className="font-serif text-xl font-bold text-[#BD5B3E]">14</span>
              <p className="text-[11px] text-[#857B70] mt-0.5">Day Streak</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#EAE1D3]">
              <span className="font-serif text-xl font-bold text-[#6D8766]">42</span>
              <p className="text-[11px] text-[#857B70] mt-0.5">Check-Ins</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#EAE1D3]">
              <span className="font-serif text-xl font-bold text-[#A86E4B]">14</span>
              <p className="text-[11px] text-[#857B70] mt-0.5">Stories Read</p>
            </div>
          </div>

          {/* Sanctuary Rhythms */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#3D352F]">
              Sanctuary Preferences
            </h4>

            <div className="p-3.5 rounded-2xl bg-white border border-[#EAE1D3] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#BD5B3E]" />
                  <span className="text-xs font-medium text-[#3D352F]">Morning Check-In Whisper</span>
                </div>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-2 py-1 rounded-lg border border-[#DDD3C5] bg-[#FAF7F2] text-xs font-medium text-[#3D352F]"
                />
              </div>

              <div className="border-t border-[#F2EDE5] pt-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7A9375]" />
                  <span className="text-xs font-medium text-[#3D352F]">Narrative Voice Tone</span>
                </div>
                <select
                  value={ambientVoice}
                  onChange={(e) => setAmbientVoice(e.target.value)}
                  className="px-2 py-1 rounded-lg border border-[#DDD3C5] bg-[#FAF7F2] text-xs font-medium text-[#3D352F]"
                >
                  <option>Gentle & Warm</option>
                  <option>Reflective Sage</option>
                  <option>Comforting Hearth</option>
                </select>
              </div>
            </div>
          </div>

          {/* Care Team Sharing */}
          <div className="p-4 rounded-2xl bg-[#F6EFE6] border border-[#E6D9C8] space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#BD5B3E]" />
              <h5 className="text-xs font-semibold text-[#3D352F]">
                Care Team Integration
              </h5>
            </div>
            <p className="text-[11px] text-[#736A60] leading-relaxed">
              Generate a weekly longitudinal summary of your emotional weather, sleep notes, and nourishing factors for your therapist or counselor.
            </p>
            <button
              onClick={onExportCareTeam}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#D9CCBD] text-xs font-medium text-[#BD5B3E] hover:bg-[#FAF4ED] shadow-xs"
            >
              <Download className="w-3.5 h-3.5" /> Export Reflection Summary
            </button>
          </div>

          {/* Privacy statement */}
          <div className="flex items-center gap-2 px-1 text-[11px] text-[#8C8379]">
            <Shield className="w-3.5 h-3.5 text-[#7A9375] shrink-0" />
            <span>End-to-end client encrypted. Your inner thoughts never leave this sanctuary.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF5EE] border-t border-[#EAE0D2] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#7A7166] hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#BD5B3E] text-white text-xs font-medium hover:bg-[#A94E34] transition-colors inline-flex items-center gap-1.5 shadow-xs"
          >
            {savedSettings ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
