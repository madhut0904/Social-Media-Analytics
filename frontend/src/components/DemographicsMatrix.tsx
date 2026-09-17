import React from 'react';
import { DemographicsData } from '../types';
import { Users, MapPin, PieChart, ShieldAlert, Cpu } from 'lucide-react';

interface DemographicsMatrixProps {
  demographicsData: DemographicsData | null;
}

export const DemographicsMatrix: React.FC<DemographicsMatrixProps> = ({ demographicsData }) => {
  if (!demographicsData) return null;

  const { regions, age_groups, polarization_rate, bot_anomaly_ratio } = demographicsData.demographics;

  return (
    <div className="glass-panel p-5 mb-6 border border-white/[0.08] relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white font-display">
              Audience Geopolitical & Demographic Dispersion
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              Anonymized Aggregates
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Cryptographically anonymized cohort distributions and regional polarization indices.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/[0.06]">
            <span className="text-slate-400">POLARIZATION INDEX: </span>
            <strong className="text-rose-400 font-mono-num">{polarization_rate * 100}%</strong>
          </div>
          <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/[0.06]">
            <span className="text-slate-400">BOT ANOMALY: </span>
            <strong className="text-amber-400 font-mono-num">{bot_anomaly_ratio * 100}%</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Regional Distribution */}
        <div className="bg-[#090d16] p-4 rounded-xl border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-white font-mono uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Regional Propagation Heat</span>
          </div>

          <div className="space-y-3">
            {regions.map((region) => (
              <div key={region.region} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-200">{region.region}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-rose-400 text-[11px]">{region.sentiment_skew}</span>
                    <span className="text-cyan-300 font-bold font-mono-num">{region.share}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                    style={{ width: `${region.share}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono text-right">
                  Active volume: {region.active_users_k}K users
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Demographics & Emotion Profile */}
        <div className="bg-[#090d16] p-4 rounded-xl border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-white font-mono uppercase tracking-wider">
            <PieChart className="w-4 h-4 text-purple-400" />
            <span>Cohort Demographics & Emotion Signatures</span>
          </div>

          <div className="space-y-3">
            {age_groups.map((group) => (
              <div key={group.age_bracket} className="p-3 rounded-lg bg-black/40 border border-white/[0.04]">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-200 font-mono">{group.age_bracket}</span>
                  <span className="text-sm font-bold text-white font-mono-num">{group.percentage}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Dominant Dynamic:</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
                    {group.primary_emotion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
