# Encryption Setup Guide for YourNextDate

## 🔒 Overview

All sensitive personal information in YourNextDate is now encrypted before being stored in the database. This includes:

- **Names** (to/from fields)
- **Event descriptions** 
- **Personal messages**
- **YouTube URLs**

## 🔧 What's Encrypted

### Encrypted Fields:
- `to_name` - Recipient's name
- `from_name` - Sender's name  
- `event_description` - Date event details
- `message` - Personal message
- `youtube_url` - YouTube video URLs

### Not Encrypted:
- `id` - Database ID (needed for queries)
- `event_time` - Date/time (needed for expiry checks)
- `theme` - UI theme selection
- `youtube_video_id` - Video ID (public anyway)
- `rsvp_status` - Response status
- `created_at` / `expires_at` - Timestamps
- `rsvp_updated_at` - RSVP timestamp

## 🚀 Setup Instructions

### 1. Environment Variables

Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

### 2. Generate Encryption Key

Generate a strong encryption key:

```bash
# Option 1: Using OpenSSL
openssl rand -hex 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Online generator
# Visit: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
```

### 3. Configure Environment

Add your encryption key to `.env`:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here

# Encryption Configuration
VITE_ENCRYPTION_KEY=your-64-character-hex-encryption-key-here
```

## 🔐 How It Works

### Encryption Flow:
1. User fills out form with personal information
2. Form data is encrypted using AES encryption
3. Encrypted data is stored in Supabase
4. When invitation is viewed, data is decrypted for display

### Code Example:

```javascript
// Before storage (encrypted)
const formData = {
  to: "Sarah",
  from: "John", 
  message: "Can't wait to see you!"
};

// After encryption (stored in database)
const encryptedData = {
  to_name: "U2FsdGVkX1+vupppZksvRf5pq5g5XjFRIipRkwB0K1Y=",
  from_name: "U2FsdGVkX1+12YzVRf5pq5g5XjFRIipRkwB0K1Y=", 
  message: "U2FsdGVkX1+8V5pq5g5XjFRIipRkwB0K1YzVRf5pq5g5="
};
```

## 🛡️ Security Features

- **AES Encryption** - Industry standard symmetric encryption
- **Environment Variables** - Keys stored securely outside code
- **Graceful Fallback** - App continues working if encryption fails
- **No Key in Code** - Encryption key never stored in source code
- **Demo Mode Unaffected** - Local demo continues to work normally

## 🚨 Important Security Notes

### Production Deployment:
1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong encryption keys** - Minimum 32 characters
3. **Keep keys secure** - Store in secure environment variables
4. **Rotate keys periodically** - Update encryption keys regularly

### Key Management:
- If you lose the encryption key, encrypted data cannot be recovered
- Store backup of encryption key in secure location
- Use different keys for development and production

## 🧪 Testing Encryption

The encryption system includes a test function:

```javascript
import { testEncryption } from './src/utils/encryption.js';

// Test encryption/decryption
testEncryption(); // Returns true if working correctly
```

## 🔧 Troubleshooting

### Common Issues:

1. **"Encryption key not found"**
   - Make sure `.env` file exists
   - Check `VITE_ENCRYPTION_KEY` is set
   - Restart development server

2. **"Decryption failed"**
   - Encryption key may have changed
   - Data was encrypted with different key
   - Check console for detailed error messages

3. **"Demo mode not working"**
   - Demo mode bypasses encryption
   - Check if Supabase connection is working
   - Clear localStorage if needed

### Debug Mode:

Check browser console for encryption status:
- `🔐 Encryption system initialized`
- `✅ Custom encryption key loaded`
- `🔒 Data encrypted for storage`
- `🔓 Data decrypted`

## 📝 Database Schema

No changes to database schema required. Encrypted data is stored as text in existing fields.

## 🔄 Migration

If you have existing unencrypted data:
1. Export existing data
2. Update application with encryption
3. Re-import data (will be encrypted automatically)

## 📋 Compliance

This encryption implementation helps with:
- **GDPR** - Personal data protection
- **Privacy Laws** - Data anonymization
- **Security Best Practices** - Data protection at rest

---

For questions or issues, check the console logs for detailed encryption status messages.
