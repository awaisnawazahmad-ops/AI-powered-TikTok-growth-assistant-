import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Sparkles,
  Target,
  Clock,
  Zap,
  Flame,
  Award,
  Download
} from 'lucide-react';
import { GrowthPlan, LanguageMode, CreatorLevel } from '../types';

interface Props {
  language: LanguageMode;
  niche: string;
}

export const GrowthRoadmap: React.FC<Props> = ({ language, niche }) => {
  const [followerLevel, setFollowerLevel] = useState<CreatorLevel>('0-1k');
  const [postsPerDay, setPostsPerDay] = useState(2);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<GrowthPlan | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-growth-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          followers: followerLevel,
          postsPerDay,
          language,
        }),
      });
      const data = await res.json();
      setPlan(data.growthPlan || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Controls Box */}
      <div className="bg-gradient-to-b from-gray-900 to-[#18181b] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FE2C55] to-amber-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {language === 'roman_urdu' ? '30-Day TikTok Content Strategy Roadmap' : '30-Day TikTok Content Strategy'}
            </h2>
            <p className="text-xs text-gray-400">
              {language === 'roman_urdu'
                ? 'Apne follower level ke mutabiq 30 din ka viral content calendar banayein'
                : 'Custom day-by-day action map to hit 10k+ followers and trigger TikTok FYP algorithm'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Current Follower Stage:</label>
            <select
              value={followerLevel}
              onChange={(e) => setFollowerLevel(e.target.value as CreatorLevel)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            >
              <option value="0-1k">0 - 1,000 (0-View & 200 Jail Breakout)</option>
              <option value="1k-10k">1,000 - 10,000 (Building Core Audience)</option>
              <option value="10k-50k">10,000 - 50,000 (Monetization & RPM)</option>
              <option value="50k+">50,000+ (Brand Deals & Scale)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Target Posting Frequency:</label>
            <select
              value={postsPerDay}
              onChange={(e) => setPostsPerDay(Number(e.target.value))}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            >
              <option value={1}>1 Video / Day (Quality Focus)</option>
              <option value={2}>2 Videos / Day (Optimal FYP Exposure)</option>
              <option value={3}>3 Videos / Day (Aggressive Growth)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FE2C55] via-pink-600 to-purple-600 hover:opacity-95 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#FE2C55]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#25F4EE]" />
              <span>{loading ? 'Designing Roadmap...' : 'Generate 30-Day Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Roadmap */}
      {plan && (
        <div className="space-y-8">
          {/* Overview Header */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-[#FE2C55]/20 text-[#FE2C55] border border-[#FE2C55]/30">
                GOAL: {plan.targetFollowerGoal}
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                30-Day Action Blueprint for {plan.niche}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Completed: {completedDays.length} / {plan.days.length} Days ({Math.round((completedDays.length / (plan.days.length || 1)) * 100)}%)
              </p>
            </div>

            {/* Daily Routine Rules */}
            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-2 max-w-md w-full">
              <span className="text-xs font-bold text-[#25F4EE] uppercase tracking-wider block flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> Daily Creator Routine:
              </span>
              <ul className="text-xs text-gray-300 space-y-1 list-disc pl-4">
                {plan.dailyRoutine.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Algorithm Secrets Banner */}
          {plan.algorithmSecretTips && (
            <div className="bg-gradient-to-r from-purple-900/40 via-gray-900 to-indigo-900/40 border border-purple-800/50 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-300" /> 2026 TikTok Algorithm Growth Hacks:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {plan.algorithmSecretTips.map((tip, idx) => (
                  <div key={idx} className="bg-black/40 border border-purple-700/30 p-3 rounded-xl text-xs text-gray-200">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plan.days.map((day) => {
              const isDone = completedDays.includes(day.day);
              return (
                <div
                  key={day.day}
                  onClick={() => toggleDayCompletion(day.day)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative space-y-3 ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/50 opacity-80'
                      : 'bg-gray-900/80 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-white'}`}>
                        Day {day.day}
                      </span>
                      <span className="text-[11px] font-semibold text-[#25F4EE]">
                        {day.contentCategory}
                      </span>
                    </div>

                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-600 hover:text-gray-400" />
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 font-medium block">🎥 Video Concept:</span>
                    <p className="font-bold text-white text-sm mt-0.5">{day.videoIdea}</p>
                  </div>

                  <div className="bg-black/40 p-2.5 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-[#FE2C55] font-bold uppercase tracking-wider block">
                      ⚡ Hook Headline:
                    </span>
                    <p className="text-xs font-semibold text-gray-200">"{day.hookHeadline}"</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-800/80">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> {day.bestPostingTime}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-800 rounded-md text-gray-300 font-medium">
                      🎯 {day.keyGoal}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
