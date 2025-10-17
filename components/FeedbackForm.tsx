import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && feedback) {
      console.log({ name, email, feedback });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-8 bg-green-50 dark:bg-green-900 border-l-4 border-green-500 rounded-r-lg">
        <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">Thank you!</h3>
        <p className="mt-2 text-lg text-green-700 dark:text-green-300">Your feedback has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-accent focus:border-accent bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-accent focus:border-accent bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <div>
        <label htmlFor="feedback" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
          Feedback
        </label>
        <textarea
          id="feedback"
          rows={5}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-accent focus:border-accent bg-gray-50 dark:bg-gray-700"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 text-lg font-semibold text-white bg-accent rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
