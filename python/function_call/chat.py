from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv('.env.local')


client = OpenAI(
  api_key=os.getenv('DEEPSEEK_API_KEY'), # 确保这里读取的是正确的环境变量
  base_url="https://api.deepseek.com/v1", # 替换为DeepSeek的实际API地址
)

completion = client.chat.completions.create(
  model='deepseek-reasoner',
  messages=[
    {'role': 'system', 'content': '你是一个足球领域的专家，请尽量帮我回答与足球相关的问题。'},
    {'role': 'user', 'content': 'c罗是哪个国家的足球运动员?'},
    {'role': 'assistant', 'content': 'c罗是葡萄牙的足球运动员。'},
    {'role': 'user', 'content': '内马尔呢?'},
  ]
)

print('思考过程：')
print(completion.choices[0].message.reasoning_content)

print('最终答案：')
print(completion.choices[0].message.content)