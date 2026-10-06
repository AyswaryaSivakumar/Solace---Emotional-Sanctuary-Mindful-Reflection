import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { X, Bookmark, Share2, Volume2, VolumeX, Pause, Play, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';

interface StoryReaderModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleBookmark: (storyId: string) => void;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({
  story,
  isOpen,
  onClose,
  onToggleBookmark,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra'>('normal');
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Stop speech when closing or changing story
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [story, isOpen]);

  if (!isOpen || !story) return null;

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(story.fullStory);
      utterance.rate = 0.88; // Gentle, soothing unhurried cadence
      utterance.pitch = 0.95;

      // Pick a soft English voice if available
      const voices = window.speechSynthesis.getVoices();
      const warmVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') || v.name.includes('Serena') || v.name.includes('Samantha') || v.name.includes('Google US English'))
      );
      if (warmVoice) {
        utterance.voice = warmVoice;
      }

      utterance.onend = () => setIsPlayingSpeech(false);
      utterance.onerror = () => setIsPlayingSpeech(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingSpeech(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.quote,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`"${story.quote}" — From Solace: ${story.title}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fontClasses = {
    normal: 'text-[16px] leading-[1.8]',
    large: 'text-[18px] leading-[1.85]',
    extra: 'text-[20px] leading-[1.9]',
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl shadow-2xl border border-[#EDE4D8] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top sticky controls */}
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-md px-5 py-3.5 border-b border-[#EAE1D3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setFontSize((prev) => (prev === 'normal' ? 'large' : prev === 'large' ? 'extra' : 'normal'))
              }
              className="px-2.5 py-1 rounded-lg bg-white border border-[#E4D9CC] text-xs font-serif font-medium text-[#6B6156] hover:bg-stone-50"
              title="Adjust text size"
            >
              A{fontSize === 'normal' ? '' : fontSize === 'large' ? '+' : '++'}
            </button>
            <button
              onClick={handleToggleSpeech}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                isPlayingSpeech
                  ? 'bg-[#BD5B3E] text-white border-[#BD5B3E]'
                  : 'bg-white text-[#73695F] border-[#E4D9CC] hover:bg-stone-50'
              }`}
            >
              {isPlayingSpeech ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pause Audio
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Listen ({story.audioDuration})
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleBookmark(story.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                story.isSaved
                  ? 'bg-[#FBECE6] text-[#BD5B3E]'
                  : 'bg-white text-[#8A8177] hover:text-[#2E2A27]'
              } border border-[#E6DDD1]`}
              aria-label="Bookmark story"
            >
              <Bookmark className={`w-4 h-4 ${story.isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-white border border-[#E6DDD1] text-[#8A8177] hover:text-[#2E2A27] flex items-center justify-center transition-colors relative"
              aria-label="Share story"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -top-7 right-0 text-[10px] bg-stone-800 text-white px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#E6DDD1] text-[#635A52] hover:bg-stone-100 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Cover image */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#EAE1D3] aspect-[16/9]">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            {story.imageCaption && (
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium">
                {story.imageCaption}
              </div>
            )}
          </div>

          {/* Title & metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#8A8075]">
              <span className="px-2 py-0.5 rounded-full bg-[#EBF1EA] text-[#465E42] font-semibold text-[11px]">
                {story.category}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {story.readTime}
              </span>
              <span>·</span>
              <span>{story.date}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E2A27] leading-tight tracking-tight">
              {story.title}
            </h1>
          </div>

          {/* Golden quote callout */}
          <blockquote className="p-4 rounded-2xl bg-[#FBF3EB] border-l-4 border-[#BD5B3E] italic font-serif text-[#3D352F] text-base leading-relaxed">
            {story.quote}
          </blockquote>

          {/* Prose content */}
          <div className={`space-y-4 text-[#38322D] font-serif ${fontClasses}`}>
            {story.fullStory.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="tracking-wide">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Post-reading reflection takeaway */}
          <div className="p-5 rounded-2xl bg-[#EBF1EA]/60 border border-[#D5E3D3] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#445E40]">
              <Sparkles className="w-3.5 h-3.5 text-[#5C7E58]" />
              <span>Gentle Closing Breath</span>
            </div>
            <p className="text-xs text-[#4F604D] leading-relaxed">
              Place one hand upon your chest. Notice the rhythm that has carried you this far. What is one small kindness you can grant yourself today?
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#FAF5EE] border-t border-[#EAE0D2] flex justify-between items-center">
          <p className="text-xs text-[#8C8276] italic">
            Saved to your sanctuary library
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#BD5B3E] text-white text-xs font-medium hover:bg-[#A94E34] transition-colors shadow-xs"
          >
            Finished Reading
          </button>
        </div>
      </div>
    </div>
  );
};
