# Adding New Themes

This guide explains how to add new invitation card themes to the Date Night app.

## Theme Configuration

All themes are centrally managed in `/src/config/themes.js`. This makes it easy to add, modify, or remove themes without touching multiple files.

## How to Add a New Theme

### 1. Add Theme to Configuration

Edit `/src/config/themes.js` and add your new theme to the `invitationThemes` array:

```javascript
{
  id: 'your-theme-id',           // Unique identifier (lowercase, hyphenated)
  name: 'Your Theme Name',       // Display name for the theme
  emoji: '🎨',                   // Emoji icon for the theme button
  description: 'Description of your theme', // Short description shown in theme selector
  category: 'category-name'      // Category for grouping (romantic, warm, elegant, fresh, etc.)
}
```

### 2. Add CSS Theme Styles

Add the corresponding CSS theme styles in `/src/index.css`:

```css
/* Your Theme Name */
.theme-your-theme-id {
    --bg-primary: #your-bg-color;
    --bg-secondary: #your-secondary-color;
    --text-primary: #your-text-color;
    --text-accent: #your-accent-color;
    --border-color: #your-border-color;
    --btn-bg: #your-button-color;
    --btn-hover-bg: #your-button-hover-color;
    --font-fancy: 'Your-Font-Family', cursive;
    --font-body: 'Your-Body-Font', sans-serif;
}
```

### 3. Test Your Theme

1. Save your changes
2. Start the development server: `npm run dev`
3. Click the "🎨 Themes" button
4. Your new theme should appear in the list
5. Select it to see how it looks on the invitation card

## Theme Categories

Use these categories to organize themes:

- `romantic` - Love and romance themes
- `warm` - Warm color palettes
- `elegant` - Sophisticated and classy themes
- `fresh` - Clean and modern themes
- `playful` - Fun and energetic themes
- `seasonal` - Holiday or season-specific themes

## Color Guidelines

When choosing colors for your theme:

- Ensure good contrast between text and background
- Test readability on both light and dark colors
- Keep the design cohesive with harmonious color palettes
- Consider accessibility guidelines for color contrast

## Example: Adding a "Spring" Theme

1. **Add to themes.js:**
```javascript
{
  id: 'spring',
  name: 'Spring',
  emoji: '🌸',
  description: 'Fresh spring blossoms and green meadows',
  category: 'seasonal'
}
```

2. **Add to index.css:**
```css
/* Spring Theme */
.theme-spring {
    --bg-primary: #f0f9ff;
    --bg-secondary: #ffffff;
    --text-primary: #166534;
    --text-accent: #ec4899;
    --border-color: #bbf7d0;
    --btn-bg: #10b981;
    --btn-hover-bg: #059669;
    --font-fancy: 'Dancing Script', cursive;
    --font-body: 'Inter', sans-serif;
}
```

That's it! Your new theme will automatically appear in all theme selectors throughout the app.

## Helper Functions

The themes configuration also provides helpful utility functions:

- `getThemeById(id)` - Get a specific theme by its ID
- `getThemesByCategory(category)` - Get all themes in a category
- `getAllThemeIds()` - Get array of all theme IDs
- `getDefaultTheme()` - Get the default theme (first in the array)

These can be imported and used anywhere in the app:

```javascript
import { getThemeById, getThemesByCategory } from '../config/themes';
```
