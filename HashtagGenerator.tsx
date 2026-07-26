import React, { useState } from 'react';
import { Hash, Search, Copy, Check, Sparkles, Target, Globe, Layers } from 'lucide-react';
import { HashtagSet, LanguageMode } from '../types';

interface Props {
  language: LanguageMode;
  niche: string;
}

export const HashtagGenerator: React.FC<Props> = ({ language, niche }) => {
  const [topic, setTopic] = useState('');
  const [region, setRegion] = useState('Global');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HashtagSet | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, niche, region }),
      });
      const data = await res.json();
      setResult(data.hashtags || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Search Header */}
      <div className="bg-gradient-to-b from-gray-900 to-[#18181b] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#25F4EE] to-blue-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center">
              <Hash className="w-5 h-5 text-[#25F4EE]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              TikTok Search SEO & Hashtag Stack Optimizer
            </h2>
            <p className="text-xs text-gray-400">
              Rank in TikTok search bar and get pushed to FYP with the 3-Tier Hashtag Formula
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Video Topic / Key Phrases:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Biryani recipe, iPhone tips, Crypto trading strategy, Gym workout..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Target Region:</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            >
              <option value="Pakistan">Pakistan 🇵🇰</option>
              <option value="India">India 🇮🇳</option>
              <option value="USA/UK">USA / UK / Global 🌎</option>
              <option value="UAE/Gulf">UAE & Gulf Region 🇦🇪</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="w-full sm:w-auto bg-gradient-to-r from-[#25F4EE] via-teal-400 to-blue-500 hover:opacity-95 text-black font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-[#25F4EE]/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>{loading ? 'Building Hashtag Stack...' : 'Generate SEO Hashtags'}</span>
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* SEO Keywords Cloud */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-[#25F4EE]" />
                <span>TikTok Search SEO Keywords (In-Video Title & Captions)</span>
              </h3>
              <button
                onClick={() => copyText(result.seoKeywords.join(', '), 'keywords')}
                className="bg-gray-800 hover:bg-gray-700 text-xs text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-gray-700"
              >
                {copiedType === 'keywords' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Keywords</span>
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Put these phrases inside your video spoken audio, on-screen text, and caption for TikTok Search indexing.
            </p>
            <div className="flex flex-wrap gap-2">
              {result.seoKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="bg-gray-950 border border-gray-800 text-gray-200 text-xs px-3.5 py-1.5 rounded-xl font-medium"
                >
                  🔍 {kw}
                </span>
              ))}
            </div>
          </div>

          {/* 3-Tier Hashtags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Broad Viral */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FE2C55] uppercase tracking-wider">
                  Tier 1: Broad Viral
                </span>
                <button
                  onClick={() => copyText(result.viralHashtags.join(' '), 'viral')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedType === 'viral' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.viralHashtags.map((ht, i) => (
                  <span key={i} className="bg-[#FE2C55]/10 border border-[#FE2C55]/30 text-[#FE2C55] text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {ht}
                  </span>
                ))}
              </div>
            </div>

            {/* Niche Specific */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#25F4EE] uppercase tracking-wider">
                  Tier 2: Niche Core
                </span>
                <button
                  onClick={() => copyText(result.nicheHashtags.join(' '), 'niche')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedType === 'niche' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.nicheHashtags.map((ht, i) => (
                  <span key={i} className="bg-[#25F4EE]/10 border border-[#25F4EE]/30 text-[#25F4EE] text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {ht}
                  </span>
                ))}
              </div>
            </div>

            {/* Micro Targeted */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Tier 3: Micro Target
                </span>
                <button
                  onClick={() => copyText(result.targetedHashtags.join(' '), 'targeted')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedType === 'targeted' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.targetedHashtags.map((ht, i) => (
                  <span key={i} className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {ht}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* All-in-One Copy Banner */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border border-gray-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Full Stack Caption + Hashtags</h4>
              <p className="text-xs text-gray-400">{result.captionTemplate}</p>
            </div>
            <button
              onClick={() =>
                copyText(
                  `${result.captionTemplate}\n\n${[
                    ...result.viralHashtags,
                    ...result.nicheHashtags,
                    ...result.targetedHashtags,
                  ].join(' ')}`,
                  'all'
                )
              }
              className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-black font-bold text-xs px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              {copiedType === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedType === 'all' ? 'Copied Everything!' : 'Copy Full Stack'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
