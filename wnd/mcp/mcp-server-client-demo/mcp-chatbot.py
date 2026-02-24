from anthropic import Anthropic
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client
from typing import List
import asyncio
import nest_asyncio

nest_asyncio.apply()

class MCP_ChatBot:
    def __init__(self):
        self.session: ClientSession = None
        self.anthropic = Anthropic(
            api_key='sk-gU0ZENytPGeVavwgBBrIbk2P2mb3WrjaWwerTjtJciFPc74l',
            base_url='https://api.302.ai/v1',
        )
        self.available_tools: List[dict] = []
    
    async def process_query(self, query):
        
