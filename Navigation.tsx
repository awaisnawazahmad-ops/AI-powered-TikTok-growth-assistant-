import React from 'react';
import {
  MessageSquareText,
  Zap,
  CalendarDays,
  Hash,
  SearchCheck,
  UserCheck,
  Calculator,
  Flame
} from 'lucide-react';

export type ActiveTab =
  | 'trending'
  | 'chat'
  | 'hooks_script'
  | 'roadmap'
  | 'hashtags'
  | 'audit'
  | 'bio'
  | 'calculator';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  language,
}) => {
  const tabs = [
    {
      id: 'trending' as ActiveTab,
      label: language === 'roman_urdu' ? 'Trending Now' : 'Trending Now',
      subLabel: 'Live Google Search',
      icon: Flame,
      badge: 'SEARCH',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold'
    },
    {
      id: 'chat' as ActiveTab,
      label: language === 'roman_urdu' ? 'AI Growth Coach' : 'AI Growth Coach',
      subLabel: language === 'roman_urdu' ? 'Urdu/Hindi Advisor' : 'Ask Anything',
      icon: MessageSquareText,
      badge: 'Live',
      badgeColor: 'bg-[#FE2C55]/20 text-[#FE2C55] border-[#FE2C55]/30'
    },

    {
      id: 'hooks_script' as ActiveTab,
      label: language === 'roman_urdu' ? 'Viral Hooks & Script' : 'Viral Scripts',
      subLabel: '3-Sec Hooks & Teleprompter',
      icon: Zap,
      badge: 'Hot',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      id: 'roadmap' as ActiveTab,
      label: language === 'roman_urdu' ? '30-Day Growth Plan' : '30-Day Strategy',
      subLabel: 'Day-by-Day Content Map',
      icon: CalendarDays,
    },
    {
      id: 'hashtags' as ActiveTab,
      label: 'Hashtags & SEO',
      subLabel: 'FYP Search Keywords',
      icon: Hash,
    },
    {
      id: 'audit' as ActiveTab,
      label: language === 'roman_urdu' ? 'Account Audit' : 'Account Audit',
      subLabel: 'Score & Fix 200 Views',
      icon: SearchCheck,
    },
    {
      id: 'bio' as ActiveTab,
      label: 'Viral Bio Lab',
      subLabel: 'Convert Profile Visitors',
      icon: UserCheck,
    },
    {
      id: 'calculator' as ActiveTab,
      label: language === 'roman_urdu' ? 'Earnings Calculator' : 'Rewards Calc',
      subLabel: 'RPM & Views Estimator',
      icon: Calculator,
    },
  ];

  return (
    <nav className="bg-[#18181b] border-b border-gray-800 px-4 pt-2 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-t-xl font-medium text-xs sm:text-sm transition-all border-b-2 ${
                isActive
                  ? 'bg-gray-900 text-white border-[#25F4EE] shadow-lg shadow-[#25F4EE]/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#25F4EE]' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="flex items-center gap-1.5 font-semibold leading-none">
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`px-1.5 py-0.2 text-[10px] uppercase font-bold rounded border ${tab.badgeColor}`}>
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 font-normal block mt-0.5">
                  {tab.subLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
