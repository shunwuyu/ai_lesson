import json
from openai import OpenAI

# ====== 配置 API Key ======
# 方式1：从环境变量读取（推荐）
client = OpenAI(
  api_key='',
  base_url="https://api.deepseek.com/v1",
)

def get_weather(location: str) -> str:
    weather_data = {
        "北京": "晴，气温 15°C",
        "上海": "多云，气温 18°C",
        "广州": "小雨，气温 22°C",
        "深圳": "阴，气温 24°C",
        "杭州": "小雨，气温 20°C"
    }
    return weather_data.get(location, f"未找到城市 {location} 的天气信息。")

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
        model='deepseek-reasoner',
        messages=messages,
        tools=tools,
        tool_choice='auto'
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