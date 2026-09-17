from fastapi import APIRouter
from pydantic import BaseModel
from app.services.sentiment_service import sentiment_service

router = APIRouter(prefix="/ml", tags=["Machine Learning"])

class EmotionInferenceRequest(BaseModel):
    text: str

@router.post("/emotion")
async def infer_emotion(payload: EmotionInferenceRequest):
    """
    NLP Emotion, Stance & Sarcasm classification endpoint.
    Accepts arbitrary text and returns probabilistic multi-emotion scores.
    """
    result = sentiment_service.analyze_text(payload.text)
    return result
