import ollama
# tuple 元祖
def customer_service_chat(history: str, user_input: str, max_turns: int = 3) -> tuple[str, str]:
  """
  与客服进行对话，并维护对话历史。

  参数：
  history (str): 先前的绘画历史。
  user_input (str): 用户当前的输入。
  max_turns (int): 需要保留的最大对话轮数

  返回：
  tuple [str, str]:更新后的对话历史和客服的回复。
  """
  # 分割历史对话成列表， 保留最近max_truns 轮对话
  history_lines = history.split('\n')
  recent_history = "\n".join(history_lines[- max_turns * 2:])
  recent_history += f"\n用户：{user_input}\n客服："

  messages = [
    { 'role': 'system', 'content': '请根据以下对话历史，用中文回答问题。' },
    { 'role': 'user', 'content': recent_history } 
  ]
  response = ollama.chat(model='llama3.2:latest', messages=messages)
  reply = response['message']['content'].strip()

  history = f"\n用户：{user_input}\n客服: {reply}"
  return history, reply

history = "客服： 欢迎使用在线客服系统！请问有什么可以帮您？"
user_input = "我想订一张飞往纽约的机票。"
history, reply = customer_service_chat(history, user_input)
print(f"用户：{user_input}\n{reply}")

user_input = "有哪些航班可以选择？"
history_reply = customer_service_chat(history, user_input)
print(f"用户：{user_input}\n{reply}")