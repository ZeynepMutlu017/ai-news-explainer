const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';

export interface HNStory {
    id: number;
    title: string;
    url?: string;
    score: number;
    by: string;
    time: number;
    descendants?: number;
    type: string;
}

async function getTopStoryIds(): Promise<number[]>{
    const response = await fetch(`${HN_API_BASE}/topstories.json`);
    return response.json();
}

async function getStory(id: number): Promise<HNStory> {
    const response = await fetch(`${HN_API_BASE}/item/${id}.json`);
    return response.json();
}

export async function getTopStories(count: number=10): Promise<HNStory[]> {
    try{
        console.log(`Fetching top story from Hacker News...`);

        const storyIds = await getTopStoryIds();
        const topIds = storyIds.slice(0, count);
        const stories = await Promise.all(
            topIds.map(id => getStory(id))
        );

        return stories.filter(story => story.url && story.type === 'story');
    } catch (error) {
        console.error('Hacker News API Error:', error);

        return [{
            id: 1,
            title: 'AI and Software Development',
            url: 'https://news.ycombinator.com',
            score: 342,
            by: 'Zeynep',
            time: Date.now() / 1000,
            descendants: 87,
            type: 'story'
        }];
    }
    
}

export async function getTodaysTopStory(): Promise<HNStory> {
    const stories = await getTopStories(1);
    return stories[0];
    
}

