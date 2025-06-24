import React from 'react';
import { invitationThemes } from '../config/themes';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {

  return (
    <div>
      <label className="font-semibold">Theme:</label>
      <div className="grid grid-cols-2 gap-2 mt-2 p-1 bg-secondary rounded-xl">
        {invitationThemes.map(theme => (
          <div key={theme.id} className="relative">
            {/* Solid shadow */}
            <div className="absolute inset-0 bg-gray-600 rounded-lg transform translate-x-0.5 translate-y-0.5 opacity-20"></div>
            
            {/* Theme button */}
            <button
              type="button"
              onClick={() => onThemeChange(theme.id)}
              className={`relative w-full p-2 rounded-lg text-sm transition-all ring-2 shadow-lg ${
                currentTheme === theme.id ? 'ring-current bg-white' : 'ring-transparent bg-white/80 hover:bg-white'
              }`}
            >
              {theme.emoji} {theme.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
