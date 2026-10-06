import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, MessageSquare, Shield, Wind, Sparkles, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';

interface PeacefulCrisisSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PeacefulCrisisSupportModal: React.FC<PeacefulCrisisSupportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'breathe' | 'ground' | 'hotlines'>('breathe');
  const [breathePhase, setBreathePhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breatheTimer, setBreatheTimer] = useState(4);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [checkedGrounding, setCheckedGrounding] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // 4-7-8 Breathing Cycle
  useEffect(() => {
    if (!isOpen || activeTab !== 'breathe') return;

    let currentPhase: 'Inhale' | 'Hold' | 'Exhale' = 'Inhale';
    let timeLeft = 4;
    setBreathePhase('Inhale');
    setBreatheTimer(4);

    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        if (currentPhase === 'Inhale') {
          currentPhase = 'Hold';
          timeLeft = 7;
        } else if (currentPhase === 'Hold') {
          currentPhase = 'Exhale';
          timeLeft = 8;
        } else {
          currentPhase = 'Inhale';
          timeLeft = 4;
        }
        setBreathePhase(currentPhase);
      }
      setBreatheTimer(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, activeTab]);

  // Ambient sound synthesis (Gentle pink noise / singing bowl drone)
  const toggleAmbientSound = () => {
    if (ambientPlaying) {
      if (oscillatorNodeRef.current) {
        try {
          oscillatorNodeRef.current.stop();
        } catch {
          // ignore
        }
      }
      setAmbientPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Create warm singing bowl chord with dual sine oscillators
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(216, ctx.currentTime); // 432Hz harmonic / peaceful Solfeggio frequency

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(218, ctx.currentTime); // gentle warm beating

        gain.gain.setValueAtTime(0.08, ctx.currentTime);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        oscillatorNodeRef.current = osc1;
        gainNodeRef.current = gain;
        setAmbientPlaying(true);
      } catch (e) {
        console.error('Audio failed', e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorNodeRef.current) {
        try {
          oscillatorNodeRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const groundingSteps = [
    { count: '5', label: 'Things you can see around you', hint: 'Look for colors, shadows, gentle light' },
    { count: '4', label: 'Things you can physically touch', hint: 'Feel the fabric of your sleeve, the floor under your feet' },
    { count: '3', label: 'Things you can softly hear', hint: 'Distance hum, wind, your own steady breath' },
    { count: '2', label: 'Things you can smell', hint: 'Tea, crisp air, wood, or fresh paper' },
    { count: '1', label: 'Kind truth you can give yourself', hint: 'You are safe in this present moment.' },
  ];

  const toggleGroundingItem = (index: number) => {
    setCheckedGrounding((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-md rounded-3xl shadow-2xl border border-[#EBE3D7] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#F8EFE6] px-5 py-4 border-b border-[#E8DCD0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#BD5B3E]/10 flex items-center justify-center text-[#BD5B3E]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#2E2A27]">
                Peaceful Sanctuary Support
              </h3>
              <p className="text-xs text-[#82786F]">You are safe. There is no rush.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-600 flex items-center justify-center shadow-xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="px-5 pt-3 pb-1 border-b border-[#EDE4D8] flex gap-2">
          <button
            onClick={() => setActiveTab('breathe')}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'breathe'
                ? 'bg-[#BD5B3E] text-white shadow-xs'
                : 'bg-white text-[#73695F] hover:bg-stone-100'
            }`}
          >
            Breathe (4-7-8)
          </button>
          <button
            onClick={() => setActiveTab('ground')}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'ground'
                ? 'bg-[#BD5B3E] text-white shadow-xs'
                : 'bg-white text-[#73695F] hover:bg-stone-100'
            }`}
          >
            5-4-3-2-1 Grounding
          </button>
          <button
            onClick={() => setActiveTab('hotlines')}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'hotlines'
                ? 'bg-[#BD5B3E] text-white shadow-xs'
                : 'bg-white text-[#73695F] hover:bg-stone-100'
            }`}
          >
            Immediate Help
          </button>
        </div>

        {/* Content area */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'breathe' && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="relative w-48 h-48 flex items-center justify-center my-3">
                {/* Outer animated ripple */}
                <div
                  className={`absolute rounded-full transition-all duration-1000 ease-in-out ${
                    breathePhase === 'Inhale'
                      ? 'w-44 h-44 bg-[#C26145]/20 scale-110'
                      : breathePhase === 'Hold'
                      ? 'w-44 h-44 bg-[#889A84]/25 scale-105'
                      : 'w-28 h-28 bg-[#C26145]/15 scale-90'
                  }`}
                />
                {/* Core Circle */}
                <div
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-md transition-all duration-700 ${
                    breathePhase === 'Inhale'
                      ? 'bg-[#C26145] text-white'
                      : breathePhase === 'Hold'
                      ? 'bg-[#7B9277] text-white'
                      : 'bg-[#D97D62] text-white'
                  }`}
                >
                  <Wind className="w-6 h-6 mb-1 opacity-90 animate-pulse" />
                  <span className="font-serif text-lg font-semibold">{breathePhase}</span>
                  <span className="text-xs opacity-90 mt-0.5">{breatheTimer}s</span>
                </div>
              </div>

              <p className="text-sm font-serif text-[#3D3631] mt-2 max-w-xs">
                {breathePhase === 'Inhale' && 'Slowly breathe in peace through your nose...'}
                {breathePhase === 'Hold' && 'Hold gently. Let your shoulders soften down...'}
                {breathePhase === 'Exhale' && 'Release slowly through parted lips. Let tension go...'}
              </p>

              {/* Ambient Singing Bowl Toggle */}
              <button
                onClick={toggleAmbientSound}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6DCCF] text-xs font-medium text-[#6B6156] hover:bg-[#FAF4ED] shadow-xs transition-colors"
              >
                {ambientPlaying ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#BD5B3E]" />
                    <span>Mute Soothing Harmonic Drone</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#7B9277]" />
                    <span>Play Soothing Harmonic Drone (432Hz)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === 'ground' && (
            <div className="space-y-2.5">
              <p className="text-xs text-[#7B7166] leading-relaxed">
                When anxious thoughts race, anchoring in the sensory world brings your nervous system back to safety.
              </p>
              {groundingSteps.map((step, idx) => {
                const isChecked = checkedGrounding.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleGroundingItem(idx)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-[#EBF1EA] border-[#AEC5AC] text-[#334631]'
                        : 'bg-white border-[#EDE5DA] text-[#3D3631] hover:border-[#D5C7B5]'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-semibold text-xs transition-colors ${
                        isChecked
                          ? 'bg-[#6D8A68] text-white'
                          : 'bg-[#F2ECE3] text-[#73695F]'
                      }`}
                    >
                      {isChecked ? <CheckCircle2 className="w-4 h-4" /> : step.count}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold">{step.label}</h4>
                      <p className="text-[11px] text-[#857B70] mt-0.5">{step.hint}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'hotlines' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#FDF2EE] border border-[#F6D2C4] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#BD5B3E] animate-ping" />
                  <h4 className="font-semibold text-sm text-[#933D24]">
                    988 Suicide & Crisis Lifeline
                  </h4>
                </div>
                <p className="text-xs text-[#7C5648] leading-relaxed">
                  Free, confidential support available 24/7. Call or text anytime.
                </p>
                <div className="flex gap-2 pt-1">
                  <a
                    href="tel:988"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#BD5B3E] text-white text-xs font-medium hover:bg-[#A94C31] shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call 988
                  </a>
                  <a
                    href="sms:988"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-[#F0BCAB] text-[#BD5B3E] text-xs font-medium hover:bg-[#FDF0EC]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Text 988
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EDE4D8] space-y-1.5">
                <h4 className="font-semibold text-xs text-[#3D3631]">Crisis Text Line</h4>
                <p className="text-[11px] text-[#7A7167]">Text with a compassionate volunteer crisis counselor.</p>
                <a
                  href="sms:741741?&body=HOME"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BD5B3E] hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Text HOME to 741741
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EDE4D8] space-y-1.5">
                <h4 className="font-semibold text-xs text-[#3D3631]">The Trevor Project (LGBTQ+ Youth)</h4>
                <p className="text-[11px] text-[#7A7167]">24/7 confidential crisis intervention.</p>
                <div className="flex gap-3 text-xs font-semibold text-[#BD5B3E]">
                  <a href="tel:18664887386" className="hover:underline">Call 1-866-488-7386</a>
                  <span>·</span>
                  <a href="sms:678678?&body=START" className="hover:underline">Text START to 678-678</a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF5EE] border-t border-[#EBE1D4] text-center">
          <p className="text-[11px] text-[#8C8276]">
            Take all the time you need. Solace is here whenever you return.
          </p>
        </div>
      </div>
    </div>
  );
};
