import React from 'react';
import { Sparkles, TrendingUp, Globe, Zap, Flame } from 'lucide-react';
import { LanguageMode } from '../types';

interface HeaderProps {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  selectedNiche: string;
  setSelectedNiche: (niche: string) => void;
}

const NICHES = [
  'Anime / Editing / Miraculous',
  'Anime & Edits',
  'Video Editing & FX',
  'Tech & Gadgets',
  'Comedy & Skits',
  'Gaming & Esports',
  'Fashion & Beauty',
  'Fitness & Gym',
  'Food & Cooking',
  'Motivation & Quotes',
  'Crypto & Finance',
  'Education & Skills',
  'Daily Vlogs',
  'Music & Dance',
  'Business & Marketing'
];

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  selectedNiche,
  setSelectedNiche,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FE2C55] via-purple-600 to-[#25F4EE] p-0.5 shadow-lg shadow-[#FE2C55]/20">
            <div className="w-full h-full bg-[#121212] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#25F4EE] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                TikTok Growth <span className="text-[#FE2C55]">Studio</span>
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-[#FE2C55]/10 text-[#FE2C55] border border-[#FE2C55]/30">
                <Flame className="w-3 h-3" />
                2026 AI Algorithm
              </span>
            </div>
            <p className="text-xs text-gray-400 hidden sm:block">
              {language === 'roman_urdu'
                ? 'Apne TikTok Account Ko Fast Grow Karein - Scripts, Hooks & Strategy'
                : 'Accelerate Your TikTok Account - Viral Scripts, Hooks & Algorithm Secrets'}
            </p>
          </div>
        </div>

        {/* Controls: Niche & Language Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Niche Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-[#25F4EE]" />
            <span className="text-gray-400 hidden lg:inline">Niche:</span>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1"
            >
              {NICHES.map((n) => (
                <option key={n} value={n} className="bg-gray-900 text-white">
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-0.5 text-xs font-medium">
            <button
              onClick={() => setLanguage('roman_urdu')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === 'roman_urdu'
                  ? 'bg-gradient-to-r from-[#FE2C55] to-pink-600 text-white font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Roman Urdu / Hindi"
            >
              🇵🇰🇮🇳 Roman Urdu
            </button>
            <button
              onClick={() => setLanguage('english')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === 'english'
                  ? 'bg-gradient-to-r from-[#25F4EE] to-teal-500 text-black font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="English"
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => setLanguage('urdu_script')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === 'urdu_script'
                  ? 'bg-purple-600 text-white font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Urdu Script"
            >
              ✍️ اردو
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
