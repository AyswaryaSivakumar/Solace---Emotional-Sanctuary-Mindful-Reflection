import React, { useState } from 'react';
import { TabType, Story, MoodLogEntry } from './types';
import { INITIAL_STORIES, INITIAL_MOOD_HISTORY } from './data/mockData';
import { TopHeader } from './components/TopHeader';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { CheckInScreen } from './screens/CheckInScreen';
import { StoriesScreen } from './screens/StoriesScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { StoryReaderModal } from './components/StoryReaderModal';
import { PeacefulCrisisSupportModal } from './components/PeacefulCrisisSupportModal';
import { CareTeamExportModal } from './components/CareTeamExportModal';
import { ProfileModal } from './components/ProfileModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [logs, setLogs] = useState<MoodLogEntry[]>(INITIAL_MOOD_HISTORY);
  
  // Navigation & Check In Presets
  const [presetFeelingForCheckIn, setPresetFeelingForCheckIn] = useState<string>('hopeful');

  // Modals & Audio
  const [activeStoryForReader, setActiveStoryForReader] = useState<Story | null>(null);
  const [playingAudioStory, setPlayingAudioStory] = useState<Story | null>(null);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isCareTeamModalOpen, setIsCareTeamModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Subtitles by active tab matching design screenshots
  const tabSubtitles: Record<TabType, string> = {
    home: 'Home Sanctuary',
    checkin: 'Daily Check In',
    stories: 'Heartfelt Stories',
    insights: 'Mood Insights',
    profile: 'Sanctuary Profile',
  };

  const handleToggleBookmark = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, isSaved: !s.isSaved } : s))
    );
    if (activeStoryForReader && activeStoryForReader.id === storyId) {
      setActiveStoryForReader((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : null));
    }
  };

  const handleStoryGenerated = (newStory: Story) => {
    setStories((prev) => [newStory, ...prev]);
    // Also log a mood entry associated with this story
    const newLog: MoodLogEntry = {
      id: `log-${Date.now()}`,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      score: 6,
      label: 'Gentle & Reflective',
      tagline: newStory.tag || 'Reflective Sanctuary',
      quote: newStory.quote.replace(/[“”"]/g, ''),
      linkedStoryTitle: newStory.title,
      tags: newStory.tailoredFor || ['Check-In', 'Sanctuary'],
    };
    setLogs((prev) => [newLog, ...prev]);

    // Open reader immediately
    setActiveStoryForReader(newStory);
  };

  const handleSaveCheckInOnly = (entry: {
    score: number;
    tags: string[];
    note: string;
    stateLabel: string;
  }) => {
    const newLog: MoodLogEntry = {
      id: `log-${Date.now()}`,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      score: entry.score,
      label: entry.stateLabel,
      tagline: entry.tags[0] || 'Mindful Reflection',
      quote: entry.note,
      tags: entry.tags,
    };
    setLogs((prev) => [newLog, ...prev]);
    setCurrentTab('insights');
  };

  const handleOpenStoryReaderByTitle = (title: string) => {
    const found = stories.find((s) => s.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      setActiveStoryForReader(found);
    } else {
      setActiveStoryForReader(stories[0]);
    }
  };

  // Find lantern story for the morning offering
  const featuredMorningStory = stories.find((s) => s.id === 'lantern-clearing') || stories[1] || stories[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2E2A27] flex flex-col font-sans selection:bg-[#F3DDD0] selection:text-[#8F371E]">
      {/* Sticky Top Header */}
      <TopHeader
        subtitle={tabSubtitles[currentTab]}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onHomeClick={() => setCurrentTab('home')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {currentTab === 'home' && (
          <HomeScreen
            onNavigateTab={setCurrentTab}
            onSelectFeelingForCheckIn={(fId) => setPresetFeelingForCheckIn(fId)}
            onOpenStoryReader={(story) => setActiveStoryForReader(story)}
            onPlayStoryAudio={(story) => setPlayingAudioStory(story)}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
            featuredStory={featuredMorningStory}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'checkin' && (
          <CheckInScreen
            initialFeeling={presetFeelingForCheckIn}
            onStoryGenerated={handleStoryGenerated}
            onSaveCheckInOnly={handleSaveCheckInOnly}
          />
        )}

        {currentTab === 'stories' && (
          <StoriesScreen
            stories={stories}
            onOpenStoryReader={(story) => setActiveStoryForReader(story)}
            onPlayAudio={(story) => setPlayingAudioStory(story)}
            onToggleBookmark={handleToggleBookmark}
            onRequestNewStory={() => setCurrentTab('checkin')}
          />
        )}

        {currentTab === 'insights' && (
          <InsightsScreen
            logs={logs}
            onOpenCareTeamModal={() => setIsCareTeamModalOpen(true)}
            onOpenStoryReaderByTitle={handleOpenStoryReaderByTitle}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            onOpenCareTeamModal={() => setIsCareTeamModalOpen(true)}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Audio Player Bar */}
      <AudioPlayerBar
        currentStory={playingAudioStory}
        onClose={() => setPlayingAudioStory(null)}
        onOpenReader={(story) => setActiveStoryForReader(story)}
      />

      {/* Bottom Sticky Tab Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Modals */}
      <StoryReaderModal
        story={activeStoryForReader}
        isOpen={Boolean(activeStoryForReader)}
        onClose={() => setActiveStoryForReader(null)}
        onToggleBookmark={handleToggleBookmark}
      />

      <PeacefulCrisisSupportModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />

      <CareTeamExportModal
        isOpen={isCareTeamModalOpen}
        onClose={() => setIsCareTeamModalOpen(false)}
        logs={logs}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onExportCareTeam={() => {
          setIsProfileModalOpen(false);
          setIsCareTeamModalOpen(true);
        }}
      />
    </div>
  );
}
