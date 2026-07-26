import React, { useState } from 'react';
import { SearchCheck, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { AuditResult, LanguageMode } from '../types';

interface Props {
  language: LanguageMode;
  niche: string;
}

export const AccountAuditor: React.FC<Props> = ({ language, niche }) => {
  const [handle, setHandle] = useState('');
  const [avgViews, setAvgViews] = useState('200-500');
  const [postFrequency, setPostFrequency] = useState('1-2 times a week');
  const [bioText, setBioText] = useState('');
  const [videoStyle, setVideoStyle] = useState('Talking head with voiceover');
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<AuditResult | null>(null);

  const handleAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle,
          niche,
          avgViews,
          postFrequency,
          bio: bioText,
          videoStyle,
          language,
        }),
      });
      const data = await res.json();
      setAudit(data.audit || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Questionnaire Form */}
      <div className="bg-gradient-to-b from-gray-900 to-[#18181b] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-[#FE2C55] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center">
              <SearchCheck className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {language === 'roman_urdu' ? 'TikTok Account Audit & 200 View Fixer' : 'TikTok Account Audit'}
            </h2>
            <p className="text-xs text-gray-400">
              {language === 'roman_urdu'
                ? 'Apni account details dalein aur dekhein algorithm aapki videos kyu push nahi kar raha'
                : 'Diagnose why your account is stuck in the 200-view jail and get immediate algorithmic fixes'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">TikTok Handle / Username:</label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@username"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Average Views Per Video:</label>
            <select
              value={avgViews}
              onChange={(e) => setAvgViews(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            >
              <option value="0-100 views (0 View Jail)">0 - 100 views (Severe Flag / 0 View Jail)</option>
              <option value="200-500 views (200 View Jail)">200 - 500 views (Standard FYP Testing Jail)</option>
              <option value="1,000-5,000 views">1,000 - 5,000 views (Decent Retention)</option>
              <option value="10,000+ views">10,000+ views (Viral Ready)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Posting Frequency:</label>
            <select
              value={postFrequency}
              onChange={(e) => setPostFrequency(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            >
              <option value="Inconsistent (Once every few weeks)">Inconsistent (Once every few weeks)</option>
              <option value="1-2 times a week">1 - 2 times a week</option>
              <option value="1 video daily">1 video daily</option>
              <option value="2-3 videos daily">2 - 3 videos daily</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Video Content Style:</label>
            <input
              type="text"
              value={videoStyle}
              onChange={(e) => setVideoStyle(e.target.value)}
              placeholder="e.g. Screen recording with AI voiceover, Face talking head, Faceless aesthetic..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Current TikTok Bio:</label>
            <input
              type="text"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              placeholder="Paste your current TikTok bio here..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            />
          </div>
        </div>

        <button
          onClick={handleAudit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 via-[#FE2C55] to-purple-600 hover:opacity-95 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-[#FE2C55]/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#25F4EE]" />
          <span>{loading ? 'Running AI Algorithm Audit...' : 'Run Account Audit Now'}</span>
        </button>
      </div>

      {/* Audit Report */}
      {audit && (
        <div className="space-y-6 animate-fade-in">
          {/* Scorecard Box */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-[#FE2C55] via-amber-500 to-[#25F4EE] p-1 shadow-2xl">
                <div className="w-full h-full bg-[#121212] rounded-full flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white">{audit.growthScore}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">/ 100</span>
                </div>
              </div>

              <div>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#FE2C55]/20 text-[#FE2C55] border border-[#FE2C55]/30 uppercase">
                  Status: {audit.accountStatus}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  Account Audit Report for @{handle || 'creator'}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Niche: <span className="text-white font-semibold">{niche}</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 text-center w-full md:w-auto">
              <span className="text-xs text-gray-400 block font-semibold">Recommended Post Schedule</span>
              <p className="text-sm font-bold text-[#25F4EE] mt-1">{audit.recommendedSchedule}</p>
            </div>
          </div>

          {/* Detailed Diagnosis Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strengths */}
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-3">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" /> Account Strengths
              </h4>
              <ul className="space-y-2">
                {audit.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-gray-200 bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-xl">
                    ✓ {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Mistakes */}
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-3">
              <h4 className="text-sm font-bold text-[#FE2C55] flex items-center gap-2 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" /> Critical Growth Mistakes
              </h4>
              <ul className="space-y-2">
                {audit.criticalMistakes.map((m, i) => (
                  <li key={i} className="text-xs text-gray-200 bg-[#FE2C55]/10 border border-[#FE2C55]/20 p-2.5 rounded-xl">
                    ❌ {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instant Algorithmic Fixes */}
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-3">
              <h4 className="text-sm font-bold text-[#25F4EE] flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Instant Fixes To Try Now
              </h4>
              <ul className="space-y-2">
                {audit.instantFixes.map((f, i) => (
                  <li key={i} className="text-xs text-gray-200 bg-[#25F4EE]/10 border border-[#25F4EE]/20 p-2.5 rounded-xl">
                    ⚡ {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
