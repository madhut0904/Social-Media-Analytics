import React, { useState } from 'react';
import { NLPAnalysisResult } from '../types';
import { api } from '../services/api';
import { Sparkles, Send, CheckCircle2, AlertTriangle, HelpCircle, Terminal, Cpu } from 'lucide-react';

export const NLPInferenceWorkbench: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Wow, another incredible update... exactly what the commuters needed 🙄'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NLPAnalysisResult | null>(null);

  const samplePrompts = [
    'Wow, another incredible update... exactly what the commuters needed 🙄',
    'The bus subsidy reduction will hurt lower-income families who rely on daily transit.',
    'Very pleased with the electrification timetable and new digital ticketing system!',
    'Will there be any town hall meeting before the municipal implementation deadline?',
    'Genius decision to shut down three major subway lines at the same time during peak exams 👏👏',
  ];

  const handleRunInference = async (textToTest?: string) => {
    const text = textToTest || inputText;
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await api.inferEmotion(text);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-5 mb-6 border border-white/[0.08] relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-bold text-white font-display">
              Real-Time NLP Emotion & Sarcasm Classification Workbench
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-purple-950/80 text-purple-300 border border-purple-700/50">
              Interactive Inference
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Test arbitrary text strings against the multi-dimensional stance & sarcasm classification pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/[0.06]">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>MODEL: <strong className="text-purple-300">DistilBERT-Emotion-v2</strong></span>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="mb-3">
        <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
          Quick Test Vectors (SIH Evaluation Presets):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(prompt);
                handleRunInference(prompt);
              }}
              className="text-[11px] px-2.5 py-1 rounded bg-white/[0.03] hover:bg-purple-500/10 hover:border-purple-500/30 border border-white/[0.06] text-slate-300 transition-all truncate max-w-xs text-left"
              title={prompt}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
        <textarea
          rows={2}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste any post text or citizen feedback here..."
          className="flex-1 bg-black/60 text-slate-100 p-3 rounded-xl border border-white/[0.1] text-xs focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 resize-none font-sans"
        />
        <button
          onClick={() => handleRunInference()}
          disabled={loading}
          className="sm:w-36 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="font-mono">Inferring...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span className="font-mono">Run Model</span>
            </>
          )}
        </button>
      </div>

      {/* Result Card */}
      {result && (
        <div className="p-4 rounded-xl bg-[#090d16] border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)] text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06] mb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-400">CLASSIFIED STANCE:</span>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${
                  result.stance === 'Dissent'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : result.stance === 'Support'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {result.stance}
              </span>

              <span className="font-mono text-slate-400 ml-2">DOMINANT EMOTION:</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                {result.dominant_emotion}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
              <span>CONFIDENCE: <strong className="text-white font-mono-num">{(result.confidence_score * 100).toFixed(0)}%</strong></span>
              <span className="text-slate-700">|</span>
              <span>LATENCY: <strong className="text-cyan-400 font-mono-num">{result.inference_time_ms}ms</strong></span>
            </div>
          </div>

          {/* Sarcasm Flag Alert */}
          {result.sarcasm_detected && (
            <div className="mb-4 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span className="font-mono font-bold">Rhetorical Sarcasm / Irony Detected</span>
              </div>
              <span className="text-[11px] font-mono text-rose-300">
                Confidence: {(result.sarcasm_confidence * 100).toFixed(0)}%
              </span>
            </div>
          )}

          {/* Probability Spectrum Meters */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
              Multi-Dimensional Probability Distribution:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {Object.entries(result.emotion_scores).map(([emotion, score]) => (
                <div key={emotion} className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="font-mono uppercase text-slate-300">{emotion}</span>
                    <span className="font-mono font-bold text-cyan-300">{(score * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full"
                      style={{ width: `${score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
