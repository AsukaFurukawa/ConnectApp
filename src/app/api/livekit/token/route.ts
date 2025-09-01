import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

console.log('✅ LiveKit SDK imported successfully');
console.log('  - AccessToken type:', typeof AccessToken);
console.log('  - AccessToken constructor:', AccessToken);

export async function POST(request: NextRequest) {
  try {
    const { roomName, participantName } = await request.json();

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'Room name and participant name are required' },
        { status: 400 }
      );
    }

    // Get LiveKit credentials from environment
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const livekitUrl = process.env.LIVEKIT_URL;

    if (!apiKey || !apiSecret || !livekitUrl) {
      return NextResponse.json(
        { error: 'LiveKit credentials not configured' },
        { status: 500 }
      );
    }

    // Create access token
    console.log('🔑 Creating AccessToken...');
    console.log('  - API Key:', apiKey?.substring(0, 5) + '...');
    console.log('  - API Secret:', apiSecret?.substring(0, 5) + '...');
    
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      name: participantName,
    });
    
    console.log('  - AccessToken instance created:', at);
    console.log('  - AccessToken methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(at)));

    // Grant permissions for the room
    console.log('🔑 Adding grants...');
    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    // Generate token
    console.log('🔑 Generating JWT...');
    const token = await at.toJwt();  // 🔑 ADDED await!
    
    console.log('🔑 Token generation result:');
    console.log('  - Token type:', typeof token);
    console.log('  - Token value:', token);
    console.log('  - Token length:', token?.length || 'undefined');
    console.log('  - Is string?', typeof token === 'string');
    console.log('  - Is JWT format?', token?.includes('.') && token?.split('.').length === 3);

    console.log(`🔑 Generated LiveKit token for ${participantName} in room ${roomName}`);

    return NextResponse.json({
      token,
      roomName,
      participantName,
      livekitUrl,
    });

  } catch (error) {
    console.error('LiveKit token generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate LiveKit token',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
