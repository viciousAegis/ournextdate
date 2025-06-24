import React from 'react';

const Footer = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-30 text-center py-3 px-4 text-sm text-gray-600 bg-white/90 backdrop-blur-sm border-t border-gray-200/50 shadow-lg ${className}`}>
      <div className="max-w-4xl mx-auto space-y-1">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <p className="flex items-center gap-2 font-medium">
            Created with <span className="text-red-500 animate-pulse">❤️</span> by{' '}
            <span className="text-gray-800 font-semibold">viciousaegis</span>
          </p>
          <a 
            href="https://github.com/viciousAegis/ournextdate" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
            title="Contribute to OurNextDate on GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Star & Contribute
          </a>
        </div>
        <p className="text-xs opacity-75">
          © {currentYear} OurNextDate. Making date planning special, one invitation at a time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
