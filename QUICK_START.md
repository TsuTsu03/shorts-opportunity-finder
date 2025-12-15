# Quick Start Guide - Running the Assessment

## For Assessment Administrators

### Before the Assessment

1. **Distribute the starter kit** to candidates:
   - Send them the entire `shorts-scorer-challenge` folder
   - Or provide a GitHub repo link
   - Or provide a .zip file (exclude node_modules)

2. **Verify they have Node.js installed**:
   ```bash
   node --version  # Should be v16 or higher
   ```

3. **Set expectations**:
   - 60 minutes total
   - They can use any tools (AI assistants, docs, etc.)
   - Focus is on problem-solving, not memorization

### During the Assessment

**Option A: Self-timed (Remote)**
- Candidate starts timer when they open the folder
- They submit when done or time expires
- Honor system for timing

**Option B: Proctored (In-person or Video)**
- You start the timer
- Candidate can ask clarifying questions
- You observe their process (optional but insightful)

**Option C: Take-home**
- Give them the folder with a deadline
- They complete on their own time
- Submit via email or GitHub

### What to Look For (If Observing)

✅ **Good Signs:**
- Reads scoring-criteria.md before coding
- Tests their code as they go
- Asks clarifying questions
- Manages time well (planning → coding → testing)
- Writes comments explaining decisions

⚠️ **Yellow Flags:**
- Jumps straight to coding without reading requirements
- Spends too long perfecting one piece
- No error handling
- Doesn't test until the end

🚩 **Red Flags:**
- Can't explain AI-generated code
- No understanding of their own algorithm
- Ignores requirements completely
- Code doesn't run

## For Candidates

### Setup (5 minutes)

1. **Extract/clone the starter kit**
2. **Install dependencies**:
   ```bash
   cd shorts-scorer-challenge
   npm install
   ```

3. **Verify everything works**:
   ```bash
   npm start
   # Should see: "Server running on http://localhost:3000"
   # Press Ctrl+C to stop
   ```

4. **Read the requirements**:
   - `README.md` - Main instructions
   - `data/scoring-criteria.md` - What makes a good clip
   - `examples/expected-output.json` - What your output should look like

### Development (45 minutes)

1. **Explore the data** (5 min):
   ```bash
   # Look at the transcript structure
   cat data/all_transcripts.json | head -100
   ```

2. **Plan your approach** (5 min):
   - What factors will you score?
   - How will you weight them?
   - Will you combine segments or score individually?

3. **Implement your solution** (30 min):
   - Edit `src/utils/scoring.js` - Main scoring logic
   - Edit `src/index.js` - API endpoint implementation
   - Test frequently: `npm start` and visit http://localhost:3000

4. **Test your code** (5 min):
   ```bash
   # Run tests
   npm test
   
   # Test API manually
   curl http://localhost:3000/api/clips | json_pp
   ```

### Testing Your Solution

```bash
# Start the server
npm start

# In another terminal, test the endpoints:

# Get all episodes
curl http://localhost:3000/api/episodes

# Get top clips (your implementation)
curl http://localhost:3000/api/clips

# Get clips from specific episode
curl http://localhost:3000/api/clips?episode_id=ep001&limit=5

# Get clips in specific duration range
curl "http://localhost:3000/api/clips?min_duration=40&max_duration=60"
```

### Submission (10 minutes)

1. **Update README** with:
   - Brief explanation of your algorithm
   - How to run your solution
   - What you'd improve with more time

2. **Clean up**:
   ```bash
   # Remove node_modules before zipping
   rm -rf node_modules
   ```

3. **Submit**:
   - Zip the folder, or
   - Push to GitHub and share link

## Troubleshooting

### "Module not found"
```bash
# Make sure you installed dependencies
npm install
```

### "Port 3000 already in use"
```bash
# Kill the existing process or change the port
export PORT=3001
npm start
```

### "Cannot find module './utils/dataLoader'"
```bash
# Make sure you're in the project root directory
cd shorts-scorer-challenge
npm start
```

### Tests failing
```bash
# Make sure Jest is installed
npm install
npm test
```

## Time Management Tips

- **0-5 min**: Read requirements, explore data
- **5-10 min**: Plan your approach
- **10-40 min**: Code your solution
- **40-50 min**: Test and debug
- **50-60 min**: Document and submit

## What Success Looks Like

**Minimum Success:**
- Code runs without errors ✅
- Returns at least 5 scored clips ✅
- Scores are between 0-100 and make sense ✅
- Basic README explanation ✅

**Good Success:**
- Considers multiple engagement factors ✅
- Clean, commented code ✅
- Handles edge cases ✅
- Returns clips sorted by score ✅
- Provides reasoning for scores ✅

**Excellent Success:**
- Sophisticated scoring algorithm ✅
- Unit tests written ✅
- Performance optimizations ✅
- Comprehensive documentation ✅
- TypeScript types or JSDoc ✅

## Need Help?

**Common Questions:**

Q: "Can I use additional npm packages?"
A: Yes! Just add them to package.json

Q: "Can I use AI tools like ChatGPT?"
A: Absolutely! We want to see how you work in real life.

Q: "What if I don't finish in 60 minutes?"
A: Submit what you have. Partial solutions with good explanations are valuable.

Q: "Should I focus on backend or frontend?"
A: Choose the track that matches your strengths. Backend is the primary focus.

Q: "Can I change the project structure?"
A: Yes! It's a starter kit, not a strict requirement.

---

**Good luck! 🚀**
