import React from 'react';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'rose', name: 'Rose', emoji: '🌹' },
    { id: 'night', name: 'Night', emoji: '🌙' },
    { id: 'mint', name: 'Mint', emoji: '🌿' }
  ];

  return (
    <div>
      <label className="font-semibold">Theme:</label>
      <div className="flex justify-around mt-2 p-1 bg-secondary rounded-xl">
        {themes.map(theme => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onThemeChange(theme.id)}
            className={`w-1/3 p-2 rounded-lg text-sm transition-all ring-2 ${
              currentTheme === theme.id ? 'ring-current' : 'ring-transparent'
            }`}
          >
            {theme.emoji} {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
