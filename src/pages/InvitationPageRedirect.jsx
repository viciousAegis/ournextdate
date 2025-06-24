import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoadingMessage from '../components/LoadingMessage';
import { getInvitation } from '../utils/supabase';

const InvitationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const init = async () => {
      try {
        const id = searchParams.get('id');
        const demo = searchParams.get('demo');

        console.log('🔍 Loading invitation...');
        console.log('🆔 ID:', id);
        console.log('🎭 Demo mode:', demo ? 'Yes' : 'No');

        // Build the final invitation URL with the same parameters
        const currentParams = new URLSearchParams(searchParams);
        
        if (demo) {
          console.log('🎭 Redirecting to demo final invitation');
        } else if (id) {
          if (id.startsWith('demo-')) {
            console.log('💾 Redirecting to localStorage demo final invitation');
          } else {
            console.log('☁️ Redirecting to Supabase final invitation');
            // Verify the invitation exists first
            await getInvitation(id);
          }
        } else {
          // No ID provided, redirect to creator
          navigate('/');
          return;
        }

        // Redirect to final invitation page
        navigate(`/invitation/final?${currentParams.toString()}`);

      } catch (error) {
        console.error('💥 Error loading invitation:', error);
        setMessage(error.message || 'Could not load invitation. The link may be invalid or expired.');
        setLoading(false);
      }
    };

    init();
  }, [searchParams, navigate]);

  if (loading) {
    return <LoadingMessage message={message} />;
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="relative">
        {/* Solid shadow */}
        <div className="absolute inset-0 bg-gray-800 rounded-2xl transform translate-x-2 translate-y-2 opacity-20"></div>
        
        {/* Error card */}
        <div className="relative text-center p-8 bg-white rounded-2xl shadow-2xl border-4 border-white max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Invitation Not Found</h1>
          <p className="mb-6 text-gray-600">{message}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300"
          >
            Create New Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationPage;
