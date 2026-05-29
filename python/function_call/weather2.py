import requests
from openai import OpenAI
import json

client = OpenAI(
  api_key='sk-565c61f59d59467e8a0c2f1c72642204',
  base_url="https://api.deepseek.com/v1",
)

def get_weather(location: str) -> str:
    url = "https://api.seniverse.com/v3/weather/now.json"
    params = {
        "key": "SaVSOt7sYbwpka9iv",
        "location": location,
        "language": "zh-Hans"
    }
    try:
        resp = requests.get(url, params=params, timeout=10)
        data = resp.json()
        if "results" in data:
            r = data["results"][0]
            city = r["location"]["name"]
            now = r["now"]
            text = now["text"]
            temp = now["temperature"]
            return f"{city}当前天气：{text}，气温 {temp}°C"
        else:
            return "心知天气查询失败"
    except Exception as e:
        return f"异常：{e}"
    
def run_conversation(user_query: str):
    # 第一步：定义工具（Function Schema）
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "获取指定城市的当前天气",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {"type": "string", "description": "城市名称，如'北京'"},
                    },
                    "required": ["location"]
                }
            }
        }
    ]

    # 初始化对话历史
    messages = [{"role": "user", "content": user_query}]

    # 第一次调用：让模型决定是否调用工具
    response = client.chat.completions.create(
        model="deepseek-reasoner",  # 或 "gpt-4-turbo", "gpt-3.5-turbo"
        messages=messages,
        tools=tools,
        tool_choice="auto",  # 自动选择是否调用工具
        temperature=0.3
    )

    response_message = response.choices[0].message
    messages.append(response_message)  # 保存模型响应（可能含 tool_calls）

    # 检查是否需要调用工具
    if response_message.tool_calls:
        for tool_call in response_message.tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)

            # 执行对应函数
            if function_name == "get_weather":
                function_response = get_weather(function_args["location"])
            else:
                function_response = "未知工具"

            # 将工具结果加入对话
            messages.append({
                "tool_call_id": tool_call.id,
                "role": "tool",
                "name": function_name,
                "content": function_response
            })

        # 第二次调用：让模型基于工具结果生成最终回答
        final_response = client.chat.completions.create(
            model="deepseek-reasoner",
            messages=messages,
            temperature=0.3
        )
        return final_response.choices[0].message.content
    else:
        # 无需工具，直接返回模型回答
        return response_message.content


user_input = input("请输入你的问题（例如：今天上海天气如何？）：")
answer = run_conversation(user_input)
print("\n🤖 回答：", answer)