-- ==========================================================
-- PULSeSphere Seed Data for Demo & SIH 2026 Presentation
-- Synthetic Social Media Intelligence Dataset
-- ==========================================================

-- Insert Predefined Topics
INSERT INTO topics (name, category, velocity_rate, growth_percentage, risk_score, status) VALUES
('#NewPolicy', 'Policy', 14800, 380.00, 88.5, 'VIRAL'),
('Public Transport', 'Civic Infrastructure', 8400, 210.00, 78.0, 'RISING'),
('Education', 'Public Sector', 3200, 85.00, 42.0, 'GROWING'),
('Fuel Price', 'Economy', 1100, -20.00, 28.0, 'DECLINING')
ON CONFLICT (name) DO NOTHING;

-- Insert Synthetic Anonymized Users
INSERT INTO users (id, platform, platform_user_hash, display_name, language, region_code, influence_score) VALUES
('11111111-1111-1111-1111-111111111111', 'x', 'hash_sha256_01_policy_voice', '@policy_voice', 'en', 'IN-DL', 94.00),
('22222222-2222-2222-2222-222222222222', 'x', 'hash_sha256_02_news_hub', '@news_hub', 'en', 'IN-MH', 88.00),
('33333333-3333-3333-3333-333333333333', 'telegram', 'hash_sha256_03_citizen_forum', '@citizen_forum', 'kn', 'IN-KA', 81.00),
('44444444-4444-4444-4444-444444444444', 'reddit', 'hash_sha256_04_local_updates', '@local_updates', 'hi', 'IN-UP', 74.00),
('55555555-5555-5555-5555-555555555555', 'x', 'hash_sha256_05_public_voice', '@public_voice', 'en', 'IN-TN', 68.00),
('66666666-6666-6666-6666-666666666666', 'x', 'hash_sha256_06_metro_commuter', '@metro_commuter', 'kn', 'IN-KA', 62.00),
('77777777-7777-7777-7777-777777777777', 'reddit', 'hash_sha256_07_tech_observer', '@tech_observer', 'en', 'IN-KA', 58.00),
('88888888-8888-8888-8888-888888888888', 'telegram', 'hash_sha256_08_city_alerts', '@city_alerts', 'en', 'IN-MH', 76.00)
ON CONFLICT DO NOTHING;

-- Insert Synthetic Alerts
INSERT INTO alerts (severity, alert_type, topic, title, description, risk_score, growth_rate, negative_sentiment_pct, influencer_amplification, cross_platform_detected, recommended_action) VALUES
('CRITICAL', 'Narrative Acceleration', '#NewPolicy', 'Viral Narrative Acceleration Detected across X & Telegram', 'Topic #NewPolicy has surged +380% in post velocity over 45 minutes with 57% dissent sentiment and high influencer forwarding on Telegram channels.', 88, '+380%', 57, 'HIGH', TRUE, 'Initiate strategic communication response and human review of emerging counter-claims.'),
('CRITICAL', 'Sentiment Shift', 'Public Transport', 'Severe Negative Stance Shift in Metro Fare Discussion', 'Public Transport conversation sentiment flipped from 62% positive to 71% critical following route realignment announcements.', 78, '+210%', 65, 'HIGH', TRUE, 'Coordinate with transit authority PR for factual clarification release.'),
('WARNING', 'Influencer Surge', 'Education', 'High-Centrality Node Amplification on Education Reforms', 'Node @policy_voice broadcast a critique thread generating 14.8K reposts within 20 minutes.', 54, '+85%', 38, 'MODERATE', FALSE, 'Monitor engagement trajectory for potential cross-platform spillover.'),
('INFO', 'Emerging Topic', 'Fuel Price', 'Routine Discussions Stabilizing Post-Notification', 'Fuel price conversation volume returned to baseline with balanced support and dissent metrics.', 28, '-20%', 22, 'LOW', FALSE, 'No active intervention required. Routine telemetry logging.')
ON CONFLICT DO NOTHING;

-- Insert Network Interaction Edges for NetworkX
INSERT INTO network_edges (source_user_id, target_user_id, interaction_type, topic, platform, weight) VALUES
('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'repost', '#NewPolicy', 'x', 4.5),
('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'forward', '#NewPolicy', 'telegram', 3.8),
('22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'quote', 'Public Transport', 'x', 3.2),
('33333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666', 'reply', 'Public Transport', 'telegram', 2.9),
('44444444-4444-4444-4444-444444444444', '77777777-7777-7777-7777-777777777777', 'quote', 'Education', 'reddit', 2.1),
('88888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'forward', '#NewPolicy', 'telegram', 4.1),
('66666666-6666-6666-6666-666666666666', '55555555-5555-5555-5555-555555555555', 'mention', 'Public Transport', 'x', 1.8),
('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'reply', '#NewPolicy', 'x', 2.0)
ON CONFLICT DO NOTHING;
