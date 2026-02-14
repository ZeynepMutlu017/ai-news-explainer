# AI-Powered News Video Generator

An automated pipeline that fetches real-time tech news, analyzes it with Google Gemini AI, and renders a professional 70-second video using Remotion.

## Demo

> Every run generates a unique video based on today's top Hacker News stories.

**Sample Output:**
- Top 3 tech stories fetched in real-time
- AI-scored across 4 metrics (Relevance, Educational, Viral, Trending)
- 70-second MP4 with smooth animations and background music

---

## Features

- **Real-time Data** – Fetches top stories from Hacker News API
- **AI Analysis** – Google Gemini AI scores and analyzes each story
- **Batch Scoring** – All stories scored in a single API call (20x efficiency)
- **Automated Rendering** – Remotion renders a full MP4 video automatically
- **14 Dynamic Scenes** – Intro, Story, AI Analysis, Key Topics, Why It Matters, Outro
- **Background Music** – Fade in/out audio with royalty-free music

---

## Tech Stack

- **Remotion** – Video rendering (TypeScript/React)
- **Google Gemini AI** – News scoring and analysis  
- **Hacker News API** – Real-time tech news
- **TypeScript** – Type-safe development
- **Node.js** – Runtime environment

---

## Architecture
```
Hacker News API
      ↓
  getTopStories() → Fetch 10 stories
      ↓
  batchScoreNews() → Single Gemini API call scores all stories
      ↓
  Top 3 selected by overallScore
      ↓
  Remotion renders 14-scene video
      ↓
  out/news-video.mp4
```

---

## AI Scoring Metrics

Each story is scored on a scale of 0-10:

- **Relevance (30%)** – Importance for tech professionals
- **Educational Value (25%)** – Learning potential
- **Trending Score (25%)** – Topic timeliness
- **Viral Potential (20%)** – Social sharing likelihood

---

## Video Structure

14 scenes, ~70 seconds total:

- **Intro (5s)** – "Today's Top 3 Tech Stories"
- **Story Title (5s)** – Headline + Hacker News score
- **AI Analysis (5s)** – Overall score + 4 metric bars
- **Key Topics (5s)** – Topic tags
- **Why It Matters (7s)** – AI reasoning
- *(repeated × 3 for each story)*
- **Outro (5s)** – "Stay Curious"

## Author

**Zeynep Mutlu**
- GitHub: [@ZeynepMutlu017](https://github.com/ZeynepMutlu017)

---

## License

© 2026 Zeynep Mutlu. All Rights Reserved.

This project is for portfolio purposes only. 
Unauthorized use, copying, or distribution is prohibited.