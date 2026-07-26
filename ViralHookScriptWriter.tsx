import React, { useState } from 'react';
import {
  Zap,
  Play,
  Copy,
  Check,
  Sparkles,
  Layers,
  FileText,
  Clock,
  Tv,
  X,
  ChevronRight,
  Flame,
  Maximize2
} from 'lucide-react';
import { GeneratedScript, ViralHook, LanguageMode } from '../types';

interface Props {
  language: LanguageMode;
  niche: string;
}

export const ViralHookScriptWriter: React.FC<Props> = ({ language, niche }) => {
  const [topic, setTopic] = useState('');
  const [targetDuration, setTargetDuration] = useState('30-45s');
  const [loadingHooks, setLoadingHooks] = useState(false);
  const [loadingScript, setLoadingScript] = useState(false);
  const [generatedHooks, setGeneratedHooks] = useState<ViralHook[]>([]);
  const [selectedHook, setSelectedHook] = useState<ViralHook | null>(null);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [teleprompterOpen, setTeleprompterOpen] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerateHooks = async () => {
    if (!topic.trim()) return;
    setLoadingHooks(true);
    setGeneratedScript(null);
    try {
      const res = await fetch('/api/generate-viral-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, topic, language }),
      });
      const data = await res.json();
      setGeneratedHooks(data.hooks || []);
      if (data.hooks && data.hooks.length > 0) {
        setSelectedHook(data.hooks[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingHooks(false);
    }
  };

  const handleGenerateFullScript = async (hookToUse?: ViralHook) => {
    const hook = hookToUse || selectedHook;
    setLoadingScript(true);
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          topic: topic || 'Viral Tips in ' + niche,
          targetDuration,
          hookText: hook ? `${hook.spokenText} | ${hook.onScreenText}` : '',
          language,
        }),
      });
      const data = await res.json();
      setGeneratedScript(data.script || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingScript(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Input Control Box */}
      <div className="bg-gradient-to-b from-gray-900 to-[#18181b] border border-gray-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FE2C55]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#25F4EE]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FE2C55] to-[#25F4EE] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#25F4EE]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {language === 'roman_urdu'
                  ? 'Viral 3-Second Hooks & Full Script Generator'
                  : 'Viral 3-Second Hooks & Script Writer'}
              </h2>
              <p className="text-xs text-gray-400">
                {language === 'roman_urdu'
                  ? 'TikTok FYP Algorithm ko trigger karne ke liye high retention hooks aur scene-by-scene script'
                  : 'Craft hooks that hit 80%+ 3-second completion rate and script every scene for viral impact'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
                {language === 'roman_urdu' ? 'Video Subject / Topic:' : 'Video Topic or Key Message:'}
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={
                  language === 'roman_urdu'
                    ? 'e.g., iPhone 17 hidden features, How to make $100/day online, Gym mistakes...'
                    : 'e.g., 3 productivity apps nobody knows, How to grow on TikTok in 2026...'
                }
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE] transition-all placeholder-gray-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Target Duration:</label>
              <select
                value={targetDuration}
                onChange={(e) => setTargetDuration(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25F4EE] cursor-pointer"
              >
                <option value="15-20s">15 - 20s (Fast Viral)</option>
                <option value="30-45s">30 - 45s (Standard High RPM)</option>
                <option value="60s+">60s+ (Creator Rewards Eligible)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleGenerateHooks}
              disabled={loadingHooks || !topic.trim()}
              className="bg-gradient-to-r from-[#FE2C55] to-pink-600 hover:opacity-95 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#FE2C55]/20 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#25F4EE]" />
              <span>
                {loadingHooks
                  ? 'Generating Hooks...'
                  : language === 'roman_urdu'
                  ? '1. Generate 5 Viral Hooks'
                  : '1. Generate 5 Viral Hooks'}
              </span>
            </button>

            <button
              onClick={() => handleGenerateFullScript()}
              disabled={loadingScript || !topic.trim()}
              className="bg-gradient-to-r from-[#25F4EE] to-teal-400 hover:opacity-95 disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#25F4EE]/20 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>
                {loadingScript
                  ? 'Scripting Full Video...'
                  : language === 'roman_urdu'
                  ? '2. Generate Full Scene-by-Scene Script'
                  : '2. Generate Full Script'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Hooks Showcase */}
      {generatedHooks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FE2C55]" />
              <span>
                {language === 'roman_urdu' ? 'Select Your 3-Second Viral Hook:' : 'Select Your 3-Second Viral Hook:'}
              </span>
            </h3>
            <span className="text-xs text-gray-400">
              Click any hook to attach it to full script
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedHooks.map((hook, idx) => {
              const isSelected = selectedHook?.id === hook.id || selectedHook?.spokenText === hook.spokenText;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedHook(hook);
                    handleGenerateFullScript(hook);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-gray-900 border-[#FE2C55] shadow-lg shadow-[#FE2C55]/15'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg bg-gray-800 text-[#25F4EE] border border-gray-700">
                      {hook.category} Hook
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(`Spoken: "${hook.spokenText}"\nOn-Screen Text: "${hook.onScreenText}"`, `hook-${idx}`);
                      }}
                      className="text-gray-400 hover:text-white p-1 rounded transition-colors"
                      title="Copy hook text"
                    >
                      {copiedSection === `hook-${idx}` ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs text-gray-400 block">🗣️ Spoken Line (First 3s):</span>
                      <p className="font-bold text-white text-base text-balance">
                        "{hook.spokenText}"
                      </p>
                    </div>

                    <div className="bg-black/50 p-2.5 rounded-xl border border-gray-800/80">
                      <span className="text-[11px] text-[#FE2C55] font-bold uppercase tracking-wider block">
                        📺 On-Screen Text Overlay:
                      </span>
                      <p className="font-extrabold text-[#25F4EE] uppercase tracking-wide text-xs">
                        {hook.onScreenText}
                      </p>
                    </div>

                    <div className="text-xs text-gray-400 pt-1">
                      <span className="text-gray-500 font-medium">🎬 Visual Movement: </span>
                      <span>{hook.visualAction}</span>
                    </div>

                    <div className="text-[11px] text-amber-400/90 italic bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                      💡 Why it works: {hook.whyItWorks}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Generated Full Script Display */}
      {generatedScript && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#25F4EE]/20 text-[#25F4EE]">
                  {generatedScript.targetDuration}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#FE2C55]/20 text-[#FE2C55]">
                  {generatedScript.niche}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">
                {generatedScript.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTeleprompterOpen(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/30"
              >
                <Tv className="w-4 h-4" />
                <span>Teleprompter Mode</span>
              </button>

              <button
                onClick={() =>
                  handleCopy(
                    `TITLE: ${generatedScript.title}\n\nHOOK:\nSpoken: ${generatedScript.hook.spokenText}\nOn-Screen: ${generatedScript.hook.onScreenText}\n\nSCENES:\n` +
                      generatedScript.scenes
                        .map((s) => `[${s.timestamp}]\nVisual: ${s.visual}\nSpeech: ${s.audioVoiceover}\nCaption: ${s.onScreenCaption}`)
                        .join('\n\n') +
                      `\n\nCTA: ${generatedScript.callToAction}\n\nSEO CAPTION:\n${generatedScript.seoCaption}\n\nHASHTAGS:\n${generatedScript.suggestedHashtags.join(' ')}`,
                    'full-script'
                  )
                }
                className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-gray-700"
              >
                {copiedSection === 'full-script' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedSection === 'full-script' ? 'Copied' : 'Copy All'}</span>
              </button>
            </div>
          </div>

          {/* Timeline Scene Breakdown */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#25F4EE]" />
              <span>Scene-by-Scene Timeline Script</span>
            </h4>

            <div className="space-y-3">
              {generatedScript.scenes.map((scene, index) => (
                <div
                  key={index}
                  className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 hover:border-gray-700 transition-all"
                >
                  <div className="md:w-32 flex-shrink-0">
                    <span className="inline-block bg-gray-800 text-[#25F4EE] text-xs font-mono font-bold px-3 py-1 rounded-lg border border-gray-700">
                      {scene.timestamp}
                    </span>
                    <p className="text-[11px] text-gray-500 mt-2 italic">
                      🎵 Sound Vibe: {scene.soundVibe}
                    </p>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div>
                      <span className="text-[11px] text-gray-400 font-semibold block uppercase">
                        🎥 Visual Action / Camera Angle:
                      </span>
                      <p className="text-sm text-gray-300 bg-gray-900/60 p-2 rounded-lg border border-gray-800/50">
                        {scene.visual}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#25F4EE] font-semibold block uppercase">
                        🗣️ Spoken Voiceover Words:
                      </span>
                      <p className="text-base font-bold text-white leading-relaxed">
                        "{scene.audioVoiceover}"
                      </p>
                    </div>

                    {scene.onScreenCaption && (
                      <div>
                        <span className="text-[11px] text-[#FE2C55] font-semibold block uppercase">
                          📝 On-Screen Text Caption:
                        </span>
                        <p className="text-xs font-extrabold text-[#FE2C55] bg-black/40 px-3 py-1.5 rounded-md inline-block uppercase">
                          {scene.onScreenCaption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Caption & Hashtags Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-2">
              <span className="text-xs font-bold text-gray-300 block flex items-center justify-between">
                <span>📱 Optimized TikTok Caption (SEO Ready)</span>
                <button
                  onClick={() => handleCopy(generatedScript.seoCaption, 'caption')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedSection === 'caption' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </span>
              <p className="text-xs text-gray-200 bg-gray-900 p-3 rounded-xl border border-gray-800">
                {generatedScript.seoCaption}
              </p>
            </div>

            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-2">
              <span className="text-xs font-bold text-gray-300 block flex items-center justify-between">
                <span>🏷️ Hashtag Stack</span>
                <button
                  onClick={() => handleCopy(generatedScript.suggestedHashtags.join(' '), 'hashtags')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedSection === 'hashtags' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {generatedScript.suggestedHashtags.map((ht, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold bg-[#FE2C55]/10 text-[#FE2C55] px-2.5 py-1 rounded-lg border border-[#FE2C55]/20"
                  >
                    {ht}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teleprompter Modal */}
      {teleprompterOpen && generatedScript && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-6 sm:p-10 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <Tv className="w-6 h-6 text-[#25F4EE]" />
              <div>
                <h3 className="text-lg font-bold text-white">Teleprompter Practice Mode</h3>
                <p className="text-xs text-gray-400">Read your voiceover text clearly as you record!</p>
              </div>
            </div>
            <button
              onClick={() => setTeleprompterOpen(false)}
              className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto my-6 space-y-8 max-w-3xl mx-auto w-full text-center py-10 space-y-12">
            <div className="bg-gradient-to-r from-[#FE2C55] to-pink-600 text-white p-6 rounded-3xl shadow-2xl">
              <span className="text-xs uppercase tracking-widest font-extrabold opacity-80 block mb-2">
                3-SEC HOOK
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold leading-snug">
                "{generatedScript.hook.spokenText}"
              </p>
            </div>

            {generatedScript.scenes.map((scene, i) => (
              <div key={i} className="space-y-3 bg-gray-900/60 border border-gray-800 p-8 rounded-3xl">
                <span className="text-sm font-mono text-[#25F4EE] font-bold block">
                  SCENE {i + 1} ({scene.timestamp})
                </span>
                <p className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">
                  {scene.audioVoiceover}
                </p>
                {scene.onScreenCaption && (
                  <p className="text-sm font-semibold text-[#FE2C55] uppercase tracking-wider">
                    Screen Text: {scene.onScreenCaption}
                  </p>
                )}
              </div>
            ))}

            <div className="bg-teal-500/20 border border-teal-500/40 text-teal-300 p-6 rounded-3xl">
              <span className="text-xs uppercase tracking-widest font-bold block mb-2">
                CALL TO ACTION
              </span>
              <p className="text-2xl font-bold">{generatedScript.callToAction}</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setTeleprompterOpen(false)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-2xl font-bold"
            >
              Close Teleprompter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
