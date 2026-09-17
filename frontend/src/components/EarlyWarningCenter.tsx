import React, { useState } from 'react';
import { AlertsData, ThreatAlert } from '../types';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Bot, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Flame,
  FileCheck
} from 'lucide-react';

interface EarlyWarningCenterProps {
  alertsData: AlertsData | null;
}

export const EarlyWarningCenter: React.FC<EarlyWarningCenterProps> = ({ alertsData }) => {
  const [alerts, setAlerts] = useState<ThreatAlert[]>(alertsData?.alerts || []);

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  const list = alerts.length > 0 ? alerts : (alertsData?.alerts || []);

  return (
    <div className="glass-panel p-5 mb-6 border border-white/[0.08] relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="text-base font-bold text-white font-display">
              AI Early Threat Warning & De-Escalation Radar
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-rose-950/80 text-rose-300 border border-rose-700/50">
              Sentinel Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Autonomous threat detection identifying coordinated narrative surges before mainstream virality.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/40 px-3 py-1.5 rounded-lg border border-white/[0.06]">
          <span>STATUS:</span>
          <span className="text-rose-400 font-bold font-mono-num flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            1 CRITICAL SURGE DETECTED
          </span>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {list.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isHigh = alert.severity === 'HIGH';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                isCritical
                  ? 'bg-gradient-to-r from-rose-950/40 via-[#0d121f] to-[#0a0e18] border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.18)]'
                  : isHigh
                  ? 'bg-gradient-to-r from-amber-950/30 via-[#0d121f] to-[#0a0e18] border-amber-500/40'
                  : 'bg-[#090d16] border-white/[0.08]'
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-cyan-500'
                }`}
              ></div>

              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg font-bold text-xs flex items-center gap-1.5 font-mono ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : isHigh
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{alert.severity}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">
                      {alert.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span className="text-cyan-300 font-mono font-medium">{alert.topic}</span>
                      <span className="text-slate-600">•</span>
                      <span>Trigger: {alert.timestamp}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAcknowledge(alert.id)}
                  className={`btn-tactical text-xs font-mono flex items-center gap-1.5 ${
                    alert.acknowledged
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : ''
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{alert.acknowledged ? 'Acknowledged' : 'Acknowledge'}</span>
                </button>
              </div>

              {/* Trigger Reason Body */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3.5 bg-black/30 p-2.5 rounded-lg border border-white/[0.04]">
                {alert.trigger_reason}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 mb-3.5 text-xs font-mono">
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-400 block mb-0.5">VELOCITY SPIKE</span>
                  <span className="font-bold text-rose-400 font-mono-num">{alert.metrics.velocity_spike}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-400 block mb-0.5">DISSENT SURGE</span>
                  <span className="font-bold text-amber-400 font-mono-num">{alert.metrics.dissent_surge}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-400 block mb-0.5">COORDINATION PROB</span>
                  <span className="font-bold text-cyan-300 font-mono-num">{alert.metrics.bot_probability}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-400 block mb-0.5">TIME TO PEAK</span>
                  <span className="font-bold text-white font-mono-num">{alert.time_to_peak}</span>
                </div>
              </div>

              {/* Recommended Action Plan */}
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-bold text-cyan-300 text-[11px] block uppercase tracking-wider mb-0.5">
                    Recommended Policy Response Protocol:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {alert.recommended_response}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
