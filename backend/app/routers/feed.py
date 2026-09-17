from fastapi import APIRouter, Query
from typing import Optional, List
from app.connectors.x_connector import x_connector
from app.connectors.telegram_connector import telegram_connector
from app.connectors.reddit_connector import reddit_connector

router = APIRouter(prefix="/feed", tags=["Live Feed"])

@router.get("")
async def get_live_feed(
    platform: str = Query("all", description="Filter platform: all, x, telegram, reddit"),
    sentiment: str = Query("all", description="Filter sentiment: all, Positive, Negative, Support, Dissent, Neutral"),
    topic: str = Query("all", description="Filter topic: all, #NewPolicy, Public Transport, Education, Fuel Price"),
    limit: int = Query(20, description="Max posts to return")
):
    """
    Returns streaming-style social posts normalized across X, Telegram, and Reddit.
    """
    x_posts = x_connector.fetch_posts(topic=topic, limit=10)
    tg_posts = telegram_connector.fetch_posts(topic=topic, limit=10)
    rd_posts = reddit_connector.fetch_posts(topic=topic, limit=10)

    all_posts = x_posts + tg_posts + rd_posts

    # Add more synthetic posts for richer filtering experience
    extra_posts = [
        {
            "id": "x_105",
            "platform": "x",
            "author_display": "@citizen_watchdog",
            "author_hash": "hash_sha256_9a8b7c",
            "text": "The public feedback window for #NewPolicy closes in 48 hours. Ensure your objections are filed on the portal.",
            "topic": "#NewPolicy",
            "likes": 4120,
            "reposts": 1890,
            "sentiment": "Dissent",
            "emotion": "Anxiety",
            "time_ago": "3m ago",
            "verified_signal": True
        },
        {
            "id": "rd_303",
            "platform": "reddit",
            "author_display": "u/UrbanPlanner_IND",
            "author_hash": "hash_sha256_3d2e1f",
            "text": "Data-driven breakdown: How the metro expansion compares with feeder bus frequency in peak hours.",
            "topic": "Public Transport",
            "likes": 3200,
            "reposts": 540,
            "sentiment": "Support",
            "emotion": "Joy",
            "time_ago": "9m ago",
            "verified_signal": True
        },
        {
            "id": "tg_203",
            "platform": "telegram",
            "author_display": "@student_council_updates",
            "author_hash": "hash_sha256_7c8d9e",
            "text": "National scholarship application dates extended by 2 weeks following technical maintenance.",
            "topic": "Education",
            "likes": 5600,
            "reposts": 1400,
            "sentiment": "Support",
            "emotion": "Joy",
            "time_ago": "18m ago",
            "verified_signal": True
        }
    ]
    all_posts.extend(extra_posts)

    # Filter posts
    filtered = []
    for post in all_posts:
        if platform != "all" and post["platform"].lower() != platform.lower():
            continue
        if sentiment != "all" and post["sentiment"].lower() != sentiment.lower():
            continue
        if topic != "all" and post["topic"].lower() != topic.lower():
            continue
        filtered.append(post)

    return {
        "posts": filtered[:limit],
        "total": len(filtered),
        "active_filters": {"platform": platform, "sentiment": sentiment, "topic": topic},
        "mode": "DEMO_SYNTHETIC"
    }
