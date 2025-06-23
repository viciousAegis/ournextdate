import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const InvitationView = ({ invitation, onRevealComplete, onRsvp }) => {
  const [openedCards, setOpenedCards] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleOpenFinalInvitation = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('final', 'true');
    navigate(`/invitation/final?${currentParams.toString()}`);
  };

  const handleCardOpen = (cardId) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setOpenedCards(prev => new Set([...prev, cardId]));
      setIsTransitioning(false);
    }, 300);
  };

  const revealCards = [
    {
      id: 'envelope',
      title: '💌',
      subtitle: 'Open the envelope',
      content: {
        title: 'You have an invitation!',
        description: 'Something special awaits you...',
        icon: '💌'
      }
    },
    {
      id: 'recipient',
      title: '�',
      subtitle: 'Who is this for?',
      content: {
        title: `Dear ${invitation.to}`,
        description: 'This is specially for you',
        icon: '✨'
      }
    },
    {
      id: 'invitation-text',
      title: '💕',
      subtitle: 'What\'s the occasion?',
      content: {
        title: 'Date Night Invitation',
        description: 'You\'re invited to something special!',
        icon: '💕'
      }
    },
    {
      id: 'event',
      title: '🎉',
      subtitle: 'What will we do?',
      content: {
        title: invitation.event,
        description: 'Our special activity together',
        icon: '🎉'
      }
    },
    {
      id: 'time',
      title: '⏰',
      subtitle: 'When is it?',
      content: {
        title: formatDate(invitation.time),
        description: 'Mark your calendar!',
        icon: '📅'
      }
    },
    {
      id: 'message',
      title: '💌',
      subtitle: 'A special message',
      content: {
        title: 'From the heart',
        description: invitation.message || 'A special message awaits...',
        icon: '💝'
      }
    }
  ];

  return (
    <div className={`invitation-container bg-gradient-to-br from-gray-50 to-blue-50 themed theme-${invitation.theme || 'rose'}`}>
      {/* Compact Header */}
      <div className="text-center py-4 px-4 flex-shrink-0">
        <h1 className="fancy-font text-2xl md:text-4xl text-primary mb-2">
          Your Invitation Awaits
        </h1>
        <p className="text-sm md:text-base opacity-80 mb-3">
          Open each card to reveal your special date night
        </p>
        
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2">
          {revealCards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 ${
                openedCards.has(revealCards[index].id) ? 'bg-accent scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Full Screen Cards Grid */}
      <div className="invitation-grid">
        {revealCards.map((card) => {
          const isOpened = openedCards.has(card.id);
          
          return (
            <div
              key={card.id}
              className={`
                invitation-card shadow-lg transform transition-all duration-700 hover:scale-105
                ${isOpened 
                  ? 'bg-white border-2 border-accent' 
                  : 'bg-gradient-to-br from-accent/20 to-accent/40 hover:from-accent/30 hover:to-accent/50'
                }
                ${isTransitioning ? 'pointer-events-none' : ''}
              `}
              onClick={() => !isOpened && handleCardOpen(card.id)}
            >
              {!isOpened ? (
                // Closed card state
                <>
                  <div className="text-2xl md:text-4xl mb-2 animate-pulse">
                    {card.title}
                  </div>
                  <p className="text-xs md:text-sm opacity-80 font-medium mb-1">
                    {card.subtitle}
                  </p>
                  <div className="text-xs opacity-60">
                    Tap to open
                  </div>
                </>
              ) : (
                // Opened card state
                <div className="animate-fade-in space-y-2">
                  <div className="text-3xl md:text-5xl animate-bounce">
                    {card.content.icon}
                  </div>
                  <h3 className="fancy-font text-sm md:text-lg text-primary font-bold">
                    {card.content.title}
                  </h3>
                  <p className="text-xs md:text-sm opacity-80 leading-tight">
                    {card.content.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final card hint */}
      {openedCards.size === revealCards.length && (
        <div className="text-center pb-4 animate-fade-in flex-shrink-0">
          <div className="text-3xl md:text-5xl animate-bounce mb-4">🎊</div>
          <p className="text-sm md:text-lg opacity-80 mb-6">
            All cards opened! Ready to see your full invitation?
          </p>
          <button
            onClick={handleOpenFinalInvitation}
            className="final-invitation-btn celebration-glow px-8 py-4 text-white rounded-2xl font-bold text-lg transition-all duration-300 animate-pulse"
          >
            🎉 Open Final Invitation 🎉
          </button>
        </div>
      )}
    </div>
  );
};

export default InvitationView;
