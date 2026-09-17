import uuid
from sqlalchemy import (
    Column, String, Text, Integer, Numeric, Boolean,
    ForeignKey, DateTime, func, ARRAY
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    platform = Column(String(32), nullable=False)
    platform_user_hash = Column(String(128), nullable=False)
    display_name = Column(String(128), nullable=False)
    language = Column(String(16), default="en")
    region_code = Column(String(32), default="IN-KA")
    influence_score = Column(Numeric(5, 2), default=50.00)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    posts = relationship("Post", back_populates="author")
    demographics = relationship("InferredDemographic", back_populates="user", uselist=False)


class Topic(Base):
    __tablename__ = "topics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(128), nullable=False, unique=True)
    category = Column(String(64), nullable=False)
    velocity_rate = Column(Numeric(8, 2), default=0.0)
    growth_percentage = Column(Numeric(6, 2), default=0.0)
    risk_score = Column(Numeric(5, 2), default=0.0)
    status = Column(String(32), default="ACTIVE")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Post(Base):
    __tablename__ = "posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    platform = Column(String(32), nullable=False)
    platform_post_id = Column(String(128), nullable=False)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    parent_post_id = Column(String(128), nullable=True)
    text = Column(Text, nullable=False)
    topic = Column(String(128), nullable=True)
    language = Column(String(16), default="en")
    published_at = Column(DateTime(timezone=True), nullable=False)
    collected_at = Column(DateTime(timezone=True), server_default=func.now())
    likes_count = Column(Integer, default=0)
    replies_count = Column(Integer, default=0)
    reposts_count = Column(Integer, default=0)
    raw_payload = Column(JSONB, default={})

    author = relationship("User", back_populates="posts")
    sentiment = relationship("SentimentLog", back_populates="post", uselist=False)


class InferredDemographic(Base):
    __tablename__ = "inferred_demographics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    age_band = Column(String(32), nullable=False)
    geo_region = Column(String(64), nullable=False)
    dominant_language = Column(String(32), nullable=False)
    interest_tags = Column(ARRAY(String), default=[])
    confidence = Column(Numeric(4, 3), default=0.850)
    inference_version = Column(String(32), default="v1.4.2")
    inferred_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="demographics")


class SentimentLog(Base):
    __tablename__ = "sentiment_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(UUID(as_uuid=True), ForeignKey("posts.id", ondelete="CASCADE"))
    sentiment_label = Column(String(32), nullable=False)
    primary_emotion = Column(String(32), nullable=False)
    emotion_scores = Column(JSONB, nullable=False, default={})
    stance = Column(String(32), default="NEUTRAL")
    confidence = Column(Numeric(4, 3), nullable=False)
    model_name = Column(String(64), default="distilbert-multi-emotion-v2")
    detected_at = Column(DateTime(timezone=True), server_default=func.now())

    post = relationship("Post", back_populates="sentiment")


class NetworkEdge(Base):
    __tablename__ = "network_edges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    target_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    interaction_type = Column(String(32), nullable=False)
    post_id = Column(UUID(as_uuid=True), ForeignKey("posts.id", ondelete="SET NULL"), nullable=True)
    topic = Column(String(128), nullable=True)
    platform = Column(String(32), nullable=False)
    weight = Column(Numeric(5, 2), default=1.0)
    occurred_at = Column(DateTime(timezone=True), server_default=func.now())


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    severity = Column(String(32), nullable=False)
    alert_type = Column(String(64), nullable=False)
    topic = Column(String(128), nullable=False)
    title = Column(String(256), nullable=False)
    description = Column(Text, nullable=False)
    risk_score = Column(Integer, default=75)
    growth_rate = Column(String(32), default="+380%")
    negative_sentiment_pct = Column(Integer, default=57)
    influencer_amplification = Column(String(32), default="HIGH")
    cross_platform_detected = Column(Boolean, default=True)
    recommended_action = Column(Text, default="Human review recommended.")
    status = Column(String(32), default="ACTIVE")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
