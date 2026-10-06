export type TabType = 'home' | 'checkin' | 'stories' | 'insights' | 'profile';

export interface FeelingOption {
  id: string;
  label: string;
  emoji: string;
  category: 'grounding' | 'heavy' | 'tender' | 'hopeful';
  description?: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  fullStory: string;
  readTime: string;
  audioDuration: string;
  category: string;
  tag: string;
  image: string;
  imageCaption?: string;
  quote: string;
  date: string;
  isSaved?: boolean;
  tailoredFor?: string[];
  audioScript?: string;
}

export interface MoodLogEntry {
  id: string;
  date: string;
  time: string;
  score: number;
  label: string;
  tagline: string;
  quote: string;
  linkedStoryTitle?: string;
  tags: string[];
}

export interface DailyFootprint {
  dayLetter: string;
  name: string;
  score: number;
  moodName: string;
  iconName: string;
  colorClass: string;
  bgClass: string;
  isToday?: boolean;
}
