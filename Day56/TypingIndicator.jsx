import React from 'react';

/**
 * TypingIndicator
 * Shown briefly between questions to simulate a realistic interviewer
 * "thinking" pause. Pure CSS animation, no external dependency.
 */
export default function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-3 shadow-sm">
        <span className="mr-1 text-sm">🤖</span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
      </div>
    </div>
  );
}
