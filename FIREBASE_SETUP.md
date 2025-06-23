# Firebase Setup Guide

## Current Status
Your app is currently running in **demo mode** with localStorage for testing. To enable real database functionality, follow these steps:

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "your-next-date")
4. Enable Google Analytics (optional)
5. Wait for project creation

## Step 2: Set up Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users

## Step 3: Enable Authentication
1. Go to "Authentication" → "Sign-in method"
2. Enable "Anonymous" authentication
3. Save changes

## Step 4: Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (</>)
4. Register your app with a name
5. Copy the configuration object

## Step 5: Update Your Code
Replace the `firebaseConfig` object in both:
- `/src/pages/CreatorPageWithPreview.jsx`
- `/src/pages/InvitationPage.jsx`

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 6: Set Firestore Rules (Optional for Production)
In Firestore → Rules, you can update security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invitations/{document} {
      allow read, write: if true; // For development only
    }
  }
}
```

## Testing
- **Demo mode**: Works without Firebase (uses localStorage)
- **Production mode**: Requires Firebase configuration
- Links work in both modes
- RSVP functionality works in both modes

## Current Features Working in Demo Mode:
✅ Create invitations
✅ Generate shareable links  
✅ View invitations
✅ RSVP functionality
✅ Real-time preview
✅ Link copying and sharing

## What Firebase Adds:
- Persistent storage across devices
- Real-time updates
- Scalability
- User management
- Analytics
