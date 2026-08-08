import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';
import useSpeechToText from '../hooks/useSpeechToText';
import apiClient from '../lib/apiClient';

/**
 * InterviewChat Page (/interview/:sessionId)
 * Day 5: sequential Q&A shell wired to POST /api/interview/answer.
 * Day 6 additions: voice-to-text input, Skip/End Interview controls,
 * a typing indicator between questions, and redirect to the Results
 * screen on completion.
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
  const [isThinking, setIsThinking] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const {
    isListening,
    isSupported: voiceSupported,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText();

  // Sync live voice transcript into the text input as the user speaks
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

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

  const goToResults = (finalAnsweredCount) => {
    navigate(`/interview/${sessionId}/results`, {
      state: { role, answeredCount: finalAnsweredCount },
    });
  };

  const advanceToNext = async (submitBody) => {
    setIsSubmitting(true);
    try {
      const res = await apiClient.post('/interview/answer', submitBody);
      const { complete, next_question } = res.data.data;
      const newAnsweredCount = answeredCount + 1;
      setAnsweredCount(newAnsweredCount);

      if (complete) {
        toast.success('Interview complete!');
        goToResults(newAnsweredCount);
        return;
      }

      // Show a brief typing indicator before revealing the next question —
      // makes the pacing feel like a real interviewer, not a form.
      setIsThinking(true);
      setTimeout(() => {
        setCurrentQuestion(next_question);
        setMessages((prev) => [...prev, { sender: 'bot', text: next_question.question }]);
        setIsThinking(false);
      }, 900);
    } catch (err) {
      const message = err?.response?.data?.error || 'Could not submit your answer. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (!inputValue.trim() || !currentQuestion || isSubmitting) return;
    const answerText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: answerText }]);
    setInputValue('');
    resetTranscript();
    advanceToNext({ session_id: sessionId, question_id: currentQuestion.id, answer_text: answerText });
  };

  const handleSkip = () => {
    if (!currentQuestion || isSubmitting) return;
    setMessages((prev) => [...prev, { sender: 'user', text: '(Skipped this question)' }]);
    advanceToNext({
      session_id: sessionId,
      question_id: currentQuestion.id,
      answer_text: '(Candidate skipped this question)',
    });
  };

  const handleEndEarly = () => {
    setIsEnding(true);
    toast('Interview ended early.', { icon: '⏹️' });
    goToResults(answeredCount);
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
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
        <span className="text-sm text-gray-500">Q{answeredCount + 1} of {total_questions}</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pb-4">
        {messages.map((m, idx) => (
          <ChatBubble key={idx} sender={m.sender} text={m.text} />
        ))}
        {isThinking && <TypingIndicator />}
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-3">
        <div className="flex items-end gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting || isThinking}
            placeholder={isListening ? 'Listening…' : 'Type your answer…'}
            rows={2}
            className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          {voiceSupported && (
            <button
              type="button"
              onClick={handleMicToggle}
              disabled={isSubmitting || isThinking}
              title={isListening ? 'Stop recording' : 'Answer by voice'}
              className={`rounded-lg border px-3 py-2 text-sm ${
                isListening
                  ? 'border-red-400 bg-red-50 text-red-600'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              🎤
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmitAnswer}
            disabled={isSubmitting || isThinking || !inputValue.trim()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Sending…' : 'Send'}
          </button>
        </div>

        <div className="flex justify-center gap-4 text-xs">
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting || isThinking}
            className="text-gray-500 underline hover:text-gray-700 disabled:opacity-50"
          >
            Skip question
          </button>
          <button
            type="button"
            onClick={handleEndEarly}
            disabled={isEnding}
            className="text-red-500 underline hover:text-red-700 disabled:opacity-50"
          >
            End interview
          </button>
        </div>
      </div>
    </div>
  );
}
