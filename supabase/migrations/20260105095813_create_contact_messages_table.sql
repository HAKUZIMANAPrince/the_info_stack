/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text) - sender's name
      - `email` (text) - sender's email address
      - `subject` (text) - message subject/category
      - `message` (text) - message content
      - `is_read` (boolean) - whether the message has been read by admin
      - `created_at` (timestamptz) - when the message was submitted
      - `updated_at` (timestamptz) - when the message was last updated

  2. Security
    - Enable RLS on `contact_messages` table
    - Allow anyone to insert messages (public form submission)
    - Only authenticated users (admins) can read messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can read messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can update messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
