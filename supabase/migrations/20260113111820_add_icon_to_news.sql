/*
  # Add icon field to news_links table

  1. Changes
    - Add `icon_name` column to store lucide-react icon names
    - Defaults to 'Newspaper' for existing rows
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_links' AND column_name = 'icon_name'
  ) THEN
    ALTER TABLE news_links ADD COLUMN icon_name text DEFAULT 'Newspaper';
  END IF;
END $$;