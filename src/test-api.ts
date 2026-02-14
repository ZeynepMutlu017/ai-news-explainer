import 'dotenv/config';
import { getTodaysTopStory } from "./services/hackernews";
import { scoreNews } from "./services/gemini-scoring";

async function test() {
    console.log('API Test Starts\n');
    console.log('Hacker News API');
    const story = await getTodaysTopStory();
    console.log('Success');
    console.log(` Title: ${story.title}`);
    console.log(` Score: ${story.score}`);

    console.log('Gemini Scoring...');
    const scores = await scoreNews(story);
    console.log('Success');
    console.log(` Overall Score: ${scores.overallScore}/10`);
    console.log(` Format: ${scores.recommendedFormat}`);
    console.log(` Reasoning: ${scores.reasoning}\n`);

    console.log('Key Topics: ' + JSON.stringify(scores.keyTopics));
    console.log('Target Audience: ' + JSON.stringify(scores.targetAudience));
    console.log('Difficulty: ' + scores.difficultyLevel);
    console.log('Format: ' + scores.recommendedFormat);

    console.log('Success');
    
}

test();