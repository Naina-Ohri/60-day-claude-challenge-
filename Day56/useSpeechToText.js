import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * useSpeechToText
 * Wraps the browser's native SpeechRecognition API (free, no external
 * service). Feature-detects support and degrades silently on unsupported
 * browsers (e.g. Firefox) — callers should hide the mic button when
 * `isSupported` is false.
 */
export default function useSpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsSupported(true);

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setTranscript('');
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch {
      // Ignore "already started" errors from rapid double-clicks
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => setTranscript(''), []);

  return { isListening, isSupported, transcript, startListening, stopListening, resetTranscript };
}
