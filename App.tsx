import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, ActiveTab } from './components/Navigation';
import { GrowthChat } from './components/GrowthChat';
import { ViralHookScriptWriter } from './components/ViralHookScriptWriter';
import { GrowthRoadmap } from './components/GrowthRoadmap';
import { HashtagGenerator } from './components/HashtagGenerator';
import { AccountAuditor } from './components/AccountAuditor';
import { BioGenerator } from './components/BioGenerator';
import { CreatorCalculator } from './components/CreatorCalculator';
import { TrendingNow } from './components/TrendingNow';
import { LanguageMode } from './types';
import { Flame, Sparkles, Zap, Heart } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<LanguageMode>('roman_urdu');
  const [selectedNiche, setSelectedNiche] = useState<string>('Tech & Gadgets');
  const [activeTab, setActiveTab] = useState<ActiveTab>('trending');

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 flex flex-col font-sans selection:bg-[#FE2C55] selection:text-white">
      {/* Top Bar Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        selectedNiche={selectedNiche}
        setSelectedNiche={setSelectedNiche}
      />

      {/* Main Navigation Tabs */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
      />

      {/* Active Tab View */}
      <main className="flex-1 pb-12">
        {activeTab === 'trending' && (
          <TrendingNow language={language} niche={selectedNiche} />
        )}

        {activeTab === 'chat' && (
          <GrowthChat language={language} niche={selectedNiche} />
        )}

        {activeTab === 'hooks_script' && (
          <ViralHookScriptWriter language={language} niche={selectedNiche} />
        )}

        {activeTab === 'roadmap' && (
          <GrowthRoadmap language={language} niche={selectedNiche} />
        )}

        {activeTab === 'hashtags' && (
          <HashtagGenerator language={language} niche={selectedNiche} />
        )}

        {activeTab === 'audit' && (
          <AccountAuditor language={language} niche={selectedNiche} />
        )}

        {activeTab === 'bio' && (
          <BioGenerator language={language} niche={selectedNiche} />
        )}

        {activeTab === 'calculator' && (
          <CreatorCalculator language={language} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-black/80 py-6 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-300 font-medium">TikTok Algorithm 2026 Engine Connected</span>
          </div>

          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-[#FE2C55] fill-[#FE2C55]" /> for TikTok Creators worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
