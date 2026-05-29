!pip install tiktoken
!pip install openai
import tiktoken

# text = f"""hello"""

text = f"""
木星是距离太阳第五近的行星，并且\
它是太阳系中最大的行星。它是一个气态巨行星\
质量是太阳的千分之一，但半径是太阳的2.5倍\
是太阳系中所有其他行星总和的数倍。 \
木星是肉眼可见的最明亮的天体之一\
夜空中，自古代文明以来便已为人所知\
在有文字记载的历史之前。它以罗马神朱庇特的名字命名。[19] \
从地球上看，木星反射的光线足够明亮\
光线投射出可见的阴影，[20] 平均亮度位列第三\
夜空中仅次于月亮和金星的自然天体。\
总结一下观点。
"""

# Set the model you want encoding for
encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")

# ✅ 这才是查看 tokenizer 后的值（整数列表）
# tokens = encoding.encode(text)
# print(tokens)
# tokens 数量
# b'\xe6\x9c\xa8'木 UTF-8 编码下的字节表示
[encoding.decode_single_token_bytes(token) for token in tokens]


from openai import OpenAI
client = OpenAI(
    api_key="sk-UYTJpmWZ1UIDvbqsnM8AQOaXuHIa6REcs1tc1OTaLOYrUiXM",
    base_url="https://api.agicto.cn/v1"
)
response = client.chat.completions.create(
    model="gpt-3.5-turbo",  # 使用支持 completions 的模型
    messages=[
        {
            "role": "user",
            # "content": "hello"
            "content": text
        }
    ],
    max_tokens=100
)
# completion_tokens=9, prompt_tokens=8, total_tokens=17
# total_tokens = completion_tokens+prompt_tokens
# OpenAI 的 API 并不会只把 "hello" 这 5 个字母送进去。它会将整个对话结构按照特定格式序列化成一段文本，然后再进行 tokenization。
# <|start_header_id|>user<|end_header_id|>

# hello<|eot_id|>
# <|start_header_id|>assistant<|end_header_id|>
print(response)