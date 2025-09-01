// LiveKit Configuration
export const LIVEKIT_CONFIG = {
  // Use the same environment variable name as the API
  URL: process.env.LIVEKIT_URL || 'vodexample-zud117s2.livekit.cloud',
  
  // Room configuration
  DEFAULT_ROOM: 'ngo-connect-room',
  
  // Agent identity
  AGENT_IDENTITY: 'ai-assistant',
  
  // Connection options
  CONNECTION_OPTIONS: {
    adaptiveStream: true,
    dynacast: true,
    publishDefaults: {
      simulcast: true,
    },
  },
};

// Helper function to get full LiveKit URL
export const getLiveKitUrl = (): string => {
  const url = LIVEKIT_CONFIG.URL;
  if (url.startsWith('wss://') || url.startsWith('ws://')) {
    return url;
  }
  return `wss://${url}`;
};
