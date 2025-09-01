import { useState, useRef, useCallback, useEffect } from 'react';
import { Room, RoomEvent, RemoteParticipant, LocalParticipant } from 'livekit-client';
import { getLiveKitUrl } from '../config/livekit';

interface LiveKitVoiceState {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isContinuousMode: boolean;
  isInterrupted: boolean;
  transcript: string;
  error: string | null;
}

export const useLiveKitVoice = () => {
  const [state, setState] = useState<LiveKitVoiceState>({
    isConnected: false,
    isListening: false,
    isSpeaking: false,
    isContinuousMode: false,
    isInterrupted: false,
    transcript: '',
    error: null,
  });

  const roomRef = useRef<Room | null>(null);
  const localParticipantRef = useRef<LocalParticipant | null>(null);
  const agentParticipantRef = useRef<RemoteParticipant | null>(null);
  
  // VAD (Voice Activity Detection) refs for barge-in
  const shouldAutoRestartRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const vadTimerRef = useRef<number | undefined>(undefined);
  
  // Speech queue management
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechQueueRef = useRef<string[]>([]);

  // Connect to LiveKit room
  const connectToRoom = useCallback(async () => {
    try {
      console.log('🚀 Connecting to LiveKit room...');
      
      // Get LiveKit URL
      const livekitUrl = getLiveKitUrl();
      console.log('🔗 LiveKit URL:', livekitUrl);
      
      // Get token from API
      const token = await getLiveKitToken();
      console.log('🔑 About to connect with token:', token);
      
      // Create room
      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
      });
      
      roomRef.current = room;
      
      // Connect to room
      await room.connect(livekitUrl, token);
      console.log('✅ Connected to LiveKit room');
      
      // Get local participant
      const localParticipant = room.localParticipant;
      localParticipantRef.current = localParticipant;
      
      // Set up room event listeners
      room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
        console.log('👥 Participant connected:', participant.identity);
        if (participant.identity === 'agent') {
          agentParticipantRef.current = participant;
        }
      });
      
      room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
        console.log('👥 Participant disconnected:', participant.identity);
        if (participant.identity === 'agent') {
          agentParticipantRef.current = null;
        }
      });

      // Set up LiveKit's built-in ASR
      room.on(RoomEvent.DataReceived, (payload, participant) => {
        if (payload.topic === 'asr' && participant.identity === 'agent') {
          console.log('🎤 LiveKit ASR result received:', payload.data);
          const transcript = payload.data.transcript;
          if (transcript) {
            setState(prev => ({ ...prev, transcript }));
          }
        }
      });
      
      setState(prev => ({ ...prev, isConnected: true, error: null }));
      
    } catch (error) {
      console.error('❌ Failed to connect to LiveKit room:', error);
      setState(prev => ({ 
        ...prev, 
        error: `Failed to connect: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }));
      throw error;
    }
  }, []);

  // Get LiveKit token from API
  const getLiveKitToken = async (): Promise<string> => {
    try {
      console.log('🔑 Requesting LiveKit token...');
      console.log('🔑 API endpoint: /api/livekit/token');
      
      const response = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: 'ngo-connect-room',
          participantName: 'user',
        }),
      });

      console.log('🔑 Token API response status:', response.status);
      console.log('🔑 Token API response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔑 Token API error response:', errorText);
        throw new Error(`Token API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('🔑 Token API response data:', data);
      
      if (!data.token || typeof data.token !== 'string') {
        throw new Error(`Invalid token received: ${JSON.stringify(data)}`);
      }
      
      console.log('🔑 Token received successfully, length:', data.token.length);
      return data.token;
    } catch (error) {
      console.error('❌ Failed to get LiveKit token:', error);
      throw error;
    }
  };

  // Start listening (enable microphone)
  const startListening = useCallback(async (language: string = 'en') => {
    if (!roomRef.current || !localParticipantRef.current) {
      console.log('❌ Not connected to room');
      return;
    }

    try {
      console.log('🎤 Starting microphone...');
      
      // Enable microphone
      await localParticipantRef.current.setMicrophoneEnabled(true);
      
      // Set up real speech recognition
      console.log('🎤 Setting up real speech recognition...');
      
      if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        
        // Set language based on passed parameter
        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        console.log('🎤 Speech recognition language set to:', recognition.lang, 'for language:', language);

        recognition.onstart = () => {
          console.log('🎤 Continuous speech recognition started - always listening!');
          shouldAutoRestartRef.current = true;
          setState(prev => ({ 
            ...prev, 
            isListening: true, 
            error: null,
            isInterrupted: false 
          }));
        };

        recognition.onresult = (event: any) => {
          console.log('🎤 Real speech recognition result received:', event);
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          
          if (finalTranscript) {
            console.log('🎤 Final transcript from your voice:', finalTranscript);
            setState(prev => ({ ...prev, transcript: finalTranscript }));
          }
        };

        recognition.onerror = (event: any) => {
          console.error('🎤 Speech recognition error:', event.error);
          
          // Auto-restart on recoverable errors
          if (['no-speech', 'aborted', 'network'].includes(event.error) && 
              state.isContinuousMode && shouldAutoRestartRef.current) {
            console.log('🎤 Recoverable error - restarting recognition...');
            setTimeout(() => {
              if (shouldAutoRestartRef.current) {
                recognition.start();
              }
            }, 300);
          } else {
            setState(prev => ({ 
              ...prev, 
              isListening: false, 
              error: `Speech recognition error: ${event.error}` 
            }));
          }
        };

        recognition.onend = () => {
          console.log('🎤 Speech recognition ended');
          setState(prev => ({ ...prev, isListening: false }));
          
          // Auto-restart if in continuous mode and not manually stopped
          if (state.isContinuousMode && shouldAutoRestartRef.current) {
            console.log('🎤 Continuous mode: Auto-restarting recognition...');
            setTimeout(() => {
              if (shouldAutoRestartRef.current) {
                recognition.start();
              }
            }, 300);
          }
        };

        // Start real speech recognition
        recognition.start();
        
        // Store the recognition instance for cleanup
        (roomRef.current as any).speechRecognition = recognition;
        
        // Set up Voice Activity Detection for barge-in
        console.log('🎧 Setting up Voice Activity Detection...');
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: { 
              echoCancellation: true, 
              noiseSuppression: true, 
              autoGainControl: true 
            } 
          });
          
          micStreamRef.current = stream;
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          
          const source = audioContextRef.current.createMediaStreamSource(stream);
          const analyser = audioContextRef.current.createAnalyser();
          analyser.fftSize = 2048;
          analyserRef.current = analyser;
          source.connect(analyser);
          
          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          
          const checkVoiceActivity = () => {
            if (!analyserRef.current) return;
            
            analyserRef.current.getByteTimeDomainData(dataArray);
            
            // Calculate RMS (Root Mean Square) for voice activity
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              const value = (dataArray[i] - 128) / 128;
              sum += value * value;
            }
            const rms = Math.sqrt(sum / dataArray.length);
            
            // If voice detected while AI is speaking, interrupt!
            if (rms > 0.08 && state.isSpeaking) {
              console.log('⚡ VAD: User voice detected - interrupting AI!');
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              setState(prev => ({ 
                ...prev, 
                isSpeaking: false, 
                isInterrupted: true 
              }));
            }
            
            // Continue monitoring if in continuous mode
            if (shouldAutoRestartRef.current) {
              vadTimerRef.current = window.requestAnimationFrame(checkVoiceActivity) as unknown as number;
            }
          };
          
          // Start voice activity monitoring
          checkVoiceActivity();
          
          console.log('✅ Voice Activity Detection enabled');
        } catch (vadError) {
          console.warn('⚠️ VAD setup failed, barge-in disabled:', vadError);
        }
        
      } else {
        console.log('🎤 Speech recognition not supported, using fallback...');
        // Fallback to simulated detection
        setTimeout(() => {
          console.log('🎤 Speech detected! (fallback)');
          const mockTranscript = "Hello, this is a fallback message";
          setState(prev => ({ ...prev, transcript: mockTranscript }));
          console.log('🎤 Transcript generated:', mockTranscript);
        }, 3000);
      }
      
      setState(prev => ({ ...prev, isListening: true, error: null }));
      console.log('✅ Microphone enabled with speech detection');
      
    } catch (error) {
      console.error('❌ Failed to enable microphone:', error);
      setState(prev => ({ 
        ...prev, 
        error: `Failed to enable microphone: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }));
    }
  }, []);

  // Stop listening (disable microphone)
  const stopListening = useCallback(async () => {
    if (!localParticipantRef.current) return;

    try {
      console.log('🎤 Stopping microphone and VAD...');
      
      // Stop auto-restart
      shouldAutoRestartRef.current = false;
      
      // Clean up Voice Activity Detection
      if (vadTimerRef.current) {
        cancelAnimationFrame(vadTimerRef.current);
        vadTimerRef.current = undefined;
      }
      
      if (analyserRef.current) {
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
      
      // Clean up speech recognition
      if (roomRef.current && (roomRef.current as any).speechRecognition) {
        (roomRef.current as any).speechRecognition.stop();
        (roomRef.current as any).speechRecognition = null;
        console.log('🎤 Speech recognition stopped');
      }
      
      // Disable microphone
      await localParticipantRef.current.setMicrophoneEnabled(false);
      
      setState(prev => ({ ...prev, isListening: false }));
      console.log('✅ Microphone and VAD disabled');
      
    } catch (error) {
      console.error('❌ Failed to disable microphone:', error);
    }
  }, []);

  // Toggle listening
  const toggleListening = useCallback(async () => {
    if (state.isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  }, [state.isListening, startListening, stopListening]);

  // Toggle continuous listening mode
  const toggleContinuousMode = useCallback(async (language: string = 'en') => {
    const newMode = !state.isContinuousMode;
    
    if (newMode) {
      // Enable continuous mode - connect first, then start listening
      console.log('🎤 Enabling continuous listening mode...');
      
      if (!state.isConnected) {
        console.log('🔗 LiveKit not connected, connecting first...');
        try {
          await connectToRoom();
          // Wait for connection to establish
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error('❌ Failed to connect to LiveKit:', error);
          return; // Don't enable continuous mode if connection fails
        }
      }
      
      // Now start listening with language
      await startListening(language);
      setState(prev => ({ ...prev, isContinuousMode: true }));
      
    } else {
      // Disable continuous mode - stop listening
      console.log('🎤 Disabling continuous listening mode...');
      await stopListening();
      setState(prev => ({ ...prev, isContinuousMode: false }));
    }
  }, [state.isContinuousMode, state.isConnected, connectToRoom, startListening, stopListening]);

  // Speak text using ElevenLabs TTS with fallback to browser TTS
  const speak = useCallback(async (text: string, language: string = 'en') => {
    try {
      console.log('🔊 Starting ElevenLabs TTS for:', text);
      
      // Stop any current speech (ElevenLabs or browser TTS)
      if (state.isSpeaking) {
        console.log('🔇 Stopping current speech to start new one...');
        
        // Stop ElevenLabs audio if playing
        if (currentUtteranceRef.current && currentUtteranceRef.current instanceof HTMLAudioElement) {
          console.log('🔇 Stopping existing ElevenLabs audio...');
          const audio = currentUtteranceRef.current;
          audio.pause();
          audio.currentTime = 0;
          audio.onended = null;
          audio.onerror = null;
          audio.src = '';
          currentUtteranceRef.current = null;
        }
        
        // Stop browser TTS if speaking
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        
        // Clear any pending utterances
        currentUtteranceRef.current = null;
        speechQueueRef.current = [];
      }
      
      setState(prev => ({ ...prev, isSpeaking: true, isInterrupted: false }));
      
      // Try ElevenLabs TTS first
      try {
        console.log('🎤 Attempting ElevenLabs TTS...');
        
        const response = await fetch('/api/elevenlabs/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            language: language,
            voiceType: 'default'
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.success && data.audio) {
            console.log('✅ ElevenLabs TTS successful, playing audio...');
            
            // Convert base64 to audio blob
            const audioData = atob(data.audio);
            const audioArray = new Uint8Array(audioData.length);
            for (let i = 0; i < audioData.length; i++) {
              audioArray[i] = audioData.charCodeAt(i);
            }
            
            const audioBlob = new Blob([audioArray], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Create audio element and play
            const audio = new Audio(audioUrl);
            audio.volume = 1.0;
            
            audio.onplay = () => {
              console.log('🔊 ElevenLabs audio started playing');
            };
            
            audio.onended = () => {
              console.log('🔊 ElevenLabs audio finished');
              setState(prev => ({ ...prev, isSpeaking: false }));
              URL.revokeObjectURL(audioUrl);
              
              // If in continuous mode and not interrupted, restart listening
              if (state.isContinuousMode && !state.isInterrupted) {
                console.log('🎤 TTS finished - restarting listening in continuous mode');
                setTimeout(() => {
                  if (state.isContinuousMode && !state.isListening) {
                    startListening();
                  }
                }, 500);
              }
            };
            
            audio.onerror = (error) => {
              console.error('🔊 ElevenLabs audio error:', error);
              setState(prev => ({ ...prev, isSpeaking: false }));
              URL.revokeObjectURL(audioUrl);
            };
            
            // Store audio element for cleanup
            currentUtteranceRef.current = audio as any;
            
            // Play the audio
            await audio.play();
            return; // Success, exit early
            
          } else {
            console.log('⚠️ ElevenLabs TTS failed, falling back to browser TTS');
          }
        } else {
          console.log('⚠️ ElevenLabs API error, falling back to browser TTS');
        }
      } catch (elevenLabsError) {
        console.log('⚠️ ElevenLabs TTS error, falling back to browser TTS:', elevenLabsError);
      }
      
      // Fallback to browser TTS
      console.log('🔊 Falling back to browser TTS...');
      
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        console.log('🔊 Speech synthesis available, creating utterance...');
        
        // Browser compatibility fix - ensure speech synthesis is ready
        if (window.speechSynthesis.speaking) {
          console.log('🔊 Speech synthesis busy, cancelling current speech...');
          window.speechSynthesis.cancel();
        }
        
        // Wait a bit for browser to be ready (common fix for Chrome/Edge)
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if speech synthesis is working
        if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
          console.log('🔊 Speech synthesis is ready to speak');
        } else {
          console.log('🔊 Speech synthesis busy:', { 
            speaking: window.speechSynthesis.speaking, 
            pending: window.speechSynthesis.pending 
          });
        }
        
        // Create utterance with browser compatibility settings
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1.0;
        
        // Set voice explicitly for reliability
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          // Prefer default voice, fallback to first available
          const voice = voices.find(v => v.default) || voices[0];
          utterance.voice = voice;
          console.log('🔊 Using voice:', voice.name, voice.lang);
        }
        
        // Store current utterance for cleanup
        currentUtteranceRef.current = utterance;
        
        // Set speaking state immediately when we start (more reliable than onstart)
        setState(prev => ({ ...prev, isSpeaking: true }));
        
        utterance.onstart = () => {
          console.log('🔊 Browser TTS started successfully for new message');
          console.log('🔊 Speech synthesis state:', window.speechSynthesis.speaking, window.speechSynthesis.paused);
        };
        
        utterance.onend = () => {
          console.log('🔊 Browser TTS ended successfully');
          setState(prev => ({ ...prev, isSpeaking: false }));
          currentUtteranceRef.current = null;
          
          // If in continuous mode and not interrupted, restart listening
          if (state.isContinuousMode && !state.isInterrupted) {
            console.log('🎤 TTS finished - restarting listening in continuous mode');
            setTimeout(() => {
              if (state.isContinuousMode && !state.isListening) {
                startListening();
              }
            }, 500);
          }
        };
        
        utterance.onerror = (error) => {
          console.error('🔊 Browser TTS error:', error);
          setState(prev => ({ ...prev, isSpeaking: false }));
          currentUtteranceRef.current = null;
        };
        
        // Proper browser speech synthesis (no fallbacks, just reliable approach)
        try {
          // Ensure speech synthesis is ready
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          
          // Start speaking
          window.speechSynthesis.speak(utterance);
          console.log('🔊 Browser TTS speak command sent, synthesis state:', window.speechSynthesis.speaking);
          
        } catch (error) {
          console.error('🔊 Browser speech synthesis error:', error);
          setState(prev => ({ ...prev, isSpeaking: false }));
        }
        
      } else {
        console.log('🔊 TTS not supported, using fallback');
        // Simulate speaking for a few seconds
        setTimeout(() => {
          setState(prev => ({ ...prev, isSpeaking: false }));
        }, 3000);
      }
      
    } catch (error) {
      console.error('❌ Failed to speak:', error);
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, [state.isContinuousMode, state.isInterrupted, state.isListening, startListening]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    console.log('🔇 Stopping all speech and clearing queue...');
    
    // Stop ElevenLabs audio if playing
    if (currentUtteranceRef.current && currentUtteranceRef.current instanceof HTMLAudioElement) {
      console.log('🔇 Stopping ElevenLabs audio...');
      const audio = currentUtteranceRef.current;
      audio.pause();
      audio.currentTime = 0;
      audio.onended = null; // Prevent onended callback
      audio.onerror = null; // Prevent error callback
      audio.src = ''; // Clear source
      currentUtteranceRef.current = null;
      console.log('🔇 ElevenLabs audio stopped and cleaned up');
    }
    
    // Stop browser TTS if speaking
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Cancel current utterance if exists
      if (currentUtteranceRef.current && currentUtteranceRef.current instanceof SpeechSynthesisUtterance) {
        currentUtteranceRef.current.onend = null; // Prevent onend callback
        currentUtteranceRef.current = null;
      }
      
      // Clear speech queue
      speechQueueRef.current = [];
      
      // Stop all speech synthesis
      window.speechSynthesis.cancel();
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
    
    setState(prev => ({ ...prev, isSpeaking: false }));
    console.log('🔊 Speaking stopped and queue cleared');
  }, []);

  // Handle user interruption during TTS
  const handleUserInterruption = useCallback(() => {
    console.log('🔇 User interruption detected - stopping AI and listening');
    
    // Stop any current TTS
    if (state.isSpeaking) {
      stopSpeaking();
      setState(prev => ({ ...prev, isInterrupted: true }));
    }
    
    // Start listening if in continuous mode
    if (state.isContinuousMode && !state.isListening) {
      startListening();
    }
  }, [state.isSpeaking, state.isContinuousMode, state.isListening, stopSpeaking, startListening]);

  // Force stop all speech (for new message priority)
  const forceStopSpeech = useCallback(() => {
    console.log('⚡ Force stopping all speech for new message priority');
    
    // Stop ElevenLabs audio if playing
    if (currentUtteranceRef.current && currentUtteranceRef.current instanceof HTMLAudioElement) {
      console.log('⚡ Force stopping ElevenLabs audio...');
      const audio = currentUtteranceRef.current;
      audio.pause();
      audio.currentTime = 0;
      audio.onended = null;
      audio.onerror = null;
      audio.src = '';
      currentUtteranceRef.current = null;
    }
    
    // Stop browser TTS if speaking
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Immediately cancel everything
      window.speechSynthesis.cancel();
      
      // Clear current utterance
      if (currentUtteranceRef.current && currentUtteranceRef.current instanceof SpeechSynthesisUtterance) {
        currentUtteranceRef.current.onend = null;
        currentUtteranceRef.current = null;
      }
      
      // Clear queue
      speechQueueRef.current = [];
    }
    
    setState(prev => ({ ...prev, isSpeaking: false }));
    console.log('⚡ All speech force stopped');
  }, []);

  // Test audio system
  const testAudio = useCallback(() => {
    console.log('🔊 Testing audio system...');
    
    // Test 1: Simple beep sound
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
      console.log('🔊 Audio test 1: Beep sound played');
    } catch (error) {
      console.error('🔊 Audio test 1 failed:', error);
    }
    
    // Test 2: ElevenLabs TTS test
    speak('Hello! This is a test of ElevenLabs text-to-speech. It should sound much more natural than browser TTS.', 'en');
  }, [speak]);



  // Disconnect from room
  const disconnect = useCallback(async () => {
    if (roomRef.current) {
      console.log('🔌 Disconnecting from LiveKit room...');
      await roomRef.current.disconnect();
      roomRef.current = null;
      localParticipantRef.current = null;
      agentParticipantRef.current = null;
      
      setState(prev => ({ 
        ...prev, 
        isConnected: false, 
        isListening: false, 
        isSpeaking: false 
      }));
      
      console.log('✅ Disconnected from LiveKit room');
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    ...state,
    connectToRoom,
    startListening,
    stopListening,
    toggleListening,
    toggleContinuousMode,
    speak,
    stopSpeaking,
    handleUserInterruption,
    forceStopSpeech,
    testAudio,
    disconnect,
  };
};
