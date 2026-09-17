import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-panel h-32 p-4 bg-slate-900/50">
            <div className="h-3 bg-slate-800 rounded w-1/2 mb-3"></div>
            <div className="h-7 bg-slate-800 rounded w-3/4 mb-2"></div>
            <div className="h-2 bg-slate-800 rounded w-full"></div>
          </div>
        ))}
      </div>
      <div className="glass-panel h-80 bg-slate-900/40 p-6">
        <div className="h-4 bg-slate-800 rounded w-1/3 mb-4"></div>
        <div className="h-56 bg-slate-800/30 rounded"></div>
      </div>
    </div>
  );
};
