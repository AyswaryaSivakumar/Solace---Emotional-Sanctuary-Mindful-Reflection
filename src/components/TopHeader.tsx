import React from 'react';
import { ASSETS } from '../assets';
import { SolaceLogo } from './SolaceLogo';
import { HeartHandshake } from 'lucide-react';

interface TopHeaderProps {
  subtitle: string;
  onOpenCrisis: () => void;
  onOpenProfile: () => void;
  onHomeClick?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  subtitle,
  onOpenCrisis,
  onOpenProfile,
  onHomeClick,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md px-5 py-3 border-b border-[#F0ECE1] transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2.5 text-left focus:outline-none group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#EDE4D8] flex items-center justify-center p-0.5 shadow-xs">
            <SolaceLogo size={32} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-[19px] font-semibold text-[#2E2A27] tracking-tight leading-tight">
                Solace
              </span>
            </div>
            <p className="text-[12px] text-[#8C847A] font-medium leading-none mt-0.5">
              {subtitle}
            </p>
          </div>
        </button>

        {/* Right actions: Crisis support & Maya's avatar */}
        <div className="flex items-center gap-2.5">
          {/* Peaceful Crisis Support Button */}
          <button
            onClick={onOpenCrisis}
            aria-label="Peaceful Crisis Support"
            title="Peaceful Crisis Support"
            className="w-9 h-9 rounded-full bg-[#FDF1ED] border border-[#F6D5C9] text-[#BD5B3E] flex items-center justify-center transition-all hover:bg-[#FBE5DE] hover:scale-105 active:scale-95 shadow-xs relative"
          >
            <HeartHandshake className="w-4 h-4 text-[#BD5B3E]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#BD5B3E] ring-2 ring-[#FAF7F2]" />
          </button>

          {/* User Avatar */}
          <button
            onClick={onOpenProfile}
            aria-label="Maya's Sanctuary Profile"
            className="w-10 h-10 rounded-full p-0.5 ring-2 ring-[#E8DCD0] hover:ring-[#BD5B3E] transition-all active:scale-95 shadow-xs overflow-hidden focus:outline-none"
          >
            <img
              src={ASSETS.mayaProfile}
              alt="Maya"
              className="w-full h-full rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
