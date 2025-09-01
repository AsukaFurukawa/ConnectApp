import { useState, useRef, useCallback } from 'react';

interface VoiceAssistantState {
  isListening: boolean;
  isSpeaking: boolean;
  isVoiceEnabled: boolean;
  transcript: string;
  error: string | null;
}

export const useVoiceAssistant = () => {
  const [state, setState] = useState<VoiceAssistantState>({
    isListening: false,
    isSpeaking: false,
    isVoiceEnabled: true,
    transcript: '',
    error: null,
  });

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // More reliable settings for better detection
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false; // Changed back to false for more reliable final results
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        console.log('🎤 Speech recognition started - speak now!');
        setState(prev => ({ ...prev, isListening: true, error: null }));
        
        // Auto-stop after 15 seconds if no speech detected (increased timeout)
        setTimeout(() => {
          if (recognitionRef.current && state.isListening) {
            console.log('🎤 Auto-stopping speech recognition (timeout)');
            recognitionRef.current.stop();
          }
        }, 15000);
      };

      recognitionRef.current.onresult = (event: any) => {
        console.log('🎤 Speech recognition result received:', event);
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          console.log('🎤 Final transcript:', finalTranscript);
          setState(prev => ({ ...prev, transcript: finalTranscript }));
          // Auto-stop after getting final result
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('🎤 Speech recognition error:', event.error);
        
        let userFriendlyError = 'Speech recognition error';
        
        switch (event.error) {
          case 'no-speech':
            userFriendlyError = 'No speech detected. Try speaking louder, closer to microphone, or check if microphone is working.';
            break;
          case 'audio-capture':
            userFriendlyError = 'Microphone not found. Please check your microphone connection.';
            break;
          case 'not-allowed':
            userFriendlyError = 'Microphone access denied. Please allow microphone permission.';
            break;
          case 'network':
            userFriendlyError = 'Network error. Please check your internet connection.';
            break;
          case 'service-not-allowed':
            userFriendlyError = 'Speech recognition service not allowed.';
            break;
          case 'aborted':
            userFriendlyError = 'Speech recognition was aborted.';
            break;
          default:
            userFriendlyError = `Speech recognition error: ${event.error}`;
        }
        
        setState(prev => ({ 
          ...prev, 
          isListening: false, 
          error: userFriendlyError 
        }));
      };

      recognitionRef.current.onend = () => {
        console.log('🎤 Speech recognition ended');
        setState(prev => ({ ...prev, isListening: false }));
      };

      recognitionRef.current.onnomatch = () => {
        console.log('🎤 No speech match found');
        setState(prev => ({ 
          ...prev, 
          isListening: false, 
          error: 'No speech recognized. Please try speaking again.' 
        }));
      };
    } else if (typeof window !== 'undefined' && 'SpeechRecognition' in window) {
      // Try standard SpeechRecognition as fallback
      const SpeechRecognition = (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      // Same event handlers as above
      recognitionRef.current.onstart = () => {
        console.log('🎤 Standard SpeechRecognition started - speak now!');
        setState(prev => ({ ...prev, isListening: true, error: null }));
      };

      recognitionRef.current.onresult = (event: any) => {
        console.log('🎤 Standard SpeechRecognition result received');
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          console.log('🎤 Final transcript:', finalTranscript);
          setState(prev => ({ ...prev, transcript: finalTranscript }));
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('🎤 Standard SpeechRecognition error:', event.error);
        setState(prev => ({ 
          ...prev, 
          isListening: false, 
          error: `Speech recognition error: ${event.error}` 
        }));
      };

      recognitionRef.current.onend = () => {
        console.log('🎤 Standard SpeechRecognition ended');
        setState(prev => ({ ...prev, isListening: false }));
      };
    } else {
      setState(prev => ({ 
        ...prev, 
        error: 'Speech recognition not supported in this browser. Please use Chrome, Firefox, or Edge.' 
      }));
    }
  }, [state.isListening]);

  // Start listening
  const startListening = useCallback(() => {
    if (!state.isVoiceEnabled) return;
    
    try {
      // Clear any previous errors
      setState(prev => ({ ...prev, error: null }));
      
      if (!recognitionRef.current) {
        initializeSpeechRecognition();
      }
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to start speech recognition. Please check microphone permissions.' 
      }));
    }
  }, [state.isVoiceEnabled, initializeSpeechRecognition]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setState(prev => ({ ...prev, isListening: false }));
  }, []);

  // Toggle voice input
  const toggleListening = useCallback(() => {
    if (state.isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [state.isListening, startListening, stopListening]);

  // Toggle voice output
  const toggleVoiceEnabled = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isVoiceEnabled: !prev.isVoiceEnabled,
      isListening: false,
      error: null
    }));
  }, []);

  // Speak text using ElevenLabs TTS
  const speak = useCallback(async (text: string) => {
    if (!state.isVoiceEnabled) return;

    try {
      console.log('🔊 Starting TTS for:', text.substring(0, 50) + '...');
      setState(prev => ({ ...prev, isSpeaking: true, error: null }));

      // Abort any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to generate speech');
      }

      const data = await response.json();
      console.log('🔊 TTS response received:', data.success);
      
      if (!data.success) {
        throw new Error(data.error || 'TTS failed');
      }
      
      // Convert base64 to audio
      const audioBlob = new Blob([
        Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))
      ], { type: 'audio/mp3' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('🔊 Audio blob created, playing...');
      
      // Play audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
      } else {
        audioRef.current = new Audio(audioUrl);
        await audioRef.current.play();
      }

      // Set up audio event listeners
      if (audioRef.current) {
        audioRef.current.onended = () => {
          console.log('🔊 Audio playback ended');
          setState(prev => ({ ...prev, isSpeaking: false }));
          URL.revokeObjectURL(audioUrl);
        };
        
        audioRef.current.onerror = (e) => {
          console.error('🔊 Audio playback error:', e);
          setState(prev => ({ 
            ...prev, 
            isSpeaking: false, 
            error: 'Failed to play audio' 
          }));
          URL.revokeObjectURL(audioUrl);
        };
      }

    } catch (error: any) {
      if (error.name === 'AbortError') {
        return;
      }
      
      console.error('🔊 TTS error:', error);
      setState(prev => ({ 
        ...prev, 
        isSpeaking: false, 
        error: `Failed to speak text: ${error.message}` 
      }));
    }
  }, [state.isVoiceEnabled]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState(prev => ({ ...prev, isSpeaking: false }));
  }, []);

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setState(prev => ({ ...prev, transcript: '' }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Cleanup
  const cleanup = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    toggleListening,
    toggleVoiceEnabled,
    speak,
    stopSpeaking,
    clearTranscript,
    clearError,
    cleanup,
  };
};
