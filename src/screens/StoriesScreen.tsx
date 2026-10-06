import React, { useState } from 'react';
import { Story } from '../types';
import { Bookmark, Clock, Headphones, ArrowRight, Play, Volume2, PenTool, Sparkles } from 'lucide-react';

interface StoriesScreenProps {
  stories: Story[];
  onOpenStoryReader: (story: Story) => void;
  onPlayAudio: (story: Story) => void;
  onToggleBookmark: (storyId: string) => void;
  onRequestNewStory: () => void;
}

export const StoriesScreen: React.FC<StoriesScreenProps> = ({
  stories,
  onOpenStoryReader,
  onPlayAudio,
  onToggleBookmark,
  onRequestNewStory,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredStories = stories.filter((s) => {
    if (filter === 'saved') return s.isSaved;
    if (filter === 'encouragement') return s.category.toLowerCase().includes('encouragement');
    if (filter === 'anxiety') return s.category.toLowerCase().includes('anxiety');
    return true;
  });

  const featured = stories.find((s) => s.id === 'weaver-broken-thread') || stories[0];

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto px-4 pt-3">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1EA] text-[#445E40] text-xs font-semibold">
            <span>📖</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">YOUR HAVEN</span>
          </div>
          <span className="text-xs text-[#8A8177] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BD5B3E]" />
            <span>14 Stories Written</span>
          </span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#2E2A27] tracking-tight">
          My Stories
        </h1>
        <p className="text-xs text-[#7A7166] leading-relaxed">
          Handcrafted narratives from your emotional journeys.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-medium transition-all ${
            filter === 'all'
              ? 'bg-[#BD5B3E] text-white shadow-xs'
              : 'bg-white border border-[#E8DFD3] text-[#63594F] hover:bg-[#FAF5EE]'
          }`}
        >
          All Stories ({stories.length})
        </button>
        <button
          onClick={() => setFilter('saved')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-medium transition-all flex items-center gap-1.5 ${
            filter === 'saved'
              ? 'bg-[#BD5B3E] text-white shadow-xs'
              : 'bg-white border border-[#E8DFD3] text-[#63594F] hover:bg-[#FAF5EE]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <span>Saved ({stories.filter((s) => s.isSaved).length})</span>
        </button>
        <button
          onClick={() => setFilter('encouragement')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-medium transition-all ${
            filter === 'encouragement'
              ? 'bg-[#BD5B3E] text-white shadow-xs'
              : 'bg-white border border-[#E8DFD3] text-[#63594F] hover:bg-[#FAF5EE]'
          }`}
        >
          Encouragement (6)
        </button>
        <button
          onClick={() => setFilter('anxiety')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-medium transition-all ${
            filter === 'anxiety'
              ? 'bg-[#BD5B3E] text-white shadow-xs'
              : 'bg-white border border-[#E8DFD3] text-[#63594F] hover:bg-[#FAF5EE]'
          }`}
        >
          Anxiety Relief (4)
        </button>
      </div>

      {/* Featured Most Recent Reflection */}
      {featured && filter === 'all' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[10px] tracking-wider text-[#A34E34] uppercase">
              MOST RECENT REFLECTION
            </span>
            <span className="text-[#8A8177]">Generated Oct 24</span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#EAE1D3] shadow-xs space-y-4">
            {/* Top pill badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF5EE] border border-[#EAE0D2] text-[#61574D] text-[11px] font-medium">
                  {featured.tag}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF1EA] text-[#445E40] text-[11px] font-semibold">
                  <Clock className="w-3 h-3" /> {featured.readTime}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDF2EE] text-[#BD5B3E] text-[11px] font-semibold">
                  <Headphones className="w-3 h-3" /> Audio ready
                </span>
              </div>
              <button
                onClick={() => onToggleBookmark(featured.id)}
                className="text-[#8A8177] hover:text-[#BD5B3E]"
              >
                <Bookmark className={`w-4 h-4 ${featured.isSaved ? 'fill-[#BD5B3E] text-[#BD5B3E]' : ''}`} />
              </button>
            </div>

            {/* Illustration */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xs border border-[#EAE1D3]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
              {featured.imageCaption && (
                <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-medium">
                  {featured.imageCaption}
                </div>
              )}
            </div>

            {/* Title & Quote */}
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#2E2A27] leading-tight">
                {featured.title}
              </h3>
              <blockquote className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#EBE1D2] font-serif text-xs text-[#4A423B] italic leading-relaxed">
                {featured.quote}
              </blockquote>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenStoryReader(featured)}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#BD5B3E] hover:bg-[#A94C31] text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onPlayAudio(featured)}
                className="py-3 px-4 rounded-2xl bg-[#FAF5EE] border border-[#E6DCD0] text-[#4F453D] hover:bg-[#F2EAE0] font-medium text-xs flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#BD5B3E]" />
                <span>Listen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Library */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#2E2A27]">
            Story Library
          </h3>
          <span className="text-xs text-[#8A8177]">Curated for your heart</span>
        </div>

        <div className="space-y-3">
          {filteredStories
            .filter((s) => filter !== 'all' || s.id !== 'weaver-broken-thread')
            .map((story) => (
              <div
                key={story.id}
                className="p-3.5 rounded-2xl bg-white border border-[#EAE1D3] shadow-2xs flex gap-3.5 items-center hover:border-[#DECFC0] transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#EDE4D8]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#445E40] text-[10px] font-semibold">
                      {story.category}
                    </span>
                    <button
                      onClick={() => onToggleBookmark(story.id)}
                      className="text-[#8C8379] hover:text-[#BD5B3E]"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${story.isSaved ? 'fill-[#BD5B3E] text-[#BD5B3E]' : ''}`} />
                    </button>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-[#2E2A27] truncate">
                    {story.title}
                  </h4>
                  <p className="text-[11px] text-[#7A7166] truncate">
                    {story.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-[#8C8276]">
                    <span>Created {story.date} • {story.readTime}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlayAudio(story)}
                        className="text-[#BD5B3E] hover:underline"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenStoryReader(story)}
                        className="font-semibold text-[#BD5B3E] hover:underline flex items-center gap-0.5"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* New Chapter / Request Story Card */}
      <div className="p-5 rounded-3xl bg-[#FAF5EE] border border-[#EBE1D2] space-y-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FBECE6] text-[#BD5B3E] flex items-center justify-center shrink-0">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34E34]">
              NEW CHAPTER
            </span>
            <h4 className="font-serif text-base font-bold text-[#2E2A27]">
              Need a new story for this exact moment?
            </h4>
          </div>
        </div>

        <p className="text-xs text-[#7A7166] leading-relaxed">
          Share your present state of mind, and let Solace craft a fable tailored to cradle your feelings today.
        </p>

        <button
          onClick={onRequestNewStory}
          className="w-full py-3 px-4 rounded-2xl bg-[#BD5B3E] hover:bg-[#A94C31] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Request Story</span>
        </button>
      </div>
    </div>
  );
};
