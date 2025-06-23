import React, { useState } from 'react';

const LinkModal = ({ invitationUrl, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success icon */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invitation Created!</h2>
          <p className="text-gray-600">Your date night invitation is ready to share</p>
        </div>

        {/* Link section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share this link:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={invitationUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => window.open(invitationUrl, '_blank')}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            Preview Invitation
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            Close
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            💡 Tip: Send this link to your special someone!
          </p>
          <p className="text-xs text-orange-600 mt-1">
            ⏰ This link expires in 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
