import asyncio
import os
from dotenv import load_dotenv
from livekit import rtc
from livekit.agents import (
    Agent,
    AgentContext,
    LLM,
    STT,
    TTS,
    TurnDetection,
    TurnDetectionMode,
    WorkerOptions,
    llm,
    stt,
    tts,
    turn_detection,
)
from livekit.agents.llm import LLMContext
from livekit.agents.stt import STTContext
from livekit.agents.tts import TTSContext

# Load environment variables
load_dotenv()

class NGOConnectAgent(Agent):
    def __init__(self):
        super().__init__(
            worker_options=WorkerOptions(
                name="ngo-connect-agent",
                identity="ai-assistant",
            )
        )
        
        # Initialize AI services
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
        self.deepgram_api_key = os.getenv("DEEPGRAM_API_KEY")
        
        # Set up pipeline nodes
        self.stt = stt.DeepgramSTT(
            api_key=self.deepgram_api_key,
            model="nova-2",
            language="en-US",
        )
        
        self.llm = llm.GroqLLM(
            api_key=self.groq_api_key,
            model="llama3-8b-8192",
        )
        
        self.tts = tts.ElevenLabsTTS(
            api_key=self.elevenlabs_api_key,
            voice_id="21m00Tcm4TlvDq8ikWAM",  # Default voice
            model="eleven_multilingual_v2",
        )
        
        self.turn_detection = turn_detection.TurnDetection(
            mode=TurnDetectionMode.VAD,
            min_speech_duration_ms=100,
            silence_duration_ms=500,
        )

    async def on_llm_request(self, ctx: LLMContext) -> str:
        """Handle LLM requests with NGO Connect context"""
        system_prompt = """You are a helpful AI assistant for the NGO Connect app. This app helps users connect with NGOs in India for social causes. 
        
        You can help users with:
        - Information about NGOs and their activities
        - How to post requests for help
        - Understanding the Impact XP system
        - General questions about the app
        - Social causes and community service
        
        Be friendly, helpful, and encouraging. Keep responses concise but informative.
        Always respond in English."""
        
        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(ctx.messages)
        
        response = await self.llm.achat_completion(messages)
        return response.choices[0].message.content

    async def on_stt_complete(self, ctx: STTContext) -> None:
        """Handle completed speech-to-text"""
        if ctx.transcript:
            print(f"🎤 User said: {ctx.transcript}")
            
            # Get LLM response
            llm_response = await self.on_llm_request(
                LLMContext(messages=[{"role": "user", "content": ctx.transcript}])
            )
            
            print(f"🤖 AI response: {llm_response}")
            
            # Convert to speech
            await self.tts.synthesize(llm_response)

    async def on_tts_complete(self, ctx: TTSContext) -> None:
        """Handle completed text-to-speech"""
        print(f"🔊 TTS completed: {len(ctx.audio)} bytes")

if __name__ == "__main__":
    # Create and run the agent
    agent = NGOConnectAgent()
    
    # Run the agent
    asyncio.run(agent.run())
