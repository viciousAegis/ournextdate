import React, { useState } from 'react';

const LinkDisplay = ({ invitationId }) => {
  const [copied, setCopied] = useState(false);
  
  const baseUrl = window.location.origin;
  const link = `${baseUrl}/invitation?id=${invitationId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-4 border-t border-themed">
      <p className="text-center font-semibold">Link Ready! Copy and send it:</p>
      <div className="mt-2 relative">
        {/* Solid shadow */}
        <div className="absolute inset-0 bg-gray-600 rounded-lg transform translate-x-1 translate-y-1 opacity-20"></div>
        
        {/* Link container */}
        <div className="relative flex items-center bg-secondary p-2 rounded-lg shadow-lg border-2 border-white">
          <input
            type="text"
            value={link}
            className="w-full bg-transparent outline-none"
            readOnly
          />
          <div className="relative ml-2">
            {/* Button shadow */}
            <div className="absolute inset-0 bg-gray-700 rounded-md transform translate-x-0.5 translate-y-0.5 opacity-30"></div>
            
            {/* Copy button */}
            <button
              onClick={copyLink}
              className="relative px-3 py-1 btn-primary text-white font-semibold rounded-md shadow-lg"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkDisplay;
