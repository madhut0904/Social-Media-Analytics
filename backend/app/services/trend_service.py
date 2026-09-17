from typing import List, Dict, Any

class TrendRankingService:
    """
    Computes Trend Scores across social conversations using multi-factor signals:
    Trend Score = w1*Frequency + w2*Velocity + w3*Engagement + w4*CrossPlatformSpread + w5*InfluencerWeight
    """
    def __init__(self):
        self.weights = {
            "frequency": 0.20,
            "velocity": 0.25,
            "engagement": 0.20,
            "cross_platform": 0.20,
            "influencer": 0.15
        }

    def compute_trend_score(self, freq: float, vel: float, eng: float, cross_plat: float, inf: float) -> int:
        score = (
            (freq * self.weights["frequency"]) +
            (vel * self.weights["velocity"]) +
            (eng * self.weights["engagement"]) +
            (cross_plat * self.weights["cross_platform"]) +
            (inf * self.weights["influencer"])
        )
        return min(100, max(0, int(score)))

    def get_rising_narratives(self) -> List[Dict[str, Any]]:
        return [
            {
                "topic": "#NewPolicy",
                "category": "Policy & Governance",
                "velocity": "+380%",
                "status": "VIRAL",
                "statusColor": "red",
                "trendScore": 96,
                "engagement": "1.4M",
                "sentiment": "Dissent (57%)",
                "platforms": ["X (54%)", "Telegram (32%)", "Reddit (14%)"],
                "breakdown": {
                    "frequency": 92,
                    "velocity": 98,
                    "engagement": 94,
                    "crossPlatform": 96,
                    "influencer": 95
                }
            },
            {
                "topic": "Public Transport",
                "category": "Civic Infrastructure",
                "velocity": "+210%",
                "status": "RISING",
                "statusColor": "orange",
                "trendScore": 84,
                "engagement": "680K",
                "sentiment": "Concern (48%)",
                "platforms": ["X (48%)", "Reddit (38%)", "Telegram (14%)"],
                "breakdown": {
                    "frequency": 78,
                    "velocity": 86,
                    "engagement": 82,
                    "crossPlatform": 88,
                    "influencer": 84
                }
            },
            {
                "topic": "Education",
                "category": "Public Sector",
                "velocity": "+85%",
                "status": "GROWING",
                "statusColor": "cyan",
                "trendScore": 62,
                "engagement": "310K",
                "sentiment": "Neutral / Inquisitive (52%)",
                "platforms": ["Reddit (52%)", "X (36%)", "Telegram (12%)"],
                "breakdown": {
                    "frequency": 60,
                    "velocity": 64,
                    "engagement": 58,
                    "crossPlatform": 62,
                    "influencer": 66
                }
            },
            {
                "topic": "Fuel Price",
                "category": "Economy",
                "velocity": "-20%",
                "status": "DECLINING",
                "statusColor": "emerald",
                "trendScore": 34,
                "engagement": "95K",
                "sentiment": "Balanced (45%)",
                "platforms": ["X (70%)", "Reddit (20%)", "Telegram (10%)"],
                "breakdown": {
                    "frequency": 35,
                    "velocity": 20,
                    "engagement": 38,
                    "crossPlatform": 40,
                    "influencer": 36
                }
            }
        ]

trend_service = TrendRankingService()
