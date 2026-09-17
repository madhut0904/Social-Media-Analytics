import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  Radio, 
  ShieldAlert, 
  MapPin, 
  Download, 
  Search, 
  Flame, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Heart, 
  Repeat, 
  Share2, 
  Info,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Globe,
  Award,
  Check,
  Copy,
  Zap,
  ShieldCheck
} from 'lucide-react';

interface SocialMindDashboardProps {
  onOpenDossier: () => void;
  onOpenWorkbench: () => void;
  onSelectTab: (tab: any) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (p: string) => void;
  timeRange: string;
  setTimeRange: (r: string) => void;
}

export const SocialMindDashboard: React.FC<SocialMindDashboardProps> = ({
  onOpenDossier,
  onOpenWorkbench,
  onSelectTab,
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  timeRange,
  setTimeRange,
}) => {
  const [feedPlatform, setFeedPlatform] = useState<string>('all');
  const [activeQueryTag, setActiveQueryTag] = useState<string | null>('India - Climate Change');
  const [hoveredHotspot, setHoveredHotspot] = useState<any | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [repostedPosts, setRepostedPosts] = useState<Record<string, boolean>>({});

  // Trending Topics from Slide 5
  const baseTrendingTopics = [
    { rank: 1, name: 'Climate Change', mentions: '28,742', trend: '+38%', isHot: true, rawMentions: 28742 },
    { rank: 2, name: 'Green Energy', mentions: '18,421', trend: '+62%', isHot: true, rawMentions: 18421 },
    { rank: 3, name: 'COP29', mentions: '12,903', trend: '+48%', isHot: true, rawMentions: 12903 },
    { rank: 4, name: 'Renewable Energy', mentions: '10,742', trend: '+37%', isHot: false, rawMentions: 10742 },
    { rank: 5, name: 'Global Warming', mentions: '8,921', trend: '+29%', isHot: false, rawMentions: 8921 },
    { rank: 6, name: 'Sustainability', mentions: '6,873', trend: '+21%', isHot: false, rawMentions: 6873 },
    { rank: 7, name: 'Earth Day', mentions: '4,562', trend: '+16%', isHot: false, rawMentions: 4562 },
    { rank: 8, name: 'Carbon Emissions', mentions: '3,921', trend: '+12%', isHot: false, rawMentions: 3921 },
  ];

  // Filter topics based on search query
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return baseTrendingTopics;
    return baseTrendingTopics.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Top Influencers from Slide 5
  const topInfluencers = [
    { id: 'inf1', name: '@GreenVoice', handle: 'GreenVoice', followers: '1.2M Followers', avatarBg: 'from-emerald-500 to-teal-700', badge: 'High Influence', score: 0.94 },
    { id: 'inf2', name: '@ClimateHub', handle: 'ClimateHub', followers: '850k Followers', avatarBg: 'from-cyan-500 to-blue-700', badge: 'Key Node', score: 0.88 },
    { id: 'inf3', name: '@EcoNews', handle: 'EcoNews', followers: '620k Followers', avatarBg: 'from-purple-500 to-indigo-700', badge: 'Bridge', score: 0.81 },
    { id: 'inf4', name: '@SustainDaily', handle: 'SustainDaily', followers: '410k Followers', avatarBg: 'from-amber-500 to-orange-700', badge: 'Active', score: 0.74 },
  ];

  // Base Live Feed Posts
  const baseLivePosts = [
    {
      id: 'p1',
      platform: 'x',
      author: '@ClimateActionNow',
      hash: 'sha256_e82b794f',
      time: '2m ago',
      text: 'The impact of climate change is real and we need action now. #ClimateChange #COP29',
      sentiment: 'Supportive',
      sentimentColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      likes: 1240,
      reposts: 1420,
    },
    {
      id: 'p2',
      platform: 'x',
      author: '@EcoTake',
      hash: 'sha256_b31c9a01',
      time: '5m ago',
      text: 'New report shows rising sea levels in coastal regions. This is alarming! #COP29',
      sentiment: 'Anxiety',
      sentimentColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
      likes: 842,
      reposts: 3100,
    },
    {
      id: 'p3',
      platform: 'reddit',
      author: 'u/TechForEarth',
      hash: 'sha256_78fa41d2',
      time: '8m ago',
      text: 'Is renewable energy really the solution? I have my doubts on cost & grid storage... #ClimateChange',
      sentiment: 'Against',
      sentimentColor: 'text-rose-400 bg-rose-950/60 border-rose-500/30',
      likes: 421,
      reposts: 1200,
    },
    {
      id: 'p4',
      platform: 'x',
      author: '@nature_lovers',
      hash: 'sha256_4a91f3c8',
      time: '12m ago',
      text: "Small changes make a big difference. Let's protect our planet! #Sustainability #GreenEnergy",
      sentiment: 'Supportive',
      sentimentColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      likes: 398,
      reposts: 1100,
    },
    {
      id: 'p5',
      platform: 'telegram',
      author: '@GlobalEcoTelegram',
      hash: 'sha256_9c7e2b10',
      time: '15m ago',
      text: 'Official discussion paper on renewable power subsidies published for comment. #RenewableEnergy',
      sentiment: 'Supportive',
      sentimentColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      likes: 540,
      reposts: 890,
    },
    {
      id: 'p6',
      platform: 'instagram',
      author: '@EcoVisualsDaily',
      hash: 'sha256_1f8a7e3d',
      time: '20m ago',
      text: 'Infographic: Carbon emission reductions across top industrial zones #CarbonEmissions #GreenEnergy',
      sentiment: 'Supportive',
      sentimentColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      likes: 2150,
      reposts: 940,
    },
    {
      id: 'p7',
      platform: 'facebook',
      author: 'Clean Energy Community Group',
      hash: 'sha256_62c9d18b',
      time: '26m ago',
      text: 'Community rooftop solar adoption is up 45% this quarter! Join our weekend workshop.',
      sentiment: 'Supportive',
      sentimentColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      likes: 670,
      reposts: 310,
    },
  ];

  // Filter feed posts based on platform & search
  const filteredFeedPosts = useMemo(() => {
    return baseLivePosts.filter(p => {
      const matchPlatform = feedPlatform === 'all' || p.platform === feedPlatform;
      const matchSearch = !searchQuery.trim() || 
        p.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchPlatform && matchSearch;
    });
  }, [feedPlatform, searchQuery]);

  // Alerts from Slide 5
  const alertsList = [
    {
      id: 'a1',
      type: 'danger',
      title: 'Rapidly rising topic detected',
      desc: '"Climate Change" has increased by 86% in the last 6 hours.',
      time: '2m ago',
      dotColor: 'bg-rose-500',
      borderColor: 'border-rose-500/30 hover:border-rose-500/50',
    },
    {
      id: 'a2',
      type: 'warning',
      title: 'Sudden negative sentiment',
      desc: 'Negative sentiment around "COP29" rose by 42%',
      time: '18m ago',
      dotColor: 'bg-amber-400',
      borderColor: 'border-amber-500/30 hover:border-amber-500/50',
    },
    {
      id: 'a3',
      type: 'info',
      title: 'High information spread',
      desc: 'Key Influencer @GreenVoice shared the topic with 5.2M followers.',
      time: '32m ago',
      dotColor: 'bg-cyan-400',
      borderColor: 'border-cyan-500/30 hover:border-cyan-500/50',
    },
  ];

  // Geographic Heat Points on India Map
  const geoHotspots = [
    { city: 'Delhi', percentage: '18%', x: 95, y: 65, activeUsers: '24.2K', polarity: '58% Dissent / Anxiety', channel: 'X / Telegram' },
    { city: 'Mumbai', percentage: '12%', x: 65, y: 115, activeUsers: '16.8K', polarity: '62% Support', channel: 'X / Reddit' },
    { city: 'Bengaluru', percentage: '9%', x: 85, y: 160, activeUsers: '12.4K', polarity: '71% Support', channel: 'X / Instagram' },
    { city: 'Chennai', percentage: '7%', x: 105, y: 168, activeUsers: '9.6K', polarity: '55% Supportive', channel: 'Telegram / FB' },
    { city: 'Kolkata', percentage: '6%', x: 145, y: 100, activeUsers: '8.1K', polarity: '49% Neutral', channel: 'Telegram / X' },
    { city: 'Hyderabad', percentage: '5%', x: 90, y: 130, activeUsers: '7.3K', polarity: '64% Support', channel: 'Reddit / X' },
  ];

  const handleCopyCitation = (post: any) => {
    const citation = `[SocialMind AI Citation] Platform: ${post.platform.toUpperCase()} | Author: ${post.author} (${post.hash}) | Sentiment: ${post.sentiment} | "${post.text}"`;
    navigator.clipboard.writeText(citation);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleLike = (id: string) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleRepost = (id: string) => {
    setRepostedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4 lg:space-y-5 animate-entrance">
      {/* Top Breadcrumb / Title Bar with Filter Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-display">
              Social Media Intelligence Dashboard
            </h2>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              Live Ingest Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Real-time insights from X and Telegram (and more)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeQueryTag && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_12px_rgba(6,182,212,0.2)]">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">{activeQueryTag}</span>
              <button 
                onClick={() => setActiveQueryTag(null)}
                className="hover:text-white ml-1 text-slate-400 text-xs hover:scale-110 transition-transform"
                title="Clear filter tag"
              >
                ✕
              </button>
            </div>
          )}

          <button
            onClick={() => onSelectTab('timeline')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-cyan-300 border border-cyan-500/40 transition-all font-mono shadow-[0_0_10px_rgba(6,182,212,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Time Machine View</span>
          </button>
        </div>
      </div>

      {/* 3 Top KPI Cards (Exact Slide 5 Numbers) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 lg:gap-4">
        {/* Total Posts */}
        <div className="glass-panel glass-panel-hover p-4 bg-[#090e1a]/95 border border-white/[0.08] relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Total Posts
            </span>
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
              124,893
            </span>
            <span className="flex items-center text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +34%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-1">
            vs. previous 24h
          </p>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
        </div>

        {/* Total Users */}
        <div className="glass-panel glass-panel-hover p-4 bg-[#090e1a]/95 border border-white/[0.08] relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Total Users
            </span>
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
              48,721
            </span>
            <span className="flex items-center text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +28%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-1">
            vs. previous 24h
          </p>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-blue-500/20 transition-all"></div>
        </div>

        {/* Active Channels */}
        <div className="glass-panel glass-panel-hover p-4 bg-[#090e1a]/95 border border-white/[0.08] relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Active Channels
            </span>
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-2xl lg:text-3xl font-bold font-display text-white tracking-tight">
              2,348
            </span>
            <span className="flex items-center text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +41%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-1">
            vs. previous 24h
          </p>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>
        </div>
      </div>

      {/* Row 1: Middle 4-Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 lg:gap-4">
        {/* Card 1: Sentiment Analysis */}
        <div className="glass-panel p-4 bg-[#090e1a]/95 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-display">
                Sentiment Analysis
              </h3>
              <span 
                className="p-1 rounded bg-black/40 text-slate-400 hover:text-white cursor-pointer hover:bg-white/[0.08] transition-colors" 
                onClick={() => onSelectTab('sentiment')}
                title="Open Sentiment Analysis deep dive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 font-mono">
              How people feel about this topic
            </p>

            {/* Donut Chart with Center Text & Legend */}
            <div className="flex items-center justify-between gap-2.5 my-2">
              {/* SVG Donut */}
              <div className="relative w-26 h-26 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="transparent" stroke="#131b2e" strokeWidth="4.5" />
                  
                  {/* Supportive: 42% (Emerald) */}
                  <circle
                    cx="18" cy="18" r="14" fill="transparent"
                    stroke="#10b981" strokeWidth="4.5"
                    strokeDasharray="36.9 88" strokeDashoffset="0"
                    className="transition-all duration-700 hover:stroke-[5.5] cursor-pointer"
                  />
                  {/* Against: 31% (Rose) */}
                  <circle
                    cx="18" cy="18" r="14" fill="transparent"
                    stroke="#ef4444" strokeWidth="4.5"
                    strokeDasharray="27.3 88" strokeDashoffset="-36.9"
                    className="transition-all duration-700 hover:stroke-[5.5] cursor-pointer"
                  />
                  {/* Anxiety: 17% (Amber) */}
                  <circle
                    cx="18" cy="18" r="14" fill="transparent"
                    stroke="#f59e0b" strokeWidth="4.5"
                    strokeDasharray="14.9 88" strokeDashoffset="-64.2"
                    className="transition-all duration-700 hover:stroke-[5.5] cursor-pointer"
                  />
                  {/* Neutral: 10% (Slate) */}
                  <circle
                    cx="18" cy="18" r="14" fill="transparent"
                    stroke="#64748b" strokeWidth="4.5"
                    strokeDasharray="8.8 88" strokeDashoffset="-79.1"
                    className="transition-all duration-700 hover:stroke-[5.5] cursor-pointer"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] font-mono text-slate-400 uppercase leading-none">Overall</span>
                  <span className="text-[10px] font-bold text-white font-mono leading-none mt-0.5">Sentiment</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-1 flex-1 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
                    <span className="text-slate-300 text-[11px]">Supportive</span>
                  </div>
                  <span className="font-bold text-emerald-400 text-xs">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#ef4444]"></span>
                    <span className="text-slate-300 text-[11px]">Against</span>
                  </div>
                  <span className="font-bold text-rose-400 text-xs">31%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]"></span>
                    <span className="text-slate-300 text-[11px]">Anxiety</span>
                  </div>
                  <span className="font-bold text-amber-400 text-xs">17%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                    <span className="text-slate-400 text-[11px]">Neutral</span>
                  </div>
                  <span className="font-bold text-slate-400 text-xs">10%</span>
                </div>
              </div>
            </div>

            {/* Sentiment Trend (Last 24 Hours) Mini Chart */}
            <div className="mt-3 pt-2 border-t border-white/[0.06]">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
                <span>Sentiment Trend (Last 24 Hours)</span>
              </div>
              <div className="h-16 w-full relative">
                <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                  <line x1="0" y1="15" x2="200" y2="15" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
                  <line x1="0" y1="35" x2="200" y2="35" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
                  <line x1="0" y1="55" x2="200" y2="55" stroke="rgba(255,255,255,0.08)" />

                  <path d="M 0 35 Q 40 25, 80 18 T 140 22 T 200 15" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 0 45 Q 40 40, 80 48 T 140 38 T 200 42" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 0 50 Q 50 46, 100 52 T 160 48 T 200 50" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-0.5">
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Trending Topics */}
        <div className="glass-panel p-4 bg-[#090e1a]/95 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-display">
                Trending Topics
              </h3>
              <span 
                className="p-1 rounded bg-black/40 text-slate-400 hover:text-white cursor-pointer hover:bg-white/[0.08] transition-colors" 
                onClick={() => onSelectTab('trends')}
                title="Open Trends deep dive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 font-mono">
              Rising discussions and keywords
            </p>

            {/* Table */}
            <div className="space-y-0.5 mt-1 text-xs">
              <div className="grid grid-cols-12 text-[10px] font-mono text-slate-500 pb-1 border-b border-white/[0.06] uppercase">
                <span className="col-span-2">#</span>
                <span className="col-span-5">Topic / Keyword</span>
                <span className="col-span-3 text-right">Mentions</span>
                <span className="col-span-2 text-right">Trend</span>
              </div>

              {filteredTopics.map((t) => (
                <div 
                  key={t.rank}
                  onClick={() => setActiveQueryTag(t.name)}
                  className={`grid grid-cols-12 items-center py-1.5 px-1 rounded transition-colors cursor-pointer group ${
                    activeQueryTag === t.name 
                      ? 'bg-cyan-500/15 border-l-2 border-cyan-400' 
                      : 'hover:bg-white/[0.04]'
                  }`}
                  title={`Filter dashboard for topic: ${t.name}`}
                >
                  <span className="col-span-2 font-mono text-slate-400 text-[11px]">
                    {t.rank}
                  </span>
                  <span className="col-span-5 font-medium text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
                    {t.name}
                  </span>
                  <span className="col-span-3 text-right font-mono font-medium text-slate-300 text-[11px]">
                    {t.mentions}
                  </span>
                  <span className="col-span-2 text-right font-mono font-bold text-emerald-400 text-[11px]">
                    {t.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Audience Demographics (4 Sub-Quadrants) */}
        <div className="glass-panel p-4 bg-[#090e1a]/95 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-display">
                Audience Demographics
              </h3>
              <span 
                className="p-1 rounded bg-black/40 text-slate-400 hover:text-white cursor-pointer hover:bg-white/[0.08] transition-colors" 
                onClick={() => onSelectTab('demographics')}
                title="Open Demographics deep dive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 font-mono">
              Who is participating (aggregate & anonymized)
            </p>

            {/* 2x2 Sub-Grid */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              {/* Age Groups */}
              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-[10px] font-mono text-slate-400 block mb-1 uppercase font-semibold">
                  Age Groups
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 relative flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#131b2e" strokeWidth="4" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#06b6d4" strokeWidth="4" strokeDasharray="33 88" strokeDashoffset="0" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="30 88" strokeDashoffset="-33" />
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="16 88" strokeDashoffset="-63" />
                    </svg>
                  </div>
                  <div className="text-[9px] font-mono space-y-0.5">
                    <div className="flex justify-between gap-1 text-cyan-300"><span>18-25</span><span>38%</span></div>
                    <div className="flex justify-between gap-1 text-blue-300"><span>26-35</span><span>34%</span></div>
                    <div className="flex justify-between gap-1 text-purple-300"><span>36-50</span><span>18%</span></div>
                    <div className="flex justify-between gap-1 text-slate-400"><span>50+</span><span>10%</span></div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-[10px] font-mono text-slate-400 block mb-1 uppercase font-semibold">
                  Languages
                </span>
                <div className="space-y-1 text-[9px] font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>English</span><span className="font-bold text-cyan-300">52%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[52%]"></div>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Hindi</span><span className="font-bold text-blue-300">28%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full w-[28%]"></div>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Others</span><span>20%</span>
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-[10px] font-mono text-slate-400 block mb-1 uppercase font-semibold">
                  Geographic Dist.
                </span>
                <div className="space-y-0.5 text-[9px] font-mono">
                  <div className="flex justify-between text-slate-300"><span>Maharashtra</span><span className="text-cyan-300">24%</span></div>
                  <div className="flex justify-between text-slate-300"><span>Delhi</span><span className="text-cyan-300">18%</span></div>
                  <div className="flex justify-between text-slate-300"><span>Karnataka</span><span className="text-cyan-300">16%</span></div>
                  <div className="flex justify-between text-slate-400"><span>Tamil Nadu</span><span>12%</span></div>
                  <div className="flex justify-between text-slate-500"><span>Others</span><span>30%</span></div>
                </div>
              </div>

              {/* Professional Interests */}
              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-[10px] font-mono text-slate-400 block mb-1 uppercase font-semibold">
                  Interests
                </span>
                <div className="space-y-0.5 text-[9px] font-mono">
                  <div className="flex justify-between text-slate-300"><span>Technology</span><span className="text-purple-300">28%</span></div>
                  <div className="flex justify-between text-slate-300"><span>Education</span><span className="text-purple-300">18%</span></div>
                  <div className="flex justify-between text-slate-300"><span>Environment</span><span className="text-purple-300">16%</span></div>
                  <div className="flex justify-between text-slate-400"><span>Healthcare</span><span>12%</span></div>
                  <div className="flex justify-between text-slate-500"><span>Business</span><span>10%</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Network & Influence */}
        <div className="glass-panel p-4 bg-[#090e1a]/95 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-display">
                Network & Influence
              </h3>
              <span 
                className="p-1 rounded bg-black/40 text-slate-400 hover:text-white cursor-pointer hover:bg-white/[0.08] transition-colors" 
                onClick={() => onSelectTab('network')}
                title="Open Network Analysis graph"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 font-mono">
              How information spreads
            </p>

            {/* Mini Network Visualizer */}
            <div className="relative h-28 w-full bg-[#050811] rounded-lg border border-white/[0.06] p-2 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 160 100" className="w-full h-full">
                {/* Edges */}
                <line x1="80" y1="50" x2="35" y2="25" stroke={hoveredNode === 'inf1' ? '#06b6d4' : 'rgba(6,182,212,0.4)'} strokeWidth={hoveredNode === 'inf1' ? '2.5' : '1.5'} />
                <line x1="80" y1="50" x2="125" y2="30" stroke={hoveredNode === 'inf2' ? '#3b82f6' : 'rgba(59,130,246,0.4)'} strokeWidth={hoveredNode === 'inf2' ? '2.5' : '1.5'} />
                <line x1="80" y1="50" x2="50" y2="75" stroke={hoveredNode === 'inf3' ? '#8b5cf6' : 'rgba(139,92,246,0.4)'} strokeWidth={hoveredNode === 'inf3' ? '2.5' : '1.5'} />
                <line x1="80" y1="50" x2="115" y2="75" stroke={hoveredNode === 'inf4' ? '#f59e0b' : 'rgba(245,158,11,0.4)'} strokeWidth={hoveredNode === 'inf4' ? '2.5' : '1.5'} />
                <line x1="35" y1="25" x2="15" y2="45" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="125" y1="30" x2="145" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                {/* Central High Influence Hub */}
                <circle cx="80" cy="50" r="14" fill="#0c1830" stroke="#06b6d4" strokeWidth="2" className="animate-pulse cursor-pointer" />
                <circle cx="80" cy="50" r="6" fill="#06b6d4" />

                {/* Satellite Nodes */}
                <circle cx="35" cy="25" r="7" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" className="cursor-pointer hover:r-9 transition-all" onMouseEnter={() => setHoveredNode('inf1')} onMouseLeave={() => setHoveredNode(null)} />
                <circle cx="125" cy="30" r="8" fill="#172554" stroke="#3b82f6" strokeWidth="1.5" className="cursor-pointer hover:r-10 transition-all" onMouseEnter={() => setHoveredNode('inf2')} onMouseLeave={() => setHoveredNode(null)} />
                <circle cx="50" cy="75" r="7" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1.5" className="cursor-pointer hover:r-9 transition-all" onMouseEnter={() => setHoveredNode('inf3')} onMouseLeave={() => setHoveredNode(null)} />
                <circle cx="115" cy="75" r="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" className="cursor-pointer hover:r-8 transition-all" onMouseEnter={() => setHoveredNode('inf4')} onMouseLeave={() => setHoveredNode(null)} />
                <circle cx="15" cy="45" r="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                <circle cx="145" cy="55" r="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              </svg>
              <div className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[9px] font-mono text-cyan-300">
                High Influence
              </div>
            </div>

            {/* Top Influencers list */}
            <div className="mt-2.5 space-y-1 text-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                Top Influencers
              </span>
              {topInfluencers.map((inf) => (
                <div 
                  key={inf.name} 
                  onMouseEnter={() => setHoveredNode(inf.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`flex items-center justify-between py-1 px-1 rounded transition-colors cursor-pointer ${
                    hoveredNode === inf.id ? 'bg-cyan-500/10 text-cyan-300' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${inf.avatarBg} flex items-center justify-center text-[9px] font-bold text-white shadow-sm`}>
                      {inf.handle[0]}
                    </div>
                    <span className="font-mono font-bold text-slate-200 text-xs">
                      {inf.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {inf.followers}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Bottom 4-Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 lg:gap-4">
        {/* Card 1: Live Feed */}
        <div className="glass-panel p-4 bg-[#090e1a]/95 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-display">
                Live Feed
              </h3>
              <span 
                className="p-1 rounded bg-black/40 text-slate-400 hover:text-white cursor-pointer hover:bg-white/[0.08] transition-colors" 
                onClick={() => onSelectTab('feed')}
                title="Open Live Feed deep dive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 font-mono">
              Latest posts and discussions
            </p>

            {/* Platform Sub-tabs */}
            <div className="flex items-center gap-1 p-1 bg-black/40 rounded-lg border border-white/[0.06] mb-2.5 text-[10px] font-mono overflow-x-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'x', label: 'X (Twitter)' },
                { id: 'telegram', label: 'Telegram' },
                { id: 'instagram', label: 'Instagram' },
                { id: 'facebook', label: 'Facebook' },
                { id: 'reddit', label: 'Reddit' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFeedPlatform(tab.id)}
                  className={`px-2 py-0.5 rounded transition-all whitespace-nowrap ${
                    feedPlatform === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Posts List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredFeedPosts.map((post) => {
                const isLiked = likedPosts[post.id];
                const isReposted = repostedPosts[post.id];

                return (
                  <div key={post.id} className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] hover:border-cyan-500/30 transition-all group">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[9px] font-mono text-slate-300 uppercase">
                          {post.platform}
                        </span>
                        <span className="font-mono font-bold text-slate-200">{post.author}</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[10px]">{post.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug mb-2 font-sans">
                      {post.text}
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-white/[0.04]">
                      <div className="flex items-center gap-3 text-slate-400">
                        <button 
                          onClick={() => handleToggleLike(post.id)}
                          className={`flex items-center gap-1 transition-colors ${isLiked ? 'text-rose-400 font-bold' : 'hover:text-rose-400'}`}
                        >
                          <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-400' : ''}`} />
                          <span>{post.likes + (isLiked ? 1 : 0)}</span>
                        </button>
                        <button 
                          onClick={() => handleToggleRepost(post.id)}
                          className={`flex items-center gap-1 transition-colors ${isReposted ? 'text-cyan-300 font-bold' : 'hover:text-cyan-300'}`}
                        >
                          <Repeat className="w-3 h-3" />
                          <span>{post.reposts + (isReposted ? 1 : 0)}</span>
                        </button>
                        <button
                          onClick={() => handleCopyCitation(post)}
                          className="text-slate-500 hover:text-slate-200 transition-colors"
                          title="Copy citation"
                        >
                          {copiedId === post.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded border text-[9px] font-semibold ${post.sentimentColor}`}>
                        {post.sentiment}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 2: Geographic Heat Map */}
        <div className="glass-panel p-4 bg-[#090e1a]/95 border border-white/[0.08] flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-display">
                Geographic Heat Map
              </h3>
              <span 
                className="p-1 rounded bg-black/40 text-slate-400 hover:text-white cursor-pointer hover:bg-white/[0.08] transition-colors" 
                onClick={() => onSelectTab('demographics')}
                title="Open Demographics deep dive"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 font-mono">
              Discussion intensity across regions
            </p>

            {/* Stylized Visual India Map with Hotspots */}
            <div className="relative h-48 w-full bg-[#060a14] rounded-lg border border-white/[0.06] p-2 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 220" className="w-full h-full opacity-85">
                {/* Simplified India Landmass Silhouette */}
                <path
                  d="M 100 15 
                     C 115 15, 125 30, 135 45 
                     C 150 55, 175 65, 185 85
                     C 175 95, 150 105, 140 120
                     C 135 140, 130 160, 115 185
                     C 105 195, 100 205, 95 205
                     C 90 205, 80 190, 75 170
                     C 65 150, 50 135, 45 120
                     C 35 105, 30 85, 40 70
                     C 55 55, 75 45, 85 30 Z"
                  fill="#0c1729"
                  stroke="#1e3a5f"
                  strokeWidth="1.5"
                />

                {/* Hotspot Pulse Rings & Labels with Hover details */}
                {geoHotspots.map((spot) => {
                  const isHovered = hoveredHotspot?.city === spot.city;

                  return (
                    <g 
                      key={spot.city} 
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredHotspot(spot)}
                      onMouseLeave={() => setHoveredHotspot(null)}
                    >
                      <circle 
                        cx={spot.x} 
                        cy={spot.y} 
                        r={isHovered ? 18 : 12} 
                        fill="#ef4444" 
                        opacity="0.2" 
                        className="animate-ping" 
                        style={{ animationDuration: '3s' }} 
                      />
                      <circle 
                        cx={spot.x} 
                        cy={spot.y} 
                        r={isHovered ? 8 : 5} 
                        fill={spot.city === 'Delhi' ? '#ef4444' : spot.city === 'Mumbai' ? '#f97316' : spot.city === 'Bengaluru' ? '#eab308' : '#06b6d4'} 
                        opacity="0.9" 
                      />
                      <circle cx={spot.x} cy={spot.y} r="2" fill="#ffffff" />
                      <text 
                        x={spot.x + (spot.x > 100 ? -8 : 8)} 
                        y={spot.y + 3} 
                        fill="#f8fafc" 
                        fontSize="8.5" 
                        fontFamily="JetBrains Mono" 
                        fontWeight={isHovered ? 'bold' : 'normal'}
                        textAnchor={spot.x > 100 ? 'end' : 'start'}
                      >
                        {spot.city} {spot.percentage}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Hover Popover Details */}
              {hoveredHotspot && (
                <div className="absolute top-2 left-2 bg-[#0e1626]/95 border border-cyan-500/40 p-2 rounded-lg shadow-xl text-[10px] font-mono z-30 pointer-events-none">
                  <div className="font-bold text-white mb-0.5">{hoveredHotspot.city} Regional Hub</div>
                  <div className="text-cyan-300">Volume: {hoveredHotspot.activeUsers}</div>
                  <div className="text-amber-400">Polarity: {hoveredHotspot.polarity}</div>
                  <div className="text-slate-400 text-[9px]">Top Channel: {hoveredHotspot.channel}</div>
                </div>
              )}

              {/* Intensity Scale Bar */}
              <div className="absolute right-2 top-2 flex flex-col items-center gap-1 text-[9px] font-mono text-slate-400">
                <span>High</span>
                <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-rose-500 via-amber-400 to-cyan-500"></div>
                <span>Low</span>
              </div>
            </div>

            {/* Region Ticker */}
            <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[10px] font-mono">
              <div className="p-1 rounded bg-black/30 border border-white/[0.04]">
                <span className="text-slate-400 block text-[9px]">NORTH</span>
                <span className="text-rose-400 font-bold">42%</span>
              </div>
              <div className="p-1 rounded bg-black/30 border border-white/[0.04]">
                <span className="text-slate-400 block text-[9px]">WEST</span>
                <span className="text-amber-400 font-bold">28%</span>
              </div>
              <div className="p-1 rounded bg-black/30 border border-white/[0.04]">
                <span className="text-slate-400 block text-[9px]">SOUTH</span>
                <span className="text-cyan-300 font-bold">21%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Top Influencer Network / Key Opinion Leader */}
        <div className="glass-panel p-4 bg-[#090e1a]/95 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-display">
                Top Influencer Network
              </h3>
              <span 
                className="p-1 rounded bg-black/40 text-slate-400 hover:text-white cursor-pointer hover:bg-white/[0.08] transition-colors" 
                onClick={() => onSelectTab('network')}
                title="Open Network Analysis graph"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 font-mono">
              Propagation paths & bridge nodes
            </p>

            {/* Key Opinion Leader Central Graph */}
            <div className="relative h-48 w-full bg-[#060a14] rounded-lg border border-white/[0.06] p-2 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 180" className="w-full h-full">
                {/* Radial Glow Edges */}
                <line x1="100" y1="90" x2="40" y2="40" stroke="rgba(139,92,246,0.6)" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="100" y1="90" x2="160" y2="45" stroke="rgba(59,130,246,0.6)" strokeWidth="2" />
                <line x1="100" y1="90" x2="50" y2="140" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" />
                <line x1="100" y1="90" x2="150" y2="135" stroke="rgba(16,185,129,0.6)" strokeWidth="2" />
                <line x1="40" y1="40" x2="20" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="160" y1="45" x2="180" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                {/* Central KOL Node */}
                <circle cx="100" cy="90" r="22" fill="#2e1065" stroke="#a855f7" strokeWidth="2.5" className="animate-pulse" />
                <text x="100" y="88" fill="#f3e8ff" fontSize="7.5" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">Key Opinion</text>
                <text x="100" y="97" fill="#c084fc" fontSize="7.5" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">Leader</text>

                {/* Influencers */}
                <circle cx="40" cy="40" r="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" className="cursor-pointer" />
                <circle cx="160" cy="45" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" className="cursor-pointer" />
                <circle cx="150" cy="135" r="9" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="cursor-pointer" />
                <circle cx="50" cy="140" r="8" fill="#172554" stroke="#60a5fa" strokeWidth="1.5" className="cursor-pointer" />

                {/* Active Users */}
                <circle cx="20" cy="80" r="4.5" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="180" cy="90" r="4.5" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
              </svg>

              {/* Graph Legend on bottom */}
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-slate-400 bg-black/70 px-2 py-1 rounded border border-white/[0.04]">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Influencer</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Active User</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>New User</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] font-mono text-slate-400">
              <span>Seed Centrality: <strong className="text-cyan-300">0.89 PageRank</strong></span>
            </div>
          </div>
        </div>

        {/* Card 4: Alerts & Insights */}
        <div className="glass-panel p-4 bg-[#090e1a]/95 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-display">
                  Alerts & Insights
                </h3>
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-mono font-bold text-[9px] flex items-center justify-center animate-pulse">
                  3
                </span>
              </div>
              <span 
                className="p-1 rounded bg-black/40 text-slate-400 hover:text-white cursor-pointer hover:bg-white/[0.08] transition-colors" 
                onClick={() => onSelectTab('alerts')}
                title="Open Threat Early Warning center"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 font-mono">
              Real-time heuristic early warning
            </p>

            {/* Alerts List */}
            <div className="space-y-2">
              {alertsList.map((alert) => (
                <div key={alert.id} className={`p-2.5 rounded-lg bg-black/40 border transition-all ${alert.borderColor}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${alert.dotColor} shadow-[0_0_6px]`}></span>
                      <span className="font-mono font-bold text-xs text-slate-200">
                        {alert.title}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">{alert.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug font-sans">
                    {alert.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Download Report Button (Exact Slide 5 Style) */}
            <button
              onClick={onOpenDossier}
              className="mt-3 w-full py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SocialMindDashboard;
