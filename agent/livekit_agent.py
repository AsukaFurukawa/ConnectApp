import asyncio
import os
import time
from livekit import rtc

class NGOConnectAgent:
    def __init__(self):
        self.agent_id = "ai-assistant"
        self.room_name = "ngo-connect-room"
        self.is_running = False
        
        # API keys
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
        
        print(f"🤖 NGO Connect AI Agent initialized")
        print(f"📡 Room: {self.room_name}")
        print(f"🔑 Groq API: {'✅' if self.groq_api_key else '❌'}")
        print(f"🔑 ElevenLabs API: {'✅' if self.elevenlabs_api_key else '❌'}")

    async def join_room(self):
        """Join the LiveKit room"""
        try:
            # This is a placeholder for the actual room joining logic
            # In a real LiveKit agent, this would use the LiveKit SDK
            print(f"🚪 Joining room: {self.room_name}")
            print(f"👤 Agent identity: {self.agent_id}")
            
            # Simulate successful room join
            print(f"✅ Successfully joined room: {self.room_name}")
            return True
            
        except Exception as e:
            print(f"❌ Failed to join room: {e}")
            return False

    async def start(self):
        """Start the AI agent"""
        self.is_running = True
        print(f"🚀 Starting AI Agent...")
        print(f"🌐 Agent will join room: {self.room_name}")
        
        # Join the room first
        if await self.join_room():
            print(f"💡 Agent is now active and listening for connections")
            
            # Keep the agent running
            try:
                while self.is_running:
                    print(f"🔄 Agent running in room: {self.room_name}")
                    await asyncio.sleep(10)
            except KeyboardInterrupt:
                print("\n🛑 Agent stopped by user")
                self.stop()
        else:
            print(f"❌ Failed to start agent - couldn't join room")

    def stop(self):
        """Stop the agent"""
        self.is_running = False
        print("🛑 AI Agent stopped")

if __name__ == "__main__":
    # Create and run the agent
    agent = NGOConnectAgent()
    
    try:
        asyncio.run(agent.start())
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
