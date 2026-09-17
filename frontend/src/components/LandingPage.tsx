import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Network, 
  Users, 
  FileText, 
  Activity, 
  History, 
  Cpu, 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  Download, 
  Send, 
  MapPin, 
  Flame, 
  Lock, 
  Globe, 
  BarChart3, 
  AlertTriangle,
  Layers,
  Database,
  CheckCircle2,
  Share2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { NLPAnalysisResult } from '../types';

interface LandingPageProps {
  onLaunchDashboard: () => void;
  onOpenTimeMachine: () => void;
  onOpenNLPWorkbench: () => void;
  onSelectTab: (tab: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchDashboard,
  onOpenTimeMachine,
  onOpenNLPWorkbench,
  onSelectTab,
}) => {
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);
  const [testText, setTestText] = useState<string>(
    'The new climate energy policies look promising, but implementation in rural districts is lacking.'
  );
  const [nlpLoading, setNlpLoading] = useState<boolean>(false);
  const [nlpResult, setNlpResult] = useState<NLPAnalysisResult | null>(null);

  // Quick prompt presets for landing page sandbox
  const demoPrompts = [
    'The new climate energy policies look promising, but implementation in rural districts is lacking.',
    'Brilliant idea to double the transit prices right during economic inflation 🙄 #NewPolicy',
    'Solar installations across Rajasthan reduced grid carbon emissions by 34%! #GreenEnergy',
    'Rising sea levels along Mumbai coastline need immediate flood defense action #ClimateChange',
  ];

  const handleTestInference = async (customPrompt?: string) => {
    const text = customPrompt || testText;
    if (!text.trim()) return;
    setNlpLoading(true);
    try {
      const res = await api.inferEmotion(text);
      setNlpResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setNlpLoading(false);
    }
  };

  useEffect(() => {
    // Initial inference
    handleTestInference(demoPrompts[0]);
  }, []);

  // 6-Stage Pipeline Details (From SIH Slides 2, 4, 6)
  const pipelineStages = [
    {
      step: 1,
      name: 'Data Ingestion',
      subtitle: 'Multi-Platform Telemetry',
      icon: Radio,
      color: 'cyan',
      bgGlow: 'rgba(6,182,212,0.15)',
      description: 'Collects streaming posts, comments, and interactions from X, Telegram, Reddit, Instagram, Facebook, and YouTube via verified API gateways.',
      highlights: ['Telegram MTProto & X API v2', 'Message queue validation', 'Cryptographic author hashing'],
      tech: 'FastAPI • PRAW • Tweepy • Telethon'
    },
    {
      step: 2,
      name: 'AI Intelligence Layer',
      subtitle: 'Transformer NLP Classifier',
      icon: Sparkles,
      color: 'purple',
      bgGlow: 'rgba(168,85,247,0.15)',
      description: 'Cleans text and detects language before running DistilBERT multi-dimensional neural inference for 6D emotions, stance, and rhetorical sarcasm.',
      highlights: ['6D Emotion Spectrum', 'Stance: Support / Dissent', '94% Sarcasm Confidence'],
      tech: 'DistilBERT • HuggingFace • PyTorch'
    },
    {
      step: 3,
      name: 'Audience Intelligence',
      subtitle: 'Anonymized Demographics',
      icon: Users,
      color: 'blue',
      bgGlow: 'rgba(59,130,246,0.15)',
      description: 'Extracts public behavioral indicators to segment age brackets, regional hotspots, and professional cohorts under strict differential privacy protocols.',
      highlights: ['DP-k Differential Privacy', 'Regional Geopolitical Mapping', 'Cohort Emotion Signatures'],
      tech: 'scikit-learn • Pandas • GeoJSON'
    },
    {
      step: 4,
      name: 'Real-Time Trend Engine',
      subtitle: '5-Factor Weighted Score',
      icon: TrendingUp,
      color: 'emerald',
      bgGlow: 'rgba(16,185,129,0.15)',
      description: 'Calculates instantaneous topic velocity, post frequency, and cross-platform spread to surface emerging narratives before mainstream virality.',
      highlights: ['Score = 0.20F + 0.25V + 0.20E + 0.20S + 0.15I', 'Surge velocity alerts', 'Narrative trajectory tracking'],
      tech: 'Heuristic Queue • NumPy'
    },
    {
      step: 5,
      name: 'Influence & Network Analytics',
      subtitle: 'Graph Centrality Engine',
      icon: Network,
      color: 'amber',
      bgGlow: 'rgba(245,158,11,0.15)',
      description: 'Constructs directed interaction graphs (users ➔ posts ➔ communities) to identify bridge nodes, Key Opinion Leaders (KOL), and propagation paths.',
      highlights: ['PageRank & Betweenness Centrality', 'KOL Seed Identification', 'Community Bridge Detection'],
      tech: 'NetworkX DiGraph • Cytoscape.js'
    },
    {
      step: 6,
      name: 'Tamper-Evident Evidence',
      subtitle: 'Blockchain Audit Dossier',
      icon: ShieldCheck,
      color: 'rose',
      bgGlow: 'rgba(244,63,94,0.15)',
      description: 'Hashes every citation with SHA-256 timestamps and generates audit-ready Intelligence Dossiers for government policy response and de-escalation.',
      highlights: ['SHA-256 Ledger Stamping', 'Exportable PDF / JSON Dossiers', 'NTRO / SIH 2026 Audit-Ready'],
      tech: 'Hyperledger Fabric • Cryptography'
    },
  ];

  return (
    <div className="space-y-12 lg:space-y-16 pb-16 animate-entrance">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-10 text-center max-w-5xl mx-auto px-4 overflow-hidden">
        {/* Ambient background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/10 to-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Hackathon Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-purple-950/80 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] text-xs font-mono text-cyan-300 mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="font-bold tracking-wider">SMART INDIA HACKATHON 2026</span>
          <span className="text-slate-600">•</span>
          <span>PS ID: 26152</span>
          <span className="text-slate-600">•</span>
          <span className="text-purple-300 font-bold">TEAM KNOCKOUT</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.15] mb-5">
          AI-Powered Social Media <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Audience Intelligence & Influence Analytics
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-sans">
          Transforming millions of raw social posts from <strong>X</strong>, <strong>Telegram</strong>, <strong>Reddit</strong>, and <strong>Meta</strong> into real-time actionable intelligence, 6-dimensional emotion modeling, influence propagation graphs, and tamper-evident blockchain evidence.
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-10">
          <button
            onClick={onLaunchDashboard}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <Activity className="w-4 h-4" />
            <span>Launch Command Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onOpenTimeMachine}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0b1324] hover:bg-[#0f1b33] border border-cyan-500/40 text-cyan-300 font-semibold text-sm transition-all font-mono shadow-md hover:border-cyan-400"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>Conversation Time Machine</span>
          </button>

          <button
            onClick={onOpenNLPWorkbench}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/40 text-purple-300 font-semibold text-sm transition-all font-mono"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>NLP Inference Lab</span>
          </button>
        </div>

        {/* Real-Time Telemetry Ticker Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-3 rounded-xl bg-[#090e1a]/90 border border-white/[0.08] backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">INGESTION PIPELINE</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-display text-cyan-300">14.8K</span>
              <span className="text-[10px] font-mono text-cyan-400">evt/sec</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              X • TG • Reddit Active
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#090e1a]/90 border border-white/[0.08] backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">NLP LATENCY</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-display text-emerald-400">18ms</span>
              <span className="text-[10px] font-mono text-slate-400">per post</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400">
              DistilBERT 6D Neural
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#090e1a]/90 border border-white/[0.08] backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">GRAPH NODES</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-display text-purple-300">48,721</span>
              <span className="text-[10px] font-mono text-purple-400">users</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400">
              NetworkX Centrality
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#090e1a]/90 border border-white/[0.08] backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">EVIDENCE AUDIT</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-display text-rose-300">SHA-256</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Tamper-Evident Ledger
            </span>
          </div>
        </div>
      </section>

      {/* 2. HOW IT OPERATES - INTERACTIVE PIPELINE VISUALIZER (SIH Slide 2 & 4) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold uppercase tracking-wider">
            SYSTEM ARCHITECTURE & OPERATION FLOW
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">
            From Raw Social Posts to Actionable Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-1 font-mono">
            Raw Social Data ➔ AI NLP Analysis ➔ Audience Insights ➔ Network Influence ➔ Prioritized Action
          </p>
        </div>

        {/* 6 Interactive Pipeline Buttons / Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activePipelineStep === stage.step;

            return (
              <button
                key={stage.step}
                onClick={() => setActivePipelineStep(stage.step)}
                className={`p-3 rounded-xl text-left transition-all border relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#0e1628] border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'bg-[#090d16] border-white/[0.06] text-slate-400 hover:border-white/[0.15] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/[0.04] text-slate-400 group-hover:text-cyan-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500">0{stage.step}</span>
                </div>
                <h4 className="text-xs font-bold font-display text-white truncate">{stage.name}</h4>
                <p className="text-[10px] font-mono text-slate-400 truncate">{stage.subtitle}</p>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Canvas */}
        {(() => {
          const current = pipelineStages[activePipelineStep - 1];
          const CurrentIcon = current.icon;

          return (
            <div className="glass-panel p-6 bg-[#090e1a]/95 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.12)] relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Description */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                      <CurrentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                        STAGE 0{current.step} OF 06
                      </span>
                      <h3 className="text-xl font-bold text-white font-display">
                        {current.name} — {current.subtitle}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {current.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Key Technical Capabilities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {current.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 p-2 rounded-lg bg-black/40 border border-white/[0.04] text-xs font-mono text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-2 text-slate-400">
                    <div>ENGINE STACK: <strong className="text-cyan-300">{current.tech}</strong></div>
                    <button
                      onClick={onLaunchDashboard}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      <span>Explore in Dashboard</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Interactive Visual Demonstration */}
                <div className="lg:col-span-5 bg-[#050811] p-4 rounded-xl border border-white/[0.08] shadow-inner space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Live Telemetry Stream</span>
                    </span>
                    <span className="text-emerald-400 font-bold">STATUS: OK (200)</span>
                  </div>

                  {activePipelineStep === 1 && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2 rounded bg-black/40 border border-white/[0.04] text-slate-300">
                        <span className="text-cyan-400">[IN_INGEST_X]</span> Tweet 18492048: &quot;Climate policy transition draft announced...&quot;
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/[0.04] text-slate-300">
                        <span className="text-blue-400">[IN_INGEST_TG]</span> Channel #PublicPolicyUpdate: Concession pass verified
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/[0.04] text-slate-300">
                        <span className="text-orange-400">[IN_INGEST_REDDIT]</span> Thread u/ClimateHub: 184 comments parsed
                      </div>
                    </div>
                  )}

                  {activePipelineStep === 2 && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-300">
                        <span>Dominant Polarity:</span>
                        <span className="text-emerald-400 font-bold">Supportive (42%)</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Opposition / Dissent:</span>
                        <span className="text-rose-400 font-bold">Against (31%)</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Anxiety & Concern:</span>
                        <span className="text-amber-400 font-bold">Anxiety (17%)</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Sarcasm Classifier:</span>
                        <span className="text-purple-300 font-bold">Detected (94%)</span>
                      </div>
                    </div>
                  )}

                  {activePipelineStep === 3 && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-300">
                        <span>Maharashtra (24%):</span>
                        <span className="text-cyan-300 font-bold">Mumbai / Pune Clusters</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Delhi NCR (18%):</span>
                        <span className="text-cyan-300 font-bold">Policy & Transit Nodes</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Karnataka (16%):</span>
                        <span className="text-cyan-300 font-bold">Bengaluru Tech Hub</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Age Bracket 18-35:</span>
                        <span className="text-purple-300 font-bold">72% Combined Share</span>
                      </div>
                    </div>
                  )}

                  {activePipelineStep === 4 && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2 rounded bg-black/40 border border-rose-500/30 text-rose-300 flex justify-between">
                        <span>#1 Climate Change</span>
                        <span className="font-bold">Score 96.4 (+38%)</span>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-emerald-500/30 text-emerald-300 flex justify-between">
                        <span>#2 Green Energy</span>
                        <span className="font-bold">Score 88.2 (+62%)</span>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-cyan-500/30 text-cyan-300 flex justify-between">
                        <span>#3 COP29 Summit</span>
                        <span className="font-bold">Score 82.5 (+48%)</span>
                      </div>
                    </div>
                  )}

                  {activePipelineStep === 5 && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-300">
                        <span>Top Influencer Node:</span>
                        <span className="text-cyan-300 font-bold">@GreenVoice (1.2M)</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Betweenness Centrality:</span>
                        <span className="text-purple-300 font-bold">0.89 PageRank</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Bridge Node Detection:</span>
                        <span className="text-emerald-400 font-bold">@ClimateHub ➔ Citizen Groups</span>
                      </div>
                    </div>
                  )}

                  {activePipelineStep === 6 && (
                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                        <span className="text-slate-400 block text-[9px]">BLOCKCHAIN LEDGER HASH:</span>
                        <span className="text-cyan-300 font-bold text-[11px] truncate block">
                          sha256:e8b9f42d991b2c4e88390af310cb2
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300 pt-1">
                        <span>Audit Status:</span>
                        <span className="text-emerald-400 font-bold">Tamper-Evident Verified</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 3. INTERACTIVE NLP LIVE TEST SANDBOX (RIGHT ON LANDING PAGE) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-panel p-6 bg-[#090e1a]/95 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-300 uppercase font-bold tracking-wider">
                  LIVE INTERACTIVE SANDBOX
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  Test the DistilBERT 6D Emotion & Sarcasm Neural Classifier
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Model: <strong className="text-purple-300">DistilBERT Multi-Emotion v2</strong></span>
            </div>
          </div>

          {/* Preset Prompts */}
          <div className="mb-3">
            <span className="text-[11px] font-mono text-slate-400 block mb-1.5 font-semibold">
              Select an Evaluation Preset or type your own text:
            </span>
            <div className="flex flex-wrap gap-2">
              {demoPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTestText(p);
                    handleTestInference(p);
                  }}
                  className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-purple-500/15 border border-white/[0.08] hover:border-purple-500/40 text-slate-300 transition-all truncate max-w-sm text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Test Input */}
          <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Type any post text or comment to classify..."
              className="flex-1 bg-black/50 text-slate-100 px-4 py-2.5 rounded-xl border border-white/[0.1] text-xs focus:outline-none focus:border-purple-500/60 font-sans"
            />
            <button
              onClick={() => handleTestInference()}
              disabled={nlpLoading}
              className="sm:w-36 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg transition-all disabled:opacity-50 font-mono"
            >
              {nlpLoading ? (
                <span>Inferring...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Run Inference</span>
                </>
              )}
            </button>
          </div>

          {/* Live Inference Result Display */}
          {nlpResult && (
            <div className="p-4 rounded-xl bg-[#060a14] border border-purple-500/30 text-xs animate-entrance">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06] mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400">STANCE:</span>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                    nlpResult.stance === 'Support' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {nlpResult.stance}
                  </span>

                  <span className="font-mono text-slate-400 ml-2">DOMINANT EMOTION:</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {nlpResult.dominant_emotion}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                  <span>CONFIDENCE: <strong className="text-white">{(nlpResult.confidence_score * 100).toFixed(0)}%</strong></span>
                  <span>LATENCY: <strong className="text-cyan-400">{nlpResult.inference_time_ms}ms</strong></span>
                </div>
              </div>

              {/* Multi-Dimensional Probability Meters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {Object.entries(nlpResult.emotion_scores).map(([emotion, score]) => (
                  <div key={emotion} className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                    <div className="flex justify-between items-center text-[11px] mb-1 font-mono">
                      <span className="uppercase text-slate-300">{emotion}</span>
                      <span className="font-bold text-cyan-300">{(score * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-full rounded-full" style={{ width: `${score * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CORE FEATURES & DASHBOARD MODULES SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 text-xs font-mono font-semibold uppercase tracking-wider">
            FEATURE SHOWCASE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">
            Complete Suite of Social Media Intelligence Modules
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-1 font-mono">
            Engineered for high-volume defense analysis, sentiment tracking, and coordinated threat defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Module 1: Slide 5 Dashboard */}
          <div 
            onClick={onLaunchDashboard}
            className="glass-panel glass-panel-hover p-5 bg-[#090e1a]/95 border border-white/[0.08] cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold">SLIDE 5 EXACT UI</span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                Executive Command Radar
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5 font-sans">
                Real-time 4-quadrant command grid with Donut sentiment breakdowns, 24h trend lines, trending topics tables, and audience dispersion.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 mt-4 pt-3 border-t border-white/[0.06]">
              <span>Explore Module</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Conversation Time Machine */}
          <div 
            onClick={onOpenTimeMachine}
            className="glass-panel glass-panel-hover p-5 bg-[#090e1a]/95 border border-cyan-500/30 cursor-pointer group flex flex-col justify-between shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 group-hover:scale-110 transition-transform">
                  <History className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-700/50">SIGNATURE</span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                Conversation Time Machine
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5 font-sans">
                Interactive chronological playback tracking narrative progression across 6 stages: Origin ➔ Signal ➔ Amplification ➔ Cross-Platform ➔ Acceleration ➔ Warning.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-cyan-300 mt-4 pt-3 border-t border-white/[0.06]">
              <span>Launch /timeline</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Network Graph */}
          <div 
            onClick={() => onSelectTab('network')}
            className="glass-panel glass-panel-hover p-5 bg-[#090e1a]/95 border border-white/[0.08] cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 group-hover:scale-110 transition-transform">
                  <Network className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-purple-300 uppercase font-bold">DIGRAPH</span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-purple-300 transition-colors">
                Cytoscape Influence Graph
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5 font-sans">
                Full-screen interactive graph visualizer with PageRank betweenness centrality, Key Opinion Leader bridge detection, and propagation paths.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-purple-400 mt-4 pt-3 border-t border-white/[0.06]">
              <span>Open Graph Engine</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 4: Geographic Heatmap */}
          <div 
            onClick={() => onSelectTab('demographics')}
            className="glass-panel glass-panel-hover p-5 bg-[#090e1a]/95 border border-white/[0.08] cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-blue-300 uppercase font-bold">REGIONAL SKEW</span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-blue-300 transition-colors">
                Geographic Heatmap
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5 font-sans">
                Interactive SVG India Map with real-time intensity radar hotspots across Delhi, Mumbai, Bengaluru, Chennai, Kolkata, and Hyderabad.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-blue-400 mt-4 pt-3 border-t border-white/[0.06]">
              <span>View Map Matrix</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 5: Threat Early Warning Sentinel */}
          <div 
            onClick={() => onSelectTab('alerts')}
            className="glass-panel glass-panel-hover p-5 bg-[#090e1a]/95 border border-white/[0.08] cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-rose-300 uppercase font-bold">EARLY WARNING</span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-rose-300 transition-colors">
                Threat Defense Sentinel
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5 font-sans">
                Autonomous heuristic engine flagging coordinated narrative surges, bot anomalies, and actionable strategic policy counter-measures.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-rose-400 mt-4 pt-3 border-t border-white/[0.06]">
              <span>Inspect Threat Alerts</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 6: Tamper-Evident Dossier */}
          <div 
            onClick={() => onSelectTab('reports')}
            className="glass-panel glass-panel-hover p-5 bg-[#090e1a]/95 border border-white/[0.08] cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold">BLOCKCHAIN</span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                Intelligence Dossier Export
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5 font-sans">
                Instant generation of audit-ready intelligence reports with SHA-256 evidence hashing, citation receipts, and printable PDF export.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 mt-4 pt-3 border-t border-white/[0.06]">
              <span>Generate Dossier</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TARGET USERS & GOVERNMENT IMPACT (SIH Slide 6) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-panel p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-[#0a101f] to-purple-950/40 border border-white/[0.1] rounded-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                SIH 2026 VALUE PROPOSITION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Impact, Benefits & Target Stakeholders
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <span>National Security Grade</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm font-mono">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>1. Government & Security Analysts</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Monitor large-scale online conversations in real time, defuse coordinated disinformation campaigns, and receive early warning surge alerts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm font-mono">
                <Users className="w-4 h-4 text-purple-400" />
                <span>2. Policy & Civic Researchers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Understand audience behavior, public feedback on policy reforms, and emerging socio-economic narratives without manual surveying.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-blue-300 font-bold text-sm font-mono">
                <Radio className="w-4 h-4 text-blue-400" />
                <span>3. Communication Teams</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Track real-time sentiment shifts, identify key propagation seeds, and publish targeted factual clarifications directly to influential hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER */}
      <section className="text-center max-w-3xl mx-auto px-4 pt-4">
        <h3 className="text-2xl font-bold text-white font-display mb-3">
          Ready to experience real-time social intelligence?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 font-mono">
          Smart India Hackathon 2026 • Problem Statement ID: 26152 • Team Knockout
        </p>
        <button
          onClick={onLaunchDashboard}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.03]"
        >
          <span>Launch Full Command Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
export default LandingPage;
