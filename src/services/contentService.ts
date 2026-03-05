import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface Story {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  pdf_url?: string;
  category: string;
  created_at?: string;
}

export interface Song {
  id: string;
  title: string;
  description: string;
  audio_url: string;
  image_url: string;
  category: string;
}

export interface FoodProgram {
  id: string;
  age_group: string;
  title: string;
  framework: string;
  image_url: string;
  pdf_url?: string;
}

// Mock Data for Initial State
const MOCK_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Little Lion Story',
    description: 'A whimsical tale of a small lion cub under a starry night sky.',
    content: 'Once upon a time, in the heart of the savanna...',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/260966a3-13c9-4a7f-8a53-f1376c6498f8/the-little-lion-story-bfb44423-1772694277772.webp',
    category: 'Bedtime',
  },
  {
    id: '2',
    title: 'Playtime Adventures',
    description: 'Cute animated baby elephant playing with bubbles.',
    content: 'Ellie the Elephant loved bubbles more than anything...',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/260966a3-13c9-4a7f-8a53-f1376c6498f8/playtime-adventures-story-139455da-1772694276765.webp',
    category: 'Playtime',
  }
];

const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Lullabies for Little Ones',
    description: 'Gentle melodies to help your baby drift into peaceful sleep.',
    audio_url: '#',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/260966a3-13c9-4a7f-8a53-f1376c6498f8/lullabies-for-little-ones-f7c6ec34-1772694278546.webp',
    category: 'Sleep',
  }
];

const MOCK_PROGRAMS: FoodProgram[] = [
  {
    id: '1',
    age_group: '6-8m',
    title: 'First Bites Program',
    framework: 'Start with single-grain cereals and pureed vegetables. Focus on texture and allergen introduction.',
    image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/260966a3-13c9-4a7f-8a53-f1376c6498f8/first-bites-program-bbb22a71-1772694277572.webp',
  }
];

export const ContentService = {
  // --- STORIES ---
  async getStories(): Promise<Story[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('stories').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const local = localStorage.getItem('lh_stories');
    return local ? JSON.parse(local) : MOCK_STORIES;
  },

  async addStory(story: Omit<Story, 'id'>): Promise<Story> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('stories').insert([story]).select().single();
      if (error) throw error;
      return data;
    }
    const newStory = { ...story, id: Math.random().toString(36).substr(2, 9) };
    const stories = await this.getStories();
    const updated = [newStory, ...stories];
    localStorage.setItem('lh_stories', JSON.stringify(updated));
    return newStory;
  },

  // --- SONGS ---
  async getSongs(): Promise<Song[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('songs').select('*');
      if (error) throw error;
      return data;
    }
    await new Promise(resolve => setTimeout(resolve, 800));
    const local = localStorage.getItem('lh_songs');
    return local ? JSON.parse(local) : MOCK_SONGS;
  },

  async addSong(song: Omit<Song, 'id'>): Promise<Song> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('songs').insert([song]).select().single();
      if (error) throw error;
      return data;
    }
    const newSong = { ...song, id: Math.random().toString(36).substr(2, 9) };
    const songs = await this.getSongs();
    const updated = [newSong, ...songs];
    localStorage.setItem('lh_songs', JSON.stringify(updated));
    return newSong;
  },

  // --- FOOD PROGRAMS ---
  async getFoodPrograms(): Promise<FoodProgram[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('food_programs').select('*');
      if (error) throw error;
      return data;
    }
    await new Promise(resolve => setTimeout(resolve, 800));
    const local = localStorage.getItem('lh_programs');
    return local ? JSON.parse(local) : MOCK_PROGRAMS;
  },

  async updateFoodProgram(program: FoodProgram): Promise<FoodProgram> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('food_programs').upsert(program).select().single();
      if (error) throw error;
      return data;
    }
    const programs = await this.getFoodPrograms();
    const index = programs.findIndex(p => p.age_group === program.age_group);
    if (index > -1) {
      programs[index] = program;
    } else {
      programs.push(program);
    }
    localStorage.setItem('lh_programs', JSON.stringify(programs));
    return program;
  }
};