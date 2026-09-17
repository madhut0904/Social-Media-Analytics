from fastapi import APIRouter, Query
from app.services.sentiment_service import sentiment_service

router = APIRouter(prefix="/analytics/sentiment", tags=["Sentiment"])

@router.get("")
async def get_sentiment_analytics(
    range: str = Query("24h", description="Time range: 1h, 24h, 7d, 30d"),
    platform: str = Query("all", description="Platform: all, x, telegram, reddit"),
    topic: str = Query("all", description="Topic: all, #NewPolicy, Public Transport, Education, Fuel Price")
):
    """
    Returns sentiment timeline series and 6-dimensional emotion distributions.
    """
    timeline = sentiment_service.get_timeline_data(range)

    emotion_distribution = [
        {"emotion": "Dissent", "percentage": 57, "color": "#EF4444", "description": "High friction with policy amendments"},
        {"emotion": "Anxiety", "percentage": 29, "color": "#F59E0B", "description": "Commuter and student apprehension"},
        {"emotion": "Support", "percentage": 22, "color": "#10B981", "description": "Institutional and reform supporters"},
        {"emotion": "Anger", "percentage": 18, "color": "#DC2626", "description": "Sharp dissent reactions"},
        {"emotion": "Joy", "percentage": 14, "color": "#06B6D4", "description": "Positive modernization sentiment"},
        {"emotion": "Sarcasm", "percentage": 9, "color": "#8B5CF6", "description": "Irony and rhetorical cynicism detected"}
    ]

    sample_nlp = sentiment_service.analyze_text(
        "Wow, another amazing update... exactly what we needed 🙄"
    )

    return {
        "timeline": timeline,
        "emotion_distribution": emotion_distribution,
        "sample_nlp_analysis": sample_nlp,
        "disclaimer": "Emotion classification is generated using NLP models and should be treated as probabilistic inference.",
        "mode": "DEMO_SYNTHETIC"
    }
