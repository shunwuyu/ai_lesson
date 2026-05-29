# custom_mcp.py
from mcp.server.fastmcp import FastMCP
import os

mcp = FastMCP()

@mcp.tool()
def list_desktop_files() -> list:
    """获取当前用户桌面上的所有文件列表（macOS专属实现）"""
    desktop_path = os.path.expanduser("~/Desktop")
    return os.listdir(desktop_path)

@mcp.tool()
def say_hello(name: str) -> str:
    """生成个性化问候语（中英双语版）"""
    return f"🎉 你好 {name}! (Hello {name}!)"

@mcp.resource("config://app_settings")
def get_app_config() -> dict:
    return {"theme": "dark", "language": "zh-CN"}

@mcp.prompt()
def code_review_prompt(code: str) -> str:
    return f"请审查以下代码并指出问题：\n\n{code}"


if __name__ == "__main__":
    mcp.run(transport='stdio')
