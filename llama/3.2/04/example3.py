import ollama
# 分解
def decompose_task(task_description):
  return [
    { "role": "analyst", "description": "analyze the data"},
    { "role": "developer", "description": "write the code"}
  ]

def combine_results(results):
  return " ".join(results)

def task_decomposition(task_description):
  steps = decompose_task(task_description)
  results = []
  for step in steps:
    prompt = f"As a {step['role']}, let's solve the specific part: {step['description']}"
    response = ollama.chat(model='llama3.2:latest', messages=[
      { 'role': 'user', 'content': prompt }
    ])
    results.append(response['message']['content'])

  final_result = combine_results(results)
  return final_result

task_description = "Complex task involving multiple roles and responsibilities."
result = task_decomposition(task_description)
print(result)