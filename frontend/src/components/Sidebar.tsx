import React from 'react';
import { 
  LayoutDashboard, 
  Radio, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Network, 
  FileText, 
  Settings, 
  ShieldCheck, 
  ChevronRight,
  History,
  Lock
} from 'lucide-react';

export type TabType = 
  | 'overview' 
  | 'timeline'
  | 'sentiment'
  | 'demographics' 
  | 'trends' 
  | 'network' 
  | 'feed' 
  | 'reports' 
  | 'settings'
  | 'alerts'
  | 'nlp';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  criticalAlerts: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  criticalAlerts,
}) => {
  // Navigation matching Slide 5 exactly
  const navItems = [
    { id: 'overview' as TabType, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'feed' as TabType, label: 'Live Feed', icon: Radio, badge: 'Live', badgeColor: 'emerald' },
    { id: 'sentiment' as TabType, label: 'Sentiment Analysis', icon: BarChart3, badge: null },
    { id: 'demographics' as TabType, label: 'Demographics', icon: Users, badge: null },
    { id: 'trends' as TabType, label: 'Trends & Topics', icon: TrendingUp, badge: null },
    { id: 'network' as TabType, label: 'Network Analysis', icon: Network, badge: null },
    { id: 'timeline' as TabType, label: 'Time Machine', icon: History, badge: 'Signature', badgeColor: 'cyan' },
    { id: 'reports' as TabType, label: 'Reports', icon: FileText, badge: null },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className="w-56 lg:w-60 flex-shrink-0 flex flex-col border-r border-white/[0.08] bg-[#070b14]/95 backdrop-blur-xl p-3 min-h-[calc(100vh-57px)]">
      {/* Navigation section */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
          Main Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/25 to-cyan-500/10 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.18)] font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                />
                <span className="tracking-tight">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
                      item.badgeColor === 'emerald'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
              </div>

              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-cyan-400 rounded-r shadow-[0_0_8px_#06b6d4]"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* System Security Status & Accreditation Badge (Slide 5 Footer) */}
      <div className="mt-auto pt-4 border-t border-white/[0.06] text-center">
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-300">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span className="font-semibold text-slate-200">Secure • Encrypted • Trusted</span>
          </div>
          <p className="text-[9px] font-mono text-slate-500">
            NTRO | SIH 2026
          </p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
