# 🛰️ SocialMind AI — AI-Powered Social Media Intelligence & Influence Analytics

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026-orange.svg?style=for-the-badge)](https://www.sih.gov.in/)
[![Theme: Blockchain & Cybersecurity](https://img.shields.io/badge/Theme-Blockchain%20%26%20Cybersecurity-blue.svg?style=for-the-badge)](https://www.sih.gov.in/)
[![Problem Statement ID: 26152](https://img.shields.io/badge/PS%20ID-26152-cyan.svg?style=for-the-badge)](https://www.sih.gov.in/)
[![Team Name: Knockout](https://img.shields.io/badge/Team-Knockout-emerald.svg?style=for-the-badge)](https://www.sih.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)

> **Social Media Audience Intelligence, Influence Propagation, NLP Emotion Breakdown, and Early Threat Warning Platform for Government & Security Analysts.**

---

## 📌 Problem Statement Overview
- **Problem Statement ID**: `26152`
- **Problem Statement Title**: Social Media Analytics
- **Theme**: Blockchain & Cybersecurity
- **PS Category**: Software
- **Team Name**: Knockout

---

## 🌟 Solution Architecture: From Raw Posts to Actionable Intelligence

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│   RAW DATA      │  ───► │   AI INSIGHT    │  ───► │     NETWORK     │  ───► │     EVIDENCE     │  ───► │      ACTION      │
│  X + Telegram   │       │Sentiment+Trends │       │Influence+Spread │       │    Blockchain    │       │Prioritized Alerts│
└─────────────────┘       └─────────────────┘       └─────────────────┘       └──────────────────┘       └──────────────────┘
```

1. **Multi-Platform Ingestion**: Ingestion gateways for **X (Twitter)**, **Telegram**, **Reddit**, **Instagram**, **Facebook**, and **YouTube**.
2. **AI / NLP Intelligence Layer**: Text cleaning, language detection, transformer-based 6-dimensional emotion modeling (Supportive, Against, Anxiety, Joy, Anger, Sarcasm), stance detection, and entity extraction.
3. **Audience Demographics**: Cryptographically anonymized demographic inference (Age bands, languages, regional heat distributions, professional cohorts).
4. **Real-Time Trend Engine**: 5-Factor weighted trend score:
   $$\text{Trend Score} = 0.20 \times \text{Frequency} + 0.25 \times \text{Velocity} + 0.20 \times \text{Engagement} + 0.20 \times \text{Spread} + 0.15 \times \text{Influence}$$
5. **Influence & Network Analytics**: PageRank, degree/betweenness centrality, bridge community detection, and Key Opinion Leader (KOL) propagation paths.
6. **Tamper-Evident Evidence Package**: SHA-256 cryptographic post citations and exportable Intelligence Dossiers for policy de-escalation and audit readiness.

---

## 📸 Key Features & Dashboard Modules

### 1. 📊 Executive Command Dashboard (Slide 5 Exact UI)
- **Top Summary KPIs**: Real-time counters for **Total Posts** (`124,893`), **Total Users** (`48,721`), and **Active Channels** (`2,348`).
- **Sentiment Breakdown**: 4-color Donut Chart (*Supportive 42%*, *Against 31%*, *Anxiety 17%*, *Neutral 10%*) + 24-Hour Sentiment Trend multi-line chart.
- **Trending Topics**: Ranked table with mention counts, surge velocity, and one-click topic filtering.
- **Audience Matrix**: 4-quadrant layout covering Age brackets, Language distributions, Geographic reach, and Professional sectors.
- **Network Topology**: Glowing cluster visualizer highlighting high-influence nodes and top influencer leaderboards.

### 2. 📡 Live Stream Ingest Feed
- Normalized stream with real-time sentiment tags, engagement counts, and one-click cryptographic citation copy.
- Interactive multi-platform selector (All, X, Telegram, Instagram, Facebook, Reddit).

### 3. 🗺️ Geographic Heatmap
- Stylized interactive India map displaying discussion intensity hotspots across Delhi (18%), Mumbai (12%), Bengaluru (9%), Chennai (7%), Kolkata (6%), and Hyderabad (5%).
- Hover popovers showing active volume, polarity skew, and top gateway.

### 4. 🛰️ Key Opinion Leader (KOL) Network
- Interactive centrality graph centered around the Key Opinion Leader with colored classifications for Influencers, Active Users, and New Users.

### 5. 🚨 Early Warning Sentinel & Threat Defense
- Autonomous detection of coordinated narrative surges before mainstream virality.
- Priority alert cards with time-to-peak estimates and recommended policy de-escalation protocols.

### 6. ⏳ Conversation Time Machine (`/timeline`)
- Signature feature showing step-by-step chronological narrative progression: Origin ➔ Signal ➔ Amplification ➔ Cross-Platform Spread ➔ Acceleration ➔ Early Warning.

### 7. 🧪 Real-Time NLP Inference Workbench
- Interactive testing sandbox for arbitrary text with 6D emotion scoring, stance detection, and sarcasm identification with inference latency tracking.

### 8. 📄 Tamper-Evident Intelligence Dossier Export
- Generate printable, audit-ready PDF/JSON dossiers with cryptographic SHA-256 verification stamps.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI** | React 18, TypeScript, TailwindCSS v4, Vite 5, Lucide Icons, Cytoscape.js |
| **Styling & Theme** | Cyberpunk Glassmorphism, Dark Mode, Custom SVG Data Visualizations |
| **Backend API** | FastAPI, Python 3.11+, Pydantic, Uvicorn |
| **NLP & Graph Engine** | DistilBERT / HuggingFace Transformers, NetworkX DiGraph Centrality |
| **Database & Vector** | PostgreSQL, pgvector, SQLAlchemy, asyncpg |
| **Connectors** | Tweepy (X API v2), Telethon / MTProto (Telegram), PRAW (Reddit) |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/madhut0904/Social-Media-Analytics.git
cd Social-Media-Analytics
```

### 2. Frontend Setup & Launch
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** (or `http://localhost:3001`) in your browser.

### 3. Backend Setup & Launch (Optional)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```

---

## 📁 Repository Structure

```
Social-Media-Analytics/
├── backend/
│   ├── app/
│   │   ├── connectors/          # X, Telegram, Reddit data ingestion
│   │   ├── routers/             # FastAPI REST endpoints
│   │   ├── services/            # NLP, sentiment & graph analysis logic
│   │   ├── config.py            # Environment configuration
│   │   └── main.py              # Application entry point
│   ├── Dockerfile               # Backend containerization
│   └── requirements.txt         # Python dependencies
├── database/
│   └── init.sql                 # SQL schema & pgvector initialization
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable dashboard cards & visualizers
│   │   │   ├── SocialMindDashboard.tsx   # Slide 5 Executive Dashboard
│   │   │   ├── ConversationTimeMachine.tsx # Chronological Narrative
│   │   │   ├── NetworkGraph.tsx          # Cytoscape Influence Graph
│   │   │   ├── SentimentRadar.tsx        # 6D Emotion Matrix
│   │   │   ├── SentimentTimeline.tsx     # Time-Series Trajectory
│   │   │   ├── TrendNarratives.tsx       # 5-Factor Trend Engine
│   │   │   ├── DemographicsMatrix.tsx    # Audience Geopolitics
│   │   │   ├── LiveFeed.tsx              # Multi-Platform Feed
│   │   │   ├── EarlyWarningCenter.tsx    # Threat Defense Alerts
│   │   │   ├── NLPInferenceWorkbench.tsx # Emotion Sandbox
│   │   │   └── IntelligenceDossierModal.tsx # Tamper-Evident Report
│   │   ├── services/            # API client & self-healing synthetic engine
│   │   ├── types.ts             # TypeScript definitions
│   │   ├── App.tsx              # Root application router
│   │   ├── main.tsx             # DOM entry point
│   │   └── index.css            # Tailwind & glassmorphism theme
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

---

## 👥 Team Details (SIH 2026)
- **Team Name**: Knockout
- **Theme**: Blockchain & Cybersecurity
- **Problem Statement ID**: 26152

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.