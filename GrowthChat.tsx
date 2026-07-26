import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Copy, Check, Flame, HelpCircle } from 'lucide-react';
import { ChatMessage, LanguageMode } from '../types';

interface GrowthChatProps {
  language: LanguageMode;
  niche: string;
}

export const GrowthChat: React.FC<GrowthChatProps> = ({ language, niche }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text:
        language === 'roman_urdu'
          ? `Assalam-o-Alaikum / Hello! Main Apka TikTok Growth & Algorithm Coach hoon! 🚀\n\nMain aapki help kar sakta hoon:\n• **200-view jail se baahar nikalne mein**\n• **70%+ Completion Rate (Watch time) haasil karne mein**\n• **Viral 3-Second Hooks aur Scripts likhne mein**\n• **Monetization & Creator Rewards Program guide karne mein**\n\nAap abhi kis problem ka samna kar rahe hain? Niche input mein likhein ya niche diye gaye quick topics select karein!`
          : `Welcome to the TikTok Growth Studio! 🚀\n\nI am your AI TikTok Algorithm Specialist. How can I help you scale today?\n\nAsk me about:\n• Breaking out of the 200-view jail\n• 3-second hook strategies for ${niche}\n• Creator Rewards Program & RPM optimization\n• TikTok SEO & FYP ranking hacks`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts =
    language === 'roman_urdu'
      ? [
          'Meri videos 200 views par freeze kyu ho jaati hain?',
          'TikTok Creator Rewards / Monetization kaise activate karein?',
          'TikTok Algorithm 2026 ke 3 sab se bade secrets?',
          '3-second hook se retention rate kaise 70%+ karein?',
          'TikTok Shadowban check karne aur khatam karne ka tarika?',
        ]
      : [
          'Why are my videos stuck at 200-300 views?',
          'How to hit 70%+ completion rate on 30s videos?',
          'Top TikTok SEO ranking secrets for 2026',
          'How to join TikTok Creator Rewards Program in unsupported regions?',
          'Best posting schedule for global audience?',
        ];

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat-growth-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          niche,
          history: messages.slice(-10),
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'Sorry, I encountered an issue generating a response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Network error. Please try again or check your backend connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-145px)] max-w-5xl mx-auto p-3 sm:p-6 gap-4">
      {/* Quick Prompts Banner */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-3 sm:p-4 shadow-inner">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-4 h-4 text-[#FE2C55]" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
            {language === 'roman_urdu' ? 'Quick Algorithm Questions:' : 'Popular Algorithm Queries:'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              disabled={loading}
              className="text-xs bg-gray-800/80 hover:bg-[#FE2C55]/20 hover:border-[#FE2C55]/50 border border-gray-700/80 text-gray-200 px-3 py-1.5 rounded-xl transition-all text-left flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#25F4EE] flex-shrink-0" />
              <span>{qp}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Window */}
      <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-2xl p-4 overflow-y-auto space-y-4 shadow-xl scrollbar-thin scrollbar-thumb-gray-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FE2C55] to-[#25F4EE] p-0.5 flex-shrink-0 mt-1">
                <div className="w-full h-full bg-[#121212] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#25F4EE]" />
                </div>
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#FE2C55] to-pink-600 text-white rounded-tr-none shadow-lg'
                  : 'bg-gray-800/90 text-gray-100 border border-gray-700/70 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans space-y-2">
                {msg.text.split('\n').map((line, i) => {
                  if (line.startsWith('• ') || line.startsWith('- ')) {
                    return (
                      <li key={i} className="list-disc ml-4 text-gray-200">
                        {line.substring(2)}
                      </li>
                    );
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <h4 key={i} className="font-bold text-[#25F4EE] mt-2">
                        {line.replace(/\*\*/g, '')}
                      </h4>
                    );
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[10px] opacity-75">
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    className="flex items-center gap-1 hover:text-[#25F4EE] transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-gray-200" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FE2C55] to-[#25F4EE] p-0.5 animate-spin">
              <div className="w-full h-full bg-[#121212] rounded-[10px]" />
            </div>
            <div className="bg-gray-800/80 border border-gray-700 px-4 py-2.5 rounded-2xl text-xs text-gray-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#25F4EE] animate-bounce" />
              <span>Analyzing TikTok algorithm data & crafting strategy...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex gap-2 bg-gray-900 border border-gray-800 p-2 rounded-2xl shadow-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={
            language === 'roman_urdu'
              ? 'Apna TikTok sawal poochain (e.g. 200 views issue, viral video structure, monetization)...'
              : 'Ask anything about TikTok algorithm, views, hooks, monetization...'
          }
          className="flex-1 bg-transparent border-none text-white px-3 text-sm focus:outline-none placeholder-gray-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] hover:opacity-90 disabled:opacity-50 text-black font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#FE2C55]/20 cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
