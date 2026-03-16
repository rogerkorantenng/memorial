# Memorial Website Setup

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:

```sql
CREATE TABLE guestbook_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL CHECK (char_length(name) <= 100),
  relationship text NOT NULL CHECK (char_length(relationship) <= 50),
  message text NOT NULL CHECK (char_length(message) <= 2000),
  ip_address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON guestbook_entries
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON guestbook_entries
  FOR INSERT WITH CHECK (true);
```

3. Go to Settings → API and copy your credentials to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_PAYSTACK_LINK=your-paystack-donation-url
```

4. Add the same environment variables to Netlify (Site settings → Environment variables)

## Moderation

To delete an inappropriate guestbook entry, go to Supabase Dashboard → SQL Editor:

```sql
-- View recent entries
SELECT id, name, message FROM guestbook_entries ORDER BY created_at DESC LIMIT 20;

-- Delete by ID
DELETE FROM guestbook_entries WHERE id = 'paste-uuid-here';
```

## Development

```bash
npm install
npm run dev
```

## Deployment

Push to GitHub and connect to Netlify. The `netlify.toml` config handles the rest.
