import React, { useState } from 'react';
import { FeedData, FeedPost } from '../types';
import { 
  Radio, 
  Search, 
  Filter, 
  ShieldCheck, 
  Heart, 
  Repeat, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface LiveFeedProps {
  feedData: FeedData | null;
  onSelectPost?: (post: FeedPost) => void;
}

const SENTIMENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Dissent: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30' },
  Support: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  Neutral: { bg: 'bg-slate-500/15', text: 'text-slate-300', border: 'border-slate-500/30' },
  Anxiety: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30' },
};

export const LiveFeed: React.FC<LiveFeedProps> = ({ feedData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!feedData) return null;

  const posts = feedData.posts || [];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author_display.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSentiment =
      selectedSentiment === 'all' ||
      post.sentiment.toLowerCase() === selectedSentiment.toLowerCase();

    return matchesSearch && matchesSentiment;
  });

  const handleCopyCitation = (post: FeedPost) => {
    const citation = `[PULSeSphere Citation] Platform: ${post.platform.toUpperCase()} | Author: ${post.author_display} (${post.author_hash}) | Topic: ${post.topic} | Sentiment: ${post.sentiment} | Text: "${post.text}"`;
    navigator.clipboard.writeText(citation);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel p-5 mb-6 border border-white/[0.08] relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="text-base font-bold text-white font-display">
              Normalized Multi-Platform Intelligence Stream
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
              Live Ingest Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Direct ingestion pipeline streaming cross-platform telemetry with cryptographic author hashes.
          </p>
        </div>

        {/* Search & Sentiment Quick Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search keyword / author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/50 text-slate-200 pl-8 pr-3 py-1.5 rounded-lg border border-white/[0.1] text-xs focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 w-44 sm:w-56"
            />
          </div>

          <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/[0.06]">
            {['all', 'Dissent', 'Support', 'Neutral'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSentiment(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  selectedSentiment === s
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Stream */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const sentimentStyle =
              SENTIMENT_COLORS[post.sentiment] || SENTIMENT_COLORS['Neutral'];

            return (
              <div
                key={post.id}
                className="p-4 rounded-xl bg-[#090d16] border border-white/[0.06] hover:border-cyan-500/30 transition-all duration-200 group relative"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded bg-slate-800 text-slate-300">
                      {post.platform}
                    </span>
                    <span className="font-mono font-bold text-xs text-white">
                      {post.author_display}
                    </span>
                    {post.verified_signal && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Signal
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-slate-400">
                      [{post.author_hash.substring(0, 14)}...]
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded border ${sentimentStyle.bg} ${sentimentStyle.text} ${sentimentStyle.border}`}
                    >
                      {post.sentiment} • {post.emotion}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {post.time_ago}
                    </span>
                  </div>
                </div>

                {/* Body Text */}
                <p className="text-xs text-slate-200 leading-relaxed font-sans mb-3">
                  {post.text}
                </p>

                {/* Footer Metrics & Citation Action */}
                <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.04] text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Heart className="w-3.5 h-3.5 text-rose-500/70" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Repeat className="w-3.5 h-3.5 text-cyan-500/70" />
                      {post.reposts.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/40 text-slate-300 text-[10px]">
                      {post.topic}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCitation(post)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors p-1 rounded hover:bg-white/[0.04]"
                    title="Copy Cryptographic Citation for Intelligence Dossier"
                  >
                    {copiedId === post.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs font-mono">
            No telemetry records match the specified query filters.
          </div>
        )}
      </div>
    </div>
  );
};
