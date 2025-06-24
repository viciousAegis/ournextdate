import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import { formatDateTimeLocal } from '../utils/encryption';

const CreatorForm = ({ onSubmit, isLoading, formData, setFormData, theme, setTheme, onFormChange, hideThemeSelector = false }) => {
  // Get tomorrow's date at 7 PM as placeholder, preserving timezone
  const getTomorrowDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(19, 0, 0, 0); // 7:00 PM in local timezone
    return formatDateTimeLocal(tomorrow);
  };

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
      <div className="relative">
        {/* Solid shadow */}
        <div className="absolute inset-0 bg-gray-800 rounded-2xl transform translate-x-2 translate-y-2 opacity-20"></div>
        
        {/* Main form card */}
        <div className={`relative themed theme-${theme} p-6 rounded-2xl shadow-2xl transition-all duration-500 border-4 border-white bg-white`}>
        <div className="text-center mb-6">
          <h1 className="fancy-font text-3xl mb-2">OurNextDate</h1>
          <p className="text-base opacity-80">Create Your Invitation</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          {!hideThemeSelector && (
            <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
          )}
          
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
            value={formData.time || getTomorrowDateTime()}
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
          
          <div className="flex gap-4 pt-2">
            <div className="relative flex-1">
              {/* Submit button shadow */}
              <div className="absolute inset-0 bg-gray-700 rounded-lg transform translate-x-1 translate-y-1 opacity-30"></div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg text-lg"
              >
                {isLoading ? 'Creating...' : 'Create Invitation'}
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreatorForm;
