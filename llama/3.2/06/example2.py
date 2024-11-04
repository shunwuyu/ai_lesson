import ollama

def summarize_dialogue(dialogue_history):
  relevant_dialogue = "\n".join(line for line in dialogue_history.split("\n") if "用户:" in line or "客服:" in line)
  prompt = (
    f"请提取以下对话的关键信息，并生成摘要，保留数字和地点等重要信息，去除不必要的细节：\n\n{relevant_dialogue}"
  )
  messages = [
    { 'role': 'user', 'content': prompt },
    { 'role': 'system', 'content': '请用中文回答' }
  ]
  # print(messages)
  response = ollama.chat(model="qwen2.5:latest", messages=messages)
  print(response)
  summary = response['message']['content'].strip()

  return summary
# 多行字符 元祖
dialogue_history = (
  "用户: 你好，你怎么样？\n" 
  "客服: 我很好，谢谢！请问今天有什么可以帮助您的？\n" 
  "用户: 我需要帮助处理我的账户。您能查看我的余额吗？\n" 
  "客服: 当然可以！请提供您的账户号码。\n" 
  "用户: 我的账户号码是123456。\n" 
  "客服: 让我为您查一下...\n" 
  "客服: 您的当前余额是$500。\n" 
  "用户: 谢谢！您能告诉我最近的交易吗？\n" 
  "客服: 我需要验证您的身份才能提供交易详细信息。\n" 
  "用户: 好的，这里是我有的详细信息。\n"
)

summary = summarize_dialogue(dialogue_history)
print("对话摘要：", summary)

dialogue_history = summary