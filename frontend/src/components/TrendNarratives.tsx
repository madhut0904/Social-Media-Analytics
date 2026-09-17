import React, { useState } from 'react';
import { TrendsData, RisingNarrative } from '../types';
import { TrendingUp, Flame, Zap, Award, ChevronDown, ChevronUp, Calculator, Hash } from 'lucide-react';

interface TrendNarrativesProps {
  trendsData: TrendsData | null;
}

export const TrendNarratives: React.FC<TrendNarrativesProps> = ({ trendsData }) => {
  const [expandedId, setExpandedId] = useState<string | null>('narr_1');

  if (!trendsData) return null;

  const { rising_narratives, algorithm_info } = trendsData;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="glass-panel p-5 mb-6 border border-white/[0.08] relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white font-display">
              Multi-Factor Narrative Trend Score Ranking
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              Heuristic Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Algorithmic priority queue combining post frequency, velocity surge, cross-platform propagation, and centrality weights.
          </p>
        </div>

        {/* Formula Badge */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-black/40 px-3 py-1.5 rounded-lg border border-white/[0.06]">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          <span>Formula: <strong className="text-cyan-300">5-Factor Weighted Score</strong></span>
        </div>
      </div>

      {/* Narratives Ranking List */}
      <div className="space-y-3">
        {rising_narratives.map((item) => {
          const isExpanded = expandedId === item.id;
          const isTop = item.rank === 1;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isTop
                  ? 'bg-gradient-to-r from-rose-950/30 via-[#0c1322] to-[#0a0e1a] border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                  : 'bg-[#090d16] border-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              {/* Row Header */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-3.5 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs ${
                      isTop
                        ? 'bg-rose-500 text-white shadow-[0_0_10px_#f43f5e]'
                        : item.rank === 2
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    #{item.rank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white font-mono tracking-tight">
                        {item.hashtag}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                        {item.category}
                      </span>
                      {isTop && (
                        <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                          <Flame className="w-3 h-3 text-rose-400" />
                          SURGE ALERT
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>Bias: <strong className="text-rose-400 font-mono">{item.sentiment_bias}</strong></span>
                      <span className="text-slate-600">•</span>
                      <span>Origin: <strong className="text-cyan-300 uppercase font-mono">{item.top_platform}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Metrics on right */}
                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">VELOCITY</span>
                    <span className="text-xs font-bold font-mono text-cyan-300 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      {item.velocity_rpm} rpm
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">TREND SCORE</span>
                    <span className="text-lg font-bold font-display text-white font-mono-num">
                      {item.trend_score.toFixed(1)}
                    </span>
                  </div>

                  <button className="p-1 rounded text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable 5-factor breakdown panel */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 bg-black/40 border-t border-white/[0.04] text-xs">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2.5 font-semibold">
                    Score Component Weights & Neural Confidence Breakdown:
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="p-2.5 rounded-lg bg-[#080c14] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                        FREQUENCY (20%)
                      </span>
                      <span className="text-sm font-bold font-mono text-cyan-300">
                        {item.score_breakdown.frequency} / 100
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#080c14] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                        VELOCITY (25%)
                      </span>
                      <span className="text-sm font-bold font-mono text-emerald-400">
                        {item.score_breakdown.velocity} / 100
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#080c14] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                        ENGAGEMENT (20%)
                      </span>
                      <span className="text-sm font-bold font-mono text-purple-300">
                        {item.score_breakdown.engagement} / 100
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#080c14] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                        CROSS-PLATFORM (20%)
                      </span>
                      <span className="text-sm font-bold font-mono text-amber-300">
                        {item.score_breakdown.cross_platform} / 100
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#080c14] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                        INFLUENCER WT (15%)
                      </span>
                      <span className="text-sm font-bold font-mono text-rose-300">
                        {item.score_breakdown.influencer_weight} / 100
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
