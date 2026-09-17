from fastapi import APIRouter
from app.services.early_warning_service import early_warning_service

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("")
async def get_alerts():
    """
    Returns AI Early Warning alerts sorted by severity.
    """
    alerts = early_warning_service.get_active_alerts()
    return {
        "alerts": alerts,
        "total_active": len(alerts),
        "critical_count": sum(1 for a in alerts if a["severity"] == "CRITICAL"),
        "mode": "DEMO_SYNTHETIC"
    }
