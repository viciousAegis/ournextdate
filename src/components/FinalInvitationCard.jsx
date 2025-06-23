import React from 'react';

const FinalInvitationCard = ({ invitation, onRsvp }) => {
  const handleCalendarClick = () => {
    const generateCalendarUrl = (data) => {
      const date = new Date(data.time);
      const startTime = date.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
      const endTime = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Date Night with ' + data.from)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(data.event)}&location=`;
    };
    
    const calendarUrl = generateCalendarUrl(invitation);
    window.open(calendarUrl, '_blank');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const getRsvpBadgeClass = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-200 text-green-800';
      case 'declined': return 'bg-red-200 text-red-800';
      default: return 'bg-yellow-200 text-yellow-800';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4 animate-fade-in">
      {/* The card itself with realistic card styling */}
      <div className="animate-float w-full max-w-4xl">
        {/* Card border and shadow effects */}
        <div className="relative">
          {/* Card shadow/depth */}
          <div className="absolute inset-0 bg-gray-800 rounded-2xl transform translate-x-2 translate-y-2 opacity-20"></div>
          
          {/* Main card */}
          <div className={`relative themed theme-${invitation.theme || 'rose'} rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white`}>
            {/* Decorative border pattern */}
            <div className="absolute inset-0 border-8 border-double border-accent/20 rounded-2xl pointer-events-none"></div>
            
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-4 border-t-4 border-accent/30 rounded-tl-lg"></div>
            <div className="absolute top-3 right-3 w-6 h-6 border-r-4 border-t-4 border-accent/30 rounded-tr-lg"></div>
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-4 border-b-4 border-accent/30 rounded-bl-lg"></div>
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-4 border-b-4 border-accent/30 rounded-br-lg"></div>
            
            <div className="grid md:grid-cols-2 gap-0 relative z-10">
            {/* Left Column - Personal & Romantic Content */}
            <div className="p-6 md:p-8 text-center space-y-4 border-r-2 border-accent/20 flex flex-col justify-center bg-gradient-to-br from-white to-accent/5">
                {/* Decorative top border */}
                <div className="w-16 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
                
                <div className="text-5xl mb-4">💕</div>
                
                <div>
                  <p className="text-lg mb-3 opacity-80 font-serif italic">You're invited</p>
                  <h2 className="fancy-font text-3xl md:text-4xl text-accent mb-4 drop-shadow-sm">{invitation.to}</h2>
                </div>
                
                {invitation.message && (
                  <blockquote className="text-base md:text-lg italic border-l-2 border-accent pl-4 my-4 leading-relaxed bg-accent/5 py-3 rounded-r-lg">
                    "{invitation.message}"
                  </blockquote>
                )}
                
                {invitation.youtubeVideoId && (
                  <div className="my-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-accent/20 shadow-inner">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-2xl">🎵</span>
                        <span className="text-base font-medium opacity-80 font-serif">Our Song</span>
                      </div>
                      <div className="relative overflow-hidden rounded border-2 border-accent/10 bg-black" style={{ height: '60px' }}>
                        <iframe
                          className="w-full"
                          src={`https://www.youtube.com/embed/${invitation.youtubeVideoId}?autoplay=0&mute=0&controls=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&disablekb=1&start=0`}
                          title="Audio player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          style={{
                            height: '240px',
                            marginTop: '-90px',
                            pointerEvents: 'auto'
                          }}
                        />
                      </div>
                      <div className="text-sm text-center mt-2 opacity-60 font-serif italic">
                        Our special song ✨
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="pt-4">
                  <p className="text-lg opacity-80 font-serif italic">With all my love,</p>
                  <h3 className="fancy-font text-2xl md:text-3xl text-accent mt-2 drop-shadow-sm">{invitation.from}</h3>
                </div>
                
                {/* Decorative bottom border */}
                <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
            </div>
            
            {/* Right Column - Event Details & Actions */}
            <div className="p-6 md:p-8 space-y-6 flex flex-col justify-center relative bg-gradient-to-bl from-white to-accent/5">
                <div className={`absolute top-4 right-4 text-xs font-bold uppercase px-3 py-2 rounded-full border-2 ${getRsvpBadgeClass(invitation.rsvpStatus)} shadow-sm`}>
                  {invitation.rsvpStatus}
                </div>
                
                <div className="text-center pt-4">
                  <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
                  <h1 className="fancy-font text-3xl md:text-4xl text-accent mb-6 drop-shadow-sm">Date Night</h1>
                  <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border-2 border-accent/20 text-center shadow-inner">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight text-primary">{invitation.event}</h3>
                  <div className="text-lg md:text-xl font-bold text-accent border-t-2 border-accent/20 pt-4">
                    {formatDate(invitation.time)}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {invitation.rsvpStatus === 'pending' && (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => onRsvp('accepted')}
                        className="btn-primary text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-sm border-2 border-transparent hover:border-white shadow-lg"
                      >
                        ✅ I'll be there!
                      </button>
                      <button
                        onClick={() => onRsvp('declined')}
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all text-sm border-2 border-transparent hover:border-white shadow-lg"
                      >
                        ❌ Can't make it
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={handleCalendarClick}
                    className="w-full flex items-center justify-center gap-2 btn-primary text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-sm border-2 border-transparent hover:border-white shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v4"/>
                      <path d="M16 2v4"/>
                      <rect width="18" height="18" x="3" y="4" rx="2"/>
                      <path d="M3 10h18"/>
                    </svg>
                    Add to Calendar
                  </button>
                </div>
                
                <div className="text-center pt-4">
                  <div className="text-4xl mb-2">🌟</div>
                  <p className="text-base opacity-70 font-serif italic">
                    Can't wait to see you there!
                  </p>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalInvitationCard;
