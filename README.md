# Shorts Opportunity Finder - Technical Assessment

## ⏱️ Time Limit: 60 minutes

## 📋 Overview

Build a system that analyzes podcast transcripts and identifies/scores potential 30-90 second clips that would make engaging short-form content for platforms like TikTok, YouTube Shorts, or Instagram Reels.

## 🎯 Your Mission

Identify segments from podcast transcripts that would make great short videos and score them based on engagement potential.

## 📁 Project Structure

```
shorts-scorer-challenge/
├── data/
│   ├── all_transcripts.json          # 3 complete podcast episodes
│   ├── historical-performance.json   # Past clip performance (reference)
│   └── scoring-criteria.md           # Detailed scoring guidelines
├── examples/
│   └── expected-output.json          # Example of good output
├── src/
│   ├── index.js                      # Express server (starter code)
│   └── utils/
│       ├── dataLoader.js            # Helper to load JSON data
│       └── scoring.js               # Scoring logic (TODO: implement)
├── tests/
│   └── scoring.test.js              # Example tests
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Or use nodemon for auto-reload during development
npm run dev

# Run tests
npm test
```

The server will start on `http://localhost:3000`

### Available Endpoints

- `GET /` - Health check and API info
- `GET /api/episodes` - List available episodes
- `GET /api/clips` - **Main endpoint** - Get scored clips (TODO: implement)

## 🎓 Requirements

### Core Functionality

Choose your track (or attempt both if time allows):

#### Backend Track:
- [x] Parse provided transcript data
- [x] Identify potential clips (30-90 seconds ideal)
- [x] Score each clip based on engagement factors
- [x] Return top 10 clips via API endpoint
- [x] Include confidence score and reasoning

#### Frontend Track:
- [ ] Display all identified clips in a clean UI
- [ ] Show scores and rankings
- [ ] Preview transcript text for each clip
- [ ] Allow sorting/filtering by score
- [ ] Highlight key engagement factors

#### Full Stack (Ambitious):
- [ ] Both backend and frontend working together

### Minimum Deliverables

1. **Working code** that runs without errors
2. **README** explaining your approach
3. **Your scoring algorithm** documented in code
4. **At least 5 scored clips** from the sample data

## 📊 What We're Evaluating

- **Algorithm Design** (40%): How you calculate engagement potential
- **Code Quality** (25%): Clean, readable, well-organized code
- **Problem Solving** (20%): How you handle edge cases
- **Communication** (15%): Can you explain your decisions?

## 💡 Engagement Factors to Consider

See `data/scoring-criteria.md` for detailed guidelines. Key factors:

### High-Value Indicators:
- **Hooks**: Questions, controversial statements, "secrets"
- **Length**: 30-90 seconds ideal (too short or long = lower score)
- **Action Words**: "never", "always", "must", "mistake"
- **Numbers**: "3 ways", "5 steps", specific statistics
- **Completeness**: Doesn't cut off mid-sentence
- **Emotion**: Strong opinions, passion, controversy
- **Actionability**: Gives specific advice or takeaways

### Low-Value Indicators:
- Introductions and outros
- Sponsor reads
- Long explanations without hooks
- Technical jargon without context
- Incomplete thoughts

## 📝 Sample Data

The `data/all_transcripts.json` file contains 3 complete podcast episodes:

- **Episode 1**: Building Systems and Leading Teams (33 min)
- **Episode 2**: Database Performance and Cloud Costs (31 min)
- **Episode 3**: MSP Best Practices and AI Automation (47 min)

Total: ~718 transcript segments to analyze

## 🔧 Implementation Tips

### Reading the Data

```javascript
const { loadTranscripts } = require('./utils/dataLoader');

// Load all episodes
const episodes = loadTranscripts();

// Each episode structure:
// {
//   episode_id: "ep001",
//   title: "Episode Title",
//   duration: 2018.0,
//   transcript: [
//     {
//       id: 1,
//       start_time: 0.0,
//       end_time: 69.0,
//       speaker: "Brian Wiles",
//       text: "Full transcript text..."
//     },
//     ...
//   ]
// }
```

### Scoring Logic Location

The main scoring logic should go in `src/utils/scoring.js`. We've provided:
- `scoreClip(segment, context)` - Score a single segment
- `identifyClips(transcript, options)` - Find and score all clips

### API Implementation

Update the `/api/clips` endpoint in `src/index.js`:

```javascript
app.get('/api/clips', (req, res) => {
  const { episode_id, limit = 10 } = req.query;
  
  // TODO: Your implementation here
  // 1. Filter episodes if episode_id provided
  // 2. Identify potential clips using your logic
  // 3. Score each clip
  // 4. Return top clips sorted by score
  
  res.json({ clips: [...] });
});
```

## 📤 Output Format

Your `/api/clips` endpoint should return JSON like:

```json
{
  "clips": [
    {
      "clip_id": "clip_001",
      "episode_id": "ep001",
      "start_time": 125.5,
      "end_time": 165.2,
      "duration": 39.7,
      "score": 87,
      "rank": 1,
      "text": "Transcript text of the clip...",
      "engagement_factors": {
        "has_question": false,
        "has_controversy": true,
        "has_numbers": false,
        "optimal_length": true,
        "completeness": true,
        "action_words": ["mistake", "obsessing"]
      },
      "reasoning": "High controversy + complete thought + optimal length"
    }
  ],
  "metadata": {
    "total_analyzed": 718,
    "clips_returned": 10
  }
}
```

See `examples/expected-output.json` for a complete example.

## 🧪 Testing

We've included a basic test file (`tests/scoring.test.js`) to get you started:

```bash
npm test
```

Feel free to add more tests for your implementation!

## 🤔 Questions to Consider

1. **Should you combine consecutive segments** to create better clips?
2. **How do you handle speaker changes** in the middle of a thought?
3. **What makes a clip "standalone"** vs. requiring too much context?
4. **How would you weight different factors** in your scoring?
5. **What edge cases** should you account for?

## 🎯 Bonus Points (If Time Allows)

- Write unit tests for your scoring logic
- Add TypeScript types
- Implement caching for processed clips
- Add query parameters (min_score, min_duration, max_duration)
- Create a simple HTML/React frontend
- Add documentation comments to your code

## ⚠️ Important Notes

- **Don't overthink it** - A working solution is better than a perfect one
- **Document your assumptions** in code comments or README
- **Time management matters** - Get something working first, then improve
- **Ask questions if needed** - Clarifications are welcome

## 📬 Submission

When done, either:

1. **Share your GitHub repo link**, or
2. **Zip your project folder** (exclude node_modules)

Include:
- Your completed code
- Updated README with:
  - How to run your solution
  - Your approach and algorithm explanation
  - What you'd improve with more time
  - Any assumptions you made

## 🛠️ Tools You Can Use

- Any Node.js packages (just update package.json)
- AI tools (ChatGPT, Claude, GitHub Copilot, etc.)
- Internet for documentation and research
- Any code editor or IDE

## 📞 Need Help?

If you have questions about:
- The data format
- Requirements clarity
- Technical setup issues

Feel free to ask! We want you to succeed.

---

## 🎬 Ready? Start Building!

1. Read through `data/scoring-criteria.md`
2. Explore the sample data in `data/all_transcripts.json`
3. Implement your scoring logic in `src/utils/scoring.js`
4. Update the API endpoint in `src/index.js`
5. Test your solution
6. Document your approach

**Good luck! 🚀**
