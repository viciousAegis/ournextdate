// Secure encryption key configuration
// This file will fetch the encryption key from a secure server endpoint

let cachedEncryptionKey = null;

/**
 * Fetches the encryption key from a secure server endpoint
 * @returns {Promise<string>} The encryption key
 */
export const getEncryptionKey = async () => {
  if (cachedEncryptionKey) {
    return cachedEncryptionKey;
  }

  try {
    const response = await fetch('/api/encryption-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        timestamp: Date.now(),
        // Add a simple verification to prevent abuse
        verification: btoa('yournextdate-app')
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch encryption key');
    }

    const data = await response.json();
    cachedEncryptionKey = data.key;
    return cachedEncryptionKey;
  } catch (error) {
    console.warn('⚠️ Could not fetch secure encryption key, using fallback');
    // Fallback for development/demo mode
    return 'yournextdate-default-key-change-this-in-production';
  }
};
