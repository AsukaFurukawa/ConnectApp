import asyncio
import os
import json
import websockets
import uuid
from dotenv import load_dotenv
import groq
from elevenlabs import generate
import base64
import logging

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LiveKitAIAgent:
    def __init__(self):
        self.agent_id = "ai-assistant"
        self.room_name = "ngo-connect-room"
        self.is_running = False
        
        # API keys
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
        
        # Initialize clients
        if self.groq_api_key:
            self.groq_client = groq.Groq(api_key=self.groq_api_key)
        else:
            self.groq_client = None
            
        print(f"🤖 LiveKit AI Agent initialized")
        print(f"📡 Room: {self.room_name}")
        print(f"🔑 Groq API: {'✅' if self.groq_api_key else '❌'}")
        print(f"🔑 ElevenLabs API: {'✅' if self.elevenlabs_api_key else '❌'}")

    async def process_user_message(self, user_message: str) -> str:
        """Process user message with Groq and return AI response"""
        if not self.groq_client:
            return "I'm sorry, the AI service is not available right now."
            
        try:
            system_prompt = """You are a helpful AI assistant for NGO Connect, an app that helps users connect with NGOs in India. 
            You can help users with:
            - Understanding how to post requests for help
            - Explaining the Impact XP system
            - Providing information about NGOs and their activities
            - General questions about the app
            
            Keep responses friendly, helpful, and concise. You can speak in both English and Hindi."""
            
            response = self.groq_client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=200,
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content
            print(f"💬 User: {user_message}")
            print(f"🤖 AI: {ai_response}")
            return ai_response
            
        except Exception as e:
            print(f"❌ Error processing with Groq: {e}")
            return "I'm sorry, I'm having trouble processing your request right now."

    async def generate_speech(self, text: str) -> bytes:
        """Generate speech from text using ElevenLabs"""
        try:
            audio = generate(
                text=text,
                voice="21m00Tcm4TlvDq8ikWAM",  # Default voice
                model="eleven_multilingual_v2"
            )
            
            print(f"🔊 Generated speech for: {text[:50]}...")
            return audio
            
        except Exception as e:
            print(f"❌ Error generating speech: {e}")
            return b""

    async def start(self):
        """Start the AI agent"""
        self.is_running = True
        print(f"🚀 Starting LiveKit AI Agent...")
        print(f"🌐 Agent will join room: {self.room_name}")
        print(f"💡 This agent will process voice input and respond with speech")
        print(f"📝 To use this agent, you need to deploy it to LiveKit Cloud")
        print(f"🔗 See: https://docs.livekit.io/agents/")
        
        # Keep the agent running
        try:
            while self.is_running:
                await asyncio.sleep(1)
        except KeyboardInterrupt:
            print("\n🛑 Agent stopped by user")
            self.stop()

    def stop(self):
        """Stop the agent"""
        self.is_running = False
        print("🛑 LiveKit AI Agent stopped")

if __name__ == "__main__":
    # Create and run the agent
    agent = LiveKitAIAgent()
    
    try:
        asyncio.run(agent.start())
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
