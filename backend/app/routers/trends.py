from fastapi import APIRouter
from app.services.trend_service import trend_service

router = APIRouter(prefix="/analytics/trends", tags=["Trends"])

@router.get("")
async def get_trends():
    """
    Returns ranking of rising narratives with Trend Score breakdown.
    """
    narratives = trend_service.get_rising_narratives()
    return {
        "rising_narratives": narratives,
        "algorithm_info": {
            "name": "Multi-Factor Narrative Trend Score",
            "formula": "Trend Score = 0.20*Frequency + 0.25*Velocity + 0.20*Engagement + 0.20*CrossPlatform + 0.15*InfluencerWeight",
            "range": "0 - 100"
        },
        "mode": "DEMO_SYNTHETIC"
    }
