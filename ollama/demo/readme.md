# ollama

- 介绍

Ollama 是一个让你能通过简单命令在本地轻松下载、运行和管理大型语言模型（如 Llama、Qwen、Deepseek 等）的工具，
支持 GPU 加速和类 OpenAI 的 API，非常适合本地化部署和开发。

- 闭源模型
    OpenAI GPT-5.1
    Gemini 3.0
    Claude 4.7


- 开源大模型
    meta  Llama2/3 
    Qwen  Qwen3-Coder 最强开源编程模型
    deepseek-r1  深度搜索大模型

- 拉取 开源大模型
    ollama pull deepseek-r1:1.5b 下载到本地

    参数量越大，模型能力越强。1.5b适合轻量部署，7b/8b平衡性能与资源，14b/32b推理更强，70b/671b接近O3/Gemini 2.5 Pro，适合复杂任务。

    ollama run deepseek-r1:1.5b 运行模型
- 接口调用
    调用方式与 OpenAI 相同，支持 RESTful API 调用。
    示例代码：
    import requests

    url = "http://localhost:11434/v1/chat/completions"
    headers = {"Authorization": "Bearer ollama"}
    data = {
        "model": "deepseek-r1:1.5b",
        "messages": [{"role": "user", "content": "你好"}]
    }

    response = requests.post(url, headers=headers, json=data)
    print(response.json())
