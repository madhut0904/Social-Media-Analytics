import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Telemetry Records Found',
  message = 'No active signal events matched the current filter criteria.',
  onRetry,
}) => {
  return (
    <div className="glass-panel p-10 flex flex-col items-center justify-center text-center my-6">
      <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-white font-display mb-1">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mb-4 font-mono">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-tactical text-xs flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Filter Scope</span>
        </button>
      )}
    </div>
  );
};
