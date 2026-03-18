-- Add new columns to guestbook_entries (now tributes)
ALTER TABLE guestbook_entries ADD COLUMN IF NOT EXISTS personal_experience text;
ALTER TABLE guestbook_entries ADD COLUMN IF NOT EXISTS image_url text;

-- Create RSVP table
CREATE TABLE IF NOT EXISTS rsvp_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL CHECK (char_length(full_name) <= 100),
  phone text CHECK (char_length(phone) <= 20),
  number_attending integer NOT NULL DEFAULT 1 CHECK (number_attending >= 1 AND number_attending <= 20),
  message text CHECK (char_length(message) <= 500),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on RSVP
ALTER TABLE rsvp_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read rsvp" ON rsvp_entries
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert rsvp" ON rsvp_entries
  FOR INSERT WITH CHECK (true);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  date timestamptz DEFAULT now(),
  pinned boolean DEFAULT false
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read announcements" ON announcements
  FOR SELECT USING (true);
