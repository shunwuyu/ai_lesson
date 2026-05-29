from flask import Flask, request, jsonify, send_from_directory
import openai
import logging
from dotenv import load_dotenv
import os

# 加载环境变量
load_dotenv()

app = Flask(__name__, static_url_path='', static_folder='static')

# 设置日志级别
logging.basicConfig(level=logging.INFO)

@app.route('/')
def serve_index():
    return send_from_directory('static', 'index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        print(data, 'dddd')
        model = data.get('model')
        messages = data.get('messages')
        temperature = data.get('temperature', 1.0)

        if not model or not messages:
            logging.error("Missing required fields in request")
            return jsonify({"error": "缺少必要的字段"}), 400

        # 获取API密钥和基础URL
        api_key = os.getenv('OPENAI_API_KEY')
        base_url = os.getenv('DEEPSEEK_BASE_URL')

        if not api_key:
            logging.error("API key is not set in the environment variables.")
            return jsonify({"error": "服务器内部错误"}), 500

        # 初始化OpenAI客户端
        client = openai.OpenAI(api_key=api_key, base_url=base_url)

        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            stream=False
        )

        # 返回包含消息内容的对象
        return jsonify({"message": response.choices[0].message.content})
    
    except openai.error.OpenAIError as e:
        logging.error(f"OpenAI API error: {e}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": "发生了一个意外错误"}), 500

if __name__ == '__main__':
    app.run(debug=True)