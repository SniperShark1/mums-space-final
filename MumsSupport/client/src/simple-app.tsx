import React from 'react';
import './index.css';

function SimpleApp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-pink-500">Mum's Space</h1>
        <p className="text-xl mb-8">A safe, supportive community for mums</p>
        <div className="bg-pink-100 rounded-lg p-6 shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-2">Simple Test Page</h2>
          <p className="mb-4">If you can see this, the basic page is working correctly!</p>
        </div>
      </div>
    </div>
  );
}

export default SimpleApp;