import { supabase } from '../lib/supabase';
import { JobPost, TechReview, NewsLink } from '../types';

export const jobPostsApi = {
  async getLatest(limit = 5): Promise<JobPost[]> {
    const { data, error } = await supabase
      .from('job_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getMostUrgent(): Promise<JobPost | null> {
    const { data, error } = await supabase
      .from('job_posts')
      .select('*')
      .eq('is_urgent', true)
      .order('deadline', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

export const techReviewsApi = {
  async getLatest(limit = 6): Promise<TechReview[]> {
    const { data, error } = await supabase
      .from('tech_reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getFeatured(): Promise<TechReview | null> {
    const { data, error } = await supabase
      .from('tech_reviews')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

export const newsLinksApi = {
  async getLatest(limit = 10): Promise<NewsLink[]> {
    const { data, error } = await supabase
      .from('news_links')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};
