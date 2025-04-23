from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("achievement")

# Add an get score tool
@mcp.tool()
def get_score_by_name(name: str) -> str:
    """根据员工的姓名获取该员工的绩效得分"""
    if name == "张三":
        return "name: 张三 绩效评分: 85.9"
    elif name == "李四":
        return "name: 李四 绩效评分: 92.7"
    else:
        return "未搜到该员工的绩效"
    

@mcp.resource("file://info.md")
def get_file() -> str:
    """读取info.md的内容，从而获取员工的信息，例如性别等"""
    with open("/Users/shunwuyu/workspace/lesson/ai_lesson/geektime/deepseek_action/12/achievement/info.md", "r", encoding="utf-8") as f:
        return f.read()
    
@mcp.prompt()
def prompt(name: str) -> str:
    """根创建一个 prompt，用于对员工进行绩效评价"""
    return f"""绩效满分是100分，请获取{name}的绩效评分，并给出评价"""