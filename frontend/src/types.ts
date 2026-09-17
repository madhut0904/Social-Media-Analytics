export type TimeRange = '1h' | '24h' | '7d' | '30d';
export type PlatformType = 'all' | 'x' | 'telegram' | 'reddit';
export type TopicType = 'all' | '#NewPolicy' | 'Public Transport' | 'Education' | 'Fuel Price';

export interface KpiCardData {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtext: string;
  percentage?: string;
  indicator?: 'positive' | 'negative' | 'neutral';
  score?: number;
  platform?: string;
}

export interface PlatformDistribution {
  platform: string;
  count: string;
  percentage: number;
  color: string;
}

export interface NarrativeIntelligence {
  topic: string;
  risk_score: number;
  risk_level: 'NOMINAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  trajectory: 'STABLE' | 'ACCELERATING' | 'EXPLOSIVE';
  polarization_index: number;
  coordinated_inauthentic_activity_prob: number;
  primary_vector: string;
  recommended_action: string;
}

export interface AnalyticsSummary {
  kpi_cards: {
    total_posts: KpiCardData;
    post_velocity: KpiCardData;
    dominant_sentiment: KpiCardData;
    top_influencer: KpiCardData;
  };
  narrative_intelligence: NarrativeIntelligence;
  platform_distribution: PlatformDistribution[];
  active_filters: {
    range: TimeRange;
    platform: PlatformType;
    topic: string;
  };
  mode: string;
}

export interface EmotionItem {
  emotion: string;
  percentage: number;
  color: string;
  description: string;
}

export interface SentimentTimelinePoint {
  time: string;
  positive: number;
  negative: number;
  neutral: number;
  support: number;
  dissent: number;
  volume: number;
}

export interface NLPAnalysisResult {
  text: string;
  stance: 'Support' | 'Dissent' | 'Neutral';
  dominant_emotion: string;
  emotion_scores: {
    dissent: number;
    anxiety: number;
    support: number;
    anger: number;
    joy: number;
    sarcasm: number;
  };
  sarcasm_detected: boolean;
  sarcasm_confidence: number;
  confidence_score: number;
  inference_time_ms: number;
}

export interface SentimentData {
  timeline: SentimentTimelinePoint[];
  emotion_distribution: EmotionItem[];
  sample_nlp_analysis: NLPAnalysisResult;
  disclaimer: string;
  mode: string;
}

export interface RisingNarrative {
  id: string;
  rank: number;
  hashtag: string;
  category: string;
  trend_score: number;
  velocity_rpm: number;
  sentiment_bias: string;
  dominant_emotion: string;
  top_platform: string;
  score_breakdown: {
    frequency: number;
    velocity: number;
    engagement: number;
    cross_platform: number;
    influencer_weight: number;
  };
}

export interface TrendsData {
  rising_narratives: RisingNarrative[];
  algorithm_info: {
    name: string;
    formula: string;
    range: string;
  };
  mode: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  platform: 'x' | 'telegram' | 'reddit' | string;
  community: string;
  influence: number;
  betweenness: number;
  degreeCentrality: number;
  engagement: string;
  propagation: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
  type: 'mention' | 'repost' | 'quote' | 'forward' | 'reply' | string;
  platform: string;
  weight: number;
  topic: string;
}

export interface NetworkGraphData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  top_influencer: NetworkNode;
  graph_density: number;
  total_nodes: number;
  total_edges: number;
  mode: string;
}

export interface FeedPost {
  id: string;
  platform: 'x' | 'telegram' | 'reddit' | string;
  author_display: string;
  author_hash: string;
  text: string;
  topic: string;
  likes: number;
  reposts: number;
  sentiment: string;
  emotion: string;
  time_ago: string;
  verified_signal: boolean;
}

export interface FeedData {
  posts: FeedPost[];
  total: number;
  active_filters: {
    platform: string;
    sentiment: string;
    topic: string;
  };
  mode: string;
}

export interface ThreatAlert {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'INFO';
  topic: string;
  trigger_reason: string;
  metrics: {
    velocity_spike: string;
    dissent_surge: string;
    bot_probability: string;
  };
  time_to_peak: string;
  recommended_response: string;
  timestamp: string;
  acknowledged?: boolean;
}

export interface AlertsData {
  alerts: ThreatAlert[];
  total_active: number;
  critical_count: number;
  mode: string;
}

export interface DemographicRegion {
  region: string;
  share: number;
  sentiment_skew: string;
  active_users_k: number;
}

export interface DemographicAgeGroup {
  age_bracket: string;
  percentage: number;
  primary_emotion: string;
}

export interface DemographicsData {
  demographics: {
    regions: DemographicRegion[];
    age_groups: DemographicAgeGroup[];
    polarization_rate: number;
    bot_anomaly_ratio: number;
  };
  mode: string;
}
