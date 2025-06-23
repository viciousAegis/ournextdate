# Supabase Setup Guide for YourNextDate

## ✅ What's Already Done

Your project is already configured with Supabase! Here's what's been implemented:

- ✅ Supabase client installed (`@supabase/supabase-js`)
- ✅ Database utility functions in `src/utils/supabase.js`
- ✅ Invitation creation with automatic 24-hour expiry
- ✅ RSVP handling and updates
- ✅ Demo mode fallback for testing without database
- ✅ Clean link structure (`/invitation?id=...`)

## 🚀 Complete Supabase Setup

### Step 1: Create Your Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or sign in
3. Click "New Project"
4. Choose your organization
5. Fill in:
   - **Name**: `yournextdate` (or any name you prefer)
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for the project to be ready (2-3 minutes)

### Step 2: Get Your API Credentials

1. Go to Project Settings → API
2. Copy your:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

### Step 3: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values with your actual Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
   ```

**Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### Step 4: Create the Database Table

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click "Run" to create the table and policies

### Step 5: Test the Integration

1. Make sure your dev server is running: `npm run dev`
2. Open http://localhost:3002
3. Create a test invitation
4. Copy the generated link and open it
5. Try responding to the invitation

## 🎯 How It Works

### Invitation Flow
1. **Create**: User fills form → Data saved to Supabase → Short link generated
2. **Share**: Generated link: `/invitation?id=uuid`
3. **View**: Recipient opens link → Data fetched from Supabase
4. **RSVP**: Recipient responds → Status updated in Supabase
5. **Expire**: Links automatically expire after 24 hours

### Demo Mode
- If Supabase isn't configured, the app falls back to localStorage
- Perfect for development and testing
- Shows how the app works without needing database setup

## 🔧 Features

### ✅ Implemented
- ✅ Free and scalable (Supabase free tier)
- ✅ 24-hour automatic expiry
- ✅ Clean, short URLs
- ✅ RSVP tracking
- ✅ Multiple themes
- ✅ YouTube video embedding
- ✅ Mobile-responsive design
- ✅ Error handling and loading states
- ✅ Demo mode for testing

### 🔒 Security
- Row Level Security (RLS) enabled
- Public read/write policies (invitation links are essentially public)
- No sensitive data stored
- Automatic cleanup of expired invitations

## 📊 Database Schema

```sql
invitations table:
- id (UUID, auto-generated)
- to_name (TEXT)
- from_name (TEXT) 
- event_time (TIMESTAMP)
- event_description (TEXT)
- message (TEXT)
- youtube_url (TEXT)
- youtube_video_id (TEXT)
- theme (TEXT)
- rsvp_status ('pending', 'yes', 'no')
- created_at (TIMESTAMP)
- expires_at (TIMESTAMP)
- rsvp_updated_at (TIMESTAMP)
```

## 🚨 Important Notes

1. **Replace the API credentials** in `src/utils/supabase.js` with your actual Supabase credentials
2. **Run the SQL schema** in your Supabase dashboard to create the table
3. **Supabase free tier limits**: 50,000 monthly active users, 500 MB database storage
4. **Links expire after 24 hours** automatically
5. **Demo mode** works without any setup for testing

## 🐛 Troubleshooting

### "Failed to fetch invitation"
- Check your Supabase credentials in `src/utils/supabase.js`
- Verify the table was created correctly
- Check browser console for specific errors

### "This invitation has expired"
- Links expire after 24 hours (by design)
- Create a new invitation for testing

### App runs in demo mode
- This is normal if Supabase isn't configured
- Update your credentials to enable full functionality

## 🎉 Next Steps

Your app is ready to use! The Supabase integration provides:
- Unlimited invitations (within free tier limits)
- Reliable link sharing
- Automatic expiry
- RSVP tracking
- Mobile-friendly interface

## 📱 Testing

1. Create an invitation
2. Copy the link
3. Open in incognito/private window
4. Test RSVP functionality
5. Check Supabase dashboard to see data

Your YourNextDate app is now powered by Supabase! 🚀
