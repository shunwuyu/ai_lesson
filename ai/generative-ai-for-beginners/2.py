import os
from openai import OpenAI
client = OpenAI(
    api_key="sk-UYTJpmWZ1UIDvbqsnM8AQOaXuHIa6REcs1tc1OTaLOYrUiXM",
    base_url="https://api.agicto.cn/v1"
)


def get_completion(prompt, deployment="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]       
    response = client.chat.completions.create(   
        model=deployment,                                         
        messages=messages,
        temperature=1, # this is the degree of randomness of the model's output
        max_tokens=1024
    )
    return response.choices[0].message.content

### 1. Set primary content or prompt text
text = f"""
oh say can you see
"""

### 2. Use that in the prompt template below
prompt = f"""
```{text}```
"""

## 3. Run the prompt
response = get_completion(prompt)
print(response)


## 看大模型胡说八道 幻觉
text = f"""
generate a lesson plan on the Martian War of 2076.
"""

prompt = f"""
```{text}```
"""

response = get_completion(prompt)
print(response)


## 为二年级同学总结
text = f"""
Jupiter is the fifth planet from the Sun and the \
largest in the Solar System. It is a gas giant with \
a mass one-thousandth that of the Sun, but two-and-a-half \
times that of all the other planets in the Solar System combined. \
Jupiter is one of the brightest objects visible to the naked eye \
in the night sky, and has been known to ancient civilizations since \
before recorded history. It is named after the Roman god Jupiter.[19] \
When viewed from Earth, Jupiter can be bright enough for its reflected \
light to cast visible shadows,[20] and is on average the third-brightest \
natural object in the night sky after the Moon and Venus.
"""

## Set the prompt
prompt = f"""
Summarize content you are provided with for a second-grade student.
```{text}```
"""

## Run the prompt
response = get_completion(prompt)
print(response)

## 多轮对话
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        # 你是一个爱挖苦人的助手
        {"role": "system", "content": "你是一个言辞犀利、说话直率的助手。在交谈中，尤其是谈论足球时，请用冷幽默和讽刺来回应。"},
        {"role": "user", "content": "中国国家足球队厉害吗？"},
        # 你觉得谁会赢？当然是洛杉矶道奇队。
        {"role": "assistant", "content": "那他们什么时候能进世界杯？"}
    ]
)
print(response.choices[0].message.content)