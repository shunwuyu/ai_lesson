import os # 导入 Python 内置 os 模块，用来让代码访问操作系统能力，操作目录、文件与环境变量。
import re # 导入 Python 内置正则表达式模块，用来匹配、查找、替换文本字符串。
import subprocess # 导入 Python 内置模块 Python 启动子进程
from pathlib import Path  # 从 Python 内置 pathlib 模块导入 Path 类
# pip install python-dotenv
from dotenv import load_dotenv
from openai import OpenAI
import json

load_dotenv(override=True)
# 常量
WORKDIR = Path.cwd()
# print(WORKDIR)
client = OpenAI(
    base_url=os.getenv("DEEPSEEK_BASE_URL"),
    api_key=os.getenv("DEEPSEEK_API_KEY")
)
MODEL = os.getenv("DEEPSEEK_MODEL")
# print(MODEL)
# resp = client.chat.completions.create(
#     model="deepseek-v4-flash",
#     messages=[{"role":"user", "content":"hello"}]
# )
# print(resp.choices[0].message.content)
# 这是**Python 隐式字符串拼接**：括号里连续放多个字符串字面量，
# **不需要逗号，自动合并成一整个字符串**。
SYSTEM = (
    f"You are a coding agent at {WORKDIR}. "
    "Use task for focused exploration or a self-contained subtask."
    # 使用 task 来执行针对性探索，或是独立完整的子任务。
)
SUB_SYSTEM = (
    f"You are a coding agent at {WORKDIR}. "
    "Complete the given task, then return a concise final answer."
)

# -- Tool implementations shared by parent and child --
# Python**不是强类型语言，是动态弱类型**。
# 只是**类型注解**，仅提示，运行不强制校验。
def safe_path(p: str) -> Path:
    # Python 的 **`pathlib.Path`** 特有的 `/ 运算符重载 **，不是除法！
    # `WORKDIR`：是预先定义好的 `Path` 对象（工作目录）
    # - `/`：pathlib 重载的**路径拼接符**，代替 `os.path.join()`
    # `p`：agent 传进来的文件路径字符串
    path = (WORKDIR / p).resolve()
    # 校验解析后的完整路径是否仍在工作目录内，不在就抛错，防止用`../`越权读取外部文件。
    # `if not` 是 **条件判断语法**
    if not path.is_relative_to(WORKDIR):
        # 抛出异常
        raise ValueError(f"Path escapes workspace: {p}")
    return path

def run_bash(command: str) -> str:
    dangerous = ["rm -rf /", "sudo", "shutdown", "reboot", "> /dev/"]
    # `any()`就是只要有一个满足就返回真。
    # 判断任意一个关键词是否出现在 command 字符串里。
    if any(d in command for d in dangerous):
        return "Error: Dangerous command blocked"
    try:
        # 子进程
        # 调用系统shell跑命令
        r = subprocess.run(command, shell=True, cwd=WORKDIR,
                           capture_output=True, text=True, errors="replace", timeout=120)
        # 把标准输出+错误输出拼一起，去掉首尾空白换行
        out = (r.stdout + r.stderr).strip()
        # 如果有内容就最多返回前5万字符，没输出就返回"(no output)"
        return out[:50000] if out else "(no output)"
    except subprocess.TimeoutExpired:
        return "Error: Timeout (120s)"
    except (FileNotFoundError, OSError) as e:
        return f"Error: {e}"

def run_read(path: str, limit: int = None) -> str:
    # try：尝试执行里面的代码，如果中间出错，直接跳到except
    try:
        # safe_path校验路径，防止逃出工作目录；read_text读取文件为utf8文本；splitlines按换行切成一行行列表
        lines = safe_path(path).read_text(encoding="utf-8").splitlines()
        # 如果传入了limit，并且limit小于总行数（文件行数比限制多）
        if limit and limit < len(lines):
            # 只取前limit行，再加一行提示：还有多少行没显示
            lines = lines[:limit] + [f"... ({len(lines) - limit} more)"]
        # 把行列表用换行拼接回字符串，最多截取5万字符，避免返回内容太大
        return "\n".join(lines)[:50000]
    # 捕获所有异常（文件不存在、编码错误、权限不足等）
    except Exception as e:
        # 出错就返回错误信息文本给AI
        return f"Error: {e}"


def run_write(path: str, content: str) -> str:
    # try：尝试执行写文件逻辑，发生异常直接跳到except
    try:
        # 校验路径安全，得到目标文件的Path对象，防止逃出工作目录
        fp = safe_path(path)
        # 获取文件所在文件夹；parents=True自动创建多级父目录；exist_ok=True目录存在就不报错
        fp.parent.mkdir(parents=True, exist_ok=True)
        # 以utf8编码，把传入的content文本写入文件
        fp.write_text(content, encoding="utf-8")
        # 写入成功，返回提示，告诉AI一共写了多少字节
        return f"Wrote {len(content)} bytes"
    # 捕获所有异常：权限不足、路径非法等各种错误
    except Exception as e:
        # 出错时，返回错误信息给大模型
        return f"Error: {e}"


def run_edit(path: str, old_text: str, new_text: str) -> str:
    # 尝试执行编辑逻辑，出错就跳到except
    try:
        # 校验路径安全，拿到文件Path对象，防止逃出工作目录
        fp = safe_path(path)
        # 读取文件全部内容，utf-8编码
        content = fp.read_text(encoding="utf-8")
        # 如果待查找的旧文本不在文件里面
        if old_text not in content:
            # 返回错误提示，直接结束函数，不修改文件
            return f"Error: Text not found in {path}"
        # 替换：只替换第1处匹配的旧文本，写回原文件
        fp.write_text(content.replace(old_text, new_text, 1), encoding="utf-8")
        # 修改成功，返回提示信息
        return f"Edited {path}"
    # 捕获所有异常（文件不存在、权限问题等）
    except Exception as e:
        # 出现异常，返回错误详情给大模型
        return f"Error: {e}"


# 工具名字和对应的执行函数映射字典
TOOL_HANDLERS = {
    # key：工具名称字符串，和大模型调用工具时的name对应
    # value：lambda匿名函数，**kw接收工具传来的全部参数字典
    # 模型调用`read_file`，参数`{"path":"test.txt","limit":10}`
    # → `**kw` 就是 `{"path":"test.txt","limit":10}`
    # → `run_read("test.txt",10)`
    # lambda 就是 Python 简易匿名小函数，不用 def 起名，适合写简短逻辑，用完就丢，常用来做简单映射。
    # js 匿名函数
    "bash":       lambda **kw: run_bash(kw["command"]),
    # 调用run_read，取出path；limit可选，用get取不到就给None
    # limit 可选
    "read_file":  lambda **kw: run_read(kw["path"], kw.get("limit")),
    # 取出path和content，传给写文件函数
    "write_file": lambda **kw: run_write(kw["path"], kw["content"]),
    # 取出三段文本参数，传给编辑文件函数
    "edit_file":  lambda **kw: run_edit(kw["path"], kw["old_text"], kw["new_text"]),
}


CHILD_TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "bash",
            "description": "Run a shell command.",
            "parameters": {
                "type": "object",
                "properties": {
                    "command": {"type": "string"}
                },
                "required": ["command"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Read file contents.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string"},
                    "limit": {"type": "integer"}
                },
                "required": ["path"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "write_file",
            "description": "Write content to file.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string"},
                    "content": {"type": "string"}
                },
                "required": ["path", "content"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "edit_file",
            "description": "Replace exact text in file.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string"},
                    "old_text": {"type": "string"},
                    "new_text": {"type": "string"}
                },
                "required": ["path", "old_text", "new_text"]
            }
        }
    }
]


PARENT_TOOLS = CHILD_TOOLS + [
    {
        "type": "function",
        "function": {
            "name": "task",
            "description": "Spawn a subagent with fresh context. It shares the filesystem but not conversation history.",
            "parameters": {
                "type": "object",
                "properties": {
                    "prompt": {"type": "string"},
                    "description": {
                        "type": "string",
                        "description": "Short description of the task"
                    }
                },
                "required": ["prompt"]
            }
        }
    }
]

# 启动子Agent，传入用户任务文本，最后返回子Agent最终文字结果
def run_subagent(prompt: str) -> str:
    # 初始化子Agent对话：第一条是用户的任务，全新空上下文
    sub_messages = [{"role": "user", "content": prompt}]  # fresh context

    # 最多循环30轮，安全限制，防止子AI无限调用工具死循环
    for _ in range(30):  # safety limit
        # 请求大模型，拼接系统提示词 + 当前子Agent全部对话，传入可用工具
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "system", "content": SUB_SYSTEM}] + sub_messages,
            tools=CHILD_TOOLS,
            max_tokens=8000,
        )
        # 取出模型返回的第一条消息对象
        msg = response.choices[0].message
        # 把模型返回消息转字典，加到对话历史，下一轮AI能看到本次回答
        sub_messages.append(msg.model_dump())

        # 如果模型不是要调用工具（是直接输出最终答案），跳出循环
        if response.choices[0].finish_reason != "tool_calls":
            break

        # 用来存放各个工具执行后的返回结果
        results = []
        # 遍历模型要调用的每一个工具
        for tool_call in msg.tool_calls:
            # 获取工具名称（bash / read_file这类）
            func_name = tool_call.function.name
            # 把JSON格式的工具参数字符串，转成Python字典
            args = json.loads(tool_call.function.arguments)
            # 根据工具名查找对应的处理函数
            handler = TOOL_HANDLERS.get(func_name)
            # 找到工具就执行，**args把字典拆成参数；找不到返回未知工具提示
            output = handler(**args) if handler else f"Unknown tool: {func_name}"
            # 把工具执行结果包装成工具消息，截断最多5万字，加入结果列表
            results.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": str(output)[:50000]
            })
        # 把所有工具返回结果批量追加到对话记录，传给下一轮大模型
        sub_messages.extend(results)

    # 只把子AI最终文本返回给父Agent；子Agent完整对话上下文不会外传
    # msg.content为空时，返回默认文本"(no summary)"
    return msg.content or "(no summary)"

def agent_loop(messages: list):
    while True:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role":"system","content":SYSTEM}] + messages,
            tools=PARENT_TOOLS,
            max_tokens=8000,
        )
        msg = response.choices[0].message
        print(msg.content, "??")
        messages.append(msg.model_dump())
        if response.choices[0].finish_reason != "tool_calls":
            return
        results = []
        msg = response.choices[0].message
        if msg.tool_calls:
            results = []
            for tool_call in msg.tool_calls:
                func = tool_call.function
                args = json.loads(func.arguments)
                if func.name == "task":
                    desc = args.get("description", "subtask")
                    prompt = args.get("prompt", "")
                    print(f"> task ({desc}): {prompt[:80]}")
                    output = run_subagent(prompt)
                else:
                    handler = TOOL_HANDLERS.get(func.name)
                    output = handler(**args) if handler else f"Unknown tool: {func.name}"
                print(f"  {str(output)[:200]}")
                # OpenAI 工具回传消息格式
                results.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": str(output)
                })
            # 把所有tool结果追加到对话messages
            messages.extend(results)

if __name__ == "__main__":
  print("s06: Subagent - fresh messages, final text returns")
  print("Enter a question, press Enter to send. Type q to quit.\n")
  # 直接写 `变量名 = 值` 就是变量声明 + 赋值。
  # Python 里**没有真正的常量**：
  # 大写命名代表常量（只是规范，语法不保护，照样能改）
  PI = 3.1415926
  history = [] # 创建一个空列表 
  while True:  #布尔只有两个值：`True` / `False`，**首字母必须大写**
    try:
      # 彩色字符 s06 >>
      query = input("\001\033[36m\002s06 >> \001\033[0m\002")
    except (EOFError, KeyboardInterrupt):
      break
    if query.strip().lower() in ("q", "exit", ""):
      break
    history.append({"role": "user", "content": query})
    agent_loop(history)