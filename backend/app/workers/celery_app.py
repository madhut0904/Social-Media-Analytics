from celery import Celery
from app.config import settings

celery_app = Celery(
    "pulsesphere_workers",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["app.workers.tasks"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    beat_schedule={
        "ingest-x-posts-every-2-mins": {
            "task": "app.workers.tasks.collect_x_data",
            "schedule": 120.0,
        },
        "calculate-network-centrality-every-5-mins": {
            "task": "app.workers.tasks.calculate_network_metrics",
            "schedule": 300.0,
        },
        "refresh-dashboard-cache-every-minute": {
            "task": "app.workers.tasks.refresh_dashboard_cache",
            "schedule": 60.0,
        },
    }
)
