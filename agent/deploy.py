import os
from dotenv import load_dotenv
from livekit.agents import deploy

# Load environment variables
load_dotenv()

async def deploy_agent():
    """Deploy the NGO Connect agent to LiveKit Cloud"""
    
    # LiveKit Cloud credentials
    livekit_url = os.getenv("LIVEKIT_URL")
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")
    
    if not all([livekit_url, api_key, api_secret]):
        print("❌ Missing LiveKit environment variables")
        return
    
    print("🚀 Deploying NGO Connect agent to LiveKit Cloud...")
    
    try:
        # Deploy the agent
        await deploy.deploy_agent(
            agent_path="./ngo_agent.py",
            livekit_url=livekit_url,
            api_key=api_key,
            api_secret=api_secret,
            project_id="ngo-connect",  # Your LiveKit Cloud project ID
            agent_name="ngo-connect-agent",
        )
        
        print("✅ Agent deployed successfully!")
        print(f"🌐 Agent will be available at: {livekit_url}")
        
    except Exception as e:
        print(f"❌ Deployment failed: {e}")

if __name__ == "__main__":
    import asyncio
    asyncio.run(deploy_agent())
