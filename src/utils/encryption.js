import CryptoJS from 'crypto-js';
import { getEncryptionKey } from './encryptionConfig.js';

// Timezone-aware datetime utilities
/**
 * Converts a datetime-local input value to UTC for storage
 * @param {string} dateTimeLocalString - String from datetime-local input (YYYY-MM-DDTHH:MM)
 * @returns {string} - UTC ISO string for storage
 */
export const convertLocalTimeToUTC = (dateTimeLocalString) => {
  if (!dateTimeLocalString) return '';
  
  // Create a date object from the datetime-local string (treats it as local time)
  const localDate = new Date(dateTimeLocalString);
  
  // Return as UTC ISO string for storage
  return localDate.toISOString();
};

/**
 * Converts UTC time from storage to local time for datetime-local input
 * @param {string} utcString - UTC ISO string from storage
 * @returns {string} - Formatted datetime string for datetime-local input
 */
export const convertUTCToLocalTime = (utcString) => {
  if (!utcString) return '';
  
  // Parse the UTC string
  const utcDate = new Date(utcString);
  
  // Get local date components
  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getDate()).padStart(2, '0');
  const hours = String(utcDate.getHours()).padStart(2, '0');
  const minutes = String(utcDate.getMinutes()).padStart(2, '0');
  
  // Format as YYYY-MM-DDTHH:MM (datetime-local format)
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Formats a date for datetime-local input, converting from UTC storage to local time
 * @param {Date|string} date - The date to format (can be UTC string or Date object)
 * @returns {string} - Formatted datetime string for datetime-local input
 */
export const formatDateTimeLocal = (date) => {
  if (!date) return '';
  
  let utcDate;
  if (typeof date === 'string') {
    utcDate = new Date(date);
  } else {
    utcDate = date;
  }
  
  return convertUTCToLocalTime(utcDate.toISOString());
};

/**
 * Creates a UTC date from datetime-local input for storage
 * @param {string} dateTimeLocalString - String from datetime-local input
 * @returns {Date} - Date object in UTC for storage
 */
export const parseDateTimeLocal = (dateTimeLocalString) => {
  if (!dateTimeLocalString) return null;
  
  // Convert local time to UTC for storage
  const utcString = convertLocalTimeToUTC(dateTimeLocalString);
  return new Date(utcString);
};

/**
 * Formats UTC time from storage for display in user's local timezone
 * @param {string|Date} utcDateTime - The UTC datetime from storage
 * @returns {string} - Formatted date string in local timezone
 */
export const formatDisplayDate = (utcDateTime) => {
  if (!utcDateTime) return 'Date & Time';
  
  // Parse UTC datetime
  const utcDate = new Date(utcDateTime);
  
  // Format in user's local timezone
  const options = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  };
  return utcDate.toLocaleDateString('en-US', options);
};

/**
 * Generates calendar URL with proper timezone handling
 * @param {Object} invitation - Invitation data (time stored in UTC)
 * @returns {string} - Google Calendar URL
 */
export const generateCalendarUrl = (invitation) => {
  // Parse the UTC time from storage
  const utcDate = new Date(invitation.time);
  
  // Convert to local time for the calendar event
  const localDate = new Date(utcDate.getTime());
  
  // Format for Google Calendar (local time)
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  
  const startTime = `${year}${month}${day}T${hours}${minutes}00`;
  
  // Add 2 hours for end time
  const endDate = new Date(localDate.getTime() + 2 * 60 * 60 * 1000);
  const endYear = endDate.getFullYear();
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getDate()).padStart(2, '0');
  const endHours = String(endDate.getHours()).padStart(2, '0');
  const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
  
  const endTime = `${endYear}${endMonth}${endDay}T${endHours}${endMinutes}00`;
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('OurNextDate with ' + invitation.from)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(invitation.event)}&location=`;
};

// Encryption configuration
const ALGORITHM = 'AES';
let ENCRYPTION_KEY = null;

// Initialize encryption key
const initializeEncryptionKey = async () => {
  if (!ENCRYPTION_KEY) {
    ENCRYPTION_KEY = await getEncryptionKey();
  }
  return ENCRYPTION_KEY;
};

/**
 * Encrypts sensitive text data
 * @param {string} text - The text to encrypt
 * @returns {Promise<string>} - Encrypted text
 */
export const encryptText = async (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  try {
    const key = await initializeEncryptionKey();
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
  } catch (error) {
    console.error('🔒 Encryption error:', error);
    return text; // Return original text if encryption fails
  }
};

/**
 * Decrypts sensitive text data
 * @param {string} encryptedText - The encrypted text to decrypt
 * @returns {Promise<string>} - Decrypted text
 */
export const decryptText = async (encryptedText) => {
  if (!encryptedText || typeof encryptedText !== 'string') {
    return encryptedText;
  }
  
  try {
    const key = await initializeEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error('🔓 Decryption error:', error);
    return encryptedText; // Return original text if decryption fails
  }
};

/**
 * Encrypts an entire invitation object's sensitive fields
 * @param {Object} invitation - The invitation object to encrypt
 * @returns {Promise<Object>} - Invitation object with encrypted sensitive fields
 */
export const encryptInvitation = async (invitation) => {
  const sensitiveFields = ['to_name', 'from_name', 'event_description', 'message', 'youtube_url'];
  
  const encrypted = { ...invitation };
  
  for (const field of sensitiveFields) {
    if (encrypted[field]) {
      encrypted[field] = await encryptText(encrypted[field]);
    }
  }
  
  return encrypted;
};

/**
 * Decrypts an entire invitation object's sensitive fields
 * @param {Object} invitation - The invitation object to decrypt
 * @returns {Promise<Object>} - Invitation object with decrypted sensitive fields
 */
export const decryptInvitation = async (invitation) => {
  const sensitiveFields = ['to_name', 'from_name', 'event_description', 'message', 'youtube_url'];
  
  const decrypted = { ...invitation };
  
  for (const field of sensitiveFields) {
    if (decrypted[field]) {
      decrypted[field] = await decryptText(decrypted[field]);
    }
  }
  
  return decrypted;
};

/**
 * Encrypts form data before sending to database
 * @param {Object} formData - The form data object
 * @returns {Promise<Object>} - Encrypted form data with UTC time
 */
export const encryptFormData = async (formData) => {
  return {
    to_name: await encryptText(formData.to),
    from_name: await encryptText(formData.from),
    event_time: convertLocalTimeToUTC(formData.time), // Convert local time to UTC for storage
    event_description: await encryptText(formData.event),
    message: await encryptText(formData.message),
    theme: formData.theme || 'romantic' // Theme is not sensitive
  };
};

/**
 * Utility to check if encryption is working properly
 */
export const testEncryption = async () => {
  const testText = "Hello, this is a test message!";
  const encrypted = await encryptText(testText);
  const decrypted = await decryptText(encrypted);
  
  console.log('🔒 Encryption Test:');
  console.log('Original:', testText);
  console.log('Encrypted:', encrypted);
  console.log('Decrypted:', decrypted);
  console.log('Test passed:', testText === decrypted);
  
  return testText === decrypted;
};

// Initialize and test encryption on startup
(async () => {
  try {
    console.log('🔐 Encryption system initializing...');
    await initializeEncryptionKey();
    console.log('✅ Secure encryption key loaded');
  } catch (error) {
    console.warn('⚠️ Using fallback encryption configuration:', error.message);
  }
})();
