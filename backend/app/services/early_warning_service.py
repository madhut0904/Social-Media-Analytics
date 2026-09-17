from typing import List, Dict, Any

class EarlyWarningService:
    """
    AI Early Warning & Narrative Intelligence Engine.
    Correlates:
    - Sentiment Inversion (Dissent > 50%)
    - Trend Velocity (> +200%)
    - Influencer Centrality Amplification (KOL Broadcasts)
    - Cross-Platform Spread Detection (X -> Telegram -> Reddit)
    to calculate Narrative Risk Scores (0-100) and issue proactive alerts.
    """
    def calculate_narrative_risk(self, topic: str = "#NewPolicy") -> Dict[str, Any]:
        return {
            "topic": topic,
            "risk_score": 78,
            "max_score": 100,
            "risk_level": "HIGH RISK / ACCELERATING",
            "continuation_probability": 78,
            "workflow_stage": "Early Warning Triggered",
            "causality_chain": [
                {"stage": "Emerging Topic", "status": "COMPLETED", "detail": "Spike detected across microblog nodes"},
                {"stage": "Rapid Growth", "status": "COMPLETED", "detail": "Post volume +380% in 45 minutes"},
                {"stage": "Negative Sentiment", "status": "COMPLETED", "detail": "57% Dissent / High Sarcasm index"},
                {"stage": "Influencer Amplification", "status": "COMPLETED", "detail": "Top-tier nodes (@policy_voice) broadcasted"},
                {"stage": "Cross-Platform Spread", "status": "COMPLETED", "detail": "Propagation detected across X, Telegram & Reddit"},
                {"stage": "AI Risk Score", "status": "ACTIVE", "detail": "78/100 composite risk threshold reached"},
                {"stage": "Actionable Alert", "status": "ACTIVE", "detail": "Human review & strategic response recommended"}
            ],
            "reasons": [
                "Negative sentiment increased sharply to 57% dissent within 1 hour",
                "Conversation velocity accelerated to 14.8K posts/min (+31%)",
                "High-influence users (@policy_voice, @news_hub) amplified the topic",
                "Cross-platform propagation detected moving from X to Telegram public groups"
            ],
            "mitigation_recommendations": [
                "Issue official clarifying statement addressing high-friction talking points",
                "Engage verified civic communicators for fact-based narrative balancing",
                "Monitor secondary propagation nodes on encrypted channel forwards"
            ],
            "disclaimer": "This score is a probabilistic model prediction based on synthetic/demo analytics signals and does not represent an absolute guarantee of real-world outcomes."
        }

    def get_active_alerts(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "alt_01",
                "severity": "CRITICAL",
                "type": "Narrative Acceleration",
                "topic": "#NewPolicy",
                "growth": "+380%",
                "negativeSentiment": 57,
                "influencerAmplification": "HIGH",
                "crossPlatform": "DETECTED (X → Telegram → Reddit)",
                "riskScore": 88,
                "timestamp": "10m ago",
                "recommendedAction": "Initiate human review of emerging counter-claims and dispatch verified factsheet."
            },
            {
                "id": "alt_02",
                "severity": "CRITICAL",
                "type": "Sentiment Shift",
                "topic": "Public Transport",
                "growth": "+210%",
                "negativeSentiment": 65,
                "influencerAmplification": "HIGH",
                "crossPlatform": "DETECTED (X → Reddit)",
                "riskScore": 78,
                "timestamp": "25m ago",
                "recommendedAction": "Coordinate with transit authority PR for route clarification release."
            },
            {
                "id": "alt_03",
                "severity": "WARNING",
                "type": "Influencer Surge",
                "topic": "Education",
                "growth": "+85%",
                "negativeSentiment": 38,
                "influencerAmplification": "MODERATE",
                "crossPlatform": "PARTIAL (Reddit focus)",
                "riskScore": 54,
                "timestamp": "1h ago",
                "recommendedAction": "Monitor engagement trajectory for potential cross-platform spillover."
            },
            {
                "id": "alt_04",
                "severity": "INFO",
                "type": "Emerging Topic",
                "topic": "Fuel Price",
                "growth": "-20%",
                "negativeSentiment": 22,
                "influencerAmplification": "LOW",
                "crossPlatform": "MINIMAL",
                "riskScore": 28,
                "timestamp": "3h ago",
                "recommendedAction": "Routine telemetry logging. No immediate action required."
            }
        ]

early_warning_service = EarlyWarningService()
