import React, { useState } from 'react';
import { UserCheck, Sparkles, Copy, Check, Link, ArrowRight } from 'lucide-react';
import { BioOption, LanguageMode } from '../types';

interface Props {
  language: LanguageMode;
  niche: string;
}

export const BioGenerator: React.FC<Props> = ({ language, niche }) => {
  const [goal, setGoal] = useState('Get More Followers & Profile Visits');
  const [offer, setOffer] = useState('');
  const [loading, setLoading] = useState(false);
  const [bios, setBios] = useState<BioOption[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, goal, offer, language }),
      });
      const data = await res.json();
      setBios(data.bios || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyBio = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Control Box */}
      <div className="bg-gradient-to-b from-gray-900 to-[#18181b] border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FE2C55] to-purple-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-[#25F4EE]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              TikTok Bio & Profile Optimization Lab
            </h2>
            <p className="text-xs text-gray-400">
              Turn profile views into loyal followers with high-converting 80-character bios
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Account Primary Goal:</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            >
              <option value="Get More Followers & Profile Visits">Get More Followers & Profile Visits</option>
              <option value="Drive Traffic to Link in Bio / Website">Drive Traffic to Link in Bio / Website</option>
              <option value="Promote YouTube / Instagram Channel">Promote YouTube / Instagram Channel</option>
              <option value="Sell Product / Digital Service / Coaching">Sell Product / Digital Service / Coaching</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Specific Offer / Tagline (Optional):</label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="e.g. Daily Tech Tips | Free Ebook Below..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE]"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] hover:opacity-95 text-black font-bold px-8 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? 'Crafting Viral Bios...' : 'Generate 4 Viral Bio Options'}</span>
        </button>
      </div>

      {/* Bio Cards Grid */}
      {bios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bios.map((b, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-4 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-gray-800 text-[#25F4EE] border border-gray-700">
                    {b.vibe}
                  </span>
                  <button
                    onClick={() => copyBio(b.bioText, idx)}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedIdx === idx ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>{copiedIdx === idx ? 'Copied!' : 'Copy Bio'}</span>
                  </button>
                </div>

                {/* TikTok Mock Preview Card */}
                <div className="bg-black p-4 rounded-2xl border border-gray-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FE2C55] to-[#25F4EE]" />
                    <span className="text-xs font-bold text-white">@your_account_name</span>
                  </div>
                  <pre className="text-xs font-sans text-gray-100 whitespace-pre-wrap leading-relaxed">
                    {b.bioText}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 text-xs text-gray-400 flex items-center justify-between">
                <span>Call to Action:</span>
                <span className="font-semibold text-amber-400">{b.callToAction}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
