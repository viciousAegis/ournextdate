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
      <div className="mt-2 flex items-center bg-secondary p-2 rounded-lg">
        <input
          type="text"
          value={link}
          className="w-full bg-transparent outline-none"
          readOnly
        />
        <button
          onClick={copyLink}
          className="ml-2 px-3 py-1 btn-primary text-white font-semibold rounded-md"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default LinkDisplay;
