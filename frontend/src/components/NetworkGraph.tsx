import React, { useRef, useEffect, useState, useCallback } from 'react';
import cytoscape, { Core, EventObject, LayoutOptions } from 'cytoscape';
import { NetworkGraphData, NetworkNode, NetworkEdge } from '../types';
import { 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Play, 
  Pause, 
  RotateCw, 
  ShieldCheck, 
  Award, 
  Layers, 
  ArrowRight, 
  Search, 
  Info, 
  Sliders, 
  Zap, 
  Activity,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface NetworkGraphProps {
  data: NetworkGraphData | null;
  platformFilter?: string;
  topicFilter?: string;
}

const COMMUNITY_COLORS: Record<string, string> = {
  'Public Policy': '#06B6D4',
  'Media / News': '#3B82F6',
  'Civic Groups': '#10B981',
  'Local Communities': '#F59E0B',
  'Tech & Infra': '#8B5CF6',
  'General': '#94A3B8',
};

const INTERACTION_COLORS: Record<string, string> = {
  repost: '#06B6D4',
  forward: '#F59E0B',
  quote: '#8B5CF6',
  mention: '#10B981',
  reply: '#3B82F6',
};

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);

  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{ node: NetworkNode; x: number; y: number } | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');
  const [layoutName, setLayoutName] = useState<'cose' | 'concentric' | 'breadthfirst'>('cose');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Replay Propagation Animation State
  const [isReplaying, setIsReplaying] = useState<boolean>(false);
  const [replayStep, setReplayStep] = useState<number>(0);
  const replayTimerRef = useRef<number | null>(null);

  // Initialize and Update Cytoscape Graph
  useEffect(() => {
    if (!containerRef.current || !data || !data.nodes.length) return;

    // Convert nodes to Cytoscape format
    const elements: cytoscape.ElementDefinition[] = [
      ...data.nodes.map((node) => {
        const isTop = node.id === data.top_influencer.id;
        const color = COMMUNITY_COLORS[node.community] || '#06B6D4';
        return {
          group: 'nodes' as const,
          data: {
            id: node.id,
            label: node.label,
            platform: node.platform,
            community: node.community,
            influence: node.influence,
            betweenness: node.betweenness,
            degreeCentrality: node.degreeCentrality,
            engagement: node.engagement,
            propagation: node.propagation,
            isTop,
            color,
            size: Math.max(34, Math.min(68, Math.round(node.influence * 0.55 + node.betweenness * 18))),
          },
        };
      }),
      ...data.edges.map((edge, idx) => ({
        group: 'edges' as const,
        data: {
          id: `edge_${edge.source}_${edge.target}_${idx}`,
          source: edge.source,
          target: edge.target,
          interaction: edge.type,
          platform: edge.platform,
          weight: edge.weight,
          topic: edge.topic,
          color: INTERACTION_COLORS[edge.type] || '#64748B',
        },
      })),
    ];

    // Cleanup previous instance
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    // Initialize Cytoscape Instance with Command Center Theme
    const cy = cytoscape({
      container: containerRef.current,
      elements,
      boxSelectionEnabled: false,
      autounselectify: false,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'background-opacity': 0.85,
            label: 'data(label)',
            'color': '#e2e8f0',
            'font-family': 'JetBrains Mono, monospace',
            'font-size': '11px',
            'font-weight': 'bold',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'text-background-color': '#06080d',
            'text-background-opacity': 0.75,
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle',
            width: 'data(size)',
            height: 'data(size)',
            'border-width': 2,
            'border-color': '#ffffff',
            'border-opacity': 0.25,
            'transition-property': 'background-color, border-color, border-width, opacity, width, height',
            'transition-duration': 0.25,
          } as any,
        },
        {
          selector: 'node[?isTop]',
          style: {
            'border-width': 3,
            'border-color': '#F59E0B',
            'border-opacity': 0.9,
          } as any,
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': 'data(color)',
            'line-opacity': 0.45,
            'target-arrow-color': 'data(color)',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.1,
            'curve-style': 'bezier',
            'transition-property': 'line-color, width, line-opacity, opacity',
            'transition-duration': 0.25,
          } as any,
        },
        // Highlight states
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#38BDF8',
            'border-opacity': 1,
            'background-opacity': 1,
          } as any,
        },
        {
          selector: '.highlighted',
          style: {
            'line-color': '#38BDF8',
            'target-arrow-color': '#38BDF8',
            'line-opacity': 0.95,
            width: 3.5,
            opacity: 1,
          } as any,
        },
        {
          selector: '.dimmed',
          style: {
            opacity: 0.15,
            'line-opacity': 0.08,
          } as any,
        },
        {
          selector: '.propagated-active',
          style: {
            'border-color': '#10B981',
            'border-width': 4,
            'background-color': '#10B981',
          } as any,
        },
        {
          selector: '.propagated-edge',
          style: {
            'line-color': '#10B981',
            'target-arrow-color': '#10B981',
            'line-opacity': 1,
            width: 4,
          } as any,
        },
      ],
      layout: getLayoutConfig(layoutName),
    });

    cyRef.current = cy;

    // Node Click Listener for detailed node inspector
    cy.on('tap', 'node', (evt: EventObject) => {
      const node = evt.target;
      const nodeData = node.data();
      const rawNode = data.nodes.find((n) => n.id === nodeData.id) || null;
      setSelectedNode(rawNode);

      // Highlight direct neighbors and connected edges
      cy.elements().removeClass('highlighted dimmed');
      const neighborhood = node.neighborhood().add(node);
      cy.elements().difference(neighborhood).addClass('dimmed');
      neighborhood.addClass('highlighted');
    });

    // Background Click clears highlight
    cy.on('tap', (evt: EventObject) => {
      if (evt.target === cy) {
        cy.elements().removeClass('highlighted dimmed');
      }
    });

    // Hover Events for Tooltip HUD
    cy.on('mouseover', 'node', (evt: EventObject) => {
      const node = evt.target;
      const nodeData = node.data();
      const rawNode = data.nodes.find((n) => n.id === nodeData.id);
      const renderedPos = node.renderedPosition();
      if (rawNode) {
        setHoveredNode({
          node: rawNode,
          x: renderedPos.x,
          y: renderedPos.y,
        });
      }
    });

    cy.on('mouseout', 'node', () => {
      setHoveredNode(null);
    });

    // Default select the top influencer on initial load
    if (data.top_influencer) {
      const top = data.nodes.find((n) => n.id === data.top_influencer.id) || data.nodes[0];
      setSelectedNode(top);
    }

    return () => {
      cy.destroy();
    };
  }, [data]);

  // Dynamic layout configuration helper
  function getLayoutConfig(name: string): LayoutOptions {
    if (name === 'concentric') {
      return {
        name: 'concentric',
        concentric: (node: any) => node.data('betweenness') * 100,
        levelWidth: () => 20,
        padding: 40,
        animate: true,
        animationDuration: 500,
      } as any;
    }
    if (name === 'breadthfirst') {
      return {
        name: 'breadthfirst',
        directed: true,
        roots: data ? [`#${data.top_influencer.id}`] : undefined,
        padding: 40,
        animate: true,
        animationDuration: 500,
      } as any;
    }
    return {
      name: 'cose',
      animate: true,
      animationDuration: 600,
      nodeRepulsion: () => 80000,
      idealEdgeLength: () => 140,
      edgeElasticity: () => 100,
      gravity: 0.25,
      padding: 50,
      randomize: false,
    } as any;
  }

  // Handle Layout Change
  const handleLayoutChange = (newLayout: 'cose' | 'concentric' | 'breadthfirst') => {
    setLayoutName(newLayout);
    if (cyRef.current) {
      const layout = cyRef.current.layout(getLayoutConfig(newLayout));
      layout.run();
    }
  };

  // Filter by Community
  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;
    if (selectedCommunity === 'all') {
      cy.elements().removeClass('dimmed');
    } else {
      cy.nodes().forEach((n) => {
        if (n.data('community') === selectedCommunity) {
          n.removeClass('dimmed');
          n.connectedEdges().removeClass('dimmed');
        } else {
          n.addClass('dimmed');
          n.connectedEdges().addClass('dimmed');
        }
      });
    }
  }, [selectedCommunity]);

  // Replay Propagation Step Simulation
  const startReplay = useCallback(() => {
    if (!cyRef.current || !data) return;
    const cy = cyRef.current;

    setIsReplaying(true);
    setReplayStep(1);

    // Reset all propagation styling
    cy.elements().removeClass('propagated-active propagated-edge dimmed highlighted');

    // Step 1: Seed Influencer Activates
    const seedNodeId = data.top_influencer.id;
    const seedNode = cy.getElementById(seedNodeId);
    seedNode.addClass('propagated-active');

    // Step 2: Primary propagation relay to news_hub & citizen_forum
    replayTimerRef.current = window.setTimeout(() => {
      setReplayStep(2);
      const step2Edges = cy.edges(`[source = "${seedNodeId}"]`);
      step2Edges.addClass('propagated-edge');
      step2Edges.targets().addClass('propagated-active');

      // Step 3: Secondary propagation to civic & local communities
      replayTimerRef.current = window.setTimeout(() => {
        setReplayStep(3);
        const secondTierSources = step2Edges.targets().map((n) => n.id());
        secondTierSources.forEach((srcId) => {
          const step3Edges = cy.edges(`[source = "${srcId}"]`);
          step3Edges.addClass('propagated-edge');
          step3Edges.targets().addClass('propagated-active');
        });

        // Step 4: Full network saturation complete
        replayTimerRef.current = window.setTimeout(() => {
          setReplayStep(4);
          cy.edges().addClass('propagated-edge');
          cy.nodes().addClass('propagated-active');

          replayTimerRef.current = window.setTimeout(() => {
            setIsReplaying(false);
            setReplayStep(0);
            cy.elements().removeClass('propagated-active propagated-edge');
          }, 3500);
        }, 1200);
      }, 1200);
    }, 1200);
  }, [data]);

  const stopReplay = () => {
    if (replayTimerRef.current) {
      clearTimeout(replayTimerRef.current);
    }
    setIsReplaying(false);
    setReplayStep(0);
    if (cyRef.current) {
      cyRef.current.elements().removeClass('propagated-active propagated-edge dimmed highlighted');
    }
  };

  const fitView = () => {
    cyRef.current?.fit(undefined, 40);
  };

  const zoomIn = () => {
    if (cyRef.current) cyRef.current.zoom(cyRef.current.zoom() * 1.25);
  };

  const zoomOut = () => {
    if (cyRef.current) cyRef.current.zoom(cyRef.current.zoom() * 0.8);
  };

  const focusTopInfluencer = () => {
    if (cyRef.current && data) {
      const top = cyRef.current.getElementById(data.top_influencer.id);
      cyRef.current.animate({
        center: { eles: top },
        zoom: 1.4,
        duration: 500,
      });
      const raw = data.nodes.find((n) => n.id === data.top_influencer.id);
      if (raw) setSelectedNode(raw);
    }
  };

  const connectedEdges = data?.edges.filter(
    (e) => selectedNode && (e.source === selectedNode.id || e.target === selectedNode.id)
  ) || [];

  return (
    <div className="glass-panel p-5 mb-6 border border-white/[0.08] relative">
      {/* Top Header of Graph Module */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3.5 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white font-display">
              Influence & Propagation Network Engine
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              Cytoscape.js Force Graph
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Directed topology computing Betweenness Centrality, cross-platform propagation paths, and broker nodes.
          </p>
        </div>

        {/* Layout & Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Selector */}
          <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/[0.06] text-xs font-mono">
            <button
              onClick={() => handleLayoutChange('cose')}
              className={`px-2.5 py-1 rounded transition-all ${
                layoutName === 'cose'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Force (COSE)
            </button>
            <button
              onClick={() => handleLayoutChange('concentric')}
              className={`px-2.5 py-1 rounded transition-all ${
                layoutName === 'concentric'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Centrality Rings
            </button>
            <button
              onClick={() => handleLayoutChange('breadthfirst')}
              className={`px-2.5 py-1 rounded transition-all ${
                layoutName === 'breadthfirst'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hierarchy Tree
            </button>
          </div>

          {/* Replay Propagation Button */}
          <button
            onClick={isReplaying ? stopReplay : startReplay}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
              isReplaying
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse'
                : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-300'
            }`}
          >
            {isReplaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-400" />
                <span>Replaying ({replayStep}/4)...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Replay Propagation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Community Cluster Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-slate-400">CLUSTERS:</span>
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/[0.06]">
          <button
            onClick={() => setSelectedCommunity('all')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
              selectedCommunity === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Communities
          </button>
          {Object.entries(COMMUNITY_COLORS).map(([comm, color]) => (
            <button
              key={comm}
              onClick={() => setSelectedCommunity(comm)}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                selectedCommunity === comm
                  ? 'bg-white/10 text-white border border-white/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
              <span>{comm}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Cytoscape Container Box */}
        <div className="lg:col-span-8 bg-[#070b12] rounded-xl border border-white/[0.06] relative overflow-hidden flex items-center justify-center min-h-[480px] shadow-inner">
          <div
            ref={containerRef}
            className="w-full h-[480px] block cursor-grab active:cursor-grabbing"
          />

          {/* Hover Tooltip HUD */}
          {hoveredNode && (
            <div
              className="absolute bg-[#090e1a]/95 border border-cyan-500/40 px-3 py-2 rounded-lg shadow-xl text-xs font-mono pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full -mt-3 animate-fadeIn"
              style={{
                left: `${Math.min(700, Math.max(80, hoveredNode.x))}px`,
                top: `${Math.max(40, hoveredNode.y)}px`,
              }}
            >
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{hoveredNode.node.label}</span>
                <span className="text-[10px] px-1 rounded bg-slate-800 text-slate-300 uppercase">
                  {hoveredNode.node.platform}
                </span>
              </div>
              <div className="text-cyan-300 text-[11px] mt-0.5">
                Influence: {hoveredNode.node.influence} • Betweenness: {hoveredNode.node.betweenness}
              </div>
              <div className="text-slate-400 text-[10px]">
                Community: {hoveredNode.node.community}
              </div>
            </div>
          )}

          {/* Floating Navigation & Zoom Controls */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-lg border border-white/[0.1] shadow-lg z-20">
            <button
              onClick={zoomIn}
              className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={zoomOut}
              className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={fitView}
              className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white"
              title="Fit to Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={focusTopInfluencer}
              className="p-1.5 rounded hover:bg-white/10 text-amber-400 hover:text-amber-300"
              title="Focus Top Influencer"
            >
              <Award className="w-4 h-4" />
            </button>
          </div>

          {/* Telemetry Tag */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.08] text-[11px] font-mono text-slate-300 flex items-center gap-3 z-20">
            <span>NODES: <strong className="text-cyan-400 font-mono-num">{data?.total_nodes || 8}</strong></span>
            <span className="text-slate-700">|</span>
            <span>EDGES: <strong className="text-cyan-400 font-mono-num">{data?.total_edges || 8}</strong></span>
            <span className="text-slate-700">|</span>
            <span>TOP INFLUENCER: <strong className="text-amber-400 font-mono">{data?.top_influencer.label}</strong></span>
          </div>

          {/* Replay Step Indicator Bar */}
          {isReplaying && (
            <div className="absolute top-3 right-3 bg-emerald-950/90 border border-emerald-500/50 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-300 flex items-center gap-2 z-20 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>
                {replayStep === 1 && 'Step 1: Seed Node Activation'}
                {replayStep === 2 && 'Step 2: Primary Repost & Quote Broadcast'}
                {replayStep === 3 && 'Step 3: Civic & Community Group Cascades'}
                {replayStep === 4 && 'Step 4: Network Convergence Complete'}
              </span>
            </div>
          )}
        </div>

        {/* Detailed Node Inspector Panel */}
        <div className="lg:col-span-4 bg-[#090d16] rounded-xl border border-white/[0.08] p-4.5 flex flex-col min-h-[480px]">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white font-mono uppercase tracking-wider">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Actor Intelligence Profile</span>
            </div>
            {selectedNode && (
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                ACTIVE FOCUS
              </span>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-4 text-xs">
              {/* User Handle & Platform Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-mono">
                      {selectedNode.label}
                    </h3>
                    {selectedNode.id === data?.top_influencer.id && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        TOP SEED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-slate-300 uppercase font-mono">
                      {selectedNode.platform}
                    </span>
                    <span
                      className="px-2 py-0.5 text-[10px] font-semibold rounded text-slate-950 font-mono"
                      style={{ backgroundColor: COMMUNITY_COLORS[selectedNode.community] || '#06B6D4' }}
                    >
                      {selectedNode.community}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-slate-400">INFLUENCE SCORE</span>
                  <span className="text-2xl font-bold font-display text-cyan-400 font-mono-num">
                    {selectedNode.influence}
                  </span>
                </div>
              </div>

              {/* Centrality & Engagement Matrix */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                    BETWEENNESS CENTRALITY
                  </span>
                  <span className="text-sm font-bold font-mono-num text-emerald-400">
                    {selectedNode.betweenness}
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">
                    Information broker score
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                    PROPAGATION REACH
                  </span>
                  <span className="text-sm font-bold font-mono-num text-cyan-300">
                    {selectedNode.propagation.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">
                    Reposts, shares, & forwards
                  </span>
                </div>
              </div>

              {/* Engagement Tier & Degree Centrality */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                    ENGAGEMENT TIER
                  </span>
                  <span className="font-semibold text-slate-200 font-mono">
                    {selectedNode.engagement}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                    DEGREE CENTRALITY
                  </span>
                  <span className="font-semibold text-purple-300 font-mono font-mono-num">
                    {selectedNode.degreeCentrality}
                  </span>
                </div>
              </div>

              {/* Connected Interaction Vectors */}
              <div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase block mb-2">
                  Connected Propagation Edges ({connectedEdges.length})
                </span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {connectedEdges.map((e, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className={e.source === selectedNode.id ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                          {e.source}
                        </span>
                        <ArrowRight className="w-3 h-3 text-cyan-400" />
                        <span className={e.target === selectedNode.id ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                          {e.target}
                        </span>
                      </div>
                      <span
                        className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded uppercase"
                        style={{
                          backgroundColor: `${INTERACTION_COLORS[e.type] || '#64748B'}25`,
                          color: INTERACTION_COLORS[e.type] || '#94A3B8',
                          border: `1px solid ${INTERACTION_COLORS[e.type] || '#64748B'}40`,
                        }}
                      >
                        {e.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center text-slate-500 py-8">
              <Info className="w-8 h-8 mb-2 text-slate-600" />
              <p className="text-xs">Click any node in the Cytoscape graph to inspect its centrality parameters and propagation vectors.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
