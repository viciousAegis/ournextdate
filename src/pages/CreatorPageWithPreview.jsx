import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatorForm from '../components/CreatorForm';
import FinalInvitationCard from '../components/FinalInvitationCard';
import LinkModal from '../components/LinkModal';
import LoadingMessage from '../components/LoadingMessage';
import { createInvitation, supabase } from '../utils/supabase';
import { encryptText, decryptText, formatDateTimeLocal } from '../utils/encryption';
import { invitationThemes, getDefaultTheme } from '../config/themes';

// Utility functions
const getTomorrowDateTime = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(19, 0, 0, 0); // 7:00 PM in local timezone
  return formatDateTimeLocal(tomorrow);
};

const CreatorPageWithPreview = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Loading...');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [theme, setTheme] = useState(getDefaultTheme().id);
  const [showThemes, setShowThemes] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    time: getTomorrowDateTime(),
    event: '',
    message: ''
  });
  const themesScrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        console.log('🔍 Testing Supabase connection...');
        
        // Test connection by trying to fetch from a table (will fail gracefully if not configured)
        const { data, error } = await supabase.from('invitations').select('count').limit(1);
        
        if (error && error.message.includes('relation "public.invitations" does not exist')) {
          console.log('📋 Supabase connected but table not created yet');
          setMessage('Supabase connected! Please create the database table (see instructions below).');
          setIsSupabaseConnected(true);
        } else if (error) {
          console.warn('⚠️ Supabase connection issue:', error.message);
          setMessage('Supabase not configured. Running in demo mode.');
          setIsSupabaseConnected(false);
        } else {
          console.log('✅ Supabase fully connected and ready!');
          setMessage('Connected to Supabase successfully!');
          setIsSupabaseConnected(true);
        }
      } catch (error) {
        console.warn('⚠️ Supabase connection failed:', error.message);
        setMessage('Supabase not configured. Running in demo mode.');
        setIsSupabaseConnected(false);
      } finally {
        setLoading(false);
      }
    };

    checkSupabaseConnection();
  }, []);

  const validateFormData = (data) => {
    const errors = [];
    
    if (!data.to.trim()) errors.push('Please enter who this invitation is for');
    if (!data.from.trim()) errors.push('Please enter your name');
    if (!data.time) errors.push('Please select a date and time');
    if (!data.event.trim()) errors.push('Please describe your date plan');
    
    // Check if the date is in the future (comparing in local timezone)
    if (data.time) {
      // Convert the datetime-local input to a proper date for comparison
      const selectedDate = new Date(data.time);
      const now = new Date();
      if (selectedDate <= now) {
        errors.push('Please select a future date and time');
      }
    }
    
    return errors;
  };

  const handleCreateInvitation = async (data) => {
    // Validate form data
    const validationErrors = validateFormData(data);
    if (validationErrors.length > 0) {
      alert('Please fix the following errors:\n• ' + validationErrors.join('\n• '));
      return;
    }

    setIsSubmitting(true);
    console.log('🚀 Creating invitation...');
    console.log('📝 Form data:', data);
    
    try {
      let invitationId;
      
      if (isSupabaseConnected) {
        // Use Supabase database - data will be encrypted in createInvitation
        const invitationData = {
          to: data.to,
          from: data.from,
          time: data.time,
          event: data.event,
          message: data.message,
          theme: theme
        };
        
        const savedInvitation = await createInvitation(invitationData);
        invitationId = savedInvitation.id;
        console.log('✅ Invitation created in Supabase with ID:', invitationId);
      } else {
        // Fallback to localStorage demo mode - encrypt sensitive data
        invitationId = 'demo-' + Date.now();
        const demoInvitation = {
          id: invitationId,
          to: encryptText(data.to),
          from: encryptText(data.from),
          time: data.time,
          event: encryptText(data.event),
          message: encryptText(data.message),
          theme: theme,
          rsvpStatus: 'pending',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(`invitation-${invitationId}`, JSON.stringify(demoInvitation));
        console.log('💾 Demo invitation stored locally with encryption:', invitationId);
      }
      
      // Generate shareable URL
      const url = `${window.location.origin}/invitation?id=${invitationId}`;
      setInvitationUrl(url);
      setShowLinkModal(true);
      console.log('🔗 Generated shareable link:', url);
    } catch (error) {
      console.error('❌ Error creating invitation:', error);
      alert('Could not create invitation. Please try again. Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      theme
    };
    handleCreateInvitation(data);
  };

  const handleViewDemo = () => {
    // Navigate to demo invitation
    navigate('/invitation?demo=true');
  };

  const handleCloseModal = () => {
    setShowLinkModal(false);
  };

  const toggleThemesView = () => {
    setShowThemes(!showThemes);
  };

  const handleThemeSelect = (newTheme) => {
    // Save current scroll position
    const currentScrollTop = themesScrollRef.current?.scrollTop || 0;
    
    setTheme(newTheme);
    
    // Restore scroll position after state update
    setTimeout(() => {
      if (themesScrollRef.current) {
        themesScrollRef.current.scrollTop = currentScrollTop;
      }
    }, 0);
  };

  // Themes component
  const ThemesView = () => {
    return (
      <div className="px-4 py-8">
        <div className="relative">
          {/* Solid shadow */}
          <div className="absolute inset-0 bg-gray-800 rounded-2xl transform translate-x-2 translate-y-2 opacity-20"></div>
          
          {/* Main themes card */}
          <div className="relative bg-white p-6 rounded-2xl shadow-2xl border-4 border-white">
            <div className="text-center mb-6">
              <h1 className="fancy-font text-3xl mb-2 text-rose-600">Choose Theme</h1>
              <p className="text-base opacity-80">Select your perfect style</p>
            </div>
            
            {/* Scrollable themes container - max height for 4 themes */}
            <div 
              ref={themesScrollRef}
              className="max-h-96 overflow-y-auto overflow-x-hidden pr-2 theme-selector-scrollbar"
            >
              <div className="space-y-4">
                {invitationThemes.map(themeOption => (
                  <div key={themeOption.id} className="relative">
                    {/* Theme card shadow */}
                    <div className="absolute inset-0 bg-gray-600 rounded-xl transform translate-x-1 translate-y-1 opacity-20"></div>
                    
                    {/* Theme card */}
                    <button
                      onClick={() => handleThemeSelect(themeOption.id)}
                      className={`relative w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                        theme === themeOption.id 
                          ? 'bg-blue-50 border-blue-400 shadow-lg' 
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{themeOption.emoji}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-lg">{themeOption.name}</div>
                          <div className="text-gray-600 text-sm">{themeOption.description}</div>
                        </div>
                        {theme === themeOption.id && (
                          <div className="text-blue-500 text-xl">✓</div>
                        )}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Back to form button */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 bg-gray-700 rounded-lg transform translate-x-1 translate-y-1 opacity-30"></div>
              <button
                onClick={toggleThemesView}
                className="relative w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
              >
                ← Back to Form
              </button>
            </div>
          </div>
        </div>
    </div>
    );
  };

  if (loading) {
    return <LoadingMessage message={message} />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Creator Form - Top on mobile, Left on desktop */}
      <div className="w-full lg:w-1/3 flex items-center lg:h-screen overflow-y-auto">
        <div className="w-full p-4">
          {showThemes ? (
            <ThemesView />
          ) : (
            <>
              {/* Themes Toggle Button */}
              <div className="px-4 pt-4">
                <button
                  onClick={toggleThemesView}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 mb-4"
                >
                  🎨 Themes
                </button>
              </div>
              
              <CreatorForm 
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
                formData={formData}
                setFormData={setFormData}
                theme={theme}
                setTheme={setTheme}
                hideThemeSelector={true}
              />
            </>
          )}
        </div>
      </div>

      {/* Preview - Bottom on mobile, Right on desktop */}
      <div className="w-full lg:w-2/3 flex items-center lg:h-screen min-h-screen lg:min-h-0 bg-gray-50">
        <FinalInvitationCard 
          invitation={{
            ...formData,
            theme: theme,
            rsvpStatus: 'pending'
          }}
          isPreview={true}
        />
      </div>

      {/* Demo Button and Status */}
      {/* <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex flex-col gap-2">
        <button
          onClick={handleViewDemo}
          className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View Demo
        </button>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium text-center ${
          isSupabaseConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isSupabaseConnected ? '🟢 Supabase Connected' : '🟡 Demo Mode'}
        </div>
        
        {!isSupabaseConnected && (
          <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-xs max-w-xs">
            <div className="font-medium">🚀 Setup Supabase</div>
            <div>See console for instructions</div>
          </div>
        )}
      </div> */}

      {/* Link Modal */}
      {showLinkModal && invitationUrl && (
        <LinkModal 
          invitationUrl={invitationUrl} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CreatorPageWithPreview;
