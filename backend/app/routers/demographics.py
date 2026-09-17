from fastapi import APIRouter, Query
from app.services.demographic_service import demographic_service

router = APIRouter(prefix="/analytics/demographics", tags=["Demographics"])

@router.get("")
async def get_demographics(
    topic: str = Query("all", description="Filter by topic")
):
    """
    Returns aggregate, anonymized audience demographic estimations.
    """
    data = demographic_service.get_demographics(topic)
    return {
        "demographics": data,
        "mode": "DEMO_SYNTHETIC"
    }
