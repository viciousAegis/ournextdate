import React from 'react';

const LoadingMessage = ({ message }) => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="relative">
      {/* Solid shadow */}
      <div className="absolute inset-0 bg-gray-800 rounded-2xl transform translate-x-2 translate-y-2 opacity-20"></div>
      
      {/* Loading card */}
      <div className="relative text-center p-8 bg-white rounded-2xl shadow-2xl border-4 border-white">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-xl text-gray-600">{message}</p>
      </div>
    </div>
  </div>
);

export default LoadingMessage;
