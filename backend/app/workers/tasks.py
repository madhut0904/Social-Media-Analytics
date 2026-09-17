from app.workers.celery_app import celery_app
from app.connectors.x_connector import x_connector
from app.connectors.telegram_connector import telegram_connector
from app.connectors.reddit_connector import reddit_connector
from app.services.network_service import network_service
from app.services.sentiment_service import sentiment_service
import logging

logger = logging.getLogger("pulsesphere.tasks")

@celery_app.task(name="app.workers.tasks.collect_x_data")
def collect_x_data():
    logger.info("Running automated ingestion task for X connector...")
    posts = x_connector.fetch_posts("#NewPolicy", limit=20)
    return {"status": "success", "platform": "x", "count": len(posts)}

@celery_app.task(name="app.workers.tasks.collect_telegram_data")
def collect_telegram_data():
    logger.info("Running automated ingestion task for Telegram connector...")
    posts = telegram_connector.fetch_posts("Public Transport", limit=20)
    return {"status": "success", "platform": "telegram", "count": len(posts)}

@celery_app.task(name="app.workers.tasks.collect_reddit_data")
def collect_reddit_data():
    logger.info("Running automated ingestion task for Reddit connector...")
    posts = reddit_connector.fetch_posts("all", limit=20)
    return {"status": "success", "platform": "reddit", "count": len(posts)}

@celery_app.task(name="app.workers.tasks.process_sentiment")
def process_sentiment(post_text: str):
    logger.info("Processing asynchronous NLP emotion inference...")
    return sentiment_service.analyze_text(post_text)

@celery_app.task(name="app.workers.tasks.calculate_network_metrics")
def calculate_network_metrics():
    logger.info("Recomputing graph betweenness centrality...")
    metrics = network_service.get_network_analytics()
    return {"status": "success", "nodes": len(metrics["nodes"]), "edges": len(metrics["edges"])}

@celery_app.task(name="app.workers.tasks.refresh_dashboard_cache")
def refresh_dashboard_cache():
    logger.info("Refreshing Redis cache for dashboard metrics...")
    return {"status": "cache_refreshed"}
