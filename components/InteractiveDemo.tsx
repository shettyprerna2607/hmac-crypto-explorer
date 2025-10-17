import React, { useState } from 'react';
import { generateHmac } from '../services/hmacService';
import { KeyIcon, MessageIcon, ShieldIcon } from './Icons';

const InteractiveDemo: React.FC = () => {
  const [message, setMessage] = useState<string>('Welcome to the HMAC demo!');
  const [secretKey, setSecretKey] = useState<string>('a_very_secret_key');
  const [hmac, setHmac] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!message || !secretKey) {
      setError('Message and Secret Key cannot be empty.');
      return;
    }
    setError('');
    setIsLoading(true);
    setHmac('');
    try {
      const generatedHmac = await generateHmac(secretKey, message);
      setHmac(generatedHmac);
    } catch (e) {
      setError('Failed to generate HMAC. See console for details.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MessageIcon /> Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-accent focus:border-accent transition-shadow"
          placeholder="Enter your message here"
        />
      </div>
      <div className="relative">
        <label htmlFor="secretKey" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            <KeyIcon /> Secret Key
        </label>
        <input
          id="secretKey"
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-accent focus:border-accent transition-shadow"
          placeholder="Enter your secret key"
        />
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-accent rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <ShieldIcon /> Generate HMAC
            </>
          )}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {hmac && (
        <div className="mt-8 p-6 bg-green-50 dark:bg-gray-900 border-l-4 border-green-500 rounded-r-lg">
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
            HMAC-SHA256 Result:
          </h3>
          <p className="text-lg text-green-700 dark:text-green-400 break-all font-mono">
            {hmac}
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveDemo;
