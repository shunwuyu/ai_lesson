from flask import Flask, request
# 创建 Flask 应用实例
app = Flask(__name__)
# 定义根路径路由，例如访问 http://127.0.0.1:5000/
@app.route('/')
def hello():
    # 从 URL 查询参数中获取 name，如没有提供则默认使用 "World"
    # 示例: http://127.0.0.1:5000/?name=Andrew
    name = request.args.get('name', 'World')
    # 返回简单的字符串响应
    return f'Hello, {name}!'
# 仅在当前文件被直接运行时启动开发服务器
if __name__ == '__main__':
    # 启动 Flask 内置的开发服务器，默认监听 5000 端口
    app.run(port=8000)