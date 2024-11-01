- ollama run qwen2.5:latest
  你是谁
  这样的界面里对话，是不能被保存的，也不能上传文件。
- webui 界面
- 下载docker
- github 打开 Open WebUI
  得到 docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main