# 🚀 LiveKit Cloud Deployment Guide

Since the `deploy` module isn't available in the current LiveKit Agents version, here's how to deploy manually:

## 📋 Prerequisites

1. **LiveKit Cloud Account** at [cloud.livekit.io](https://cloud.livekit.io)
2. **Python 3.8+** with all dependencies installed
3. **API keys** configured in `.env`

## 🛠️ Manual Deployment Steps

### 1. Create LiveKit Cloud Project

1. Go to [LiveKit Cloud Dashboard](https://cloud.livekit.io)
2. Create a new project called "ngo-connect"
3. Note down your:
   - **Project URL** (e.g., `wss://your-project.livekit.cloud`)
   - **API Key**
   - **API Secret**

### 2. Update Environment Variables

Create/update `.env` file in the agent directory:

```env
# LiveKit Cloud (from your dashboard)
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key_here
LIVEKIT_API_SECRET=your_api_secret_here

# AI Services
GROQ_API_KEY=your_groq_key
ELEVENLABS_API_KEY=your_elevenlabs_key
DEEPGRAM_API_KEY=your_deepgram_key
```

### 3. Test the Simple Agent

```bash
python simple_agent.py
```

This will verify your API keys are working.

### 4. Deploy to LiveKit Cloud (Manual)

Since the `deploy` module isn't available, you'll need to:

1. **Use LiveKit Cloud's built-in agent hosting**:
   - Go to your project dashboard
   - Look for "Agents" or "Workers" section
   - Upload your agent code or use their template

2. **Or deploy as a separate service**:
   - Host your agent on a cloud platform (Heroku, Railway, etc.)
   - Configure it to connect to your LiveKit Cloud project

## 🔧 Alternative: Use LiveKit's Built-in TTS/ASR

If deployment is complex, you can use LiveKit's built-in features:

```typescript
// In your frontend
import { Room } from 'livekit-client';

const room = new Room();
await room.connect(livekitUrl, token);

// Enable built-in TTS
await room.localParticipant.setMicrophoneEnabled(true);

// Use LiveKit's built-in speech recognition
// This is simpler than custom agents
```

## 📱 Frontend Integration

Your frontend is already set up with:
- ✅ LiveKit client integration
- ✅ Token generation API
- ✅ Real-time voice communication

## 🚨 Current Status

- ❌ **Custom agent deployment** (requires manual setup)
- ✅ **Frontend LiveKit integration** (ready to use)
- ✅ **Token generation** (working)
- ✅ **Basic agent structure** (ready for extension)

## 💡 Next Steps

1. **Test the simple agent** to verify API keys
2. **Set up LiveKit Cloud project** manually
3. **Choose deployment method** (built-in vs custom agent)
4. **Test voice communication** from frontend

## 🆘 Need Help?

- [LiveKit Cloud Documentation](https://docs.livekit.io/cloud/)
- [LiveKit Agents Guide](https://docs.livekit.io/agents/)
- [Community Discord](https://discord.gg/livekit)
