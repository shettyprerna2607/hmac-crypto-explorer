import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ title, questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers(Array(questions.length).fill(-1));
    setIsSubmitted(false);
    setScore(0);
  };

  const getOptionClass = (questionIndex: number, optionIndex: number) => {
    if (!isSubmitted) return 'hover:bg-blue-100 dark:hover:bg-gray-700';
    
    const isCorrect = questions[questionIndex].correctAnswer === optionIndex;
    const isSelected = selectedAnswers[questionIndex] === optionIndex;

    if (isCorrect) return 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200';
    if (isSelected && !isCorrect) return 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200';
    
    return 'border-gray-200 dark:border-gray-600';
  };

  return (
    <div className="animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-primary dark:text-accent border-b-4 border-accent pb-3">{title}</h2>
      
      {isSubmitted && (
        <div className="mb-8 p-4 rounded-lg bg-blue-50 dark:bg-gray-700 text-center">
          <h3 className="text-2xl font-bold text-primary dark:text-accent">
            Your score: {score} / {questions.length}
          </h3>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{qIndex + 1}. {q.question}</p>
            <div className="space-y-3">
              {q.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  onClick={() => handleAnswerSelect(qIndex, oIndex)}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${getOptionClass(qIndex, oIndex)}`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={selectedAnswers[qIndex] === oIndex}
                    readOnly
                    className="h-5 w-5 mr-4 accent-accent"
                  />
                  <label className="text-lg">{option}</label>
                </div>
              ))}
            </div>
            {isSubmitted && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-900 rounded-md text-gray-700 dark:text-gray-300">
                <p><strong>Explanation:</strong> {q.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswers.includes(-1)}
            className="px-8 py-3 text-lg font-semibold text-white bg-accent rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 transition-colors"
          >
            Submit Answers
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-8 py-3 text-lg font-semibold text-white bg-secondary rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
