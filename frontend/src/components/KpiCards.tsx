import React from 'react';
import { 
  MessageSquare, 
  Zap, 
  TrendingDown, 
  TrendingUp, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Flame,
  UserCheck
} from 'lucide-react';
import { AnalyticsSummary } from '../types';

interface KpiCardsProps {
  summary: AnalyticsSummary | null;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ summary }) => {
  if (!summary) return null;

  const { total_posts, post_velocity, dominant_sentiment, top_influencer } = summary.kpi_cards;

  const cards = [
    {
      id: 'total_posts',
      title: 'TOTAL INGESTED POSTS',
      value: total_posts?.value || '2.4M',
      change: total_posts?.change || '+18.6%',
      trend: total_posts?.trend || 'up',
      subtext: total_posts?.subtext || 'Multi-platform aggregated',
      icon: MessageSquare,
      color: 'cyan',
      glowClass: 'from-cyan-500/10 to-transparent',
      borderClass: 'group-hover:border-cyan-500/40',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
      sparkline: [25, 32, 45, 40, 58, 62, 85],
    },
    {
      id: 'velocity',
      title: 'POST VELOCITY RATE',
      value: post_velocity?.value || '14.8K/min',
      change: post_velocity?.change || '+31.4%',
      trend: post_velocity?.trend || 'up',
      subtext: post_velocity?.subtext || 'Surge detected in #NewPolicy',
      icon: Zap,
      color: 'emerald',
      glowClass: 'from-emerald-500/10 to-transparent',
      borderClass: 'group-hover:border-emerald-500/40',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      sparkline: [12, 18, 30, 42, 68, 92, 110],
    },
    {
      id: 'sentiment',
      title: 'DOMINANT SENTIMENT POLARITY',
      value: dominant_sentiment?.value || 'Dissent (57%)',
      change: dominant_sentiment?.percentage || '57%',
      trend: 'down',
      subtext: dominant_sentiment?.subtext || 'Anxiety (29%) • Support (22%)',
      icon: TrendingDown,
      color: 'rose',
      glowClass: 'from-rose-500/10 to-transparent',
      borderClass: 'group-hover:border-rose-500/40',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      sparkline: [40, 48, 55, 62, 60, 68, 74],
    },
    {
      id: 'influencer',
      title: 'KEY PROPAGATION SEED',
      value: top_influencer?.value || '@policy_voice',
      change: `Score ${top_influencer?.score || 94}`,
      trend: 'up',
      subtext: top_influencer?.subtext || 'Centrality 0.82 • 18.4K Reposts',
      icon: Award,
      color: 'violet',
      glowClass: 'from-violet-500/10 to-transparent',
      borderClass: 'group-hover:border-violet-500/40',
      badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
      sparkline: [30, 45, 52, 68, 75, 88, 94],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isUp = card.trend === 'up';

        return (
          <div
            key={card.id}
            className={`glass-panel glass-panel-hover p-4 relative group transition-all duration-300 animate-entrance delay-${(idx + 1) * 100}`}
          >
            {/* Ambient inner glow */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${card.glowClass} rounded-full blur-xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`}></div>

            {/* Header row */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                {card.title}
              </span>
              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06] text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Main Value */}
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <span className="text-2xl lg:text-3xl font-bold font-display tracking-tight text-white">
                {card.value}
              </span>
              <span
                className={`flex items-center gap-0.5 text-xs font-mono font-semibold px-2 py-0.5 rounded border ${
                  card.color === 'rose'
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {card.color === 'rose' ? (
                  <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                )}
                {card.change}
              </span>
            </div>

            {/* Sparkline mini-graph */}
            <div className="flex items-end gap-1 h-6 my-2.5 pt-1 border-t border-white/[0.04]">
              {card.sparkline.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-slate-700/40 rounded-t group-hover:bg-cyan-500/40 transition-all"
                  style={{
                    height: `${(val / 110) * 100}%`,
                    backgroundColor: i === card.sparkline.length - 1 ? (card.color === 'rose' ? '#ef4444' : '#06b6d4') : undefined,
                  }}
                ></div>
              ))}
            </div>

            {/* Subtext */}
            <p className="text-[11px] text-slate-400 font-mono truncate">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
