import os # 导入 Python 内置 os 模块，用来让代码访问操作系统能力，操作目录、文件与环境变量。
import re # 导入 Python 内置正则表达式模块，用来匹配、查找、替换文本字符串。
import subprocess # 导入 Python 内置模块 Python 启动子进程
from pathlib import Path  # 从 Python 内置 pathlib 模块导入 Path 类
# pip install python-dotenv
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(override=True)
# 常量
WORKDIR = Path.cwd()
# print(WORKDIR)
client = OpenAI(
    base_url=os.getenv("DEEPSEEK_BASE_URL"),
    api_key=os.getenv("DEEPSEEK_API_KEY")
)

HOOKS = {"UserPromptSubmit": [], "PreToolUse": [], "PostToolUse": [], "Stop": []}

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

# **类型提示 Type Hint**：`event: str`，只是标注，**不强制**
# `*args` 用来**收集函数里，除了前面固定参数 `event` 之外，
# 剩下所有的位置参数，打包成一个元组 (tuple)**。
def trigger_hooks(event: str, *args):
  print(event)
  for callback in HOOKS[event]:
    result = callback(*args)
    # `None` 是 Python 里的特殊对象，含义：**空、不存在、没有返回值**。
    if result is not None:
      return result
  return None

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
    # trigger_hooks(1, query)
    trigger_hooks("UserPromptSubmit", query)
    history.append({"role": "user", "content": query})