/*
  # Create The Info Stack Database Schema

  1. New Tables
    - `job_posts`
      - `id` (uuid, primary key)
      - `job_title` (text) - Title of the job position
      - `company_name` (text) - Name of the company
      - `location` (text) - Job location
      - `deadline` (date) - Application deadline
      - `apply_url` (text) - External link to apply
      - `description` (text) - Job description
      - `is_urgent` (boolean) - Flag to highlight urgent deadlines
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `tech_reviews`
      - `id` (uuid, primary key)
      - `product_name` (text) - Name of the tech product
      - `review_summary` (text) - Review summary text
      - `verdict_score` (integer) - Score from 0-10
      - `affiliate_link` (text) - Buy button link
      - `pros_list` (jsonb) - Array of pros
      - `cons_list` (jsonb) - Array of cons
      - `specs` (jsonb) - Key-value pairs of specifications
      - `product_image_url` (text) - Product image URL
      - `is_featured` (boolean) - Featured review flag
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `news_links`
      - `id` (uuid, primary key)
      - `headline` (text) - News headline
      - `source_name` (text) - External source name
      - `external_url` (text) - Link to full article
      - `published_date` (date) - Publication date
      - `curator_take` (text) - Curator's personal opinion
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (since this is a content platform)
    - Add policies for authenticated admin users to insert/update/delete
*/

CREATE TABLE IF NOT EXISTS job_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  company_name text NOT NULL,
  location text NOT NULL,
  deadline date NOT NULL,
  apply_url text NOT NULL,
  description text NOT NULL,
  is_urgent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tech_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name text NOT NULL,
  review_summary text NOT NULL,
  verdict_score integer NOT NULL CHECK (verdict_score >= 0 AND verdict_score <= 10),
  affiliate_link text NOT NULL,
  pros_list jsonb DEFAULT '[]'::jsonb,
  cons_list jsonb DEFAULT '[]'::jsonb,
  specs jsonb DEFAULT '{}'::jsonb,
  product_image_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text NOT NULL,
  source_name text NOT NULL,
  external_url text NOT NULL,
  published_date date NOT NULL,
  curator_take text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view job posts"
  ON job_posts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert job posts"
  ON job_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update job posts"
  ON job_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete job posts"
  ON job_posts FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view tech reviews"
  ON tech_reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert tech reviews"
  ON tech_reviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tech reviews"
  ON tech_reviews FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tech reviews"
  ON tech_reviews FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view news links"
  ON news_links FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert news links"
  ON news_links FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update news links"
  ON news_links FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete news links"
  ON news_links FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_job_posts_deadline ON job_posts(deadline DESC);
CREATE INDEX IF NOT EXISTS idx_job_posts_is_urgent ON job_posts(is_urgent);
CREATE INDEX IF NOT EXISTS idx_tech_reviews_featured ON tech_reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_tech_reviews_created ON tech_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_links_published ON news_links(published_date DESC);