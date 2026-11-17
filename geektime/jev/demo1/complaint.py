import json
import os
import re
from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com/v1",
)


def call_llm(prompt: str) -> str:
    resp = client.chat.completions.create(
        model="deepseek-v4-flash",
        messages=[{"role": "user", "content": prompt}],
    )
    return resp.choices[0].message.content


# ❌ 错误示例：用生成文本的模型做判断，再依靠解析兜底
# 问题不在于实现细节，而在于这条路径需要持续增加兜底逻辑
def is_complaint(review_text: str, max_retries: int = 3) -> bool:
    prompt = f"判断下面的评论是否在投诉，只输出 JSON：{{\"is_complaint\": true/false}}\n{review_text}"
    for _ in range(max_retries):
        raw = call_llm(prompt)  # 示意：调用任意一个大模型
        print(raw)
        match = re.search(r"\{.*\}", raw, re.S)  # 模型可能在 JSON 前后附加说明文字
        if not match:
            continue
        try:
            data = json.loads(match.group(0))
        except json.JSONDecodeError:
            continue  # 可能缺少引号或多出逗号
        value = data.get("is_complaint")
        if isinstance(value, bool):
          print('是抱怨')
          return value
    return False  # 重试耗尽，只能返回一个默认值

is_complaint("物流本来说2天，但是4天， 女朋友生日都过了，烦死了")