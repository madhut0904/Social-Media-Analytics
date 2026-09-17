-- ==========================================================
-- PULSeSphere Database Initialization Schema
-- Smart India Hackathon 2026 - Social Media Analytics Engine
-- PostgreSQL 15+ with pgvector extension
-- ==========================================================

-- Enable pgvector extension for semantic similarity search on social posts
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ----------------------------------------------------------
-- 1. USERS TABLE (Salted Hashed Identifiers - Privacy Compliant)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(32) NOT NULL, -- 'x', 'telegram', 'reddit'
    platform_user_hash VARCHAR(128) NOT NULL, -- Salted SHA-256 hash of real platform handle/ID
    display_name VARCHAR(128) NOT NULL, -- Anonymized display name (e.g. '@policy_voice', '@user_42')
    language VARCHAR(16) DEFAULT 'en',
    region_code VARCHAR(32) DEFAULT 'IN-KA',
    influence_score NUMERIC(5,2) DEFAULT 50.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_platform_user_hash UNIQUE (platform, platform_user_hash)
);

-- ----------------------------------------------------------
-- 2. TOPICS / NARRATIVES TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(128) NOT NULL UNIQUE,
    category VARCHAR(64) NOT NULL, -- 'Policy', 'Public Transport', 'Education', 'Economy'
    velocity_rate NUMERIC(8,2) DEFAULT 0.0,
    growth_percentage NUMERIC(6,2) DEFAULT 0.0,
    risk_score NUMERIC(5,2) DEFAULT 0.0,
    status VARCHAR(32) DEFAULT 'ACTIVE', -- 'VIRAL', 'RISING', 'GROWING', 'DECLINING', 'STABLE'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------
-- 3. POSTS TABLE (Normalized Across Platforms)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(32) NOT NULL,
    platform_post_id VARCHAR(128) NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    parent_post_id VARCHAR(128), -- For thread/reply tracking
    text TEXT NOT NULL,
    text_embedding vector(384), -- MiniLM-L6-v2 embedding dimension
    topic VARCHAR(128),
    language VARCHAR(16) DEFAULT 'en',
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    collected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,
    replies_count INT DEFAULT 0,
    reposts_count INT DEFAULT 0,
    raw_payload JSONB DEFAULT '{}'::jsonb
);

-- ----------------------------------------------------------
-- 4. INFERRED DEMOGRAPHICS TABLE (Aggregate, Anonymized)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS inferred_demographics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    age_band VARCHAR(32) NOT NULL, -- '18-24', '25-34', '35-44', '45+'
    geo_region VARCHAR(64) NOT NULL, -- 'South India', 'North India', 'West India', 'East India'
    dominant_language VARCHAR(32) NOT NULL, -- 'English', 'Kannada', 'Hindi', 'Others'
    interest_tags TEXT[] DEFAULT '{}',
    confidence NUMERIC(4,3) DEFAULT 0.85,
    inference_version VARCHAR(32) DEFAULT 'v1.4.2',
    inferred_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------
-- 5. SENTIMENT & EMOTION LOGS TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS sentiment_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    sentiment_label VARCHAR(32) NOT NULL, -- 'Positive', 'Negative', 'Support', 'Dissent', 'Neutral'
    primary_emotion VARCHAR(32) NOT NULL, -- 'Joy', 'Anger', 'Anxiety', 'Sarcasm', 'Support', 'Dissent'
    emotion_scores JSONB NOT NULL DEFAULT '{}'::jsonb, -- e.g. {"joy": 0.14, "anger": 0.18, "anxiety": 0.29, "sarcasm": 0.09, "support": 0.22, "dissent": 0.57}
    stance VARCHAR(32) DEFAULT 'NEUTRAL', -- 'IN_FAVOR', 'AGAINST', 'NEUTRAL'
    confidence NUMERIC(4,3) NOT NULL,
    model_name VARCHAR(64) DEFAULT 'distilbert-multi-emotion-v2',
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------
-- 6. NETWORK EDGES TABLE (Interaction Graph for NetworkX)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS network_edges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    target_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interaction_type VARCHAR(32) NOT NULL, -- 'reply', 'repost', 'quote', 'mention', 'forward'
    post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
    topic VARCHAR(128),
    platform VARCHAR(32) NOT NULL,
    weight NUMERIC(5,2) DEFAULT 1.0,
    occurred_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------
-- 7. EARLY WARNING ALERTS TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    severity VARCHAR(32) NOT NULL, -- 'CRITICAL', 'WARNING', 'INFO'
    alert_type VARCHAR(64) NOT NULL, -- 'Narrative Acceleration', 'Emerging Topic', 'Sentiment Shift', 'Influencer Surge', 'Cross-platform Propagation'
    topic VARCHAR(128) NOT NULL,
    title VARCHAR(256) NOT NULL,
    description TEXT NOT NULL,
    risk_score INT DEFAULT 75,
    growth_rate VARCHAR(32) DEFAULT '+380%',
    negative_sentiment_pct INT DEFAULT 57,
    influencer_amplification VARCHAR(32) DEFAULT 'HIGH',
    cross_platform_detected BOOLEAN DEFAULT TRUE,
    recommended_action TEXT DEFAULT 'Human review recommended.',
    status VARCHAR(32) DEFAULT 'ACTIVE', -- 'ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------
-- INDEXES FOR ENTERPRISE QUERY PERFORMANCE
-- ----------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_posts_platform_topic ON posts(platform, topic);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_sentiment_logs_post_id ON sentiment_logs(post_id);
CREATE INDEX IF NOT EXISTS idx_network_edges_source_target ON network_edges(source_user_id, target_user_id);
CREATE INDEX IF NOT EXISTS idx_network_edges_topic ON network_edges(topic);
CREATE INDEX IF NOT EXISTS idx_alerts_severity_created ON alerts(severity, created_at DESC);
