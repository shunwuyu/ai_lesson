import ollama

def translate_code_to_js(python_code):
  # 优化翻译提示
  prompt = f"""
  You are a code translation assistant. Your task is to translate Python code into JavaScript while ensuring the following:
  
  1. Maintain the original logic and functionality.
  2. Adapt Python-specific constructs to their JavaScript equivalents.
  3. Use clear and idiomatic JavaScript syntax.

  Here is the Python code you need to translate:

  Python Code:
  {python_code}

  Please provide the corresponding JavaScript code below:
  JavaScript Code:
  """

  response = ollama.chat(model='llama3.2:latest', messages=[
    {
      'role': 'user',
      'content': prompt
    }
  ])

  js_code = response['message']['content']
  return js_code

# 示例代码
python_code="""
def fibonacci(n):
  a, b = 0, 1
  while n > 0:
    yield a
    a, b = b, a + b
    n -= 1

for number in fibonacci(5):
  print(number)
"""

print(translate_code_to_js(python_code))



