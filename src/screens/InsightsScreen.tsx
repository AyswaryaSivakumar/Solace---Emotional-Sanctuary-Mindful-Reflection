import React, { useState } from 'react';
import { ASSETS } from '../assets';
import { MoodLogEntry, Story } from '../types';
import { Sparkles, BookOpen, Heart, ArrowUpRight, Share2, Shield, ChevronDown, ChevronUp, Sun, Smile, Wind, Waves, Coffee } from 'lucide-react';

interface InsightsScreenProps {
  logs: MoodLogEntry[];
  onOpenCareTeamModal: () => void;
  onOpenStoryReaderByTitle: (title: string) => void;
}

export const InsightsScreen: React.FC<InsightsScreenProps> = ({
  logs,
  onOpenCareTeamModal,
  onOpenStoryReaderByTitle,
}) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('week');
  const [expandedLogId, setExpandedLogId] = useState<string | null>('log-1');
  const [selectedPoint, setSelectedPoint] = useState<{ day: string; score: number } | null>(null);

  const weekPoints = [
    { day: 'Mon', score: 6.8, cx: 30, cy: 90 },
    { day: 'Tue', score: 6.0, cx: 80, cy: 110 },
    { day: 'Wed', score: 4.8, cx: 130, cy: 135 },
    { day: 'Thu', score: 6.5, cx: 185, cy: 95 },
    { day: 'Fri', score: 7.4, cx: 240, cy: 75 },
    { day: 'Sat', score: 9.2, cx: 295, cy: 35, isPeak: true },
    { day: 'Sun', score: 7.2, cx: 350, cy: 80 },
  ];

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto px-4 pt-3">
      {/* Title & Badge */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-[#2E2A27] tracking-tight">
            Mood Patterns
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1EA] text-[#445E40] text-xs font-semibold">
            <span>🌿</span>
            <span>Steady Flow</span>
          </div>
        </div>
        <p className="text-xs text-[#7A7166] leading-relaxed">
          A non-judgmental mirror of your emotional weather and gentle daily rhythms.
        </p>
      </div>

      {/* Period Segmented Toggle */}
      <div className="p-1 rounded-2xl bg-[#EDE4D8] flex items-center gap-1">
        <button
          onClick={() => setPeriod('week')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            period === 'week'
              ? 'bg-white text-[#2E2A27] shadow-xs'
              : 'text-[#7D7368] hover:text-[#2E2A27]'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setPeriod('month')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            period === 'month'
              ? 'bg-white text-[#2E2A27] shadow-xs'
              : 'text-[#7D7368] hover:text-[#2E2A27]'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setPeriod('quarter')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            period === 'quarter'
              ? 'bg-white text-[#2E2A27] shadow-xs'
              : 'text-[#7D7368] hover:text-[#2E2A27]'
          }`}
        >
          3 Months
        </button>
      </div>

      {/* Overall Emotional Balance Card with Wavy Graph */}
      <div className="p-5 rounded-3xl bg-white border border-[#EAE1D3] shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[10px] tracking-wider text-[#A34E34] uppercase">
            OVERALL EMOTIONAL BALANCE
          </span>
          <span className="text-xs font-semibold text-[#665D54]">7.2 Avg Score</span>
        </div>

        <h3 className="font-serif text-xl font-bold text-[#2E2A27] leading-snug">
          Weekly Rhythm: Mostly Grounded & Reflective
        </h3>

        {/* Custom SVG Curve Chart */}
        <div className="relative pt-6 pb-2">
          {/* Peak Joy Pill */}
          <div className="absolute top-0 right-14 transform -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-[#BD5B3E] text-white text-[11px] font-semibold shadow-xs animate-bounce-subtle z-10">
            <Sun className="w-3 h-3 fill-current" />
            <span>Peak Joy</span>
          </div>

          <svg
            viewBox="0 0 380 160"
            className="w-full h-36 overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C26145" stopOpacity="0.28" />
                <stop offset="60%" stopColor="#C26145" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#C26145" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <path
              d="M 30 90 C 55 100, 60 110, 80 110 C 105 110, 110 135, 130 135 C 155 135, 160 95, 185 95 C 210 95, 215 75, 240 75 C 265 75, 270 35, 295 35 C 320 35, 330 80, 350 80 L 350 155 L 30 155 Z"
              fill="url(#curveGradient)"
            />

            {/* Stroke Line */}
            <path
              d="M 30 90 C 55 100, 60 110, 80 110 C 105 110, 110 135, 130 135 C 155 135, 160 95, 185 95 C 210 95, 215 75, 240 75 C 265 75, 270 35, 295 35 C 320 35, 330 80, 350 80"
              stroke="#BD5B3E"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Dots */}
            {weekPoints.map((pt, idx) => (
              <g
                key={idx}
                className="cursor-pointer"
                onClick={() => setSelectedPoint({ day: pt.day, score: pt.score })}
              >
                <circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r={pt.isPeak ? 5.5 : 4}
                  fill={pt.isPeak ? '#BD5B3E' : '#FFFFFF'}
                  stroke="#BD5B3E"
                  strokeWidth="2.5"
                  className="transition-transform hover:scale-125"
                />
              </g>
            ))}
          </svg>

          {/* Days Label Row */}
          <div className="flex justify-between text-xs text-[#8A8177] font-medium px-2 pt-1 border-t border-[#F0E8DC]">
            {weekPoints.map((pt, idx) => (
              <span
                key={idx}
                className={pt.day === 'Sat' ? 'font-bold text-[#BD5B3E]' : ''}
              >
                {pt.day}
              </span>
            ))}
          </div>
        </div>

        {selectedPoint && (
          <div className="p-2 rounded-xl bg-[#FAF5EE] text-xs text-[#52483E] text-center border border-[#ECE2D5] animate-fade-in">
            {selectedPoint.day}: Resonance score {selectedPoint.score}/10
          </div>
        )}

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F2EDE5] text-xs">
          <div className="flex items-center gap-2 text-[#465E42]">
            <span className="w-2 h-2 rounded-full bg-[#7B9277]" />
            <span className="font-medium">3 uninterrupted restful mornings</span>
          </div>
          <div className="flex items-center justify-end gap-1 text-[#BD5B3E] font-semibold">
            <span>+14% vs last week</span>
          </div>
        </div>
      </div>

      {/* Emotional Themes - 42 entries logged */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#2E2A27]">
            Emotional Themes
          </h3>
          <span className="text-xs text-[#8A8177]">42 entries logged</span>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Hopeful */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE1D3] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-lg">😊</span>
              <span className="font-serif text-xl font-bold text-[#BD5B3E]">38%</span>
            </div>
            <p className="text-xs font-semibold text-[#2E2A27]">Hopeful</p>
            <div className="w-full h-1.5 rounded-full bg-[#F4EDE5] overflow-hidden">
              <div className="h-full bg-[#BD5B3E] rounded-full w-[38%]" />
            </div>
          </div>

          {/* Overwhelmed */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE1D3] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-lg">💨</span>
              <span className="font-serif text-xl font-bold text-[#7E746A]">24%</span>
            </div>
            <p className="text-xs font-semibold text-[#2E2A27]">Overwhelmed</p>
            <div className="w-full h-1.5 rounded-full bg-[#F4EDE5] overflow-hidden">
              <div className="h-full bg-[#7E746A] rounded-full w-[24%]" />
            </div>
          </div>

          {/* Calm */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE1D3] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-lg">🌿</span>
              <span className="font-serif text-xl font-bold text-[#6D8766]">22%</span>
            </div>
            <p className="text-xs font-semibold text-[#2E2A27]">Calm</p>
            <div className="w-full h-1.5 rounded-full bg-[#F4EDE5] overflow-hidden">
              <div className="h-full bg-[#6D8766] rounded-full w-[22%]" />
            </div>
          </div>

          {/* Restless */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE1D3] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-lg">〰️</span>
              <span className="font-serif text-xl font-bold text-[#9C7F60]">16%</span>
            </div>
            <p className="text-xs font-semibold text-[#2E2A27]">Restless</p>
            <div className="w-full h-1.5 rounded-full bg-[#F4EDE5] overflow-hidden">
              <div className="h-full bg-[#9C7F60] rounded-full w-[16%]" />
            </div>
          </div>
        </div>
      </div>

      {/* What Nourishes You */}
      <div className="p-5 rounded-3xl bg-[#FAF5EE] border border-[#EBE1D2] space-y-4 shadow-xs">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#BD5B3E] font-bold">
            <span>💡</span>
            <span className="uppercase tracking-wider">What Nourishes You</span>
          </div>
          <p className="text-xs text-[#7A7166] mt-1 leading-relaxed">
            Gentle observations connecting your daily habits and peaceful feelings.
          </p>
        </div>

        <div className="space-y-3">
          {/* Observation 1 */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#EBE1D3] flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#FBECE6] text-[#BD5B3E] flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#2E2A27]">Morning Literature Lift</h4>
              <p className="text-[11px] text-[#786F65] leading-relaxed">
                You tend to feel noticeably lighter on days you read a story before noon.
              </p>
            </div>
          </div>

          {/* Observation 2 */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#EBE1D3] flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#EBF1EA] text-[#445E40] flex items-center justify-center shrink-0">
              <span className="text-xs">🧘</span>
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#2E2A27]">Evening Breath Integration</h4>
              <p className="text-[11px] text-[#786F65] leading-relaxed">
                Evening check-ins show a 20% increase in calm after reading mindful reflection notes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#2E2A27]">
            Visual Timeline
          </h3>
          <span className="text-xs font-semibold text-[#BD5B3E]">Solace Gallery</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Tile 1 */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xs border border-[#EDE4D8] group">
            <img
              src={ASSETS.morningTea}
              alt="Morning Sanctuary"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-2.5 flex flex-col justify-end">
              <span className="text-white text-xs font-bold leading-tight">Morning Sanctuary</span>
              <span className="text-white/80 text-[10px]">Tea & quiet reflection</span>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xs border border-[#EDE4D8] group">
            <img
              src={ASSETS.autumnWalk}
              alt="Autumn Walk"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-2.5 flex flex-col justify-end">
              <span className="text-white text-xs font-bold leading-tight">Autumn Walk</span>
              <span className="text-white/80 text-[10px]">Under tall pine trees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mood History Log */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#2E2A27]">
            Mood History Log
          </h3>
          <span className="text-xs font-semibold text-[#BD5B3E]">View All</span>
        </div>

        <div className="space-y-3">
          {logs.map((entry) => {
            const isExpanded = expandedLogId === entry.id;
            return (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-white border border-[#EAE1D3] shadow-2xs space-y-2.5 transition-all"
              >
                {/* Header row */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedLogId(isExpanded ? null : entry.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#BD5B3E]/70" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#2E2A27]">
                          {entry.label}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#7A6F64] font-mono text-[11px] font-semibold">
                          {entry.score} / 10
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8C8276]">
                        {entry.date} • {entry.time}
                      </p>
                    </div>
                  </div>
                  <button className="text-[#8C8276] hover:text-[#2E2A27]">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Body */}
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-semibold text-[#3D352E] flex items-center gap-1.5">
                    <span>😊</span>
                    <span>{entry.tagline}</span>
                  </p>
                  <p className="font-serif text-xs text-[#5A5046] italic bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EFE8DD] leading-relaxed">
                    "{entry.quote}"
                  </p>

                  {entry.linkedStoryTitle && (
                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#73685E]">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#BD5B3E]" />
                        <span>Linked story: <strong>{entry.linkedStoryTitle}</strong></span>
                      </span>
                      <button
                        onClick={() => onOpenStoryReaderByTitle(entry.linkedStoryTitle || '')}
                        className="text-[#BD5B3E] font-medium hover:underline"
                      >
                        Read
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share Reflection Summary with Care Team */}
      <div className="p-4 rounded-2xl bg-white border border-[#EAE1D3] shadow-xs flex flex-col items-center text-center space-y-2">
        <button
          onClick={onOpenCareTeamModal}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#BD5B3E] hover:underline"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Reflection Summary with Care Team</span>
        </button>
        <div className="flex items-center gap-1 text-[10px] text-[#8C8379]">
          <Shield className="w-3 h-3 text-[#7B9277]" />
          <span>Private & securely encrypted on device</span>
        </div>
      </div>
    </div>
  );
};
