import React, { useState } from 'react';
import { SentimentTimelinePoint } from '../types';
import { LineChart, Activity, TrendingUp, TrendingDown, Layers } from 'lucide-react';

interface SentimentTimelineProps {
  timeline: SentimentTimelinePoint[];
}

export const SentimentTimeline: React.FC<SentimentTimelineProps> = ({ timeline }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!timeline || timeline.length === 0) return null;

  // Chart dimensions
  const svgWidth = 740;
  const svgHeight = 220;
  const padding = { top: 20, right: 30, bottom: 35, left: 40 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Max value calculation for scaling
  const maxVal = 100;
  const maxVolume = Math.max(...timeline.map((p) => p.volume || 1));

  // Compute points coordinates
  const getX = (index: number) => padding.left + (index / (timeline.length - 1)) * graphWidth;
  const getY = (val: number) => padding.top + graphHeight - (val / maxVal) * graphHeight;

  // Generate SVG path strings
  const dissentPath = timeline.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.negative || pt.dissent)}`,
    ''
  );

  const supportPath = timeline.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.positive || pt.support)}`,
    ''
  );

  const neutralPath = timeline.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.neutral)}`,
    ''
  );

  // Area under dissent path for gradient fill
  const dissentArea = `${dissentPath} L ${getX(timeline.length - 1)} ${padding.top + graphHeight} L ${getX(0)} ${padding.top + graphHeight} Z`;

  return (
    <div className="glass-panel p-5 mb-6 border border-white/[0.08] relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white font-display">
              Temporal Sentiment Trajectory & Ingestion Volume
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              TimeSeries Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Historical distribution tracking divergence between Dissent, Support, and Volume spikes.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#ef4444]"></span>
            <span className="text-slate-300">Dissent / Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
            <span className="text-slate-300">Support / Positive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
            <span className="text-slate-400">Neutral</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded bg-cyan-500/20 border border-cyan-500/40"></span>
            <span className="text-cyan-300">Ingestion Vol</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart Box */}
      <div className="w-full bg-[#080c14] rounded-xl border border-white/[0.06] p-3 relative overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-56 block overflow-visible select-none"
        >
          <defs>
            <linearGradient id="dissentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="supportGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  textAnchor="end"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Volume Bars in background */}
          {timeline.map((pt, i) => {
            const barHeight = ((pt.volume || 1000) / maxVolume) * (graphHeight * 0.4);
            const x = getX(i) - 10;
            const y = padding.top + graphHeight - barHeight;
            return (
              <rect
                key={`bar-${i}`}
                x={x}
                y={y}
                width={20}
                height={barHeight}
                fill="rgba(6, 182, 212, 0.12)"
                rx="2"
                className="hover:fill-cyan-500/30 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}

          {/* Dissent Area & Line */}
          <path d={dissentArea} fill="url(#dissentGrad)" />
          <path
            d={dissentPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Support Line */}
          <path
            d={supportPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Neutral Line */}
          <path
            d={neutralPath}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Data Points */}
          {timeline.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                {/* Dissent Node */}
                <circle
                  cx={getX(i)}
                  cy={getY(pt.negative || pt.dissent)}
                  r={isHovered ? 6 : 4}
                  fill="#ef4444"
                  stroke="#080c14"
                  strokeWidth="2"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Support Node */}
                <circle
                  cx={getX(i)}
                  cy={getY(pt.positive || pt.support)}
                  r={isHovered ? 6 : 4}
                  fill="#10b981"
                  stroke="#080c14"
                  strokeWidth="2"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* X-axis labels */}
                <text
                  x={getX(i)}
                  y={svgHeight - 10}
                  fill={isHovered ? '#38bdf8' : '#94a3b8'}
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  textAnchor="middle"
                  fontWeight={isHovered ? '700' : '500'}
                >
                  {pt.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div
            className="absolute top-4 bg-[#0e1626]/95 border border-cyan-500/40 p-2.5 rounded-lg shadow-xl text-xs font-mono z-20 pointer-events-none transition-all"
            style={{
              left: `${Math.min(80, Math.max(15, (hoveredIndex / (timeline.length - 1)) * 100))}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-bold text-white mb-1">Interval: {timeline[hoveredIndex].time}</div>
            <div className="text-rose-400">Dissent: {timeline[hoveredIndex].negative || timeline[hoveredIndex].dissent}%</div>
            <div className="text-emerald-400">Support: {timeline[hoveredIndex].positive || timeline[hoveredIndex].support}%</div>
            <div className="text-slate-400">Neutral: {timeline[hoveredIndex].neutral}%</div>
            <div className="text-cyan-300 font-mono-num pt-1 border-t border-white/[0.06] mt-1">
              Vol: {timeline[hoveredIndex].volume.toLocaleString()} msgs
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
