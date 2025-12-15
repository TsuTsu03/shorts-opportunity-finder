# Technical Requirements

## What You Can Use

### Programming Environment
- **Language**: JavaScript (Node.js v16+)
- **Frameworks**: Any you want (Express is provided)
- **Libraries**: Any npm packages (just update package.json)
- **Tools**: AI assistants, documentation, Stack Overflow, etc.

### Provided
- Sample transcript data (3 podcast episodes, ~718 segments)
- Historical performance data (optional reference)
- Scoring criteria guidelines
- Basic Express server starter code
- Data loading utilities
- Example test file

## Constraints

### Time
- **60 minutes total** from start to finish
- Manage your time wisely
- Working solution > perfect solution

### Data
- **Must use** the provided transcript files
- Can reference historical performance data
- Can add your own data structures

### Code
- **Must be runnable** on a standard Node.js environment
- Should include instructions to run
- Should not require external services (APIs, databases, etc.)

## Output Format Requirements

Your `/api/clips` endpoint should return:

### Required Fields
```json
{
  "clips": [
    {
      "clip_id": "string",           // Required: Unique identifier
      "episode_id": "string",         // Required: Source episode
      "start_time": number,           // Required: Start in seconds
      "end_time": number,             // Required: End in seconds
      "duration": number,             // Required: Length in seconds
      "score": number,                // Required: 0-100
      "text": "string"                // Required: Transcript text
    }
  ]
}
```

### Optional But Recommended
```json
{
  "clips": [...],
  "metadata": {
    "total_analyzed": number,       // Total segments analyzed
    "clips_returned": number,       // Number of clips in response
    "processing_time_ms": number    // How long it took
  },
  "query": {                        // Echo back query parameters
    "episode_id": "string",
    "limit": number
  }
}
```

### Enhanced (Bonus Points)
```json
{
  "clips": [
    {
      // ... required fields ...
      "rank": number,                 // Position in ranking
      "speaker": "string",            // Who's speaking
      "engagement_factors": {         // Why it scored high
        "has_question": boolean,
        "has_controversy": boolean,
        "has_numbers": boolean,
        "optimal_length": boolean,
        "completeness": boolean,
        "action_words": ["string"]
      },
      "reasoning": "string"           // Human-readable explanation
    }
  ]
}
```

## API Endpoints

### Provided (Working)
- `GET /` - Health check
- `GET /api/episodes` - List available episodes

### To Implement
- `GET /api/clips` - Main endpoint for clip scoring

#### Query Parameters (Optional)
- `episode_id`: Filter by specific episode (e.g., "ep001")
- `limit`: Number of results (default: 10)
- `min_duration`: Minimum clip length in seconds (default: 30)
- `max_duration`: Maximum clip length in seconds (default: 90)
- `min_score`: Minimum score threshold (default: 0)

#### Example Requests
```bash
# Get top 10 clips from all episodes
GET /api/clips

# Get top 5 clips from episode 1
GET /api/clips?episode_id=ep001&limit=5

# Get clips between 40-60 seconds
GET /api/clips?min_duration=40&max_duration=60

# Get only high-scoring clips
GET /api/clips?min_score=70
```

## Success Criteria

### Minimum Viable Solution (Must Have)
- ✅ Code runs without errors
- ✅ Returns at least 5 scored clips
- ✅ Scores are reasonable (not all 0 or 100)
- ✅ Clips are within reasonable duration (20-120 seconds)
- ✅ Basic documentation of approach

### Good Solution (Should Have)
- ✅ Scoring logic considers multiple factors
- ✅ Clean, readable code with comments
- ✅ Handles edge cases (empty data, invalid queries)
- ✅ Returns clips sorted by score
- ✅ Provides reasoning for scores

### Excellent Solution (Nice to Have)
- ✅ Sophisticated scoring algorithm
- ✅ Unit tests for scoring logic
- ✅ TypeScript or JSDoc types
- ✅ Performance considerations
- ✅ Comprehensive documentation
- ✅ Caching or optimization

## Evaluation Rubric

### Algorithm Design (40 points)
- **10 pts**: Identifies clips in correct duration range
- **15 pts**: Scoring logic is reasonable and explainable
- **10 pts**: Handles edge cases appropriately
- **5 pts**: Uses multiple engagement factors effectively

### Code Quality (25 points)
- **10 pts**: Clean, readable code structure
- **5 pts**: Proper error handling
- **5 pts**: Good file/function organization
- **5 pts**: Helpful comments and documentation

### Functionality (20 points)
- **10 pts**: Code runs without errors
- **5 pts**: Produces meaningful output
- **5 pts**: Meets minimum requirements

### Problem Solving (15 points)
- **5 pts**: Creative approach to scoring
- **5 pts**: Considers real-world application
- **5 pts**: Can explain trade-offs and decisions

### Bonus Points (up to +10)
- **+3 pts**: TypeScript or comprehensive JSDoc types
- **+3 pts**: Writes meaningful tests
- **+2 pts**: Performance optimizations
- **+2 pts**: Frontend implementation (if applicable)

### Deductions
- **-20 pts**: Code doesn't run
- **-10 pts**: Missing README or documentation
- **-15 pts**: Ignores core requirements
- **-5 pts**: Poor error handling causing crashes

## Non-Requirements (Don't Waste Time)

You do NOT need to:
- Build actual video clips
- Implement video processing
- Create a database
- Deploy to production
- Write extensive documentation
- Make it pixel-perfect beautiful
- Handle authentication
- Build a complex frontend (unless that's your track)

## Tools & Resources

### Allowed
- ✅ Any npm packages
- ✅ AI coding assistants (ChatGPT, Claude, Copilot)
- ✅ Online documentation
- ✅ Stack Overflow, GitHub, etc.
- ✅ Your own code editor/IDE

### Not Needed
- ❌ External APIs
- ❌ Database systems
- ❌ Cloud services
- ❌ Video processing libraries

## Tips for Success

1. **Read the scoring criteria** in `data/scoring-criteria.md` first
2. **Start simple**: Get something working, then improve
3. **Test as you go**: Don't wait until the end
4. **Document assumptions**: Add comments explaining your choices
5. **Time management**: 15 min planning, 35 min coding, 10 min testing/docs
6. **Don't overthink**: A working 70% solution beats a broken 95% solution

## Questions & Clarifications

If anything is unclear:
- Make a reasonable assumption
- Document it in your code or README
- Proceed with your implementation

We're evaluating your problem-solving, not trick-question interpretation!

---

**Remember**: We want to see how you think and code, not just a perfect answer. Show your work! 🚀
