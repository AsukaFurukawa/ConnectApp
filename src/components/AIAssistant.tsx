'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Volume2, VolumeX, Heart, Languages } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { useLiveKitVoice } from '../hooks/useLiveKitVoice';
import { Canvas } from '@react-three/fiber';

// Dynamically import the 3D scene to prevent hydration errors
const Scene = dynamic(() => import('./GLBKorok').then(mod => ({ default: mod.GLBKorok })), { ssr: false });

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your AI assistant for NGO Connect! How can I help you today? You can ask me about NGOs, how to post requests, Impact XP, or anything else!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [hasProcessedTranscript, setHasProcessedTranscript] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);



  // LiveKit voice integration
              const {
              isConnected: isLiveKitConnected,
              isListening: isLiveKitListening,
              isSpeaking: isLiveKitSpeaking,
              isContinuousMode,
              isInterrupted,
              transcript,
              error: liveKitError,
              connectToRoom,
              startListening,
              stopListening,
              toggleListening: toggleLiveKitListening,
              toggleContinuousMode,
              speak,
              stopSpeaking,
              handleUserInterruption,
              forceStopSpeech,
              testAudio,
              disconnect,
            } = useLiveKitVoice();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText.trim();
    if (!textToSend || isLoading) return;

    // Only stop current speech if we're already speaking (not starting fresh)
    if (isLiveKitSpeaking) {
      console.log('⚡ New message detected - stopping current AI speech immediately');
      forceStopSpeech();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: textToSend,
          language: language 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the AI response using LiveKit TTS
      console.log('🎤 AI response received, would speak:', data.response);
      
      // Auto-speak the AI response
      if (isLiveKitConnected) {
        try {
          // Use ElevenLabs TTS to speak the response with proper language
          console.log('🔊 Starting TTS for AI response...');
          await speak(data.response, language);
        } catch (error) {
          console.error('Failed to speak AI response:', error);
        }
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again!',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset transcript processing flag when transcript changes
  useEffect(() => {
    if (transcript) {
      setHasProcessedTranscript(false);
    }
  }, [transcript]);

  // Handle voice input transcript
  useEffect(() => {
    if (transcript && !isLoading && !hasProcessedTranscript) {
      console.log('🎤 Transcript received in component:', transcript);
      setInputText(transcript);
      setHasProcessedTranscript(true); // Mark as processed
      
      // Auto-send the message after a short delay
      setTimeout(() => {
        console.log('🎤 Auto-sending transcript:', transcript);
        handleSendMessage(transcript);
      }, 1000); // Wait 1 second then send
    }
  }, [transcript, isLoading, hasProcessedTranscript, handleSendMessage]);



  const handleMicToggle = async () => {
    if (!isLiveKitConnected) {
      // First time - connect to LiveKit
      try {
        await connectToRoom();
        // Wait a bit for connection
        setTimeout(async () => {
          await startListening();
        }, 1000);
      } catch (error) {
        console.error('Failed to connect to LiveKit:', error);
        // Fallback to old method
        if (isVoiceEnabled) {
          handleMicToggleOld();
        }
      }
    } else {
      // Already connected - toggle listening
      await toggleLiveKitListening();
    }
  };

  // Keep old method as fallback
  const handleMicToggleOld = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    
    // Restart speech recognition with new language if currently listening
    if (isContinuousMode) {
      console.log('🔄 Language changed, restarting speech recognition with new language:', newLanguage);
      stopListening().then(() => {
        setTimeout(() => {
          toggleContinuousMode(newLanguage);
        }, 500);
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!mounted) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-[#E8F5E9] via-[#E0F2F1] to-[#E1F5FE]">
        <div className="p-4 text-center border-b border-[#A5D6A7]/30 bg-gradient-to-r from-[#A5D6A7]/20 to-[#B1E8D6]/20 backdrop-blur-lg">
          <h1 className="text-xl font-bold gradient-text font-fun">
            AI Assistant
          </h1>
          <p className="text-[#2E7D32] mt-1 font-clean text-sm">Your helpful companion</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#2E7D32] font-clean text-base">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#E0F2F1] to-[#E1F5FE]">
      {/* Header */}
      <motion.div 
        className="p-4 text-center border-b border-[#A5D6A7]/30 bg-gradient-to-r from-[#A5D6A7]/20 to-[#B1E8D6]/20 backdrop-blur-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        suppressHydrationWarning
      >
        <h1 className="text-xl font-bold gradient-text font-fun mb-1">
          AI Assistant
        </h1>
        <p className="text-[#2E7D32] font-clean text-xs">Your helpful companion</p>
      </motion.div>

      {/* 3D Avatar Section */}
      <div className="flex justify-center p-6">
        <motion.div 
          className="w-40 h-40 rounded-full bg-gradient-to-br from-[#A5D6A7]/30 to-[#C8E6C9]/30 border-2 border-[#66BB6A]/50 shadow-pastel-lg relative overflow-hidden"
          animate={{ 
            scale: isLiveKitSpeaking ? [1, 1.05, 1] : 1,
            boxShadow: isLiveKitSpeaking 
              ? "0 0 25px #66BB6A, 0 0 50px #66BB6A" 
              : "0 0 15px #66BB6A, 0 0 30px #66BB6A"
          }}
          transition={{ 
            duration: 0.8, 
            repeat: isLiveKitSpeaking ? Infinity : 0, 
            ease: "easeInOut" 
          }}
          suppressHydrationWarning
        >
          <Canvas>
            <Scene isSpeaking={isLiveKitSpeaking} />
          </Canvas>
        </motion.div>
      </div>

      {/* Enhanced Voice Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* LiveKit Connection Status */}
        <div className={`px-3 py-2 rounded-full text-sm font-medium ${
          isLiveKitConnected 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-orange-100 text-orange-700 border border-orange-300'
        }`}>
          {isLiveKitConnected ? '🔗 LiveKit Connected' : '🔌 LiveKit Disconnected'}
        </div>



        {/* Voice Toggle Button */}
        <motion.button
          onClick={() => toggleContinuousMode(language)}
          className={`relative p-4 rounded-full transition-all duration-300 ${
            isContinuousMode
              ? 'bg-gradient-to-r from-red-400 to-pink-500 shadow-lg scale-110'
              : isLiveKitConnected
                ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:scale-105'
                : 'bg-gradient-to-r from-orange-400 to-yellow-500 hover:scale-105'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isContinuousMode ? (
            <Mic className="w-6 h-6 text-white" />
          ) : (
            <MicOff className="w-6 h-6 text-white" />
          )}
          
          {/* Speaking indicator */}
          {isLiveKitSpeaking && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Language Toggle */}
        <motion.button
          onClick={handleLanguageToggle}
          className="p-3 rounded-full bg-gradient-to-r from-[#A5D6A7]/30 to-[#B1E8D6]/30 border-2 border-[#66BB6A]/50 text-[#2E7D32] hover:shadow-pastel transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          suppressHydrationWarning
        >
          <Languages size={20} />
          <span className="text-xs mt-1 block font-clean">{language === 'en' ? 'EN' : 'हिं'}</span>
        </motion.button>
      </div>

              {/* Enhanced Status Display */}
        <div className="mx-6 mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-100 border border-blue-300 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-blue-700 mb-2">🎤 Voice Status</p>
              <div className="space-y-1 text-blue-600">
                <p>LiveKit: {isLiveKitConnected ? '✅ Connected' : '❌ Disconnected'}</p>
                <p>Voice Mode: {isContinuousMode ? '🎤 Continuous' : '🔇 Manual'}</p>
                <p>Listening: {isLiveKitListening ? '🎧 Active' : '🔇 Inactive'}</p>
                <p>Speaking: {isLiveKitSpeaking ? '🔊 AI Speaking' : '🤐 Silent'}</p>
                {isInterrupted && (
                  <p className="text-orange-600 font-medium">
                    ⚡ Interrupted - Listening for you
                  </p>
                )}
                {!isLiveKitConnected && (
                  <p className="text-orange-600 font-medium mt-2">
                    💡 Click the mic button to connect and enable voice mode
                  </p>
                )}
                
                {/* Audio Test Button */}
                <button
                  onClick={testAudio}
                  className="mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                >
                  🔊 Test Audio
                </button>
              </div>
            </div>
          
          <div>
            <p className="font-medium text-blue-700 mb-2">🔧 System Status</p>
            <div className="space-y-1 text-blue-600">

              <p>Language: {language === 'en' ? '🇺🇸 English' : '🇮🇳 Hindi'}</p>
                             <p>Chat Mode: {isLoading ? '⌨️ Typing' : '🎤 Voice'}</p>
            </div>
          </div>
        </div>
        
        {/* Error Display */}
        {liveKitError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            <p className="font-medium">⚠️ Error:</p>
            <p>{liveKitError}</p>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 space-y-3">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              suppressHydrationWarning
            >
              <div
                className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-[#B1E8D6]/30 to-[#CCF0DF]/30 border border-[#81C784]/50 text-[#2E7D32]'
                    : 'bg-gradient-to-r from-[#A5D6A7]/30 to-[#C8E6C9]/30 border border-[#66BB6A]/50 text-[#2E7D32]'
                } font-readable shadow-pastel backdrop-blur-sm`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-50 mt-2 font-clean">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-xs lg:max-w-md p-3 rounded-2xl bg-gradient-to-r from-[#A5D6A7]/30 to-[#C8E6C9]/30 border border-[#66BB6A]/50 text-[#2E7D32] font-readable shadow-pastel backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#66BB6A] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#66BB6A] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#66BB6A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-6 border-t border-[#A5D6A7]/30 bg-gradient-to-r from-[#A5D6A7]/10 to-[#B1E8D6]/10 backdrop-blur-lg shadow-pastel">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask me anything about NGOs, Impact XP, or the app... (${language === 'en' ? 'English' : 'Hindi'})`}
            className="flex-1 p-3 rounded-full bg-white/70 border border-[#A5D6A7]/50 text-[#2E7D32] placeholder-[#66BB6A]/50 focus:outline-none focus:border-[#66BB6A] focus:shadow-pastel transition-all duration-300 font-readable text-sm backdrop-blur-sm"
            disabled={isLoading}
          />
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="p-3 rounded-full bg-gradient-to-r from-[#66BB6A]/30 to-[#81C784]/30 border border-[#66BB6A]/50 text-[#2E7D32] hover:shadow-pastel disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            whileHover={{ scale: inputText.trim() && !isLoading ? 1.05 : 1 }}
            whileTap={{ scale: inputText.trim() && !isLoading ? 0.95 : 1 }}
            suppressHydrationWarning
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

