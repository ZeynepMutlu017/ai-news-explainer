import React from 'react';
import {Composition} from 'remotion';
import {NewsVideo} from './compositions/NewsVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NewsVideo"
        component={NewsVideo as React.ComponentType<Record<string, unknown>>}
        durationInFrames={2280}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          stories: [
            {
              title: 'Loading story 1...',
              score: 0,
              geminiScores: {
                overallScore: 0, relevanceScore: 0, educationalValue: 0,
                viralPotential: 0, trendingScore: 0, technicalDepth: 0,
                difficultyLevel: 'beginner' as const, targetAudience: [],
                keyTopics: [], recommendedFormat: 'breakdown' as const, reasoning: ''
              }
            },
            {
              title: 'Loading story 2...',
              score: 0,
              geminiScores: {
                overallScore: 0, relevanceScore: 0, educationalValue: 0,
                viralPotential: 0, trendingScore: 0, technicalDepth: 0,
                difficultyLevel: 'beginner' as const, targetAudience: [],
                keyTopics: [], recommendedFormat: 'breakdown' as const, reasoning: ''
              }
            },
            {
              title: 'Loading story 3...',
              score: 0,
              geminiScores: {
                overallScore: 0, relevanceScore: 0, educationalValue: 0,
                viralPotential: 0, trendingScore: 0, technicalDepth: 0,
                difficultyLevel: 'beginner' as const, targetAudience: [],
                keyTopics: [], recommendedFormat: 'breakdown' as const, reasoning: ''
              }
            }
          ]
        }}
      />
    </>
  );
};