// Invitation Card Themes Configuration
// Add new themes here to make them available throughout the app

export const invitationThemes = [
  {
    id: 'sunset',
    name: 'Sunset Glow',
    emoji: '🌅',
    description: 'Warm, modern, and cheerful coral tones',
    category: 'warm'
  },
  {
    id: 'modern-romance',
    name: 'Modern Romance',
    emoji: '💖',
    description: 'Elegant and sophisticated with playful pink',
    category: 'romantic'
  },
  {
    id: 'sweetheart-bliss',
    name: 'Sweetheart Bliss',
    emoji: '💕',
    description: 'Soft, warm, and inviting with coral accents',
    category: 'romantic'
  },
  {
    id: 'rose-petal',
    name: 'Rose Petal',
    emoji: '🌹',
    description: 'Classic, passionate, and timeless red',
    category: 'romantic'
  },
  {
    id: 'enchanted-evening',
    name: 'Enchanted Evening',
    emoji: '🌙',
    description: 'Mysterious, magical, and glamorous dark theme',
    category: 'elegant'
  },
  {
    id: 'mint-to-be',
    name: 'Mint to Be',
    emoji: '🌿',
    description: 'Fresh, fun, and earthy for daytime dates',
    category: 'fresh'
  },
  {
    id: 'coffee-comfort',
    name: 'Coffee & Comfort',
    emoji: '☕',
    description: 'Warm, cozy, and relaxed with retro vibes',
    category: 'warm'
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    emoji: '🌊',
    description: 'Sunny, fresh, and adventurous beach vibes',
    category: 'fresh'
  },
  {
    id: 'city-noir',
    name: 'City Noir',
    emoji: '🌆',
    description: 'Dark, elegant, and upscale for formal nights',
    category: 'elegant'
  },
  {
    id: 'park-picnic',
    name: 'Park Picnic',
    emoji: '🧺',
    description: 'Playful, sweet, and rustic gingham-inspired',
    category: 'playful'
  },
  {
    id: 'artistic-aura',
    name: 'Artistic Aura',
    emoji: '🎨',
    description: 'Creative and grounded painter studio tones',
    category: 'elegant'
  }
];

// Helper functions for theme management
export const getThemeById = (id) => {
  return invitationThemes.find(theme => theme.id === id) || invitationThemes[0];
};

export const getThemesByCategory = (category) => {
  return invitationThemes.filter(theme => theme.category === category);
};

export const getAllThemeIds = () => {
  return invitationThemes.map(theme => theme.id);
};

export const getDefaultTheme = () => {
  return invitationThemes[0];
};
