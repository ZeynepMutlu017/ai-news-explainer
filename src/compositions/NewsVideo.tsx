import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {NewsScores} from '../services/gemini-scoring';
import {Audio, staticFile} from 'remotion';

interface StoryProps {
  title: string;
  score: number;
  geminiScores: NewsScores;
}

interface NewsVideoProps {
  stories: StoryProps[];
  [key: string]: unknown;
}


const S = 150; 
const SW = 210;

export const NewsVideo: React.FC<NewsVideoProps> = ({stories}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const getScene = () => {
  if (frame < S) return <IntroScene frame={frame} fps={fps} />;
  if (frame < S * 2) return <TitleScene frame={frame} fps={fps} story={stories[0]} num={1} start={S * 1} />;
  if (frame < S * 3) return <AnalysisScene frame={frame} fps={fps} story={stories[0]} num={1} start={S * 2} />;
  if (frame < S * 4) return <TopicsScene frame={frame} fps={fps} story={stories[0]} num={1} start={S * 3} />;
  if (frame < S * 4 + SW) return <WhyScene frame={frame} fps={fps} story={stories[0]} num={1} start={S * 4} />;
  if (frame < S * 5 + SW) return <TitleScene frame={frame} fps={fps} story={stories[1]} num={2} start={S * 4 + SW} />;
  if (frame < S * 6 + SW) return <AnalysisScene frame={frame} fps={fps} story={stories[1]} num={2} start={S * 5 + SW} />;
  if (frame < S * 7 + SW) return <TopicsScene frame={frame} fps={fps} story={stories[1]} num={2} start={S * 6 + SW} />;
  if (frame < S * 7 + SW * 2) return <WhyScene frame={frame} fps={fps} story={stories[1]} num={2} start={S * 7 + SW} />;
  if (frame < S * 8 + SW * 2) return <TitleScene frame={frame} fps={fps} story={stories[2]} num={3} start={S * 7 + SW * 2} />;
  if (frame < S * 9 + SW * 2) return <AnalysisScene frame={frame} fps={fps} story={stories[2]} num={3} start={S * 8 + SW * 2} />;
  if (frame < S * 10 + SW * 2) return <TopicsScene frame={frame} fps={fps} story={stories[2]} num={3} start={S * 9 + SW * 2} />;
  if (frame < S * 10 + SW * 3) return <WhyScene frame={frame} fps={fps} story={stories[2]} num={3} start={S * 10 + SW * 2} />;
  return <OutroScene frame={frame} fps={fps} start={S * 10 + SW * 3} />;
};

  return (
    <>
      <Audio
        src={staticFile('background-music.mp3')}
        volume={(f) => {
          if (f < 60) return interpolate(f, [0, 60], [0, 0.3]);
          if (f > 2040) return interpolate(f, [2040, 2100], [0.3, 0]);
          return 0.3;
        }}
        loop
      />
      {getScene()}
    </>
  );
};
 


const bg = {
  background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
  display: 'flex' as const,
  flexDirection: 'column' as const,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  fontFamily: 'Inter, Arial, sans-serif',
  padding: '80px',
};

const storyColors = ['#3B82F6', '#10B981', '#F59E0B'];


const IntroScene: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const badgeSpring = spring({frame, fps, from: 0, to: 1, config: {damping: 12, stiffness: 80}});
  const titleSpring = spring({frame: frame - 15, fps, from: 0, to: 1, config: {damping: 14, stiffness: 60}});
  const lineWidth = interpolate(frame, [20, 80], [0, 700], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={bg}>
      <div style={{
        opacity: badgeSpring,
        transform: `translateY(${interpolate(badgeSpring, [0, 1], [30, 0])}px)`,
        background: 'rgba(59,130,246,0.15)',
        border: '1px solid rgba(59,130,246,0.4)',
        borderRadius: '50px',
        padding: '10px 28px',
        marginBottom: '32px',
      }}>
        <span style={{color: '#60A5FA', fontSize: '28px', fontWeight: 600}}>
          AI-Powered News
        </span>
      </div>

      <div style={{
        opacity: titleSpring,
        transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
        fontSize: '88px',
        fontWeight: 800,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 1.1,
        marginBottom: '24px',
      }}>
        Today's Top 3
        <span style={{color: '#3B82F6', display: 'block'}}>Tech Stories</span>
      </div>

      <div style={{
        width: lineWidth,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)',
        marginBottom: '24px',
      }} />

      <div style={{
        opacity: titleSpring,
        fontSize: '24px',
        color: '#94A3B8',
      }}>
        Scored and Analyzed by Gemini AI
      </div>
    </AbsoluteFill>
  );
};

const TitleScene: React.FC<{frame: number; fps: number; story: StoryProps; num: number; start: number}> = ({
  frame, fps, story, num, start
}) => {
  const lf = frame - start;
  const color = storyColors[num - 1];
  const badgeSpring = spring({frame: lf, fps, from: 0, to: 1, config: {damping: 12, stiffness: 80}});
  const titleSpring = spring({frame: lf - 15, fps, from: 0, to: 1, config: {damping: 14, stiffness: 55}});
  const scoreSpring = spring({frame: lf - 35, fps, from: 0, to: 1, config: {damping: 16, stiffness: 60}});

  return (
    <AbsoluteFill style={bg}>
      <div style={{
        opacity: badgeSpring,
        transform: `translateY(${interpolate(badgeSpring, [0, 1], [30, 0])}px)`,
        background: `rgba(${num === 1 ? '59,130,246' : num === 2 ? '16,185,129' : '245,158,11'}, 0.15)`,
        border: `1px solid ${color}66`,
        borderRadius: '50px',
        padding: '10px 28px',
        marginBottom: '40px',
      }}>
        <span style={{color, fontSize: '28px', fontWeight: 600}}>
          #{num} Top Story
        </span>
      </div>

      <div style={{
        opacity: titleSpring,
        transform: `translateY(${interpolate(titleSpring, [0, 1], [50, 0])}px)`,
        fontSize: '62px',
        fontWeight: 700,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 1.35,
        maxWidth: '1400px',
        marginBottom: '40px',
      }}>
        {story.title}
      </div>

      <div style={{
        opacity: scoreSpring,
        transform: `scale(${interpolate(scoreSpring, [0, 1], [0.9, 1])})`,
        background: 'rgba(245,158,11,0.12)',
        border: '1px solid rgba(245,158,11,0.4)',
        borderRadius: '16px',
        padding: '18px 44px',
        textAlign: 'center',
      }}>
        <div style={{color: '#FCD34D', fontSize: '40px', fontWeight: 800}}>▲ {story.score}</div>
        <div style={{color: '#94A3B8', fontSize: '18px', marginTop: '4px'}}>Hacker News Points</div>
      </div>
    </AbsoluteFill>
  );
};

const AnalysisScene: React.FC<{frame: number; fps: number; story: StoryProps; num: number; start: number}> = ({
  frame, fps, story, num, start
}) => {
  const lf = frame - start;
  const titleSpring = spring({frame: lf, fps, from: 0, to: 1, config: {damping: 14, stiffness: 60}});
  const overallSpring = spring({frame: lf - 15, fps, from: 0, to: 1, config: {damping: 12, stiffness: 50}});

  const scoreItems = [
    {label: 'Relevance', value: story.geminiScores.relevanceScore, color: '#3B82F6'},
    {label: 'Educational', value: story.geminiScores.educationalValue, color: '#10B981'},
    {label: 'Viral', value: story.geminiScores.viralPotential, color: '#F59E0B'},
    {label: 'Trending', value: story.geminiScores.trendingScore, color: '#EF4444'},
  ];

  return (
    <AbsoluteFill style={bg}>
      <div style={{
        opacity: titleSpring,
        transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
        fontSize: '40px',
        fontWeight: 700,
        color: '#FFFFFF',
        marginBottom: '8px',
      }}>
        AI Analysis #{num}
      </div>

      <div style={{
        opacity: overallSpring,
        transform: `scale(${interpolate(overallSpring, [0, 1], [0.7, 1])})`,
        fontSize: '88px',
        fontWeight: 800,
        color: '#3B82F6',
        marginBottom: '36px',
      }}>
        {story.geminiScores.overallScore.toFixed(1)}
        <span style={{fontSize: '30px', color: '#94A3B8'}}>/10</span>
      </div>

      <div style={{display: 'flex', gap: '28px', width: '100%', maxWidth: '1200px'}}>
        {scoreItems.map((item, i) => {
          const barSpring = spring({
            frame: lf - 25 - i * 10,
            fps,
            from: 0,
            to: item.value / 10,
            config: {damping: 18, stiffness: 50},
          });
          return (
            <div key={item.label} style={{flex: 1, textAlign: 'center'}}>
              <div style={{color: '#94A3B8', fontSize: '24px', marginBottom: '10px'}}>{item.label}</div>
              <div style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '10px',
                height: '180px',
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '100%',
                  height: `${barSpring * 100}%`,
                  background: `linear-gradient(180deg, ${item.color}CC, ${item.color})`,
                  borderRadius: '8px',
                }} />
              </div>
              <div style={{color: '#FFFFFF', fontSize: '24px', fontWeight: 700, marginTop: '8px'}}>
                {item.value.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const TopicsScene: React.FC<{frame: number; fps: number; story: StoryProps; num: number; start: number}> = ({
  frame, fps, story, num, start
}) => {
  const lf = frame - start;
  const titleSpring = spring({frame: lf, fps, from: 0, to: 1, config: {damping: 14, stiffness: 60}});

  return (
    <AbsoluteFill style={bg}>
      <div style={{
        opacity: titleSpring,
        transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
        fontSize: '48px',
        fontWeight: 700,
        color: '#FFFFFF',
        marginBottom: '48px',
      }}>
        Key Topics #{num}
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        maxWidth: '1200px',
      }}>
        {story.geminiScores.keyTopics.map((topic, i) => {
          const topicSpring = spring({
            frame: lf - 15 - i * 12,
            fps,
            from: 0,
            to: 1,
            config: {damping: 14, stiffness: 60},
          });
          return (
            <div key={topic} style={{
              opacity: topicSpring,
              transform: `scale(${interpolate(topicSpring, [0, 1], [0.8, 1])})`,
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.4)',
              borderRadius: '50px',
              padding: '14px 36px',
            }}>
              <span style={{color: '#60A5FA', fontSize: '28px', fontWeight: 600}}>
                {topic}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const WhyScene: React.FC<{frame: number; fps: number; story: StoryProps; num: number; start: number}> = ({
  frame, fps, story, num, start
}) => {
  const lf = frame - start;
  const titleSpring = spring({frame: lf, fps, from: 0, to: 1, config: {damping: 14, stiffness: 60}});
  const textOpacity = interpolate(lf, [20, 50], [0, 1], {extrapolateRight: 'clamp'});
  const textY = interpolate(lf, [20, 50], [20, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={bg}>
      <div style={{
        opacity: titleSpring,
        transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
        fontSize: '48px',
        fontWeight: 700,
        color: '#FFFFFF',
        marginBottom: '48px',
      }}>
        Why It Matters #{num}
      </div>

      <div style={{
        opacity: textOpacity,
        transform: `translateY(${textY}px)`,
        fontSize: '36px',
        color: '#CBD5E1',
        textAlign: 'center',
        lineHeight: 1.7,
        maxWidth: '1300px',
        fontStyle: 'italic',
      }}>
        "{story.geminiScores.reasoning}"
      </div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC<{frame: number; fps: number; start: number}> = ({frame, fps, start}) => {
  const lf = frame - start;
  const titleSpring = spring({frame: lf, fps, from: 0, to: 1, config: {damping: 14, stiffness: 60}});
  const subSpring = spring({frame: lf - 20, fps, from: 0, to: 1, config: {damping: 16, stiffness: 55}});
  const fadeOut = interpolate(lf, [80, 120], [1, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{...bg, opacity: fadeOut}}>
      <div style={{
        opacity: titleSpring,
        transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
        fontSize: '80px',
        fontWeight: 800,
        color: '#FFFFFF',
        marginBottom: '20px',
      }}>
        Stay Curious. 
      </div>

      <div style={{
        opacity: subSpring,
        transform: `translateY(${interpolate(subSpring, [0, 1], [20, 0])}px)`,
        fontSize: '24px',
        color: '#94A3B8',
        marginBottom: '40px',
      }}>
        Powered by Remotion + Gemini AI + Hacker News
      </div>

      <div style={{
        opacity: subSpring,
        background: 'rgba(59,130,246,0.15)',
        border: '1px solid rgba(59,130,246,0.4)',
        borderRadius: '12px',
        padding: '16px 36px',
      }}>
        <span style={{color: '#60A5FA', fontSize: '22px', fontWeight: 600}}>
          https://github.com/ZeynepMutlu017
        </span>
      </div>
    </AbsoluteFill>
  );
};