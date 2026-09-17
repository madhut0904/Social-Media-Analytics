import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search,
  Radio, 
  Clock,
  Sparkles,
  Download,
  AlertTriangle,
  ChevronDown,
  User,
  ShieldCheck
} from 'lucide-react';
import { PlatformType, TimeRange } from '../types';

interface HeaderProps {
  criticalAlertCount: number;
  onOpenDossier: () => void;
  onOpenWorkbench: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  selectedPlatform?: string;
  onPlatformChange?: (p: string) => void;
  timeRange?: string;
  onTimeRangeChange?: (t: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  criticalAlertCount,
  onOpenDossier,
  onOpenWorkbench,
  isSimulating,
  onToggleSimulation,
  searchQuery = '',
  onSearchChange,
  selectedPlatform = 'all',
  onPlatformChange,
  timeRange = '24h',
  onTimeRangeChange,
}) => {
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState(selectedPlatform);

  const platforms = [
    { id: 'x', label: 'X (Twitter)', icon: '𝕏', color: 'hover:text-cyan-400' },
    { id: 'telegram', label: 'Telegram', icon: '✈', color: 'hover:text-blue-400' },
    { id: 'instagram', label: 'Instagram', icon: '📷', color: 'hover:text-pink-400' },
    { id: 'facebook', label: 'Facebook', icon: 'ⓕ', color: 'hover:text-blue-500' },
    { id: 'reddit', label: 'Reddit', icon: '🤖', color: 'hover:text-orange-400' },
    { id: 'youtube', label: 'YouTube', icon: '▶', color: 'hover:text-red-500' },
  ];

  const handlePlatformClick = (pid: string) => {
    const next = activePlatform === pid ? 'all' : pid;
    setActivePlatform(next);
    if (onPlatformChange) onPlatformChange(next);
  };

  const timeOptions = [
    { id: '1h', label: 'Last 1 hour' },
    { id: '24h', label: 'Last 24 hours' },
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070b14]/95 backdrop-blur-xl px-3 lg:px-6 py-2 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Logo Matching Slide 5 */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/25 via-blue-600/15 to-purple-600/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Radio className="w-5 h-5 text-cyan-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#070b14]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base lg:text-lg font-bold tracking-tight text-white font-display">
                SocialMind AI
              </h1>
              <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
                SIH 2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Social Media Intelligence & Analytics
            </p>
          </div>
        </div>

        {/* Global Search Bar (Matching Slide 5) */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search for a topic, keyword or hashtag..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full bg-black/40 text-slate-200 pl-9 pr-4 py-1.5 rounded-lg border border-white/[0.1] text-xs focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 placeholder-slate-500 font-sans"
            />
          </div>
        </div>

        {/* Platform Selector Buttons (Matching Slide 5) */}
        <div className="hidden xl:flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-white/[0.06] text-xs">
          {platforms.map((p) => {
            const isSelected = activePlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handlePlatformClick(p.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                    : `text-slate-400 ${p.color} hover:bg-white/[0.04]`
                }`}
              >
                <span>{p.icon}</span>
                <span className="hidden 2xl:inline">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tools: Time Range, Simulation, Analyst Profile */}
        <div className="flex items-center gap-2.5">
          {/* Time Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] hover:border-white/[0.2] text-slate-300 text-xs font-mono transition-all"
            >
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{timeOptions.find((o) => o.id === timeRange)?.label || 'Last 24 hours'}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {timeDropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-[#0e1626] border border-white/[0.12] rounded-lg shadow-xl p-1 z-50 text-xs font-mono">
                {timeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (onTimeRangeChange) onTimeRangeChange(opt.id);
                      setTimeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded hover:bg-white/[0.08] transition-colors ${
                      timeRange === opt.id ? 'text-cyan-300 font-bold bg-cyan-950/60' : 'text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Badge (Matching Slide 5: Analyst / Government) */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-white/[0.08]">
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
              A
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black"></span>
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-[11px] font-bold text-slate-200 block leading-tight">
                Analyst
              </span>
              <span className="text-[9px] font-mono text-slate-400 block leading-none">
                Government
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
