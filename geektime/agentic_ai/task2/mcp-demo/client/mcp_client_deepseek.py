import json # 用于解析 JSON 响应
import asyncio # 用于异步操作
import logging # 用于记录日志
import httpx # 用于发送 HTTP 请求
import os # 用于获取环境变量
from typing import Optional, Dict, Any, List, Tuple
from contextlib import AsyncExitStack 

from openai import OpenAI
from dotenv import load_dotenv

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# Python 的根日志记录器
logging.basicConfig(
  # 设置日志级别为 INFO，即只输出 INFO 及更高级别（如 WARNING、
  # ERROR、CRITICAL）的日志，低于它的（如 DEBUG）会被忽略
  level=logging.INFO,
  # 定义日志输出格式
  format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__) # 获取当前模块的日志记录器

load_dotenv()

class Configuration:
  """配置管理类，负责管理和验证环境变量"""
  def __init__(self) -> None:
    """初始化配置并加载环境变量"""
    self.load_env()
    self._validate_env()
  @staticmethod
  def load_env() -> None:
    """从.env文件加载环境变量"""
    load_dotenv()
  def _validate_env(self) -> None:
    """验证必需的环境变量是否存在"""
    required_vars = ["DEEPSEEK_API_KEY"]
    # 把所有没在系统里找到值的环境变量名，都收集到一个列表里。
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    if missing_vars:
      raise ValueError(f"缺少必需的环境变量: {', '.join(missing_vars)}")
    
  @property
  def api_key(self) -> str:
    """获取 DeepSeek API 密钥"""
    return os.getenv("DEEPSEEK_API_KEY", "")
  
  @property
  def base_url(self) -> str:
    """获取 DeepSeek API 基础 URL"""
    return os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com")
  
  @property
  def model(self) -> str:
    """获取 DeepSeek 模型名称"""
    return os.getenv("DEEPSEEK_MODEL", "deepseek-chat")

class MCPClient:
  """MCP 客户端实现，集成了 DeepSeek API"""
  def __init__(self, config: Configuration) -> None:
    """
    初始化 MCP 客户端
    
    Args:
        config: 配置对象
    """
    self.config = config
    self.server: Optional[MCPServer] = None
    self.client = OpenAI(
      api_key=config.api_key,
      base_url=config.base_url
    )

  async def initialize(self) -> None:
    """初始化客户端并连接到服务器"""
    server_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "server",
        "weather_server.py"
    )
    self.server = MCPServer(server_path)
    await self.server.initialize()

  async def process_query(self, query: str) -> str:
    """
    处理用户查询，集成工具调用，支持多轮工具交互

    Args:
        query: 用户查询字符串

    Returns:
        处理后的响应结果
    """
    if not self.server:
      raise RuntimeError("客户端未初始化")
    
    system_prompt = (
        "You are a helpful assistant specializing in weather information.\n"
        "You have access to the MCP Weather Server tool with the following functions:\n"
        "- get_weather_warning(city_id=None, latitude=None, longitude=None): Retrieves weather disaster warnings for a specified city ID or coordinates.\n"
        "- get_daily_forecast(city_id=None, latitude=None, longitude=None): Retrieves the multi-day weather forecast for a specified city ID or coordinates.\n"
        "\n"
        "Core Instructions:\n"
        "1.  **Carefully analyze the user's request**: Understand all components of the user's query. Determine if the user needs weather warning information, weather forecast information, or both.\n"
        "2.  **Identify Information Needs**:\n"
        "    * If the user only asks for warnings (e.g., \"Are there any warnings in Beijing?\"), only use `get_weather_warning`.\n"
        "    * If the user only asks for the forecast (e.g., \"What's the weather like in Beijing tomorrow?\"), only use `get_daily_forecast`.\n"
        "    * **If the user's question includes multiple aspects**, such as asking about **warning status** and also asking **if it's suitable for a certain activity** (which implies a query about future weather, like \"Have there been high temperature warnings in Beijing in the last week? Is it suitable for outdoor activities?\"), you need to **call both tools sequentially**.\n"
        "3.  **Call Tools as Needed**:\n"
        "    * **Prioritize getting warning information**: If warning information is needed, first call `get_weather_warning`.\n"
        "    * **Get the weather forecast**: If the user mentions a specific time period (e.g., \"weekend\", \"next three days\", \"next week\") or asks about activity suitability (which typically concerns the next few days), call `get_daily_forecast` to get the forecast for the corresponding period. For vague phrases like \"last week\" or \"recently\", interpret it as asking about *current* conditions and the *upcoming* few days (covered by the forecast). For questions like \"Is it suitable for outdoor activities?\", you should get the forecast for at least the next 2-3 days (e.g., today, tomorrow, the day after tomorrow, or the upcoming weekend) to support your judgment.\n"
        "    * **Ensure tool call order**: When multiple tools need to be called, they should be called in a logical sequence. For example, first get the warning, then get the forecast. Wait for one tool to finish executing before deciding whether to call the next tool or generate a response.\n"
        "4.  **Information Integration and Response**:\n"
        "    * After obtaining all necessary information (warning, forecast), you **must synthesize and analyze this information**.\n"
        "    * **Completely answer the user's question**: Ensure you answer all parts of the user's query.\n"
        "    * **Provide advice**: If the user asks about activity suitability, based on the retrieved warning status and forecast information (temperature, weather condition - clear/rainy, wind strength, etc.), provide a clear, data-supported recommendation (e.g., \"Currently there are no high temperature warnings, but it's expected to rain this weekend, so it's not very suitable for outdoor activities,\" or \"It will be sunny for the next few days with no warnings, suitable for outdoor activities.\").\n"
        "5.  **Tool Usage Details**:\n"
        "    * When using the tools, retain the full context of the user's original question.\n"
        "    * Unless explicitly requested by the user, do not insert specific times of day (e.g., \"3 PM\") into the search query or your response.\n"
        "    * When city information is needed, if the user provides a city name (e.g., \"Beijing\"), use the corresponding `city_id` (e.g., Beijing's city_id might be '101010100').\n"
    )

    # messages = [
    #   {"role": "system", "content": system_prompt},
    #   {"role": "user", "content": query}
    # ]

    # tools = await self.server.list_tools()
    # print(tools)
    # available_tools = [tool.to_openai_format() for tool in tools]

class Tool:
  """MCP 工具类，表示一个具有属性的工具"""

  def __init__(self, name: str, description: str, input_schema: Dict[str, Any]) -> None:
    """
    初始化工具
    
    Args:
        name: 工具名称
        description: 工具描述
        input_schema: 输入参数模式
    """
    self.name = name
    self.description = description
    self.input_schema = input_schema

  def to_openai_format(self) -> Dict[str, Any]:
    """将工具转换为 OpenAI API 格式"""
    return {
        "type": "function",
        "function": {
            "name": self.name,
            "description": self.description,
            "parameters": self.input_schema
        }
    }

class MCPServer:
  """MCP 服务器管理类，处理服务器连接和工具执行"""
  def __init__(self, server_path: str) -> None:
    """
    初始化服务器管理器
    
    Args:
        server_path: 服务器脚本路径
    """
    self.server_path = server_path
    self.session: Optional[ClientSession] = None
    self.exit_stack = AsyncExitStack()
    self._cleanup_lock = asyncio.Lock()
  async def initialize(self) -> None:
    """初始化服务器连接，包含重试机制"""
    max_retries = 3
    retry_delay = 1.0

    for attempt in range(max_retries):
      try:
        if not os.path.exists(self.server_path):
          raise FileNotFoundError(f"找不到服务器文件: {self.server_path}")
        
        server_params = StdioServerParameters(
          command='python',
          args=[self.server_path],
          env=None
        )

        stdio_transport = await self.exit_stack.enter_async_context(
          stdio_client(server_params)
        )
        stdio, write = stdio_transport
        self.session = await self.exit_stack.enter_async_context(
          ClientSession(stdio, write)
        )
        await self.session.initialize()
        logger.info("成功连接到 MCP 服务器")
        break
      except Exception as e:
        logger.error(f"第 {attempt + 1}/{max_retries} 次尝试失败: {str(e)}")
        if attempt < max_retries - 1:
          await asyncio.sleep(retry_delay)
        else:
          raise

  async def list_tools(self) -> List[Tool]:
    """获取服务器提供的可用工具列表"""
    if not self.session:
      raise RuntimeError("服务器未初始化")
    
    response = await self.session.list_tools()
    return [
      Tool(tool.name, tool.description, tool.inputSchema)
      for tool in response.tools
    ]


async def main() -> None:
  """主程序入口"""
  try:
    config = Configuration()
    client = MCPClient(config)

    await client.initialize()

  except Exception as e:
    raise


if __name__ == "__main__":
  try:
    asyncio.run(main())
  except KeyboardInterrupt:
    logger.info("程序被用户终止")
  except Exception as e:
    logger.error(f"程序因错误终止: {str(e)}")
    raise # 重新抛出异常，使程序退出