import React, { useState } from 'react';
import { Calculator, DollarSign, Eye, TrendingUp, Sparkles, Award } from 'lucide-react';
import { LanguageMode } from '../types';

interface Props {
  language: LanguageMode;
}

export const CreatorCalculator: React.FC<Props> = ({ language }) => {
  const [views, setViews] = useState(100000);
  const [rpm, setRpm] = useState(0.8); // $0.80 per 1000 views
  const [videoLength, setVideoLength] = useState(35); // seconds
  const [watchTimePct, setWatchTimePct] = useState(65); // %

  const estimatedEarnings = (views / 1000) * rpm;

  // Viral Probability Formula
  // TikTok FYP pushes videos with >60% watch time on 30s+ videos aggressively
  let viralScore = Math.min(100, Math.round((watchTimePct * 1.3) + (videoLength > 60 ? 15 : 5)));
  if (watchTimePct < 40) viralScore = Math.max(10, viralScore - 30);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Title */}
      <div className="bg-gradient-to-b from-gray-900 to-[#18181b] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-[#25F4EE] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center">
              <Calculator className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              TikTok Creator Rewards & Viral Potential Calculator
            </h2>
            <p className="text-xs text-gray-400">
              Estimate your RPM earnings, monetization potential, and FYP viral probability
            </p>
          </div>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Views Slider */}
          <div className="space-y-2 bg-gray-950 p-4 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300 font-semibold flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#25F4EE]" /> Estimated Monthly Views:
              </span>
              <span className="font-mono font-bold text-[#25F4EE] text-sm">
                {views.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="5000000"
              step="10000"
              value={views}
              onChange={(e) => setViews(Number(e.target.value))}
              className="w-full accent-[#25F4EE] cursor-pointer"
            />
          </div>

          {/* RPM Slider */}
          <div className="space-y-2 bg-gray-950 p-4 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300 font-semibold flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Estimated RPM ($ per 1k views):
              </span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                ${rpm.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.10"
              max="2.50"
              step="0.05"
              value={rpm}
              onChange={(e) => setRpm(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <p className="text-[10px] text-gray-500">
              Avg US/UK RPM: $0.60-$1.50 | Avg Asian/Gulf RPM: $0.15-$0.50
            </p>
          </div>

          {/* Video Length */}
          <div className="space-y-2 bg-gray-950 p-4 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300 font-semibold">Video Duration:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{videoLength} sec</span>
            </div>
            <input
              type="range"
              min="10"
              max="180"
              step="5"
              value={videoLength}
              onChange={(e) => setVideoLength(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Completion Rate */}
          <div className="space-y-2 bg-gray-950 p-4 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300 font-semibold">Avg Completion Rate (Watch Time):</span>
              <span className="font-mono font-bold text-[#FE2C55] text-sm">{watchTimePct}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={watchTimePct}
              onChange={(e) => setWatchTimePct(Number(e.target.value))}
              className="w-full accent-[#FE2C55] cursor-pointer"
            />
          </div>
        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="bg-gradient-to-br from-emerald-950/60 via-gray-900 to-gray-900 border border-emerald-500/40 p-6 rounded-3xl space-y-2">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider block">
              Estimated Monthly Revenue (Creator Rewards)
            </span>
            <p className="text-4xl font-extrabold text-white font-mono">
              ${estimatedEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-400 pt-1">
              Based on {views.toLocaleString()} qualified views at ${rpm} RPM.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-950/60 via-gray-900 to-gray-900 border border-purple-500/40 p-6 rounded-3xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-purple-400 tracking-wider block">
                FYP Viral Probability Score
              </span>
              <span className="text-xs font-bold text-[#25F4EE]">{viralScore}%</span>
            </div>

            <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FE2C55] via-amber-400 to-[#25F4EE] h-full transition-all duration-500"
                style={{ width: `${viralScore}%` }}
              />
            </div>

            <p className="text-xs text-gray-300 pt-1">
              {watchTimePct >= 65
                ? '🔥 High Viral Potential! TikTok algorithm will push this to tier 1 & 2 FYP buckets.'
                : '⚠️ Watch time below 60%. Improve your 3-second hook to reach 70%+ retention.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
