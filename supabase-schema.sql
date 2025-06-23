-- Supabase table schema for YourNextDate invitations
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    to_name TEXT NOT NULL,
    from_name TEXT NOT NULL,
    event_time TIMESTAMP WITH TIME ZONE NOT NULL,
    event_description TEXT NOT NULL,
    message TEXT,
    youtube_url TEXT,
    youtube_video_id TEXT,
    theme TEXT DEFAULT 'rose',
    rsvp_status TEXT DEFAULT 'pending' CHECK (rsvp_status IN ('pending', 'yes', 'no')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    rsvp_updated_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security (RLS)
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read invitations (they need the link)
CREATE POLICY "Anyone can read invitations" ON invitations
    FOR SELECT USING (true);

-- Create a policy to allow anyone to insert invitations
CREATE POLICY "Anyone can create invitations" ON invitations
    FOR INSERT WITH CHECK (true);

-- Create a policy to allow anyone to update RSVP status
CREATE POLICY "Anyone can update RSVP" ON invitations
    FOR UPDATE USING (true)
    WITH CHECK (true);

-- Optional: Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_invitations_id ON invitations(id);
CREATE INDEX IF NOT EXISTS idx_invitations_expires_at ON invitations(expires_at);

-- Optional: Add a trigger to auto-delete expired invitations
CREATE OR REPLACE FUNCTION delete_expired_invitations()
RETURNS void AS $$
BEGIN
    DELETE FROM invitations WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup (optional - you can also handle this in your app)
-- SELECT cron.schedule('delete-expired-invitations', '0 * * * *', 'SELECT delete_expired_invitations();');
