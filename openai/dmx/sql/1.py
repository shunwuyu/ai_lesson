from dotenv import load_dotenv
load_dotenv()

# 导入Anthropic库
from anthropic import Anthropic

# 设置Anthropic API客户端
client = Anthropic()
MODEL_NAME = "claude-3-opus-20240229"