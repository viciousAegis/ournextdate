// URL-based invitation system - no database needed!

export const encodeInvitationData = (data) => {
  try {
    // Create invitation object with expiry
    const invitation = {
      ...data,
      id: 'url-' + Date.now(),
      rsvpStatus: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    // Encode to base64
    const jsonString = JSON.stringify(invitation);
    const encoded = btoa(unescape(encodeURIComponent(jsonString)));
    
    console.log('📦 Encoded invitation data:', encoded.length, 'characters');
    return encoded;
  } catch (error) {
    console.error('❌ Error encoding invitation:', error);
    throw new Error('Failed to encode invitation data');
  }
};

export const decodeInvitationData = (encodedData) => {
  try {
    // Decode from base64
    const decoded = decodeURIComponent(escape(atob(encodedData)));
    const invitation = JSON.parse(decoded);
    
    // Check if expired
    const now = new Date();
    const expiresAt = new Date(invitation.expiresAt);
    
    if (now > expiresAt) {
      throw new Error('This invitation has expired');
    }
    
    console.log('📦 Decoded invitation data:', invitation);
    return invitation;
  } catch (error) {
    console.error('❌ Error decoding invitation:', error);
    throw new Error('Invalid or expired invitation link');
  }
};

export const generateInvitationUrl = (data, baseUrl = window.location.origin) => {
  const encodedData = encodeInvitationData(data);
  return `${baseUrl}/invitation?data=${encodedData}`;
};

export const getRsvpFromLocalStorage = (invitationId) => {
  try {
    const rsvpData = localStorage.getItem(`rsvp-${invitationId}`);
    return rsvpData ? JSON.parse(rsvpData) : null;
  } catch (error) {
    console.error('Error reading RSVP from localStorage:', error);
    return null;
  }
};

export const saveRsvpToLocalStorage = (invitationId, status) => {
  try {
    const rsvpData = {
      status,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`rsvp-${invitationId}`, JSON.stringify(rsvpData));
    console.log('💾 RSVP saved to localStorage:', rsvpData);
    return true;
  } catch (error) {
    console.error('Error saving RSVP to localStorage:', error);
    return false;
  }
};
