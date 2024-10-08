# Ollama  https://www.bilibili.com/video/BV1GK4y1q718/?spm_id_from=333.999.0.0&vd_source=3d50341f547faf8df242a214b04f2d86

- 本地运行大模型的解决方案
    开源模型，通过ollama完成本地部署和运行，并以api的形式使用。

- npm i -g ollama
    ollama pull 
    ollama run

    api
    ```js
    curl http://localhost:11434/api/generate -d '{
        "model": "llama3.2",
        "prompt":"Why is the sky blue?"
    }'
    ```

- python 安装
    https://www.python.org/downloads/macos/
    python3 --version

- 通过nuxt + ollama 完成了chat
    [code](https://github.com/sugarforever/ollama-libraries-example/blob/main/javascript/pages/models/index.vue)
- 再来 RAG
    https://github.com/sugarforever/chat-ollama/blob/81834247cd5089d02dcebf2f7a0646bdfd41fe96/pages/knowledgebases/index.vue
    
    


