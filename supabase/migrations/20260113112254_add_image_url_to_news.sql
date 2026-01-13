/*
  # Add image_url field to news_links table

  1. Changes
    - Add `image_url` column to store news image URLs
    - Defaults to NULL for existing rows
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_links' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE news_links ADD COLUMN image_url text;
  END IF;
END $$;