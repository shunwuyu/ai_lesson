const express = require('express');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const PORT = process.env.PORT || 3000;

// 获取公司摘要
app.get('/summary/:ticker', async (req, res) => {
    const ticker = req.params.ticker;
    try {
        const result = await yahooFinance.quote(ticker);
        const summary = result.longBusinessSummary;
        res.send(summary);
    } catch (error) {
        res.status(500).send('Error fetching summary: ' + error.message);
    }
});

// 获取公司新闻
app.get('/news/:ticker', async (req, res) => {
    const ticker = req.params.ticker;
    try {
        const result = await yahooFinance.quote(ticker);
        const news = result.news.map(item => {
            return `${item.summary}\n${item.link}`;
        }).join('\n\n');
        res.send(news);
    } catch (error) {
        res.status(500).send('Error fetching news: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});