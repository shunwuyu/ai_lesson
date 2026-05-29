import json  # 处理 JSON 格式数据 
# # 处理 JSON 格式数据
# data = {"name": "Alice", "age": 30}
# # 相当于 JSON.stringify()
# json_str = json.dumps(data)  
# print(json_str) # '{"name": "Alice", "age": 30}'

# # 相当于 JSON.parse()
# obj = json.loads(json_str)
# print(obj)  # {'name': 'Alice', 'age': 30}
from llm import client
# print(client) 自定义模块
from prompt import REACT_PROMPT
from tools import get_closing_price,tools
import re # 正则表达式内置模块

# text = "我的电话是13812345678"
# match = re.search(r'\d{11}', text)  # 匹配11位数字（手机号）

# if match:
#     print("找到手机号:", match.group())
# else:
#     print("未找到手机号")

def send_messages(messages):
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages,
    )
    return response

if __name__ == "__main__":
    instructions = "你是一个股票助手，可以回答股票相关的问题"
    query = "青岛啤酒和贵州茅台的收盘价哪个贵？"
    prompt = REACT_PROMPT.format(instructions=instructions,tools=tools,tool_names="get_closing_price",input=query)
    print(prompt)
    messages = [{"role": "user", "content": prompt}]
    # while True:
    response = send_messages(messages)
    response_text = response.choices[0].message.content
    print("大模型的回复：")
    print(response_text)
    #   final_answer_match = re.search(r'Final Answer:\s*(.*)', response_text)
    #   if final_answer_match:
    #     final_answer = final_answer_match.group(1)
    #     print("最终答案:", final_answer)
    #     break
    #   messages.append(response.choices[0].message)

    #   action_match = re.search(r'Action:\s*(\w+)', response_text)
    #   action_input_match = re.search(r'Action Input:\s*({.*?}|".*?")', response_text, re.DOTALL)

    #   if action_match and action_input_match:
    #     tool_name = action_match.group(1)
    #     params = json.loads(action_input_match.group(1))
    #     if tool_name == "get_closing_price":
    #       observation = get_closing_price(params['name'])
    #       print("人类的回复：Observation:", observation)
    #       messages.append({"role": "user", "content": f"Observation: {observation}"})