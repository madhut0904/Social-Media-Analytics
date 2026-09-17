from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import analytics, sentiment, trends, demographics, feed, network, alerts, ml

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="PULSeSphere - AI-Driven Social Media Intelligence & Influence Analytics Engine (SIH 2026)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for Next.js frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/api/v1/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "PULSeSphere Intelligence Engine",
        "version": "1.0.0",
        "demo_mode": settings.DEMO_MODE,
        "active_connectors": ["x_v2", "telegram_channels", "reddit_praw"],
        "nlp_model": "distilbert-multi-emotion-v2",
        "graph_engine": "NetworkX 3.3 (DiGraph Centrality)"
    }

# Include routers
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(sentiment.router, prefix=settings.API_V1_STR)
app.include_router(trends.router, prefix=settings.API_V1_STR)
app.include_router(demographics.router, prefix=settings.API_V1_STR)
app.include_router(feed.router, prefix=settings.API_V1_STR)
app.include_router(network.router, prefix=settings.API_V1_STR)
app.include_router(alerts.router, prefix=settings.API_V1_STR)
app.include_router(ml.router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
