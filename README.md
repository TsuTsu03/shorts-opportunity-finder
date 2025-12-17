# Shorts Opportunity Finder – Technical Assessment

## ▶️ How to Run the Solution

### Prerequisites
- Node.js v16 or higher  
- npm

### Installation
```bash
npm install
```

### Run the Development Server
```bash
npm run dev
```

The server will start at:  
`http://localhost:3000`

---

## 🌐 Available Endpoints
- `GET /api/episodes` – List available podcast episodes  
- `GET /api/clips` – Identify and score potential short-form clips

### Example Request
```bash
GET /api/clips?episode_id=ep001&min_duration=30&max_duration=90&min_score=70&limit=10
```

### Run Tests
```bash
npm test
```

---

## 🧠 Approach and Algorithm Explanation

### High-Level Approach
The solution analyzes podcast transcripts to identify and score standalone, high-engagement clips suitable for platforms like TikTok, YouTube Shorts, and Instagram Reels.

### Processing Pipeline

#### Transcript Parsing
Each episode transcript is processed as a sequence of timestamped segments.

#### Candidate Clip Generation
- Evaluate individual transcript segments.
- Consecutive segments may be combined to form clips within the 30–90 second target range.
- Segment combining preserves complete thoughts spanning multiple transcript chunks.

#### Scoring Heuristics
Each candidate clip is scored using deterministic, rule-based heuristics inspired by short-form content best practices.

#### Ranking and Filtering
Clips are filtered by duration and minimum score, sorted by engagement score, and returned with rankings and metadata.

---

## 🧮 Scoring Algorithm
The scoring system is heuristic-based and explainable, prioritizing transparency over black-box models.

Each clip is evaluated on:

- **Duration Optimization**
  - 30–60 seconds: highest score
  - 60–90 seconds: good score
  - Outside target range: penalized

- **Content Hooks**
  - Questions, strong claims, common mistakes, curiosity-driven phrasing

- **Action Words**
  - Use of words like *mistake*, *must*, *truth*, *problem*

- **Numbers & Specificity**
  - Steps, percentages, concrete examples

- **Completeness**
  - Starts/ends at natural boundaries, self-contained

- **Emotion / Opinion**
  - Strong viewpoints or personal experience

- **Actionability**
  - Clear advice, frameworks, warnings

Each clip returns:
- A numeric score
- A structured breakdown of engagement factors
- A short reasoning string explaining why it scored well

The algorithm is deterministic, suitable for caching and iterative tuning.

---

## 🚀 What I’d Improve With More Time
- Use historical performance data to calibrate scoring weights or introduce an ML model
- Replace the in-memory cache with Redis to support horizontal scaling
- Introduce platform-specific scoring profiles (TikTok vs YouTube Shorts vs Instagram Reels)
- Build a full editor dashboard with clip playback, tagging, and approval workflows
- Migrate scoring and API layers fully to TypeScript for stricter type safety

---

## 🧩 Assumptions Made
- Transcript segments are chronologically ordered
- Timestamps are accurate and non-overlapping
- Clips should prioritize standalone clarity over perfect length
- Deterministic heuristics are preferred for explainability and testability
- Combining segments improves clip quality if it preserves a complete thought
- The system is intended as a decision-support tool, not an automatic publisher
