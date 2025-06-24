// Secure encryption key API endpoint
// This endpoint returns the encryption key only to verified requests

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { timestamp, verification } = req.body;

    // Basic verification to prevent abuse
    if (!verification || atob(verification) !== 'yournextdate-app') {
      return res.status(403).json({ error: 'Invalid verification' });
    }

    // Check timestamp to prevent replay attacks (within 5 minutes)
    const now = Date.now();
    if (!timestamp || Math.abs(now - timestamp) > 5 * 60 * 1000) {
      return res.status(403).json({ error: 'Invalid timestamp' });
    }

    // Get encryption key from environment variable (server-side only)
    const encryptionKey = process.env.ENCRYPTION_KEY;

    if (!encryptionKey) {
      console.warn('⚠️ ENCRYPTION_KEY not set in environment variables');
      return res.status(500).json({ error: 'Encryption key not configured' });
    }

    // Return the encryption key
    res.status(200).json({ 
      key: encryptionKey,
      timestamp: now
    });

  } catch (error) {
    console.error('Error in encryption-key endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
