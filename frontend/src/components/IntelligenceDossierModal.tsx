import React from 'react';
import { AnalyticsSummary, ThreatAlert, NetworkNode } from '../types';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  Share2, 
  FileText, 
  Cpu,
  Check
} from 'lucide-react';

interface IntelligenceDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: AnalyticsSummary | null;
  topAlert?: ThreatAlert;
  topInfluencer?: NetworkNode;
}

export const IntelligenceDossierModal: React.FC<IntelligenceDossierModalProps> = ({
  isOpen,
  onClose,
  summary,
  topAlert,
  topInfluencer,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#090d16] border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] text-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white">
                Executive Threat Intelligence Dossier
              </h2>
              <p className="text-xs font-mono text-slate-400">
                SIH 2026 • Automated De-Escalation Briefing #EXP-9921
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn-tactical text-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="space-y-4 text-xs">
          {/* Executive Overview Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-transparent border border-cyan-500/20">
            <div className="flex justify-between items-center mb-2 font-mono">
              <span className="text-cyan-300 font-bold uppercase tracking-wider">
                TARGET VECTOR: {summary?.narrative_intelligence.topic || '#NewPolicy'}
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                RISK: {summary?.narrative_intelligence.risk_level || 'CRITICAL'} (Score {summary?.narrative_intelligence.risk_score || 87}/100)
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs font-sans">
              Narrative telemetry indicates an accelerating cross-platform propagation trajectory. Primary friction stems from transit clause modifications, amplified across secondary community relay nodes.
            </p>
          </div>

          {/* Key Intelligence Metrics */}
          <div className="grid grid-cols-3 gap-3 font-mono">
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 block">TOTAL POSTS</span>
              <span className="text-base font-bold text-white">{summary?.kpi_cards.total_posts.value}</span>
              <span className="text-[10px] text-emerald-400 block">+18.6% surge</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 block">INGESTION VELOCITY</span>
              <span className="text-base font-bold text-cyan-300">{summary?.kpi_cards.post_velocity.value}</span>
              <span className="text-[10px] text-cyan-400 block">Peak threshold</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 block">POLARIZATION INDEX</span>
              <span className="text-base font-bold text-rose-400">
                {((summary?.narrative_intelligence.polarization_index || 0.79) * 100).toFixed(0)}%
              </span>
              <span className="text-[10px] text-rose-300 block">High contention</span>
            </div>
          </div>

          {/* Key Propagation Seed Info */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Primary Centrality Seed Node:
            </span>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-white text-sm">
                  {summary?.kpi_cards.top_influencer.value || '@policy_voice'}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Betweenness Centrality: 0.82 • Degree Centrality: 0.75 • 18.4K Reposts
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono font-bold text-xs">
                Key Broker Node
              </span>
            </div>
          </div>

          {/* Strategic Recommended Counter-Measures */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
            <div className="flex items-center gap-2 font-mono text-emerald-300 font-bold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Recommended Strategic Counter-Measures:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>
                <strong>Targeted Clarification:</strong> Publish an official infographic outlining transit fund transitions directly targeting the @policy_voice quote cluster.
              </li>
              <li>
                <strong>Subway Feeder Contingency:</strong> Announce provisional 15% feeder capacity augmentations during peak commute windows to defuse anxiety.
              </li>
              <li>
                <strong>Community Townhall:</strong> Host interactive Q&A livestream to address misinformation regarding fare adjustment timing.
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>CLASSIFICATION: CONFIDENTIAL // SIH 2026 DEMO ONLY</span>
          <span>Generated by PulseSphere Sentinel v2.0</span>
        </div>
      </div>
    </div>
  );
};
