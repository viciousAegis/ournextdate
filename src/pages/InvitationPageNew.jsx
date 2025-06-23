import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import InvitationView from '../components/InvitationView';
import FinalInvitationCard from '../components/FinalInvitationCard';
import LoadingMessage from '../components/LoadingMessage';
import { getInvitation, updateRsvp } from '../utils/supabase';

const InvitationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);
  const [message, setMessage] = useState('Loading...');
  const [showFinalCard, setShowFinalCard] = useState(false);

  // Demo invitation data
  const demoInvitation = {
    id: 'demo-123',
    to: 'Sarah',
    from: 'Alex',
    time: '2025-06-28T19:30',
    event: 'Sunset picnic with homemade treats',
    message: "Can't wait to spend this special time with you ❤️",
    theme: 'rose',
    youtubeVideoId: 'dQw4w9WgXcQ', // Rick Roll for demo
    rsvpStatus: 'pending'
  };

  useEffect(() => {
    const init = async () => {
      try {
        const id = searchParams.get('id');
        const demo = searchParams.get('demo');

        console.log('🔍 Loading invitation...');
        console.log('🆔 ID:', id);
        console.log('🎭 Demo mode query param:', demo ? 'Yes' : 'No');

        // Priority 1: Real invitation from Supabase
        if (id && !id.startsWith('demo-')) {
          setMessage('Finding your invitation...');
          const fetchedInvitation = await getInvitation(id);
          setInvitation(fetchedInvitation);
        // Priority 2: Demo invitation from localStorage
        } else if (id && id.startsWith('demo-')) {
          console.log('💾 Loading demo invitation from localStorage');
          const storedInvitation = localStorage.getItem(`invitation-${id}`);
          if (storedInvitation) {
            setInvitation(JSON.parse(storedInvitation));
          } else {
            throw new Error('Demo invitation not found in storage.');
          }
        // Priority 3: Generic demo for testing
        } else if (demo) {
          console.log('🎭 Loading generic demo invitation');
          setInvitation(demoInvitation);
        } else {
          throw new Error('No invitation ID provided.');
        }

      } catch (error) {
        console.error('💥 Error loading invitation:', error);
        setMessage(error.message || 'Could not load invitation. The link may be invalid or expired.');
        setInvitation(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [searchParams]);

  const handleRsvp = async (status) => {
    if (!invitation) return;

    console.log('📝 RSVP status change:', status, 'for invitation:', invitation.id);

    try {
      if (invitation.id.startsWith('demo-')) {
        // Demo invitation - save to localStorage
        console.log('💾 Updating demo RSVP in localStorage...');
        const updatedInvitation = { ...invitation, rsvpStatus: status };
        localStorage.setItem(`invitation-${invitation.id}`, JSON.stringify(updatedInvitation));
        console.log('✅ Demo RSVP updated in localStorage');
      } else {
        // Real Supabase invitation
        console.log('💾 Updating RSVP in Supabase...');
        await updateRsvp(invitation.id, status);
        console.log('✅ RSVP updated in Supabase');
      }
      
      // Update local state
      setInvitation(prev => ({ ...prev, rsvpStatus: status }));
      console.log('🎉 RSVP status updated locally to:', status);
    } catch (error) {
      console.error('❌ Error updating RSVP:', error);
      console.error('Error details:', error.message);
      alert('Could not save your RSVP. Please try again.');
    }
  };

  const handleRevealComplete = () => {
    setShowFinalCard(true);
  };

  const handleBackToCreator = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingMessage message={message} />;
  }

  if (!invitation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Invitation Not Found</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={handleBackToCreator}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300"
          >
            Create Your Own Invitation
          </button>
        </div>
      </div>
    );
  }

  if (showFinalCard) {
    return (
      <FinalInvitationCard 
        invitation={invitation} 
        onRsvp={handleRsvp}
      />
    );
  }

  return (
    <InvitationView 
      invitation={invitation}
      onRsvp={handleRsvp}
      onRevealComplete={handleRevealComplete}
    />
  );
};

export default InvitationPage;
