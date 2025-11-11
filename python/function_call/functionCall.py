import json
from email import message
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv('.env.local')

client = OpenAI(
  api_key=os.getenv('DEEPSEEK_API_KEY'),
  base_url="https://api.deepseek.com/v1",
)

def send_message(messages):
  response = client.chat.completions.create(
    model='deepseek-reasoner',
    messages=messages,
    tools=tools,
    tool_choice='auto'
  )
  return response

# 打造一个函数调用的工具
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


if __name__ == '__main__': 
  messages = [{"role": "user", "content": "青岛啤酒的收盘价是多少？"}]
  response = send_message(messages)

  message = response.choices[0].message
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



  # [
  #   ChatCompletionMessageToolCall(id='call_0_0cbbc0d2-62ca-45e4-9684-1e89a0155e34', 
  #   function=Function(arguments='{"name": "青岛啤酒"}', name='get_closing_price'), type='function', index=0)
  # ] 


# messages: [
#   {'role': 'user', 'content': '青岛啤酒的收盘价是多少？'}, 
#   {'role': 'assistant', 'content': '我需要调用函数来获取青岛啤酒的收盘价。', 'tool_calls': [ChatCompletionMessageToolCall(id='call_0_e174c1a7-7aca-4a8b-98ad-e193e024d9a5', function=Function(arguments='{"name": "青岛啤酒"}', name='get_closing_price'), type='function', index=0)]}, 
#   {'role': 'tool', 'content': '67.92', 'tool_call_id': 'call_0_e174c1a7-7aca-4a8b-98ad-e193e024d9a5'}
# ]