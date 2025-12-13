import os
# 获取当前工作目录
# current_dir = os.getcwd()
# print("当前工作目录:", current_dir)
from openai import OpenAI
# pip show openai
# pip install openai
# pip install python-dotenv
from dotenv import load_dotenv
load_dotenv()
# 获取 API Key
api_key = os.getenv("DEEPSEEK_API_KEY")
# 任何在模块顶层定义的变量、函数或类，默认都是“可被导入”的
client = OpenAI(
  api_key=api_key,  
  base_url="https://api.deepseek.com/v1"
)