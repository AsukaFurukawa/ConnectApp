# 🚀 LiveKit AI Agent Deployment Guide

## 📋 Prerequisites
- ✅ LiveKit Cloud account
- ✅ LiveKit project: `vodexample-zud117s2`
- ✅ API keys for Groq and ElevenLabs

## 🌐 Step 1: Access LiveKit Cloud Dashboard
1. Go to: https://cloud.livekit.io/
2. Sign in to your account
3. Select your project: `vodexample-zud117s2`

## 🤖 Step 2: Create a New Agent
1. In the left sidebar, click **"Agents"**
2. Click **"Create Agent"** or **"New Agent"**
3. Fill in the details:
   - **Name**: `ngo-connect-ai-agent`
   - **Description**: `AI assistant for NGO Connect app`
   - **Identity**: `ai-assistant`

## 📁 Step 3: Upload Agent Code
1. **Option A: Use the provided code**
   - Copy the code from `livekit_agent.py`
   - Paste it into the code editor in LiveKit Cloud

2. **Option B: Upload file**
   - Click "Upload File"
   - Select `livekit_agent.py`

## 🔑 Step 4: Set Environment Variables
Add these environment variables in the LiveKit Cloud dashboard:

```
GROQ_API_KEY=your_groq_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

## ⚙️ Step 5: Configure Agent Settings
1. **Room Name**: `ngo-connect-room`
2. **Auto-join**: Enable
3. **Permissions**: Allow all audio operations

## 🚀 Step 6: Deploy the Agent
1. Click **"Deploy"** or **"Save"**
2. Wait for the agent to start
3. Check the logs to ensure it's running

## 🎯 Step 7: Test the Agent
1. Go back to your NGO Connect app
2. Click the microphone button
3. Speak something like: "Hello, how can you help me?"
4. The AI should respond with speech!

## 🔍 Troubleshooting
- **Agent not joining room**: Check room name and permissions
- **No speech response**: Verify ElevenLabs API key
- **No AI response**: Verify Groq API key
- **Connection issues**: Check LiveKit Cloud status

## 📞 Support
- LiveKit Documentation: https://docs.livekit.io/agents/
- LiveKit Community: https://discord.gg/livekit

## 🎉 What Happens After Deployment
1. **AI Agent joins** the `ngo-connect-room` as `ai-assistant`
2. **Listens to your voice** via microphone
3. **Converts speech to text** using Whisper
4. **Generates AI response** using Groq
5. **Converts response to speech** using ElevenLabs
6. **Sends audio back** to you

Your voice assistant will now be fully functional! 🎤🤖✨
