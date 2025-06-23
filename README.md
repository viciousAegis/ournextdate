# Date Night Designer - React Version

A beautiful React web application for creating and sharing romantic date night invitations.

## Project Structure

```
yournextdate/
├── index.html              # Main Vite development entry point
├── index-cdn.html          # React version with CDN (no build needed)
├── package.json            # React dependencies and scripts
├── vite.config.js          # Vite configuration
└── src/                    # React source files
    ├── main.jsx           # React entry point
    ├── App.jsx            # Main App component
    ├── index.css          # React CSS with themes
    └── components/        # React components
        ├── ThemeSelector.jsx
        ├── CreatorForm.jsx
        ├── InvitationView.jsx
        ├── LoadingMessage.jsx
        └── LinkDisplay.jsx
```

## Development Options

### Option 1: Vite Development (Recommended)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   This will start a Vite development server at `http://localhost:3000`

3. **Build for Production**:
   ```bash
   npm run build
   ```

### Option 2: React with CDN (Simple Setup)

Simply open `index-cdn.html` in your browser - no build process required!

## Firebase Configuration

Update the Firebase configuration in `src/App.jsx` and replace the `firebaseConfig` object:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## React Components

### `App.jsx`
Main application component that manages:
- Firebase initialization
- Routing between creator and invitation views
- State management
- Database operations

### `CreatorForm.jsx`
Form component for creating invitations with:
- Theme selection
- Form inputs for invitation details
- Idea and message generators
- Form validation and submission

### `InvitationView.jsx`
Component for displaying invitations with:
- Themed invitation display
- RSVP functionality
- YouTube video embedding
- Calendar integration

### `ThemeSelector.jsx`
Reusable component for theme selection with visual indicators.

### `LinkDisplay.jsx`
Component for displaying and copying shareable invitation links.

### `LoadingMessage.jsx`
Simple loading and error message component.

## Features

- 🎨 Multiple themes (Rose Petal, Midnight Sky, Minty Fresh)
- 📱 Responsive design with Tailwind CSS
- 🎵 YouTube video embedding
- 📅 Google Calendar integration
- ✅ RSVP functionality
- 🔗 Shareable invitation links
- ⚡ Hot reload in development
- 🔧 Component-based architecture
- 🎯 TypeScript-ready structure

## Technology Stack

- **Frontend**: React 18, JSX, Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Custom CSS variables
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Anonymous Auth
- **Development**: Hot Module Replacement (HMR)

## Browser Compatibility

- **Vite Version**: Modern browsers with ES6+ support
- **CDN Version**: Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Simple HTTP server for static files

## Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Ensure Firebase configuration is correct
4. Test both creator and invitation views
