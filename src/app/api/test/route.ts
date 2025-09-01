import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      GROQ_API_KEY: process.env.GROQ_API_KEY ? '✅ Set' : '❌ Missing',
      ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY ? '✅ Set' : '❌ Missing',
      ELEVENLABS_VOICE_ID: process.env.ELEVENLABS_VOICE_ID ? '✅ Set' : '❌ Missing',
      DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY ? '✅ Set' : '❌ Missing',
      LIVEKIT_URL: process.env.LIVEKIT_URL ? '✅ Set' : '❌ Missing',
      LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY ? '✅ Set' : '❌ Missing',
      LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET ? '✅ Set' : '❌ Missing',
    };

    // Test Groq API
    let groqTest = '❌ Not tested';
    if (process.env.GROQ_API_KEY) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [{ role: 'user', content: 'Hello' }],
            max_tokens: 10,
          }),
        });
        groqTest = response.ok ? '✅ Working' : `❌ Error: ${response.status}`;
      } catch (error) {
        groqTest = `❌ Error: ${error instanceof Error ? error.message : 'Unknown'}`;
      }
    }

    // Test ElevenLabs API
    let elevenLabsTest = '❌ Not tested';
    let elevenLabsDetails = '';
    if (process.env.ELEVENLABS_API_KEY) {
      try {
        // Import ElevenLabsClient correctly (same as voice API)
        const { ElevenLabsClient } = await import('@elevenlabs/elevenlabs-js');
        const elevenlabs = new ElevenLabsClient({
          apiKey: process.env.ELEVENLABS_API_KEY,
        });
        
        // Test with a very short text using the correct method from README
        const audioStream = await elevenlabs.textToSpeech.convert('21m00Tcm4TlvDq8ikWAM', { // Default voice ID
          text: 'Hi',
          modelId: 'eleven_multilingual_v2',
        });
        
        // Convert ReadableStream to Buffer for testing
        const chunks = [];
        const reader = audioStream.getReader();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        
        const audioBuffer = Buffer.concat(chunks);
        
        // Debug what we're getting back
        elevenLabsDetails = `Type: ${typeof audioStream}, Length: ${audioStream?.length}, Constructor: ${audioStream?.constructor?.name}, Buffer Length: ${audioBuffer.length}`;
        
        elevenLabsTest = audioBuffer && audioBuffer.length > 0 ? '✅ Working' : '❌ No audio generated';
      } catch (error) {
        elevenLabsTest = `❌ Error: ${error instanceof Error ? error.message : 'Unknown'}`;
        elevenLabsDetails = `Error: ${error instanceof Error ? error.message : 'Unknown'}`;
      }
    }

    return NextResponse.json({
      message: 'API Test Results',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      apiTests: {
        groq: groqTest,
        elevenLabs: elevenLabsTest,
      },
      elevenLabsDetails: elevenLabsDetails,
      recommendations: {
        groq: groqTest.includes('❌') ? 'Check GROQ_API_KEY and internet connection' : 'Groq is working fine',
        elevenLabs: elevenLabsTest.includes('❌') ? 'Check ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID' : 'ElevenLabs is working fine',
        speechRecognition: 'Speech recognition uses browser APIs, not external APIs',
      }
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
