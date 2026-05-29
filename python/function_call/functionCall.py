import json
from openai import OpenAI

client = OpenAI(
  api_key='sk-8d1436c7a2b74d6ca98d73276c58fd5a',
  base_url="https://api.deepseek.com/v1",
)
# 启用了工具调用功能
# 模型会根据输入自动决定是否调用外部工具
# （tool_choice='auto'），以增强回答能力，
# 比如查询实时数据或执行计算，从而弥补大模型本身
# 无法获取最新信息的局限。
def send_message(messages):
  response = client.chat.completions.create(
    model='deepseek-reasoner',
    messages=messages,
    tools=tools,
    tool_choice='auto'
  )
  return response

# 打造一个函数调用的工具
# 定义 tool 时需明确函数名称、清晰描述其功能，
# 并严格规范参数类型、属性及是否必填（required）。
# 参数结构应为 JSON Schema 格式，确保模型能准
# 确理解何时调用及如何构造请求，避免歧义或调用失败。
tools = [
  {
    "type": "function",
    "function": {
      "name": "get_closing_price",
      "description": "获取指定股票的收盘价",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "股票名称",
          },
        },
        "required": ["name"],
      }
    }
  }
]

# 定义函数
def get_closing_price(name):
  if name == '青岛啤酒':
    return '67.92'
  elif name == '贵州茅台':
    return '1488.21'
  else:
    return '未找到该股票'



messages = [{"role": "user", "content": "青岛啤酒的收盘价是多少？"}]
response = send_message(messages)

message = response.choices[0].message
print(message)
messages.append({
    "role": message.role,
    "content": message.content,
    "tool_calls": message.tool_calls
})


print("回复：")
print(response.choices[0].message.content)

print("工具选择：")
print(response.choices[0].message.tool_calls)

  # LLM 已经确定了它要用的函数
if response.choices[0].message.tool_calls != None:
  tool_call = response.choices[0].message.tool_calls[0]

  if tool_call.function.name == "get_closing_price":
    # 调用参数（JSON 字符串）解析为 Python 字典
    arguments_dict = json.loads(tool_call.function.arguments)  # {"name": "青岛啤酒"}
    price = get_closing_price(arguments_dict['name'])

    messages.append({
      "role": "tool",
      "content": price,
      "tool_call_id": tool_call.id
    })

  print("messages:", messages)

  response = send_message(messages)

  print("回复：")
  print(response.choices[0].message.content)