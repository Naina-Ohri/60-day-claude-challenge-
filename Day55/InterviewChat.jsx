import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ChatBubble from '../components/ChatBubble';
import apiClient from '../lib/apiClient';

/**
 * InterviewChat Page (/interview/:sessionId)
 * Day 5 scope: chat-bubble shell showing questions one at a time, wired to
 * POST /api/interview/answer to advance session state.
 * Full polish (voice input, skip/end-early, results redirect) is Day 6-7 scope.
 */
export default function InterviewChat() {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { role, current_question: initialQuestion, total_questions } = location.state || {};

  const [messages, setMessages] = useState(
    initialQuestion ? [{ sender: 'bot', text: initialQuestion.question }] : []
  );
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion || null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!initialQuestion) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center text-gray-500">
        <p>No active interview found. Please start a new interview.</p>
        <button
          type="button"
          onClick={() => navigate('/interview')}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to Role Selection
        </button>
      </div>
    );
  }

  const handleSubmitAnswer = async () => {
    if (!inputValue.trim() || !currentQuestion) return;

    setIsSubmitting(true);
    const answerText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: answerText }]);
    setInputValue('');

    try {
      const res = await apiClient.post('/interview/answer', {
        session_id: sessionId,
        question_id: currentQuestion.id,
        answer_text: answerText,
      });

      const { complete, next_question } = res.data.data;
      setAnsweredCount((prev) => prev + 1);

      if (complete) {
        setIsComplete(true);
        setCurrentQuestion(null);
        toast.success('Interview complete! Scoring lands on Day 7.');
      } else {
        setCurrentQuestion(next_question);
        setMessages((prev) => [...prev, { sender: 'bot', text: next_question.question }]);
      }
    } catch (err) {
      const message = err?.response?.data?.error || 'Could not submit your answer. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAnswer();
    }
  };

  return (
    <div className="mx-auto flex h-[80vh] max-w-2xl flex-col px-4 py-6">
      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
        <h1 className="text-lg font-semibold text-gray-900">Mock Interview — {role}</h1>
        <span className="text-sm text-gray-500">
          {isComplete ? 'Complete' : `Q${answeredCount + 1} of ${total_questions}`}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pb-4">
        {messages.map((m, idx) => (
          <ChatBubble key={idx} sender={m.sender} text={m.text} />
        ))}
      </div>

      {!isComplete ? (
        <div className="flex items-end gap-2 border-t border-gray-100 pt-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Type your answer…"
            rows={2}
            className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSubmitAnswer}
            disabled={isSubmitting || !inputValue.trim()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Sending…' : 'Send'}
          </button>
        </div>
      ) : (
        <div className="flex justify-center border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
