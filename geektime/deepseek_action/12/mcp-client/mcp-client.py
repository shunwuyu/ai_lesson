import os
from dotenv import load_dotenv
from typing import Optional
from mcp import ClientSession, StdioServerParameters
from anthropic import Anthropic


load_dotenv()

class MCPClient:
    def __init__(self):
        self.session: Optional[ClientSession] = None
        self.exit_stack = AsyncExitStack()
        self.deepseek =