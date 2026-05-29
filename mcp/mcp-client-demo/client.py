from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

server_params = StdioServerParameters(
    command="uv",
    args=[
        "run",
        "--with",
        "mcp[cli]",
        "--with-editable",
        "/Users/shunwuyu/workspace/lesson/ai_lesson/mcp/achievement",
        "mcp",
        "run",
        "/Users/shunwuyu/workspace/lesson/ai_lesson/mcp/achievement/server.py"
    ],
    env=None
)

async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()
            print("Tools", tools)

            score = await session.call_tool(name="get_score_by_name", arguments={"name": "张三"})
            print("Score", score)

if __name__ == "__main__":
    # 导入异步库
    import asyncio
    # 运行异步函数
    asyncio.run(run())