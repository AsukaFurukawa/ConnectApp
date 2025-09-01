import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId = '21m00Tcm4TlvDq8ikWAM' } = await request.json(); // Default voice ID

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required for TTS' },
        { status: 400 }
      );
    }

    console.log('Generating speech for:', text.substring(0, 50) + '...');
    console.log('Using voice ID:', voiceId);

    // Import ElevenLabsClient correctly
    const { ElevenLabsClient } = await import('@elevenlabs/elevenlabs-js');
    const elevenlabs = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY!,
    });

    // Generate speech using ElevenLabs - Handle ReadableStream properly
    const audioStream = await elevenlabs.textToSpeech.convert(voiceId, {
      text,
      modelId: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
      },
    });

    // Convert ReadableStream to Buffer
    const chunks = [];
    const reader = audioStream.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    
    const audioBuffer = Buffer.concat(chunks);
    console.log('Audio generated successfully, size:', audioBuffer.length);

    // Convert to base64 for easy transmission
    const base64Audio = Buffer.from(audioBuffer).toString('base64');

    return NextResponse.json({ 
      audio: base64Audio,
      format: 'mp3',
      voiceId: voiceId,
      success: true
    });

  } catch (error) {
    console.error('Voice API error:', error);
    
    // Return a more detailed error message
    return NextResponse.json(
      { 
        error: 'Failed to generate speech',
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}
