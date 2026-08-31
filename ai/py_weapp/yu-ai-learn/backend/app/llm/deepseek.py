from app.core.config import settings


def create_deepseek_llm():
    if not settings.deepseek_api_key:
        raise RuntimeError("DEEPSEEK_API_KEY 未配置")
    try:
        from langchain_openai import ChatOpenAI
    except ImportError as exc:
        raise RuntimeError("请安装可选依赖 langchain-openai") from exc
    return ChatOpenAI(model=settings.deepseek_model, base_url=settings.deepseek_base_url, api_key=settings.deepseek_api_key, temperature=0.4)
