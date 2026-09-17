import React, { useState, useEffect, useRef } from 'react';
import cytoscape, { Core } from 'cytoscape';
import { 
  History, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Share2, 
  Zap, 
  Radio, 
  Flame, 
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Sliders
} from 'lucide-react';

export interface TimelineStage {
  id: string;
  timestamp: string;
  stageName: 'Origin' | 'Signal' | 'Amplification' | 'Cross-platform spread' | 'Acceleration' | 'Early warning';
  subtitle: string;
  narrativeDescription: string;
  velocityRpm: number;
  totalVolume: string;
  riskScore: number;
  riskLevel: 'NOMINAL' | 'LOW' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  dominantSentiment: { label: string; percentage: number; color: string };
  sentimentBreakdown: { dissent: number; support: number; neutral: number };
  emotionBreakdown: { emotion: string; percentage: number; color: string }[];
  platformDistribution: { platform: string; percentage: number; color: string }[];
  keyInfluencer: { handle: string; platform: string; betweenness: number; influence: number };
  activeNodes: string[];
  activeEdges: { source: string; target: string; type: string }[];
  samplePosts: {
    platform: 'x' | 'telegram' | 'reddit';
    author: string;
    time: string;
    text: string;
    sentiment: string;
  }[];
}

export const TIMELINE_STAGES: TimelineStage[] = [
  {
    id: 'stage_0',
    timestamp: '00:00 UTC',
    stageName: 'Origin',
    subtitle: 'Isolated Seed on Public Policy Portal',
    narrativeDescription: 'Initial draft policy amendment uploaded to the municipal gazette. Low visibility with zero mainstream social media discussion.',
    velocityRpm: 180,
    totalVolume: '8.2K msgs',
    riskScore: 12,
    riskLevel: 'NOMINAL',
    dominantSentiment: { label: 'Neutral', percentage: 65, color: '#64748B' },
    sentimentBreakdown: { dissent: 18, support: 17, neutral: 65 },
    emotionBreakdown: [
      { emotion: 'Neutral', percentage: 65, color: '#64748B' },
      { emotion: 'Curiosity', percentage: 20, color: '#06B6D4' },
      { emotion: 'Anxiety', percentage: 10, color: '#F59E0B' },
      { emotion: 'Support', percentage: 5, color: '#10B981' },
    ],
    platformDistribution: [
      { platform: 'X (Twitter)', percentage: 85, color: '#06B6D4' },
      { platform: 'Reddit', percentage: 15, color: '#F97316' },
      { platform: 'Telegram', percentage: 0, color: '#3B82F6' },
    ],
    keyInfluencer: { handle: '@citizen_watchdog', platform: 'x', betweenness: 0.12, influence: 52 },
    activeNodes: ['usr_public_voice'],
    activeEdges: [],
    samplePosts: [
      {
        platform: 'x',
        author: '@citizen_watchdog',
        time: '00:14 UTC',
        text: 'Draft notification published for municipal transport restructuring framework. Public feedback period opens next week.',
        sentiment: 'Neutral',
      },
    ],
  },
  {
    id: 'stage_1',
    timestamp: '04:00 UTC',
    stageName: 'Signal',
    subtitle: 'Civic Group Friction Detected',
    narrativeDescription: 'Policy analysts in commuter subreddits identify Clause 4 regarding feeder bus subsidy restructuring. Initial anxiety signals surface.',
    velocityRpm: 1420,
    totalVolume: '24.5K msgs',
    riskScore: 28,
    riskLevel: 'LOW',
    dominantSentiment: { label: 'Anxiety / Mixed', percentage: 42, color: '#F59E0B' },
    sentimentBreakdown: { dissent: 38, support: 24, neutral: 38 },
    emotionBreakdown: [
      { emotion: 'Anxiety', percentage: 42, color: '#F59E0B' },
      { emotion: 'Dissent', percentage: 30, color: '#EF4444' },
      { emotion: 'Support', percentage: 18, color: '#10B981' },
      { emotion: 'Curiosity', percentage: 10, color: '#06B6D4' },
    ],
    platformDistribution: [
      { platform: 'Reddit', percentage: 55, color: '#F97316' },
      { platform: 'X (Twitter)', percentage: 38, color: '#06B6D4' },
      { platform: 'Telegram', percentage: 7, color: '#3B82F6' },
    ],
    keyInfluencer: { handle: 'u/UrbanPlanner_IND', platform: 'reddit', betweenness: 0.28, influence: 64 },
    activeNodes: ['usr_public_voice', 'usr_local_updates', 'usr_tech_observer'],
    activeEdges: [
      { source: 'usr_local_updates', target: 'usr_tech_observer', type: 'quote' },
    ],
    samplePosts: [
      {
        platform: 'reddit',
        author: 'u/UrbanPlanner_IND',
        time: '04:22 UTC',
        text: 'Analyzing the annexures: Clause 4 could reduce feeder bus frequency by 20% in non-metro corridors. Commuter impact breakdown attached.',
        sentiment: 'Dissent',
      },
      {
        platform: 'x',
        author: '@metro_commuter',
        time: '04:51 UTC',
        text: 'Wait, are they really touching feeder bus routes during peak hours?',
        sentiment: 'Anxiety',
      },
    ],
  },
  {
    id: 'stage_2',
    timestamp: '08:00 UTC',
    stageName: 'Amplification',
    subtitle: 'High-Centrality Opinion Leader Broadcast',
    narrativeDescription: '@policy_voice (Centrality 0.82) publishes an extensive 8-part breakdown criticizing transition funding, driving 18.4K second-degree reposts.',
    velocityRpm: 6800,
    totalVolume: '142K msgs',
    riskScore: 58,
    riskLevel: 'ELEVATED',
    dominantSentiment: { label: 'Dissent Surge', percentage: 52, color: '#EF4444' },
    sentimentBreakdown: { dissent: 52, support: 22, neutral: 26 },
    emotionBreakdown: [
      { emotion: 'Dissent', percentage: 52, color: '#EF4444' },
      { emotion: 'Anxiety', percentage: 28, color: '#F59E0B' },
      { emotion: 'Support', percentage: 12, color: '#10B981' },
      { emotion: 'Sarcasm', percentage: 8, color: '#8B5CF6' },
    ],
    platformDistribution: [
      { platform: 'X (Twitter)', percentage: 68, color: '#06B6D4' },
      { platform: 'Telegram', percentage: 22, color: '#3B82F6' },
      { platform: 'Reddit', percentage: 10, color: '#F97316' },
    ],
    keyInfluencer: { handle: '@policy_voice', platform: 'x', betweenness: 0.82, influence: 94 },
    activeNodes: ['usr_policy_voice', 'usr_news_hub', 'usr_public_voice', 'usr_local_updates', 'usr_tech_observer'],
    activeEdges: [
      { source: 'usr_policy_voice', target: 'usr_news_hub', type: 'repost' },
      { source: 'usr_news_hub', target: 'usr_public_voice', type: 'quote' },
      { source: 'usr_local_updates', target: 'usr_tech_observer', type: 'quote' },
    ],
    samplePosts: [
      {
        platform: 'x',
        author: '@policy_voice',
        time: '08:05 UTC',
        text: 'Thread: The proposed #NewPolicy transit amendments contain a structural gap. Without transitional subsidy bridging, municipal feeder lines face severe defunding.',
        sentiment: 'Dissent',
      },
      {
        platform: 'x',
        author: '@news_hub',
        time: '08:34 UTC',
        text: 'Policy debate heats up over new transit framework as analysts flag commuter impacts.',
        sentiment: 'Neutral',
      },
    ],
  },
  {
    id: 'stage_3',
    timestamp: '12:00 UTC',
    stageName: 'Cross-platform spread',
    subtitle: 'Telegram Relay & Community Spillover',
    narrativeDescription: 'Discussion breaches platform silos. Regional civic Telegram channels forward threads to 700K+ subscribers; Reddit megathreads go live.',
    velocityRpm: 11200,
    totalVolume: '890K msgs',
    riskScore: 76,
    riskLevel: 'HIGH',
    dominantSentiment: { label: 'Strong Dissent & Anger', percentage: 59, color: '#EF4444' },
    sentimentBreakdown: { dissent: 59, support: 18, neutral: 23 },
    emotionBreakdown: [
      { emotion: 'Dissent', percentage: 59, color: '#EF4444' },
      { emotion: 'Anger', percentage: 22, color: '#DC2626' },
      { emotion: 'Anxiety', percentage: 25, color: '#F59E0B' },
      { emotion: 'Support', percentage: 14, color: '#10B981' },
      { emotion: 'Sarcasm', percentage: 9, color: '#8B5CF6' },
    ],
    platformDistribution: [
      { platform: 'X (Twitter)', percentage: 52, color: '#06B6D4' },
      { platform: 'Telegram', percentage: 34, color: '#3B82F6' },
      { platform: 'Reddit', percentage: 14, color: '#F97316' },
    ],
    keyInfluencer: { handle: '@citizen_forum', platform: 'telegram', betweenness: 0.58, influence: 81 },
    activeNodes: ['usr_policy_voice', 'usr_news_hub', 'usr_citizen_forum', 'usr_city_alerts', 'usr_metro_commuter', 'usr_public_voice'],
    activeEdges: [
      { source: 'usr_policy_voice', target: 'usr_news_hub', type: 'repost' },
      { source: 'usr_policy_voice', target: 'usr_citizen_forum', type: 'forward' },
      { source: 'usr_city_alerts', target: 'usr_policy_voice', type: 'forward' },
      { source: 'usr_citizen_forum', target: 'usr_metro_commuter', type: 'reply' },
    ],
    samplePosts: [
      {
        platform: 'telegram',
        author: '@city_alerts',
        time: '12:15 UTC',
        text: 'FORWARDED from @policy_voice: Urgent transit consultative meet planned. Ensure your objections are filed on the portal.',
        sentiment: 'Dissent',
      },
      {
        platform: 'reddit',
        author: 'u/SubwayRider_99',
        time: '12:40 UTC',
        text: 'Megathread: Proposed fare and feeder changes. What are your local ward reps saying?',
        sentiment: 'Anxiety',
      },
    ],
  },
  {
    id: 'stage_4',
    timestamp: '16:00 UTC',
    stageName: 'Acceleration',
    subtitle: 'National Virality Peak & Meme Escalation',
    narrativeDescription: 'Hashtag #NewPolicy reaches #1 nationwide trending topic. Sarcastic memes and emotional reactions surge during peak rush hour commute.',
    velocityRpm: 14800,
    totalVolume: '1.9M msgs',
    riskScore: 89,
    riskLevel: 'CRITICAL',
    dominantSentiment: { label: 'Peak Polarized Dissent', percentage: 64, color: '#DC2626' },
    sentimentBreakdown: { dissent: 64, support: 16, neutral: 20 },
    emotionBreakdown: [
      { emotion: 'Dissent', percentage: 64, color: '#EF4444' },
      { emotion: 'Anxiety', percentage: 32, color: '#F59E0B' },
      { emotion: 'Anger', percentage: 24, color: '#DC2626' },
      { emotion: 'Sarcasm', percentage: 16, color: '#8B5CF6' },
      { emotion: 'Support', percentage: 12, color: '#10B981' },
    ],
    platformDistribution: [
      { platform: 'X (Twitter)', percentage: 54, color: '#06B6D4' },
      { platform: 'Telegram', percentage: 32, color: '#3B82F6' },
      { platform: 'Reddit', percentage: 14, color: '#F97316' },
    ],
    keyInfluencer: { handle: '@policy_voice', platform: 'x', betweenness: 0.82, influence: 94 },
    activeNodes: [
      'usr_policy_voice', 
      'usr_news_hub', 
      'usr_citizen_forum', 
      'usr_city_alerts', 
      'usr_local_updates', 
      'usr_public_voice', 
      'usr_metro_commuter', 
      'usr_tech_observer'
    ],
    activeEdges: [
      { source: 'usr_policy_voice', target: 'usr_news_hub', type: 'repost' },
      { source: 'usr_policy_voice', target: 'usr_citizen_forum', type: 'forward' },
      { source: 'usr_news_hub', target: 'usr_public_voice', type: 'quote' },
      { source: 'usr_citizen_forum', target: 'usr_metro_commuter', type: 'reply' },
      { source: 'usr_local_updates', target: 'usr_tech_observer', type: 'quote' },
      { source: 'usr_city_alerts', target: 'usr_policy_voice', type: 'forward' },
      { source: 'usr_metro_commuter', target: 'usr_public_voice', type: 'mention' },
      { source: 'usr_tech_observer', target: 'usr_news_hub', type: 'reply' },
    ],
    samplePosts: [
      {
        platform: 'x',
        author: '@metro_commuter',
        time: '16:12 UTC',
        text: 'Peak hour crowd was already impossible today. If feeder frequency drops by 20%, subways will completely jam 🙄 #NewPolicy',
        sentiment: 'Dissent',
      },
      {
        platform: 'x',
        author: '@citizen_watchdog',
        time: '16:45 UTC',
        text: 'Over 40,000 objections filed on the public portal in the last 6 hours.',
        sentiment: 'Dissent',
      },
    ],
  },
  {
    id: 'stage_5',
    timestamp: '20:00 UTC',
    stageName: 'Early warning',
    subtitle: 'Autonomous Sentinel Threat Trigger & Response Protocol',
    narrativeDescription: 'PulseSphere Early Threat Sentinel detects 28% coordinated proxy relays, compiles Executive Dossier #EXP-9921, and recommends targeted clarification.',
    velocityRpm: 12400,
    totalVolume: '2.4M msgs',
    riskScore: 82,
    riskLevel: 'CRITICAL',
    dominantSentiment: { label: 'Dissent (57%) / Clarification (25%)', percentage: 57, color: '#EF4444' },
    sentimentBreakdown: { dissent: 57, support: 25, neutral: 18 },
    emotionBreakdown: [
      { emotion: 'Dissent', percentage: 57, color: '#EF4444' },
      { emotion: 'Anxiety', percentage: 29, color: '#F59E0B' },
      { emotion: 'Support', percentage: 22, color: '#10B981' },
      { emotion: 'Anger', percentage: 18, color: '#DC2626' },
      { emotion: 'Joy', percentage: 14, color: '#06B6D4' },
      { emotion: 'Sarcasm', percentage: 9, color: '#8B5CF6' },
    ],
    platformDistribution: [
      { platform: 'X (Twitter)', percentage: 54, color: '#06B6D4' },
      { platform: 'Telegram', percentage: 32, color: '#3B82F6' },
      { platform: 'Reddit', percentage: 14, color: '#F97316' },
    ],
    keyInfluencer: { handle: '@policy_voice', platform: 'x', betweenness: 0.82, influence: 94 },
    activeNodes: [
      'usr_policy_voice', 
      'usr_news_hub', 
      'usr_citizen_forum', 
      'usr_city_alerts', 
      'usr_local_updates', 
      'usr_public_voice', 
      'usr_metro_commuter', 
      'usr_tech_observer'
    ],
    activeEdges: [
      { source: 'usr_policy_voice', target: 'usr_news_hub', type: 'repost' },
      { source: 'usr_policy_voice', target: 'usr_citizen_forum', type: 'forward' },
      { source: 'usr_news_hub', target: 'usr_public_voice', type: 'quote' },
      { source: 'usr_citizen_forum', target: 'usr_metro_commuter', type: 'reply' },
      { source: 'usr_local_updates', target: 'usr_tech_observer', type: 'quote' },
      { source: 'usr_city_alerts', target: 'usr_policy_voice', type: 'forward' },
      { source: 'usr_metro_commuter', target: 'usr_public_voice', type: 'mention' },
      { source: 'usr_tech_observer', target: 'usr_news_hub', type: 'reply' },
    ],
    samplePosts: [
      {
        platform: 'x',
        author: '@policy_voice',
        time: '19:55 UTC',
        text: 'Clarification received from transport commissioner: Student concessions remain 100% untouched. Feeder capacity adjustment under technical review.',
        sentiment: 'Support',
      },
      {
        platform: 'telegram',
        author: '@city_alerts',
        time: '20:10 UTC',
        text: 'Official clarification published. Live Q&A session with transit planners announced for tomorrow at 10 AM.',
        sentiment: 'Neutral',
      },
    ],
  },
];

export const ConversationTimeMachine: React.FC = () => {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const playTimerRef = useRef<number | null>(null);

  const miniCyRef = useRef<HTMLDivElement | null>(null);
  const cyInstanceRef = useRef<Core | null>(null);

  const currentStage = TIMELINE_STAGES[currentStageIdx];

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
      return;
    }

    const intervalMs = 2600 / playbackSpeed;
    playTimerRef.current = window.setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev >= TIMELINE_STAGES.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Synchronize Mini Cytoscape Network Graph with current stage's active nodes & edges
  useEffect(() => {
    if (!miniCyRef.current) return;

    // Node definitions mapping
    const allNodeDetails: Record<string, { label: string; platform: string; color: string }> = {
      usr_policy_voice: { label: '@policy_voice', platform: 'x', color: '#06B6D4' },
      usr_news_hub: { label: '@news_hub', platform: 'x', color: '#3B82F6' },
      usr_citizen_forum: { label: '@citizen_forum', platform: 'telegram', color: '#10B981' },
      usr_city_alerts: { label: '@city_alerts', platform: 'telegram', color: '#F59E0B' },
      usr_local_updates: { label: '@local_updates', platform: 'reddit', color: '#F59E0B' },
      usr_public_voice: { label: '@public_voice', platform: 'x', color: '#06B6D4' },
      usr_metro_commuter: { label: '@metro_commuter', platform: 'x', color: '#10B981' },
      usr_tech_observer: { label: '@tech_observer', platform: 'reddit', color: '#8B5CF6' },
    };

    const elements: cytoscape.ElementDefinition[] = [
      ...currentStage.activeNodes.map((id) => {
        const details = allNodeDetails[id] || { label: id, platform: 'x', color: '#06B6D4' };
        return {
          group: 'nodes' as const,
          data: {
            id,
            label: details.label,
            color: details.color,
          },
        };
      }),
      ...currentStage.activeEdges.map((e, idx) => ({
        group: 'edges' as const,
        data: {
          id: `edge_${e.source}_${e.target}_${idx}`,
          source: e.source,
          target: e.target,
        },
      })),
    ];

    if (cyInstanceRef.current) {
      cyInstanceRef.current.destroy();
    }

    const cy = cytoscape({
      container: miniCyRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            label: 'data(label)',
            color: '#ffffff',
            'font-family': 'JetBrains Mono, monospace',
            'font-size': '10px',
            'text-valign': 'bottom',
            'text-margin-y': 4,
            width: 32,
            height: 32,
            'border-width': 2,
            'border-color': '#ffffff',
            'border-opacity': 0.4,
          } as any,
        },
        {
          selector: 'edge',
          style: {
            width: 2.5,
            'line-color': '#06B6D4',
            'target-arrow-color': '#06B6D4',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          } as any,
        },
      ],
      layout: {
        name: 'circle',
        padding: 30,
        animate: true,
        animationDuration: 400,
      } as any,
    });

    cyInstanceRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [currentStageIdx]);

  return (
    <div className="space-y-6 animate-entrance">
      {/* Signature Banner */}
      <div className="glass-panel p-6 border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-[#0a0f1d] to-[#06080d] relative overflow-hidden">
        {/* Glow accent in corner */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <History className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl lg:text-2xl font-bold font-display text-white">
                    Conversation Time Machine
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    SIGNATURE ENGINE
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Chronological Narrative Replay: Origin • Signal • Amplification • Cross-Platform Spread • Acceleration • Early Warning
                </p>
              </div>
            </div>
          </div>

          {/* Threat level at current stage */}
          <div className="flex items-center gap-3">
            <div className="text-right font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">RISK STATUS</span>
              <span
                className={`font-bold text-sm ${
                  currentStage.riskLevel === 'CRITICAL'
                    ? 'text-rose-400'
                    : currentStage.riskLevel === 'HIGH'
                    ? 'text-amber-400'
                    : currentStage.riskLevel === 'ELEVATED'
                    ? 'text-purple-400'
                    : 'text-emerald-400'
                }`}
              >
                {currentStage.riskLevel} (Score {currentStage.riskScore}/100)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] font-mono text-xs text-right">
              <span className="text-slate-400 block text-[10px]">REPLAY EPOCH</span>
              <span className="text-cyan-300 font-bold font-mono-num text-sm">
                {currentStage.timestamp}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Master Time Slider HUD */}
        <div className="mt-6 pt-5 border-t border-white/[0.08]">
          {/* Milestone Step Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-4">
            {TIMELINE_STAGES.map((st, idx) => {
              const isActive = currentStageIdx === idx;
              const isPast = currentStageIdx >= idx;

              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setCurrentStageIdx(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold'
                      : isPast
                      ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-cyan-500/40'
                      : 'bg-black/40 border-white/[0.04] text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      T-{idx} • {st.timestamp.split(' ')[0]}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isActive
                          ? 'bg-cyan-400 animate-ping'
                          : isPast
                          ? 'bg-cyan-600'
                          : 'bg-slate-700'
                      }`}
                    ></div>
                  </div>
                  <div className="text-xs font-mono font-semibold truncate">
                    {st.stageName}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continuous Range Slider */}
          <div className="flex items-center gap-4">
            {/* Play/Pause controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentStageIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentStageIdx === 0}
                className="p-2 rounded-lg bg-black/50 border border-white/[0.08] hover:bg-white/10 text-slate-300 disabled:opacity-30"
                title="Step Back"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all ${
                  isPlaying
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span className="text-xs font-mono">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span className="text-xs font-mono">Replay</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentStageIdx((prev) => Math.min(TIMELINE_STAGES.length - 1, prev + 1))}
                disabled={currentStageIdx === TIMELINE_STAGES.length - 1}
                className="p-2 rounded-lg bg-black/50 border border-white/[0.08] hover:bg-white/10 text-slate-300 disabled:opacity-30"
                title="Step Forward"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentStageIdx(0);
                  setIsPlaying(false);
                }}
                className="p-2 rounded-lg bg-black/50 border border-white/[0.08] hover:bg-white/10 text-slate-300"
                title="Reset to Origin"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Slider Input */}
            <div className="flex-1 relative flex items-center">
              <input
                type="range"
                min={0}
                max={TIMELINE_STAGES.length - 1}
                step={1}
                value={currentStageIdx}
                onChange={(e) => {
                  setCurrentStageIdx(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
            </div>

            {/* Speed Selector */}
            <div className="flex items-center bg-black/50 p-1 rounded-lg border border-white/[0.08] text-xs font-mono">
              {[1, 2, 4].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded text-[11px] ${
                    playbackSpeed === spd
                      ? 'bg-cyan-500/30 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stage Chronicle Banner */}
      <div className="p-4 rounded-xl bg-[#090d16] border border-white/[0.08] flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">
              CHRONICLE EPOCH: STAGE {currentStageIdx + 1} OF 6 ({currentStage.stageName.toUpperCase()})
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 text-xs font-semibold">{currentStage.subtitle}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1.5 max-w-4xl">
            {currentStage.narrativeDescription}
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end font-mono text-xs">
          <span className="text-slate-400 text-[10px]">INGESTION VOLUME</span>
          <span className="text-base font-bold text-white">{currentStage.totalVolume}</span>
        </div>
      </div>

      {/* Synchronized Telemetry Dashboard (Dynamic as Slider Moves) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: KPI Surge + Sentiment & Emotion Shifts (7 cols) */}
        <div className="xl:col-span-7 space-y-6">
          {/* Real-Time Stage Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 bg-[#090d16] border-white/[0.06]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono text-slate-400">TREND VELOCITY</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-xl font-bold font-display text-white font-mono-num">
                {currentStage.velocityRpm.toLocaleString()} <span className="text-xs font-mono font-normal text-slate-400">rpm</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentStage.velocityRpm / 15000) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="glass-panel p-4 bg-[#090d16] border-white/[0.06]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono text-slate-400">DOMINANT SENTIMENT</span>
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="text-base font-bold font-display text-white font-mono truncate">
                {currentStage.dominantSentiment.label}
              </div>
              <div className="text-[11px] font-mono text-rose-400 mt-1">
                {currentStage.dominantSentiment.percentage}% Skew
              </div>
            </div>

            <div className="glass-panel p-4 bg-[#090d16] border-white/[0.06]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono text-slate-400">ACTIVE INFLUENCER</span>
                <Users className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-sm font-bold font-mono text-white truncate">
                {currentStage.keyInfluencer.handle}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                Betweenness: {currentStage.keyInfluencer.betweenness}
              </div>
            </div>
          </div>

          {/* Sentiment Polarity Distribution */}
          <div className="glass-panel p-5 border-white/[0.08] bg-[#090d16]">
            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider block mb-3">
              Synchronized Sentiment Polarity Breakdown
            </span>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-rose-400">Dissent: {currentStage.sentimentBreakdown.dissent}%</span>
                <span className="text-emerald-400">Support: {currentStage.sentimentBreakdown.support}%</span>
                <span className="text-slate-400">Neutral: {currentStage.sentimentBreakdown.neutral}%</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full flex overflow-hidden">
                <div
                  className="bg-rose-500 transition-all duration-500"
                  style={{ width: `${currentStage.sentimentBreakdown.dissent}%` }}
                ></div>
                <div
                  className="bg-emerald-500 transition-all duration-500"
                  style={{ width: `${currentStage.sentimentBreakdown.support}%` }}
                ></div>
                <div
                  className="bg-slate-600 transition-all duration-500"
                  style={{ width: `${currentStage.sentimentBreakdown.neutral}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 6-D Emotion Matrix at this Epoch */}
          <div className="glass-panel p-5 border-white/[0.08] bg-[#090d16]">
            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider block mb-3">
              Neural Emotion Profile (Epoch T-{currentStageIdx})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {currentStage.emotionBreakdown.map((item) => (
                <div key={item.emotion} className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="font-mono text-slate-300">{item.emotion}</span>
                    <span className="font-mono font-bold" style={{ color: item.color }}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-400"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Social Stream at this Exact Time Window */}
          <div className="glass-panel p-5 border-white/[0.08] bg-[#090d16]">
            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider block mb-3">
              Social Media Chronicle Stream (Recorded at {currentStage.timestamp})
            </span>
            <div className="space-y-2.5">
              {currentStage.samplePosts.map((post, i) => (
                <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-xs">
                  <div className="flex justify-between items-center mb-1 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] uppercase font-bold">
                        {post.platform}
                      </span>
                      <span className="font-bold text-white">{post.author}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{post.time}</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-sans">{post.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Mini Dynamic Network Graph + Platform Share (5 cols) */}
        <div className="xl:col-span-5 space-y-6">
          {/* Dynamic Active Topology DiGraph */}
          <div className="glass-panel p-5 border-white/[0.08] bg-[#090d16] relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Active Network State</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-300">
                {currentStage.activeNodes.length} Nodes • {currentStage.activeEdges.length} Edges
              </span>
            </div>

            {/* Cytoscape Mini Stage Container */}
            <div
              ref={miniCyRef}
              className="w-full h-64 bg-[#06080d] rounded-xl border border-white/[0.06] relative"
            />
          </div>

          {/* Platform Distribution at this Stage */}
          <div className="glass-panel p-5 border-white/[0.08] bg-[#090d16]">
            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider block mb-3">
              Platform Distribution Share
            </span>
            <div className="space-y-2.5">
              {currentStage.platformDistribution.map((plat) => (
                <div key={plat.platform} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{plat.platform}</span>
                    <span className="font-bold text-white">{plat.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-400"
                      style={{ width: `${plat.percentage}%`, backgroundColor: plat.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Threat Sentinel Decision Vector */}
          <div className="glass-panel p-5 border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-[#090d16]">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Sentinel Epoch Decision Matrix</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {currentStageIdx < 2 && 'Signal beneath containment threshold. System maintaining continuous passive monitoring.'}
              {currentStageIdx === 2 && 'Velocity surge recorded. Flagged @policy_voice as key propagation broker node.'}
              {currentStageIdx === 3 && 'Cross-platform relay detected between X and Telegram civic groups. De-escalation plan staged.'}
              {currentStageIdx === 4 && 'Critical acceleration threshold reached. Automated warning alerts dispatched to crisis team.'}
              {currentStageIdx === 5 && 'Executive Intelligence Dossier deployed. Counter-clarification vectors initiated.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
