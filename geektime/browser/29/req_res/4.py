# 导入 Python 标准库中的 HTTP 服务器相关模块
from http.server import HTTPServer, BaseHTTPRequestHandler

# 定义一个自定义请求处理器类，继承自 BaseHTTPRequestHandler
# 该类用于处理客户端发来的 HTTP 请求
class Handler(BaseHTTPRequestHandler):
    
    # 重写 do_GET 方法，用于处理所有 GET 请求
    def do_GET(self):
        # 发送 HTTP 响应状态码 200（表示请求成功）
        self.send_response(200)
        
        # 设置响应头：指定返回内容的 MIME 类型为纯文本，并使用 UTF-8 编码
        # 这样浏览器能正确解析和显示中文等字符
        self.send_header('Content-type', 'text/plain; charset=utf-8')
        
        # 结束响应头的发送（必须调用，否则 headers 不会真正发出）
        self.end_headers()
        
        # 向客户端写入响应体内容
        # 注意：wfile.write() 接收的是 bytes（字节串），所以字符串需编码或直接写为 b'...'
        self.wfile.write(b'Hello, World!')

# 创建一个 HTTP 服务器实例：
#   - 第一个参数 ('', 3000) 表示监听所有可用网络接口（空字符串）的 3000 端口
#   - 第二个参数是上面定义的 Handler 类，用于处理每个请求
server = HTTPServer(('', 3000), Handler)

# 启动服务器并使其持续运行，等待并处理传入的 HTTP 请求
# 此方法会阻塞主线程，直到手动终止程序（如 Ctrl+C）
server.serve_forever()