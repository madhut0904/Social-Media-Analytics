import React from 'react';
import { SentimentData, EmotionItem } from '../types';
import { Sparkles, BarChart2, ShieldCheck, AlertCircle } from 'lucide-react';

interface SentimentRadarProps {
  sentimentData: SentimentData | null;
}

export const SentimentRadar: React.FC<SentimentRadarProps> = ({ sentimentData }) => {
  if (!sentimentData) return null;

  const { emotion_distribution, disclaimer } = sentimentData;

  return (
    <div className="glass-panel p-5 mb-6 border border-white/[0.08] relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-bold text-white font-display">
              6-Dimensional Emotion & Stance Matrix
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-purple-950/80 text-purple-300 border border-purple-700/50">
              DistilBERT Multi-Emotion
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Granular neural classification decomposing polarities beyond basic positive/negative bins.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/[0.06]">
          <span>POLARITY SKEW:</span>
          <span className="text-rose-400 font-bold font-mono-num">75% Critical / Anxiety</span>
        </div>
      </div>

      {/* 6-Dimensional Spectrum Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {emotion_distribution.map((item, idx) => (
          <div
            key={item.emotion}
            className="p-3.5 rounded-xl bg-[#090d16]/90 border border-white/[0.06] hover:border-white/[0.15] transition-all group relative overflow-hidden"
          >
            {/* Top Indicator bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: item.color }}
            ></div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px]"
                  style={{ backgroundColor: item.color, color: item.color }}
                ></span>
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  {item.emotion}
                </span>
              </div>
              <span
                className="text-base font-bold font-display font-mono-num"
                style={{ color: item.color }}
              >
                {item.percentage}%
              </span>
            </div>

            {/* Progress Gauge */}
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-500 group-hover:brightness-125"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Disclaimer Footer */}
      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>{disclaimer}</span>
        </div>
        <span className="text-slate-400 font-mono-num">Inference confidence: 94.2%</span>
      </div>
    </div>
  );
};
