from fastapi import APIRouter, Query
from typing import Optional
from app.services.network_service import network_service

router = APIRouter(prefix="/analytics/network", tags=["Network Graph"])

@router.get("")
async def get_network_graph(
    platform: Optional[str] = Query("all", description="Filter platform: all, x, telegram, reddit"),
    topic: Optional[str] = Query("all", description="Filter topic: all, #NewPolicy, Public Transport, Education, Fuel Price")
):
    """
    Constructs NetworkX DiGraph, computes Betweenness Centrality,
    and returns nodes, edges, and the top influencer.
    """
    analytics = network_service.get_network_analytics(platform=platform, topic=topic)
    return {
        **analytics,
        "mode": "DEMO_SYNTHETIC"
    }
