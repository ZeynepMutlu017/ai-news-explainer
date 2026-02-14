import 'dotenv/config';
import {getTopStories} from './services/hackernews';
import {batchScoreNews} from './services/gemini-scoring';
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'path';

async function generate() {
  const stories = await getTopStories(10);

  console.log('Batch scoring with Gemini AI...');
  const scoredStories = await batchScoreNews(stories);
  
  const top3 = scoredStories
    .sort((a, b) => b.scores.overallScore - a.scores.overallScore)
    .slice(0, 3);

  console.log('\nTop 3 Stories:');
top3.forEach((s, i) => {
  console.log(`${i + 1}. ${s.title} (${s.scores.overallScore}/10)`);
});


const inputProps = {
  stories: top3.map(s => ({
    title: s.title,
    score: s.score,
    geminiScores: s.scores,
  }))
};

  console.log('Bundling video...');
  const serveUrl = await bundle({
    entryPoint: path.resolve('./src/index.ts'),
  });

  console.log('Selecting composition...');
  const composition = await selectComposition({
    serveUrl,
    id: 'NewsVideo',
    inputProps,
  });

  console.log('Rendering video...');
  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    outputLocation: 'out/news-video.mp4',
    inputProps,
  });

  console.log('\nVideo saved to out/news-video.mp4');
}

generate();