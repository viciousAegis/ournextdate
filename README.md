# OurNextDate - Modern React Date Invitation App

A beautiful, modern React web application for creating and sharing romantic date night invitations with advanced encryption, timezone handling, and multiple database options.

![image](https://github.com/user-attachments/assets/2e20b468-1f41-4e61-a6fa-c239975612ba)


## ✨ Key Features

- 🎨 **Beautiful Themes**: Multiple romantic themes (Rose, Sunset, Ocean, Forest, etc.)
- 🔒 **End-to-End Encryption**: Sensitive data encrypted with AES encryption
- 🌍 **Timezone Smart**: UTC storage with local timezone display
- 📱 **Fully Responsive**: Mobile-first design with Tailwind CSS
- 💾 **Dual Storage**: Supabase database + localStorage demo mode
- 📅 **Calendar Integration**: Google Calendar event creation
- ✅ **RSVP System**: Accept/decline with countdown timer
- 🔗 **Shareable Links**: Secure invitation URLs
- 💖 **Interactive UI**: Smooth animations and hover effects
- 🎲 **Smart Suggestions**: Random date ideas and sweet messages

## 🏗️ Project Structure

```
yournextdate/
├── index.html                 # Vite entry point with favicon
├── index-cdn.html            # CDN version (legacy)
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── vercel.json               # Vercel deployment config
├── supabase-schema.sql       # Database schema
├── SUPABASE_SETUP.md        # Database setup guide
├── ENCRYPTION_SETUP.md      # Security setup guide
├── api/
│   └── encryption-key.js    # Server-side encryption key
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main routing component
    ├── index.css            # Global styles and animations
    ├── components/          # Reusable UI components
    │   ├── CreatorForm.jsx
    │   ├── FinalInvitationCard.jsx
    │   ├── InvitationView.jsx
    │   ├── PreviewCard.jsx
    │   ├── ThemeSelector.jsx
    │   ├── LinkModal.jsx
    │   └── LoadingMessage.jsx
    ├── pages/               # Route components
    │   ├── CreatorPageWithPreview.jsx
    │   ├── FinalInvitationPage.jsx
    │   ├── InvitationPage.jsx
    │   └── InvitationPageRedirect.jsx
    ├── config/
    │   └── themes.js        # Theme definitions
    ├── styles/
    │   └── theme.css        # Theme-specific CSS variables
    └── utils/               # Helper functions
        ├── encryption.js    # AES encryption utilities
        ├── encryptionConfig.js
        ├── supabase.js      # Database operations
        └── invitationUtils.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Development

1. **Clone and Install**:
   ```bash
   git clone <repository-url>
   cd yournextdate
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser

3. **Build for Production**:
   ```bash
   npm run build
   ```
   Output will be in the `dist/` folder

### Environment Setup

The app works in two modes:

#### Demo Mode (Default)
- No setup required
- Uses localStorage for data persistence
- Perfect for testing and development

#### Production Mode (Supabase)
1. Follow `SUPABASE_SETUP.md` to configure database
2. Follow `ENCRYPTION_SETUP.md` to set up security
3. App automatically detects Supabase connection

## 🗄️ Database Schema (Supabase)

```sql
-- See supabase-schema.sql for complete schema
CREATE TABLE invitations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  to_name text,           -- Encrypted
  from_name text,         -- Encrypted  
  event_time timestamptz, -- UTC timestamp
  event_description text, -- Encrypted
  message text,           -- Encrypted
  theme text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE rsvps (
  invitation_id uuid REFERENCES invitations(id),
  status text CHECK (status IN ('yes', 'no', 'pending')),
  updated_at timestamptz DEFAULT now()
);
```

## 🏗️ Architecture

### Frontend Components

#### Core Pages
- **`CreatorPageWithPreview.jsx`**: Main creation interface with live preview
- **`FinalInvitationPage.jsx`**: Final invitation display with RSVP functionality  
- **`InvitationPage.jsx`**: Invitation reveal animation page
- **`InvitationPageRedirect.jsx`**: URL routing and validation

#### UI Components
- **`CreatorForm.jsx`**: Form with timezone-aware datetime input, generators
- **`FinalInvitationCard.jsx`**: Themed invitation card with countdown timer
- **`PreviewCard.jsx`**: Real-time preview during creation
- **`ThemeSelector.jsx`**: Interactive theme picker
- **`LinkModal.jsx`**: Shareable link generation and copying

### Backend Architecture

#### Encryption System (`utils/encryption.js`)
- **AES-256 encryption** for sensitive data (names, messages, events)
- **UTC timezone handling** for consistent datetime storage
- **Secure key management** via serverless API endpoint

#### Database Layer (`utils/supabase.js`)
- **Supabase integration** with automatic connection detection
- **Row Level Security (RLS)** for data protection
- **Graceful fallback** to localStorage demo mode

#### Timezone Handling
- **Storage**: All datetimes stored in UTC
- **Display**: Automatic conversion to user's local timezone
- **Input**: datetime-local inputs preserve user intent
- **Calendar**: Events created in user's local timezone

## � Theme System

Themes use CSS custom properties for dynamic styling:

```css
.theme-rose {
  --bg-primary: #fdf2f8;
  --bg-secondary: #fce7f3;
  --text-primary: #831843;
  --text-accent: #be185d;
  --border-color: #f9a8d4;
}
```

Available themes: Rose, Sunset, Ocean, Forest, Lavender, Peach, Mint

## 🔧 Technology Stack

- **Frontend**: React 18 with Hooks, React Router
- **Build Tool**: Vite with HMR (Hot Module Replacement)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Database**: Supabase PostgreSQL with RLS
- **Security**: AES-256 encryption, secure key management
- **Deployment**: Vercel with serverless functions
- **Icons**: Emoji + Custom SVG icons

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set up environment variables (see `ENCRYPTION_SETUP.md`)
3. Deploy automatically on push

### Manual Deployment
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service

3. **Set up serverless function** for encryption key (see `api/encryption-key.js`)

## 📱 Browser Support

- **Modern browsers**: Chrome 91+, Firefox 90+, Safari 14+, Edge 91+
- **Mobile**: iOS Safari 14+, Chrome Mobile 91+
- **Features**: ES6+, CSS Grid, Flexbox, CSS Variables

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint (if configured)
```

## 🔐 Security Features

- **Client-side encryption** of sensitive data
- **Secure key management** via serverless API
- **No plain text storage** of personal information
- **HTTPS-only** deployment recommended
- **Row Level Security** in Supabase

## 🌍 Internationalization Ready

The app is built with i18n in mind:
- Easy to add language files
- Date formatting respects locale
- Timezone-aware datetime handling
- Unicode emoji support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Add tests if applicable  
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Created with ❤️ for making date planning special**
