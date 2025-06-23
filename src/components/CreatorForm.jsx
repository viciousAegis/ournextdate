import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';

const CreatorForm = ({ onSubmit, isLoading, parseYoutubeUrl, formData, setFormData, theme, setTheme, onFormChange }) => {
  const handleInputChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
    if (onFormChange) {
      onFormChange(newFormData, theme);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (onFormChange) {
      onFormChange(formData, newTheme);
    }
  };

  const generateIdea = () => {
    const ideas = [
      "Sunset picnic with homemade treats",
      "Cooking class & dinner for two",
      "Stargazing with hot chocolate",
      "Art gallery & coffee discussion",
      "Beach walk at golden hour",
      "Wine tasting adventure",
      "Dancing lesson & dinner",
      "Hiking with scenic lunch",
      "Movie marathon night",
      "Game night with favorites"
    ];
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    const newFormData = { ...formData, event: randomIdea };
    setFormData(newFormData);
    if (onFormChange) {
      onFormChange(newFormData, theme);
    }
  };

  const generateMessage = () => {
    const messages = [
      "Can't wait to spend this special time with you ❤️",
      "Every moment with you is a treasure 💕",
      "You make every day brighter ✨",
      "Planning something special just for us 🌟",
      "Ready for another beautiful memory together? 🥰",
      "You + Me + Good times = Perfect evening 😍"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const newFormData = { ...formData, message: randomMessage };
    setFormData(newFormData);
    if (onFormChange) {
      onFormChange(newFormData, theme);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className={`themed theme-${theme} p-6 rounded-2xl shadow-lg transition-all duration-500 border border-gray-100 bg-white`}>
        <div className="text-center mb-6">
          <h1 className="fancy-font text-3xl mb-2">Date Night</h1>
          <p className="text-base opacity-80">Create Your Invitation</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
          
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
              placeholder="To: Someone special"
              required
            />
            
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
              placeholder="From: You"
              required
            />
          </div>
          
          <input
            type="datetime-local"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
            required
          />
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <textarea
                name="event"
                rows="2"
                value={formData.event}
                onChange={handleInputChange}
                className="flex-1 p-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none text-gray-700"
                placeholder="What's the plan?"
                required
              />
              <button
                type="button"
                onClick={generateIdea}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                title="Generate random plan"
              >
                🔀
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <textarea
                name="message"
                rows="2"
                value={formData.message}
                onChange={handleInputChange}
                className="flex-1 p-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none text-gray-700"
                placeholder="Sweet message (optional)"
              />
              <button
                type="button"
                onClick={generateMessage}
                className="px-4 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 transition-all text-sm font-medium"
                title="Generate sweet message"
              >
                🎲
              </button>
            </div>
          </div>
          
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleInputChange}
            className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
            placeholder="YouTube URL (optional)"
          />
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Invitation'}
            </button>
            
            <button
              type="button"
              onClick={() => window.open('?demo=true', '_blank')}
              className="px-6 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-all duration-300"
              title="Preview invitation"
            >
              👁️ Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatorForm;
