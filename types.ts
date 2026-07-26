export type LanguageMode = 'roman_urdu' | 'english' | 'urdu_script';

export type CreatorLevel = '0-1k' | '1k-10k' | '10k-50k' | '50k+';

export interface ViralHook {
  id: string;
  category: 'Curiosity' | 'Controversial' | 'Relatable' | 'Educational' | 'Storytelling';
  spokenText: string;
  onScreenText: string;
  visualAction: string;
  whyItWorks: string;
}

export interface ScriptScene {
  timestamp: string;
  visual: string;
  audioVoiceover: string;
  onScreenCaption: string;
  soundVibe: string;
}

export interface GeneratedScript {
  title: string;
  niche: string;
  targetDuration: string;
  hook: ViralHook;
  scenes: ScriptScene[];
  callToAction: string;
  seoCaption: string;
  suggestedHashtags: string[];
  trendingSoundIdea: string;
}

export interface DayPlan {
  day: number;
  contentCategory: string;
  videoIdea: string;
  hookHeadline: string;
  bestPostingTime: string;
  keyGoal: 'Watch Time' | 'Shares' | 'Comments' | 'Profile Visits';
}

export interface GrowthPlan {
  niche: string;
  targetFollowerGoal: string;
  dailyRoutine: string[];
  days: DayPlan[];
  algorithmSecretTips: string[];
}

export interface HashtagSet {
  viralHashtags: string[];
  nicheHashtags: string[];
  targetedHashtags: string[];
  seoKeywords: string[];
  captionTemplate: string;
}

export interface AuditResult {
  growthScore: number; // 0 - 100
  accountStatus: 'Needs Optimization' | 'Good Growth Potential' | 'High Viral Ready';
  strengths: string[];
  criticalMistakes: string[];
  instantFixes: string[];
  recommendedSchedule: string;
}

export interface BioOption {
  bioText: string;
  callToAction: string;
  vibe: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

export interface TrendingTopic {
  title: string;
  description: string;
  viralScore: number;
  growthRate: string;
}

export interface TrendingSound {
  soundName: string;
  usageVibe: string;
  popularity: string;
}

export interface TrendingFormat {
  formatName: string;
  visualTip: string;
}

export interface TrendingData {
  niche: string;
  lastUpdated: string;
  viralTopics: TrendingTopic[];
  trendingSounds: TrendingSound[];
  trendingFormats: TrendingFormat[];
  trendingHashtags: string[];
  creatorActionSummary: string;
  rawText?: string;
}

export interface GroundingChunk {
  title: string;
  uri: string;
}

export interface GroundingMetadata {
  webSearchQueries?: string[];
  groundingChunks?: GroundingChunk[];
}

