import React, { useState, useEffect } from 'react';
import { formatDisplayDate, generateCalendarUrl } from '../utils/encryption';

const FinalInvitationCard = ({ invitation, onRsvp, isPreview = false }) => {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [countdown, setCountdown] = useState('');

  // Countdown effect
  useEffect(() => {
    if (invitation.rsvpStatus === 'yes' && invitation.time) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const dateTime = new Date(invitation.time).getTime();
        const distance = dateTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown('It\'s time! 🎉');
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [invitation.rsvpStatus, invitation.time]);

  const handleDeclineClick = () => {
    setShowDeclineModal(true);
  };

  const handleModalClose = () => {
    setShowDeclineModal(false);
  };

  const handleAccept = () => {
    setShowDeclineModal(false);
    onRsvp('yes');
  };
  
  // Use timezone-aware calendar URL generation
  const handleCalendarClick = () => {
    const calendarUrl = generateCalendarUrl(invitation);
    window.open(calendarUrl, '_blank');
  };

  // Use timezone-aware date formatting for UTC stored dates
  const formatDate = (utcDateString) => {
    return formatDisplayDate(utcDateString);
  };

  // This function remains the same - status colors are universal
  const getRsvpBadgeClass = (status) => {
    switch (status) {
      case 'yes': return 'bg-pink-100 text-pink-800 border-pink-300';
      case 'no': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  // Format RSVP status for display
  const formatRsvpStatus = (status) => {
    switch (status) {
      case 'yes': return "IT'S A DATE! 💕";
      case 'no': return 'NOT ATTENDING';
      default: return 'PENDING';
    }
  };

  // Dynamically apply the theme class
  const themeClass = `theme-${invitation.theme || 'sunset'}`;

  return (
    // The entire page background is now themed
    <div className={`flex items-center justify-center min-h-screen w-full p-4 ${themeClass} bg-[var(--bg-primary)] transition-colors duration-500`}>
      <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl animate-float">
        {/* Main card with the solid shadow effect */}
        <div className={`relative ${themeClass} solid-shadow rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-8 border-[var(--bg-secondary)] bg-[var(--bg-secondary)]`}>
          
          {/* Decorative border pattern, now using full accent color */}
          <div className="absolute inset-0 border-4 sm:border-8 border-double border-[var(--text-accent)] rounded-xl sm:rounded-2xl pointer-events-none"></div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 relative z-10">
            {/* Left Column - Personal Content (Divider color fixed) */}
            <div className="p-6 lg:p-8 text-center space-y-4 lg:border-r-2 border-[var(--text-accent)] flex flex-col justify-center">
              <div className="w-16 h-1 bg-[var(--text-accent)] mx-auto rounded-full"></div>
              <div className="text-5xl">💕</div>
              <div>
                <h2 className="font-fancy text-3xl xl:text-4xl text-[var(--text-accent)] drop-shadow-sm mb-3">{invitation.to}</h2>
                <p className="font-body text-lg opacity-80 italic">You're invited</p>
              </div>
              
              {invitation.message && (
                <blockquote className="font-body text-lg italic border-l-4 border-[var(--text-accent)] pl-4 my-4 leading-relaxed bg-[var(--bg-primary)] py-3 rounded-r-lg">
                  "{invitation.message}"
                </blockquote>
              )}
              
              <div className="pt-4">
                <p className="font-body text-lg opacity-80 italic">With all my love,</p>
                <h3 className="font-fancy text-2xl xl:text-3xl text-[var(--text-accent)] mt-2 drop-shadow-sm">{invitation.from}</h3>
              </div>
              <div className="w-16 h-1 bg-[var(--text-accent)] mx-auto rounded-full"></div>
            </div>

            {/* Right Column - Event Details & Actions (Divider color fixed) */}
            <div className="p-6 lg:p-8 space-y-6 flex flex-col justify-center relative lg:border-t-0 border-t-2 border-[var(--text-accent)]">
              <div className={`absolute top-4 right-4 text-xs font-bold uppercase px-3 py-2 rounded-full border-2 ${
                isPreview 
                  ? 'bg-yellow-200 text-yellow-800 border-yellow-300'
                  : getRsvpBadgeClass(invitation.rsvpStatus)
              }`}>
                {isPreview ? 'PREVIEW' : formatRsvpStatus(invitation.rsvpStatus)}
              </div>
              
              <div className="text-center pt-4">
                <h1 className="font-fancy text-4xl text-[var(--text-accent)] drop-shadow-sm">OurNextDate</h1>
              </div>

              <div className="bg-[var(--bg-primary)] rounded-lg p-6 border-2 border-[var(--border-color)] text-center shadow-inner">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-body text-2xl font-bold mb-4 leading-tight text-[var(--text-primary)]">{invitation.event}</h3>
                <div className="font-body text-xl font-bold text-[var(--text-accent)] border-t-2 border-[var(--border-color)] pt-4">
                  {formatDate(invitation.time)}
                </div>
              </div>
              
              <div className="space-y-4">
                {!isPreview && invitation.rsvpStatus === 'pending' && (
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleAccept} className="btn btn-accept">
                      ✅ I'll be there!
                    </button>
                    <button onClick={handleDeclineClick} className="btn btn-decline">
                      ❌ Can't make it
                    </button>
                  </div>
                )}

                {!isPreview && invitation.rsvpStatus === 'yes' && countdown && (
                  <div className="text-center bg-[var(--bg-primary)] rounded-lg p-4 border-2 border-[var(--border-color)]">
                    <h4 className="font-bold text-lg text-[var(--text-accent)] mb-2">Countdown to our date! 💕</h4>
                    <div className="font-mono text-2xl font-bold text-[var(--text-primary)]">{countdown}</div>
                  </div>
                )}
                
                {isPreview && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      disabled
                      className="btn btn-accept opacity-70 cursor-not-allowed"
                    >
                      ✅ I'll be there!
                    </button>
                    <button
                      disabled
                      className="btn btn-decline opacity-70 cursor-not-allowed"
                    >
                      ❌ Can't make it
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={isPreview ? undefined : handleCalendarClick} 
                  disabled={isPreview}
                  className={`btn btn-primary w-full flex items-center justify-center gap-2 ${
                    isPreview ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  Add to Calendar
                </button>
              </div>
              
              <div className="text-center pt-4">
                <p className="font-body text-base opacity-70 italic">Can't wait to see you there!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decline Modal */}
      {showDeclineModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {invitation.from} will be sad! 💔
            </h3>
            <p className="text-gray-600 mb-6">
              But we understand if you really can't make it... 😔✨
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Actually, I'll be there! 💕
              </button>
              <button
                onClick={() => {
                  handleModalClose();
                  onRsvp('no');
                }}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Sorry, can't make it 😢
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalInvitationCard;