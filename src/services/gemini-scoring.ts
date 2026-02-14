import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });



export interface NewsScores {
  relevanceScore: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  viralPotential: number;
  educationalValue: number;
  trendingScore: number;
  technicalDepth: number;
  overallScore: number;
  targetAudience: string[];
  keyTopics: string[];
  recommendedFormat: 'explainer' | 'breakdown' | 'quicktip' | 'deep-dive';
  reasoning: string;
}

export interface NewsItem {
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
}

export async function scoreNews(newsItem: NewsItem): Promise<NewsScores> {
  try {
    const prompt = `You are a tech news analyst. Analyze this tech news and provide ONLY a JSON response with scores.

News Item:
Title: ${newsItem.title}
Upvotes: ${newsItem.score}
Comments: ${newsItem.descendants || 0}

Provide scores (0-10) for:
1. relevanceScore: How important/relevant is this news for tech professionals?
2. viralPotential: How likely is this to be shared on social media?
3. educationalValue: How much can someone learn from this?
4. trendingScore: How hot/timely is this topic right now?
5. technicalDepth: How technical/complex is the topic?

Also provide:
- difficultyLevel: "beginner", "intermediate", or "advanced"
- targetAudience: Array of audience types (for example, ["developers", "entrepreneurs"])
- keyTopics: Array of 2-4 key topics (for example, ["AI", "automation"])
- recommendedFormat: "explainer", "breakdown", "quicktip", or "deep-dive"
- reasoning: Brief explanation of your scoring (2 sentences max)

Calculate overallScore as weighted average:
overallScore = (relevanceScore * 0.3) + (educationalValue * 0.25) + (trendingScore * 0.25) + (viralPotential * 0.2)

IMPORTANT: Return ONLY valid JSON, no markdown, no explanation, no preamble.

Example format:
{
  "relevanceScore": 8.5,
  "difficultyLevel": "intermediate",
  "viralPotential": 7.2,
  "educationalValue": 8.0,
  "trendingScore": 9.0,
  "technicalDepth": 6.5,
  "overallScore": 8.2,
  "targetAudience": ["developers", "AI lovers"],
  "keyTopics": ["AI", "automation", "productivity"],
  "recommendedFormat": "breakdown",
  "reasoning": "High trending score due to AI topic relevance. Strong educational value with practical implications."
}`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = response.candidates[0].content.parts[0].text;
    const cleanResponse = text.replace(/```json\n?|\n?```/g, '').trim();
    const scores: NewsScores = JSON.parse(cleanResponse);
    
    console.log('Using Gemini model: gemini-2.5-flash-lite');
    return scores;
  } catch (error) {
    console.error('Gemini Scoring Error:', error);
    return {
      relevanceScore: Math.min(newsItem.score / 100, 10),
      difficultyLevel: 'intermediate',
      viralPotential: Math.min((newsItem.descendants || 0) / 50, 10),
      educationalValue: 5,
      trendingScore: Math.min(newsItem.score / 100, 10),
      technicalDepth: 5,
      overallScore: Math.min(newsItem.score / 100, 10),
      targetAudience: ['developers'],
      keyTopics: ['technology'],
      recommendedFormat: 'breakdown',
      reasoning: 'Fallback scoring based on engagement metrics'
    };
  }
}

export async function batchScoreNews(newsItems: NewsItem[]): Promise<(NewsItem & { scores: NewsScores })[]> {
  try {
    const prompt = `You are a tech news analyst. Analyze these ${newsItems.length} tech news items and provide ONLY a JSON array with scores for each.

News Items:
${newsItems.map((item, i) => `
${i + 1}. Title: ${item.title}
   Upvotes: ${item.score}
   Comments: ${item.descendants || 0}
`).join('\n')}

For each news item, provide scores (0-10) for:
- relevanceScore, viralPotential, educationalValue, trendingScore, technicalDepth
- difficultyLevel: "beginner" | "intermediate" | "advanced"
- targetAudience: array of audience types
- keyTopics: array of 2-4 topics
- recommendedFormat: "explainer" | "breakdown" | "quicktip" | "deep-dive"
- reasoning: 2 sentences max
- overallScore: weighted average

Return ONLY a JSON array, no markdown:
[
  { "newsIndex": 0, "relevanceScore": 8.5, ... },
  { "newsIndex": 1, "relevanceScore": 7.2, ... }
]`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = response.candidates[0].content.parts[0].text;
    const clean = text.replace(/```json\n?|\n?```/g, '').trim();
    const scoresArray: (NewsScores & { newsIndex: number })[] = JSON.parse(clean);
    
    return newsItems.map((item, i) => ({
      ...item,
      scores: scoresArray[i]
    }));
  } catch {
    console.error('Batch scoring failed, falling back to individual scoring');
    return Promise.all(
      newsItems.map(async (item) => ({
        ...item,
        scores: await scoreNews(item)
      }))
    );
  }
}