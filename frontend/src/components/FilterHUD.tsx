import React from 'react';
import { Filter, Clock, Globe, Hash, RefreshCw } from 'lucide-react';
import { TimeRange, PlatformType, TopicType } from '../types';

interface FilterHUDProps {
  range: TimeRange;
  platform: PlatformType;
  topic: string;
  onRangeChange: (r: TimeRange) => void;
  onPlatformChange: (p: PlatformType) => void;
  onTopicChange: (t: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const FilterHUD: React.FC<FilterHUDProps> = ({
  range,
  platform,
  topic,
  onRangeChange,
  onPlatformChange,
  onTopicChange,
  onRefresh,
  isLoading,
}) => {
  const timeRanges: { id: TimeRange; label: string }[] = [
    { id: '1h', label: '1 Hour' },
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
  ];

  const platforms: { id: PlatformType; label: string; icon: string }[] = [
    { id: 'all', label: 'All Channels', icon: '🌐' },
    { id: 'x', label: 'X (Twitter)', icon: '𝕏' },
    { id: 'telegram', label: 'Telegram', icon: '✈️' },
    { id: 'reddit', label: 'Reddit', icon: '🤖' },
  ];

  const topics: { id: string; label: string }[] = [
    { id: 'all', label: 'All Intelligence Vectors' },
    { id: '#NewPolicy', label: '#NewPolicy (Transit Clause)' },
    { id: 'Public Transport', label: 'Public Transport Subsidy' },
    { id: 'Education', label: 'Education Scholarship' },
    { id: 'Fuel Price', label: 'Fuel Price Cap' },
  ];

  return (
    <div className="w-full glass-panel p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs border border-white/[0.08] bg-[#0c121e]/85 shadow-lg">
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter Title Badge */}
        <div className="flex items-center gap-1.5 text-slate-300 font-medium font-mono">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span>SCOPE:</span>
        </div>

        {/* Time Range Pills */}
        <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/[0.06]">
          {timeRanges.map((t) => (
            <button
              key={t.id}
              onClick={() => onRangeChange(t.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                range === t.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Platform Selector */}
        <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/[0.06]">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => onPlatformChange(p.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all ${
                platform === p.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-[11px]">{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Topic Selector */}
        <div className="relative">
          <select
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            className="bg-black/60 text-slate-200 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 pr-8 cursor-pointer"
          >
            {topics.map((item) => (
              <option key={item.id} value={item.id} className="bg-[#0b0f19] text-slate-200">
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Manual Refresh / Query Trigger */}
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="btn-tactical text-xs flex items-center gap-2 hover:border-cyan-500/40"
      >
        <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
        <span className="font-mono">Sync Telemetry</span>
      </button>
    </div>
  );
};
