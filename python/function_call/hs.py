import os
from openai import OpenAI
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
    
  )
  return response

if __name__ == '__main__': 
  messages = [{"role": "user", "content": "青岛啤酒的收盘价是多少？"}]
  response = send_message(messages)
  print(response.choices[0].message)