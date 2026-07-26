import React, { useState, useEffect } from 'react';
import {
  Flame,
  Globe,
  Music,
  TrendingUp,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Zap,
  Hash,
  Video,
  Lightbulb
} from 'lucide-react';
import { LanguageMode, TrendingData, GroundingMetadata } from '../types';

interface Props {
  language: LanguageMode;
  niche: string;
}

export const TrendingNow: React.FC<Props> = ({ language, niche }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TrendingData | null>(null);
  const [grounding, setGrounding] = useState<GroundingMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedHashtags, setCopiedHashtags] = useState<boolean>(false);
  const [copiedTopicIndex, setCopiedTopicIndex] = useState<number | null>(null);

  const fetchTrending = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/trending-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, language }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const resData = await response.json();
      if (resData.trendingData) {
        setData(resData.trendingData);
        setGrounding(resData.groundingMetadata || null);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('Error fetching trending topics:', err);
      setError(err.message || 'Failed to fetch live trends.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [niche, language]);

  const copyHashtags = () => {
    if (!data?.trendingHashtags) return;
    navigator.clipboard.writeText(data.trendingHashtags.join(' '));
    setCopiedHashtags(true);
    setTimeout(() => setCopiedHashtags(false), 2000);
  };

  const copyTopicIdea = (title: string, desc: string, index: number) => {
    navigator.clipboard.writeText(`Topic: ${title}\nHow to execute: ${desc}`);
    setCopiedTopicIndex(index);
    setTimeout(() => setCopiedTopicIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-[#18181b] to-gray-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#25F4EE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Google Search Grounded
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#25F4EE]/10 text-[#25F4EE] border border-[#25F4EE]/20">
                <Flame className="w-3.5 h-3.5 fill-[#25F4EE]" />
                Live TikTok FYP Radar 2026
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Trending Now in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25F4EE] via-emerald-400 to-teal-200">{niche}</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {language === 'roman_urdu'
                ? 'Live Google Search grounding se fetch kiye gaye trending viral topics, viral music audio, aur formats. Is se aap bilkul current trend par video bana ke FYP par viral ho sakte hain!'
                : 'Real-time viral topics, music audio trends, and content formats fetched via live Google Search grounding. Stay ahead of the TikTok algorithm!'}
            </p>
          </div>

          <button
            onClick={fetchTrending}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#25F4EE] hover:from-emerald-400 hover:to-[#25F4EE] text-gray-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 min-w-max"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Searching Live Google...' : 'Refresh Trends'}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-950/40 border border-red-500/50 p-4 rounded-2xl text-red-200 text-xs sm:text-sm flex items-center justify-between">
          <span>⚠️ {error}</span>
          <button
            onClick={fetchTrending}
            className="px-3 py-1 bg-red-800/60 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && !data && (
        <div className="space-y-6">
          <div className="p-8 bg-gray-900/60 border border-gray-800 rounded-3xl flex flex-col items-center justify-center gap-3 py-16">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
            <p className="text-sm font-semibold text-gray-300 animate-pulse">
              Querying Google Search Grounding for live {niche} trends...
            </p>
            <p className="text-xs text-gray-500">
              Analyzing latest viral music clips, challenges, and hashtags
            </p>
          </div>
        </div>
      )}

      {/* Data Output */}
      {data && (
        <div className="space-y-8 animate-fadeIn">
          {/* Creator Strategic Action Summary */}
          {data.creatorActionSummary && (
            <div className="bg-gradient-to-r from-purple-950/60 via-gray-900 to-indigo-950/60 border border-purple-500/40 rounded-2xl p-5 flex items-start gap-3 shadow-lg">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-purple-400 block">
                  Today's #1 FYP Growth Action
                </span>
                <p className="text-xs sm:text-sm text-gray-200 font-medium">
                  {data.creatorActionSummary}
                </p>
              </div>
            </div>
          )}

          {/* Section 1: Top Viral Topics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#25F4EE]" />
                Top Viral Topics & Challenges
              </h2>
              <span className="text-xs text-gray-400">
                {data.viralTopics?.length || 0} Trends Found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.viralTopics?.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900/80 border border-gray-800 hover:border-emerald-500/50 rounded-2xl p-5 space-y-3 transition-all hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {topic.growthRate || 'Surging'}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-bold">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        {topic.viralScore || 90}/100
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <button
                    onClick={() => copyTopicIdea(topic.title, topic.description, idx)}
                    className="w-full mt-3 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    {copiedTopicIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied Idea!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Video Concept
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Trending Audio & Sounds */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Music className="w-5 h-5 text-[#FE2C55]" />
              Trending TikTok Audio & Sounds
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.trendingSounds?.map((sound, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 flex items-start gap-3.5 hover:border-[#FE2C55]/40 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FE2C55] to-purple-600 p-0.5 shrink-0 shadow-md">
                    <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                      <Music className="w-5 h-5 text-[#FE2C55]" />
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-bold text-white">
                        {sound.soundName}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FE2C55]/20 text-[#FE2C55] border border-[#FE2C55]/30">
                        {sound.popularity || 'Viral'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      <span className="text-gray-400 font-semibold">How to use: </span>
                      {sound.usageVibe}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Trending Formats & Hashtag Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Formats */}
            <div className="space-y-3 bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                Viral Content Formats
              </h3>
              <div className="space-y-3 pt-1">
                {data.trendingFormats?.map((fmt, idx) => (
                  <div key={idx} className="bg-gray-950 p-3.5 rounded-xl border border-gray-800/80 space-y-1">
                    <span className="text-xs font-bold text-[#25F4EE] block">
                      {fmt.formatName}
                    </span>
                    <p className="text-xs text-gray-300">
                      💡 {fmt.visualTip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div className="space-y-3 bg-gray-900/80 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Hash className="w-4 h-4 text-emerald-400" />
                    Top Hashtag Stack Today
                  </h3>
                  <button
                    onClick={copyHashtags}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20"
                  >
                    {copiedHashtags ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedHashtags ? 'Copied All!' : 'Copy Stack'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  {data.trendingHashtags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-gray-950 text-emerald-300 border border-gray-800 hover:border-emerald-500/40 transition cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-gray-500 pt-3 border-t border-gray-800">
                Tip: Combine 2 viral hashtags + 2 niche hashtags for maximum FYP search indexing.
              </p>
            </div>
          </div>

          {/* Section 4: Google Search Sources Grounding Panel */}
          {grounding && grounding.groundingChunks && grounding.groundingChunks.length > 0 && (
            <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <Globe className="w-4 h-4 text-emerald-400" />
                Verified Google Search Grounding Sources ({grounding.groundingChunks.length})
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                {grounding.groundingChunks.map((chunk, idx) => (
                  <a
                    key={idx}
                    href={chunk.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 bg-gray-900 hover:bg-gray-850 border border-gray-800 hover:border-gray-700 rounded-xl text-xs text-gray-300 hover:text-white transition group"
                  >
                    <span className="truncate pr-2 font-medium">{chunk.title}</span>
                    <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-emerald-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
