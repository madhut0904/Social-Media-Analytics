import React, { useState, useEffect } from 'react';
import { 
  AnalyticsSummary, 
  SentimentData, 
  TrendsData, 
  NetworkGraphData, 
  FeedData, 
  AlertsData, 
  DemographicsData,
  TimeRange, 
  PlatformType 
} from './types';
import { api } from './services/api';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { SocialMindDashboard } from './components/SocialMindDashboard';
import { NetworkGraph } from './components/NetworkGraph';
import { SentimentRadar } from './components/SentimentRadar';
import { SentimentTimeline } from './components/SentimentTimeline';
import { TrendNarratives } from './components/TrendNarratives';
import { LiveFeed } from './components/LiveFeed';
import { EarlyWarningCenter } from './components/EarlyWarningCenter';
import { DemographicsMatrix } from './components/DemographicsMatrix';
import { NLPInferenceWorkbench } from './components/NLPInferenceWorkbench';
import { IntelligenceDossierModal } from './components/IntelligenceDossierModal';
import { ConversationTimeMachine } from './components/ConversationTimeMachine';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { FileText, Settings, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const getInitialTab = (): TabType => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.includes('timeline')) return 'timeline';
      if (window.location.pathname.includes('landing')) return 'landing';
      if (window.location.pathname.includes('dashboard')) return 'overview';
    }
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab);
  const [range, setRange] = useState<TimeRange>('24h');
  const [platform, setPlatform] = useState<PlatformType>('all');
  const [topic, setTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Core Data States
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null);
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [networkData, setNetworkData] = useState<NetworkGraphData | null>(null);
  const [feedData, setFeedData] = useState<FeedData | null>(null);
  const [alertsData, setAlertsData] = useState<AlertsData | null>(null);
  const [demographicsData, setDemographicsData] = useState<DemographicsData | null>(null);

  // Synchronize browser history URL
  const handleTabSelect = (tab: TabType) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = tab === 'timeline' ? '/timeline' : tab === 'overview' ? '/dashboard' : '/';
      window.history.pushState(null, '', url);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.includes('timeline')) {
        setActiveTab('timeline');
      } else if (window.location.pathname.includes('dashboard')) {
        setActiveTab('overview');
      } else {
        setActiveTab('landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [sum, sent, tr, net, fd, alt, dem] = await Promise.all([
        api.getSummary(range, platform, topic),
        api.getSentiment(range, platform, topic),
        api.getTrends(),
        api.getNetwork(platform, topic),
        api.getFeed(platform, 'all', topic, 25),
        api.getAlerts(),
        api.getDemographics(topic),
      ]);

      setSummary(sum);
      setSentimentData(sent);
      setTrendsData(tr);
      setNetworkData(net);
      setFeedData(fd);
      setAlertsData(alt);
      setDemographicsData(dem);
    } catch (err) {
      console.error('Failed loading telemetry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [range, platform, topic]);

  // Real-time Ingestion ticker
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const syntheticAuthors = ['@ClimateActionNow', '@GreenVoice', 'u/TechForEarth', '@EcoTake', '@nature_lovers'];
      const syntheticTexts = [
        'Breakthrough solar efficiency reported in renewable energy pilot test #GreenEnergy',
        'Coastal sea surface temperatures showing accelerated warming trend #ClimateChange',
        'New battery storage technology deployed across state power grid #RenewableEnergy',
        'Global summit discussion draft released with updated emissions targets #COP29',
      ];

      const randomIdx = Math.floor(Math.random() * syntheticTexts.length);
      const newPost = {
        id: `live_${Date.now()}`,
        platform: Math.random() > 0.5 ? 'x' : 'telegram',
        author_display: syntheticAuthors[randomIdx],
        author_hash: `sha256_${Math.random().toString(36).substring(2, 10)}`,
        text: syntheticTexts[randomIdx],
        topic: '#ClimateChange',
        likes: Math.floor(300 + Math.random() * 1200),
        reposts: Math.floor(100 + Math.random() * 500),
        sentiment: Math.random() > 0.4 ? 'Support' : 'Dissent',
        emotion: Math.random() > 0.5 ? 'Joy' : 'Anxiety',
        time_ago: 'Just now',
        verified_signal: true,
      };

      setFeedData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          posts: [newPost, ...prev.posts.slice(0, 24)],
          total: prev.total + 1,
        };
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const criticalCount = alertsData?.critical_count || 1;
  const isLandingView = activeTab === 'landing';

  return (
    <div className="min-h-screen tactical-grid-bg text-slate-100 flex flex-col font-sans">
      {/* Executive Command Navbar */}
      <Header
        criticalAlertCount={criticalCount}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenWorkbench={() => handleTabSelect('nlp')}
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating(!isSimulating)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPlatform={platform}
        onPlatformChange={(p) => setPlatform(p as PlatformType)}
        timeRange={range}
        onTimeRangeChange={(r) => setRange(r as TimeRange)}
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
      />

      <div className="flex flex-1 relative">
        {/* Left Navigation Sidebar (Shown on Dashboard and detailed tabs) */}
        {!isLandingView && (
          <Sidebar
            activeTab={activeTab}
            onSelectTab={handleTabSelect}
            criticalAlerts={criticalCount}
          />
        )}

        {/* Main Command Canvas */}
        <main className={`flex-1 p-3 sm:p-5 lg:p-6 w-full z-10 ${isLandingView ? 'max-w-7xl mx-auto' : 'max-w-[1680px] mx-auto'}`}>
          {isLoading && !summary ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Tab: Animated Project Landing Page & Architecture Showcase */}
              {activeTab === 'landing' && (
                <LandingPage
                  onLaunchDashboard={() => handleTabSelect('overview')}
                  onOpenTimeMachine={() => handleTabSelect('timeline')}
                  onOpenNLPWorkbench={() => handleTabSelect('nlp')}
                  onSelectTab={handleTabSelect}
                />
              )}

              {/* Primary Dashboard View (Matching Slide 5) */}
              {activeTab === 'overview' && (
                <SocialMindDashboard
                  onOpenDossier={() => setIsDossierOpen(true)}
                  onOpenWorkbench={() => handleTabSelect('nlp')}
                  onSelectTab={handleTabSelect}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedPlatform={platform}
                  setSelectedPlatform={(p) => setPlatform(p as PlatformType)}
                  timeRange={range}
                  setTimeRange={(r) => setRange(r as TimeRange)}
                />
              )}

              {/* Tab: Conversation Time Machine (/timeline) */}
              {activeTab === 'timeline' && (
                <ConversationTimeMachine />
              )}

              {/* Tab: Sentiment Analysis Deep Dive */}
              {activeTab === 'sentiment' && (
                <div className="space-y-6 animate-entrance">
                  <SentimentRadar sentimentData={sentimentData} />
                  <SentimentTimeline timeline={sentimentData?.timeline || []} />
                </div>
              )}

              {/* Tab: Demographics Deep Dive */}
              {activeTab === 'demographics' && (
                <div className="space-y-6 animate-entrance">
                  <DemographicsMatrix demographicsData={demographicsData} />
                </div>
              )}

              {/* Tab: Trends & Topics Deep Dive */}
              {activeTab === 'trends' && (
                <div className="space-y-6 animate-entrance">
                  <TrendNarratives trendsData={trendsData} />
                </div>
              )}

              {/* Tab: Network Analysis Deep Dive */}
              {activeTab === 'network' && (
                <div className="space-y-6 animate-entrance">
                  <NetworkGraph data={networkData} />
                </div>
              )}

              {/* Tab: Live Feed Stream */}
              {activeTab === 'feed' && (
                <div className="space-y-6 animate-entrance">
                  <LiveFeed feedData={feedData} />
                </div>
              )}

              {/* Tab: Alerts & Early Warning */}
              {activeTab === 'alerts' && (
                <div className="space-y-6 animate-entrance">
                  <EarlyWarningCenter alertsData={alertsData} />
                </div>
              )}

              {/* Tab: NLP Workbench */}
              {activeTab === 'nlp' && (
                <div className="space-y-6 animate-entrance">
                  <NLPInferenceWorkbench />
                </div>
              )}

              {/* Tab: Reports & Evidence Dossier */}
              {activeTab === 'reports' && (
                <div className="glass-panel p-6 border border-white/[0.08] space-y-5 animate-entrance">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white font-display">
                          Intelligence Dossier & Blockchain Verification
                        </h2>
                        <p className="text-xs text-slate-400 font-mono">
                          Cryptographic hash stamped evidence packages for government analysts.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsDossierOpen(true)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg transition-all"
                    >
                      Generate New Dossier
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">LATEST REPORT</span>
                      <h4 className="text-sm font-bold text-white">SIH-2026-NARRATIVE-INTEL-001</h4>
                      <p className="text-xs text-slate-400">Focus: Climate Change & Renewable Energy sentiment shifts.</p>
                      <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-white/[0.04]">
                        SHA256: e8b9f42d...4a10c
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">TAMPER-EVIDENT STATUS</span>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Verified on Ledger
                      </h4>
                      <p className="text-xs text-slate-400">All citations hashed with timestamps and author signatures.</p>
                      <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-white/[0.04]">
                        Status: Audit-ready
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
                      <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">EXPORT FORMATS</span>
                      <h4 className="text-sm font-bold text-white">PDF / JSON / Hash Evidence</h4>
                      <p className="text-xs text-slate-400">Compatible with government defense and policy reporting frameworks.</p>
                      <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-white/[0.04]">
                        Classification: RESTRICTED
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Settings */}
              {activeTab === 'settings' && (
                <div className="glass-panel p-6 border border-white/[0.08] space-y-5 animate-entrance max-w-3xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
                      <Settings className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white font-display">System Configuration & Data Ingest Gateways</h2>
                      <p className="text-xs text-slate-400 font-mono">Manage API keys, rate limits, and anonymization parameters.</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">X (Twitter) API v2 Stream Gateway</div>
                        <div className="text-slate-400 text-[11px]">Filtered stream & academic research tier</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-bold">CONNECTED</span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Telegram MTProto Channel Scraper</div>
                        <div className="text-slate-400 text-[11px]">Public broadcast message pipeline</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-bold">CONNECTED</span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Demographic Anonymization Protocol</div>
                        <div className="text-slate-400 text-[11px]">DP-k anonymity differential privacy filter</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-bold">ENFORCED</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Intelligence Dossier Export Modal */}
      <IntelligenceDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        summary={summary}
        topAlert={alertsData?.alerts[0]}
        topInfluencer={networkData?.top_influencer}
      />
    </div>
  );
};
export default App;
