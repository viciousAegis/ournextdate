import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import CreatorForm from '../components/CreatorForm';
import LinkDisplay from '../components/LinkDisplay';
import LoadingMessage from '../components/LoadingMessage';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  // Add your Firebase configuration here
  // This is just a placeholder - you need to add your real config
};

// Utility functions
// Database operations
const createInvitation = async (db, data) => {
  const docRef = await addDoc(collection(db, 'invitations'), {
    ...data,
    rsvpStatus: 'pending',
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

const CreatorPage = () => {
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState(null);
  const [message, setMessage] = useState('Loading...');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitationId, setInvitationId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        // Initialize Firebase only if config is provided
        if (firebaseConfig.apiKey) {
          const app = initializeApp(firebaseConfig);
          const database = getFirestore(app);
          const auth = getAuth(app);
          await signInAnonymously(auth);
          setDb(database);
        }
      } catch (error) {
        console.error('Initialization error:', error);
        setMessage('Could not load the app. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleCreateInvitation = async (data) => {
    setIsSubmitting(true);
    
    try {
      if (db) {
        const newId = await createInvitation(db, data);
        setInvitationId(newId);
      } else {
        // Demo mode - generate mock ID
        const mockId = 'demo-' + Date.now();
        setInvitationId(mockId);
        console.log('Demo mode: Created invitation with mock ID:', mockId);
      }
    } catch (error) {
      console.error('Error creating invitation:', error);
      alert('Could not save invitation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDemo = () => {
    // Navigate to demo invitation
    navigate('/invitation?demo=true');
  };

  if (loading) {
    return <LoadingMessage message={message} />;
  }

  return (
    <div className="animate-fade-in">
      <CreatorForm 
        onSubmit={handleCreateInvitation} 
        isLoading={isSubmitting}
      />
      
      {/* Demo Button */}
      <div className="fixed top-4 right-4">
        <button
          onClick={handleViewDemo}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View Demo
        </button>
      </div>

      {invitationId && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 animate-fade-in">
          <LinkDisplay invitationId={invitationId} />
        </div>
      )}
    </div>
  );
};

export default CreatorPage;
