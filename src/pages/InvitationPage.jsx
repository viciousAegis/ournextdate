import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import InvitationView from '../components/InvitationView';
import FinalInvitationCard from '../components/FinalInvitationCard';
import LoadingMessage from '../components/LoadingMessage';
import { getInvitation, updateRsvp } from '../utils/supabase';
import { decryptText } from '../utils/encryption';

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
        console.log('🎭 Demo mode:', demo ? 'Yes' : 'No');

        if (demo) {
          console.log('🎭 Loading demo invitation');
          setInvitation(demoInvitation);
        } else if (encodedData) {
          console.log('� Decoding invitation data...');
          
          try {
            const decodedInvitation = decodeInvitationData(encodedData);
            
            // Check for existing RSVP in localStorage
            const existingRsvp = getRsvpFromLocalStorage(decodedInvitation.id);
            if (existingRsvp) {
              decodedInvitation.rsvpStatus = existingRsvp.status;
              console.log('📝 Found existing RSVP:', existingRsvp.status);
            }
            
            setInvitation(decodedInvitation);
            console.log('✅ Invitation loaded successfully');
          } catch (error) {
            console.error('❌ Failed to decode invitation:', error);
            setMessage(error.message || 'Invalid invitation link');
          }
        } else {
          // No data provided, redirect to creator
          console.log('🔄 No invitation data provided, redirecting to creator');
          navigate('/');
          return;
        }
      } catch (error) {
        console.error('❌ Error loading invitation:', error);
        setMessage('Could not load the invitation. Please check the link and try again.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [searchParams, navigate]);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invitation Not Found</h1>
          <p className="mb-6">{message}</p>
          <button
            onClick={handleBackToCreator}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
          >
            Create Your Own Invitation
          </button>
        </div>
      </div>
    );
  }

  if (showFinalCard) {
    return (
      <div className="w-full">
        <FinalInvitationCard invitation={invitation} onRsvp={handleRsvp} />
        {searchParams.get('demo') && (
          <div className="fixed top-4 left-4">
            <button
              onClick={handleBackToCreator}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              ← Back to Creator
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <InvitationView 
        invitation={invitation} 
        onRevealComplete={handleRevealComplete}
        onRsvp={handleRsvp} 
      />
      {searchParams.get('demo') && (
        <div className="fixed top-4 left-4">
          <button
            onClick={handleBackToCreator}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105 z-50"
          >
            ← Back to Creator
          </button>
        </div>
      )}
    </div>
  );
};

export default InvitationPage;
