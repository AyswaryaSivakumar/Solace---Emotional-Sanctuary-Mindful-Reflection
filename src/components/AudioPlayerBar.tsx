import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { Play, Pause, X, Volume2, SkipForward, Sparkles } from 'lucide-react';

interface AudioPlayerBarProps {
  currentStory: Story | null;
  onClose: () => void;
  onOpenReader: (story: Story) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentStory,
  onClose,
  onOpenReader,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    if (!currentStory) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentStory.fullStory);
      utterance.rate = 0.88;
      utterance.pitch = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const warmVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') || v.name.includes('Serena') || v.name.includes('Samantha') || v.name.includes('Google US English'))
      );
      if (warmVoice) utterance.voice = warmVoice;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }

    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 98 : prev + 1));
    }, 2000);

    return () => {
      clearInterval(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStory]);

  if (!currentStory) return null;

  const togglePlay = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleClose = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 px-3 pb-1 max-w-md mx-auto animate-fade-in-up">
      <div className="bg-[#2E2A27] text-white p-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-stone-700/60 backdrop-blur-md">
        {/* Cover thumbnail */}
        <div
          onClick={() => onOpenReader(currentStory)}
          className="w-10 h-10 rounded-xl overflow-hidden shrink-0 cursor-pointer border border-white/10"
        >
          <img
            src={currentStory.image}
            alt={currentStory.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div
          onClick={() => onOpenReader(currentStory)}
          className="flex-1 min-w-0 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BD5B3E] animate-ping" />
            <h5 className="font-serif text-xs font-semibold text-white truncate">
              {currentStory.title}
            </h5>
          </div>
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-[#BD5B3E] h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-stone-300 mt-0.5">
            <span>Gentle Narrator</span>
            <span>{currentStory.audioDuration}</span>
          </div>
        </div>

        {/* Play/Pause & Close buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-[#BD5B3E] hover:bg-[#A94C31] text-white flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full text-stone-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
