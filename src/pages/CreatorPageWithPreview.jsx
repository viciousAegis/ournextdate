import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatorForm from '../components/CreatorForm';
import PreviewCard from '../components/PreviewCard';
import LinkModal from '../components/LinkModal';
import LoadingMessage from '../components/LoadingMessage';
import { createInvitation, supabase } from '../utils/supabase';

// Utility functions
const parseYoutubeUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const CreatorPageWithPreview = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Loading...');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [theme, setTheme] = useState('rose');
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    time: '',
    youtube: '',
    event: '',
    message: ''
  });
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
    
    // Check if the date is in the future
    if (data.time && new Date(data.time) <= new Date()) {
      errors.push('Please select a future date and time');
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
        // Use Supabase database
        const invitationData = {
          to_name: data.to,
          from_name: data.from,
          event_time: data.time,
          event_description: data.event,
          message: data.message,
          youtube_url: data.youtube,
          youtube_video_id: parseYoutubeUrl(data.youtube),
          theme: theme
        };
        
        const savedInvitation = await createInvitation(invitationData);
        invitationId = savedInvitation.id;
        console.log('✅ Invitation created in Supabase with ID:', invitationId);
      } else {
        // Fallback to localStorage demo mode
        invitationId = 'demo-' + Date.now();
        const demoInvitation = {
          id: invitationId,
          ...data,
          youtubeVideoId: parseYoutubeUrl(data.youtube),
          theme: theme,
          rsvpStatus: 'pending',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(`invitation-${invitationId}`, JSON.stringify(demoInvitation));
        console.log('💾 Demo invitation stored locally:', invitationId);
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
      theme,
      youtubeVideoId: parseYoutubeUrl(formData.youtube)
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

  if (loading) {
    return <LoadingMessage message={message} />;
  }

  return (
    <div className="flex items-center h-screen">
      {/* Creator Form - Left Side (1/3 width) */}
      <div className="w-1/3 h-full flex items-center overflow-y-auto">
        <div className="w-full">
          <CreatorForm 
            onSubmit={handleFormSubmit}
            isLoading={isSubmitting}
            parseYoutubeUrl={parseYoutubeUrl}
            formData={formData}
            setFormData={setFormData}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
      </div>

      {/* Preview - Right Side (2/3 width) */}
      <div className="w-2/3 h-full flex items-center">
        <PreviewCard 
          formData={formData}
          theme={theme}
          parseYoutubeUrl={parseYoutubeUrl}
        />
      </div>

      {/* Demo Button and Status */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={handleViewDemo}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View Demo
        </button>
        
        {/* Status indicator */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium text-center ${
          isSupabaseConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isSupabaseConnected ? '🟢 Supabase Connected' : '🟡 Demo Mode'}
        </div>
        
        {/* Setup reminder */}
        {!isSupabaseConnected && (
          <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-xs max-w-xs">
            <div className="font-medium">🚀 Setup Supabase</div>
            <div>See console for instructions</div>
          </div>
        )}
      </div>

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
