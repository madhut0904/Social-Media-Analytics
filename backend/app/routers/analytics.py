from fastapi import APIRouter, Query
from typing import Optional
from app.services.early_warning_service import early_warning_service

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/summary")
async def get_summary_kpis(
    range: str = Query("24h", description="Time range: 1h, 24h, 7d, 30d"),
    platform: str = Query("all", description="Platform: all, x, telegram, reddit"),
    topic: str = Query("all", description="Topic: all, #NewPolicy, Public Transport, Education, Fuel Price")
):
    """
    Returns high-level KPI cards and platform summary metrics.
    """
    # Dynamic values based on filters
    velocity_map = {
        "1h": "14.8K/min",
        "24h": "12.4K/min",
        "7d": "9.1K/min",
        "30d": "4.5K/min"
    }

    posts_map = {
        "1h": "184.2K",
        "24h": "2.4M",
        "7d": "15.8M",
        "30d": "42.1M"
    }

    return {
        "kpi_cards": {
            "total_posts": {
                "label": "TOTAL POSTS",
                "value": posts_map.get(range, "2.4M"),
                "change": "+18.6%",
                "trend": "up",
                "subtext": "vs previous period"
            },
            "post_velocity": {
                "label": "POST VELOCITY",
                "value": velocity_map.get(range, "14.8K/min"),
                "change": "+31%",
                "trend": "up",
                "subtext": "peak volume recorded"
            },
            "dominant_sentiment": {
                "label": "DOMINANT SENTIMENT",
                "value": "Dissent",
                "percentage": "57%",
                "subtext": "Anxiety (29%), Support (22%)",
                "indicator": "negative"
            },
            "top_influencer": {
                "label": "TOP INFLUENCER",
                "value": "@policy_voice",
                "score": 94,
                "subtext": "Centrality 0.82 • 18.4K Reposts",
                "platform": "x"
            }
        },
        "narrative_intelligence": early_warning_service.calculate_narrative_risk(
            topic if topic != "all" else "#NewPolicy"
        ),
        "platform_distribution": [
            {"platform": "X (Twitter)", "count": "1.3M", "percentage": 54, "color": "#06B6D4"},
            {"platform": "Telegram", "count": "768K", "percentage": 32, "color": "#3B82F6"},
            {"platform": "Reddit", "count": "336K", "percentage": 14, "color": "#F97316"}
        ],
        "active_filters": {
            "range": range,
            "platform": platform,
            "topic": topic
        },
        "mode": "DEMO_SYNTHETIC"
    }
