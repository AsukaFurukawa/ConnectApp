import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs voice IDs for different languages
const VOICE_IDS = {
  english: {
    default: 'TRnaQb7q41oL7sV0w6Bu', // User's preferred voice
    male: 'TRnaQb7q41oL7sV0w6Bu', // User's preferred voice
    female: 'TRnaQb7q41oL7sV0w6Bu', // User's preferred voice
  },
  hindi: {
    default: 'TRnaQb7q41oL7sV0w6Bu', // User's preferred voice (test if it handles Hindi)
    male: 'TRnaQb7q41oL7sV0w6Bu', // User's preferred voice
    female: 'TRnaQb7q41oL7sV0w6Bu', // User's preferred voice
  }
};

export async function POST(request: NextRequest) {
  try {
    const { text, language = 'en', voiceType = 'default' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
    }

    // Select voice based on language and type
    const voiceId = VOICE_IDS[language as keyof typeof VOICE_IDS]?.[voiceType as keyof typeof VOICE_IDS.english] || 
                   VOICE_IDS.english.default;

    // Optimize text length to save credits - truncate if too long
    let optimizedText = text;
    const maxLength = 500; // Limit to 500 characters to save credits
    if (text.length > maxLength) {
      optimizedText = text.substring(0, maxLength) + '...';
      console.log(`🎤 ElevenLabs TTS: Text truncated from ${text.length} to ${optimizedText.length} characters to save credits`);
    }

    console.log(`🎤 ElevenLabs TTS: Converting "${optimizedText.substring(0, 50)}..." to ${language} using voice ${voiceId}`);

    // ElevenLabs API call
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: optimizedText,
        model_id: 'eleven_multilingual_v2', // Multilingual model for Hindi/English
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ ElevenLabs API error:', response.status, errorText);
      
      // Check if it's a quota exceeded error
      if (response.status === 401 && errorText.includes('quota_exceeded')) {
        console.warn('⚠️ ElevenLabs quota exceeded - consider upgrading plan or using fallback TTS');
      }
      
      return NextResponse.json({ 
        error: `ElevenLabs API error: ${response.status}`,
        details: errorText,
        quotaExceeded: response.status === 401 && errorText.includes('quota_exceeded')
      }, { status: response.status });
    }

    // Get audio data
    const audioBuffer = await response.arrayBuffer();
    
    console.log(`✅ ElevenLabs TTS: Successfully generated ${audioBuffer.byteLength} bytes of audio`);

    // Return audio as base64 for easy handling
    const base64Audio = Buffer.from(audioBuffer).toString('base64');

    return NextResponse.json({
      success: true,
      audio: base64Audio,
      format: 'audio/mpeg',
      voiceId: voiceId,
      language: language,
      textLength: text.length
    });

  } catch (error) {
    console.error('❌ ElevenLabs TTS error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate speech',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
