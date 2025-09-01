# NGO Connect LiveKit Agent

This is a professional voice AI agent built with LiveKit Agents for the NGO Connect app.

## 🚀 Features

- **Real-time voice communication** using WebRTC
- **Professional STT-LLM-TTS pipeline**:
  - **STT**: Deepgram for speech recognition
  - **LLM**: Groq for AI responses
  - **TTS**: ElevenLabs for speech synthesis
- **Turn detection** for natural conversation flow
- **Interruption handling** like ChatGPT
- **Production-ready** with LiveKit Cloud deployment

## 📋 Prerequisites

1. **Python 3.8+** installed
2. **LiveKit Cloud account** with API credentials
3. **API keys** for:
   - Groq (LLM)
   - ElevenLabs (TTS)
   - Deepgram (STT)

## 🛠️ Setup

### 1. Install Python Dependencies

```bash
cd agent
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the agent directory:

```env
# LiveKit Cloud
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret

# AI Services
GROQ_API_KEY=your_groq_key
ELEVENLABS_API_KEY=your_elevenlabs_key
DEEPGRAM_API_KEY=your_deepgram_key
```

### 3. Deploy to LiveKit Cloud

```bash
python deploy.py
```

This will:
- Register your agent as a worker
- Deploy it to LiveKit Cloud
- Make it available for voice conversations

## 🎯 How It Works

1. **User joins LiveKit room** from frontend
2. **Agent automatically joins** as AI participant
3. **Real-time audio streaming** between user and agent
4. **STT-LLM-TTS pipeline** processes conversation:
   - User speaks → Deepgram STT → Groq LLM → ElevenLabs TTS → User hears AI response

## 🔧 Frontend Integration

The frontend uses the `useLiveKitVoice` hook to:
- Connect to LiveKit room
- Stream audio to/from agent
- Handle real-time conversation

## 📱 Usage

1. **Deploy agent** to LiveKit Cloud
2. **Frontend connects** to room
3. **Agent automatically joins** and starts listening
4. **User speaks** and gets AI responses in real-time

## 🌟 Benefits Over Web Speech API

- **Professional quality** voice communication
- **Real-time streaming** with WebRTC
- **Turn detection** and interruption handling
- **Production scalability** with LiveKit Cloud
- **Better reliability** than browser APIs

## 🚨 Troubleshooting

- **Agent not joining**: Check LiveKit credentials and deployment
- **Audio issues**: Verify microphone permissions and WebRTC support
- **Connection errors**: Check network and LiveKit Cloud status

## 📚 Resources

- [LiveKit Agents Documentation](https://docs.livekit.io/agents/)
- [LiveKit Cloud Dashboard](https://cloud.livekit.io/)
- [Voice AI Quickstart](https://docs.livekit.io/agents/quickstart/)
