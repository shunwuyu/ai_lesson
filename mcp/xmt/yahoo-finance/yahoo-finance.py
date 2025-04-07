# Any 是一个特殊的类型，表示可以接受任何类型的值
from typing import Any
# 一个用于 Python 的异步 HTTP 客户端库
import httpx
from mcp.server.fastmcp import FastMCP
import yfinance as yf

mcp = FastMCP("yahoo-finance")

@mcp.tool()
async def get_summary(ticker: str) -> str:
    """
    获取股票代码获取公司摘要
    参数：
        ticker: 公司股票代码(AAPL, GOOGL)
    """
    ticker_instance = yf.Ticker(ticker)
    summary = ticker_instance.info["longBusinessSummary"]
    return summary.strip()

@mcp.tool()
async def get_news(ticker: str) -> str:
    """
    通过股票代码获取公司新闻。

    参数：
        ticker: 公司股票代码
    """
    ticker_instance = yf.Ticker(ticker)
    news = ticker_instance.news
    return "\n\n".join([f"{item['content']['summary']}\n{item['content']['canonicalUrl']['url']}" for item in news])

if __name__ == "__main__":
    mcp.run(transport='stdio')