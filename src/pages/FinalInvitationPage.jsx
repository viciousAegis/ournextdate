import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FinalInvitationCard from '../components/FinalInvitationCard';
import LoadingMessage from '../components/LoadingMessage';
import { getInvitation, updateRsvp } from '../utils/supabase';

const FinalInvitationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);
  const [message, setMessage] = useState('Loading your final invitation...');

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

        console.log('🔍 Loading final invitation...');
        console.log('🆔 ID:', id);
        console.log('🎭 Demo mode:', demo ? 'Yes' : 'No');

        if (demo) {
          console.log('🎭 Loading demo invitation');
          setInvitation(demoInvitation);
        } else if (id) {
          setMessage('Finding your invitation...');
          
          if (id.startsWith('demo-')) {
            // Demo invitation from localStorage
            console.log('💾 Loading demo invitation from localStorage');
            const storedInvitation = localStorage.getItem(`invitation-${id}`);
            if (storedInvitation) {
              const invitation = JSON.parse(storedInvitation);
              setInvitation(invitation);
            } else {
              throw new Error('Demo invitation not found in storage');
            }
          } else {
            // Real invitation from Supabase
            console.log('☁️ Loading invitation from Supabase');
            const fetchedInvitation = await getInvitation(id);
            setInvitation(fetchedInvitation);
          }
        } else {
          // No ID provided, redirect to creator
          navigate('/');
          return;
        }
      } catch (error) {
        console.error('💥 Error loading final invitation:', error);
        setMessage(error.message || 'Could not load invitation. The link may be invalid or expired.');
        setInvitation(null);
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
        const updatedInvitation = { ...invitation, rsvpStatus: status };
        localStorage.setItem(`invitation-${invitation.id}`, JSON.stringify(updatedInvitation));
        console.log('💾 RSVP saved to localStorage');
      } else {
        // Real invitation - save to Supabase
        console.log('☁️ Saving RSVP to Supabase');
        await updateRsvp(invitation.id, status);
        console.log('✅ RSVP saved to Supabase');
      }
      setInvitation(prev => ({ ...prev, rsvpStatus: status }));
    } catch (error) {
      console.error('💥 Error updating RSVP:', error);
      alert('Could not save your RSVP. Please try again.');
    }
  };

  const handleBackToCards = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete('final');
    navigate(`/invitation?${currentParams.toString()}`);
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
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
          >
            Create Your Own Invitation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={handleBackToCards}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          ← Back to Cards
        </button>
      </div>

      {/* Final Invitation Card */}
      <FinalInvitationCard invitation={invitation} onRsvp={handleRsvp} />
    </div>
  );
};

export default FinalInvitationPage;
