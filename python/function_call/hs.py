# 大模型如 DeepSeek-Reasoner 是基于训练数据中的文本
# 模式进行推理和回答的，不具备实时联网获取最新股票价格
# 的能力。它的“知识”截止于训练时的数据，无法访问当前金
# 融市场信息，因此不能提供青岛啤酒的最新收盘价。这类问题
# 需通过财经API或证券平台查询。
from openai import OpenAI

client = OpenAI(
  api_key='sk-8d1436c7a2b74d6ca98d73276c58fd5a',
  base_url="https://api.deepseek.com/v1",
)

def send_message(messages):
  response = client.chat.completions.create(
    model='deepseek-reasoner',
    messages=messages,
    
  )
  return response


messages = [{"role": "user", "content": "青岛啤酒的收盘价是多少？"}]
response = send_message(messages)
print(response.choices[0].message)