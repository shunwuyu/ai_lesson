const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 8080;

// 中间件
app.use(cors());
app.use(express.json());

// 存储新闻数据
let aiNews = [];

// AI相关新闻源配置 - 使用更稳定的RSS和API
const newsSources = [
  {
    name: '36氪AI',
    url: 'https://rsshub.app/36kr/newsflashes/ai',
    type: 'rss',
    selector: 'item',
    title: 'title',
    link: 'link',
    summary: 'description'
  },
  {
    name: 'InfoQ AI',
    url: 'https://www.infoq.cn/feed/ai',
    type: 'rss',
    selector: 'item',
    title: 'title',
    link: 'link',
    summary: 'description'
  },
  {
    name: 'Hacker News AI',
    url: 'https://hn.algolia.com/api/v1/search?tags=story&query=ai&hitsPerPage=20',
    type: 'api',
    dataPath: 'hits'
  },
  {
    name: 'Reddit AI',
    url: 'https://www.reddit.com/r/artificial/.json?limit=20',
    type: 'api',
    dataPath: 'data.children'
  }
];

// 获取新闻函数
async function fetchNewsFromSource(source) {
  try {
    const response = await axios.get(source.url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/xml, */*'
      }
    });

    const articles = [];

    if (source.type === 'rss') {
      // 解析RSS源
      const $ = cheerio.load(response.data, { xmlMode: true });
      
      $(source.selector).each((index, element) => {
        if (index >= 10) return false;

        const title = $(element).find(source.title).text().trim();
        const link = $(element).find(source.link).text().trim();
        const summary = $(element).find(source.summary).text().trim();

        if (title && link) {
          articles.push({
            id: Date.now() + index,
            title,
            link: link.startsWith('http') ? link : new URL(link, source.url).href,
            summary: summary || '暂无摘要',
            source: source.name,
            timestamp: new Date().toISOString()
          });
        }
      });
    } else if (source.type === 'api') {
      // 解析API源
      const data = response.data;
      const items = source.dataPath.split('.').reduce((obj, key) => obj?.[key], data) || [];

      items.slice(0, 10).forEach((item, index) => {
        let title, link, summary;

        if (source.name === 'Hacker News AI') {
          title = item.title || item.story_title;
          link = item.url || `https://news.ycombinator.com/item?id=${item.objectID}`;
          summary = item.story_text || item.comment_text || 'Hacker News AI相关内容';
        } else if (source.name === 'Reddit AI') {
          title = item.data?.title;
          link = item.data?.url;
          summary = item.data?.selftext || 'Reddit AI社区讨论';
        }

        if (title && link) {
          articles.push({
            id: Date.now() + index,
            title,
            link,
            summary: summary || '暂无摘要',
            source: source.name,
            timestamp: new Date(item.created_at || item.data?.created_utc * 1000 || Date.now()).toISOString()
          });
        }
      });
    }

    return articles;
  } catch (error) {
    console.error(`获取 ${source.name} 新闻失败:`, error.message);
    return [];
  }
}

// 获取所有新闻
async function fetchAllNews() {
  console.log('开始获取AI新闻...');
  
  const allNews = [];
  
  for (const source of newsSources) {
    const articles = await fetchNewsFromSource(source);
    allNews.push(...articles);
    
    // 添加延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 去重并排序
  const uniqueNews = allNews.filter((article, index, self) => 
    index === self.findIndex(a => a.title === article.title)
  );

  aiNews = uniqueNews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  console.log(`获取完成，共 ${aiNews.length} 条新闻`);
}

// API路由
app.get('/api/news', (req, res) => {
  const { source, limit = 20, page = 1 } = req.query;
  
  let filteredNews = aiNews;
  
  if (source) {
    filteredNews = filteredNews.filter(article => article.source === source);
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedNews = filteredNews.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: paginatedNews,
    total: filteredNews.length,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(filteredNews.length / limit)
  });
});

app.get('/api/news/sources', (req, res) => {
  const sources = newsSources.map(source => ({
    name: source.name,
    url: source.url
  }));
  
  res.json({
    success: true,
    data: sources
  });
});

app.get('/api/news/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: '请输入搜索关键词'
    });
  }
  
  const searchResults = aiNews.filter(article => 
    article.title.toLowerCase().includes(q.toLowerCase()) ||
    article.summary.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    success: true,
    data: searchResults,
    total: searchResults.length
  });
});

// 首页路由 - 简化版本
app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI新闻聚合平台</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        .news-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .news-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .news-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .news-source { color: #666; font-size: 14px; }
        .news-summary { color: #333; margin: 10px 0; }
        .news-link { color: #007bff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AI新闻聚合平台</h1>
            <p>全网AI相关新闻、知识实时获取</p>
        </div>
        <div id="news-container" class="news-grid">
            <div class="news-card">
                <div class="news-title">正在加载新闻...</div>
            </div>
        </div>
    </div>
    
    <script>
        async function loadNews() {
            try {
                const response = await fetch('/api/news?limit=20');
                const result = await response.json();
                
                if (result.success) {
                    displayNews(result.data);
                }
            } catch (error) {
                console.error('加载新闻失败:', error);
                document.getElementById('news-container').innerHTML = '<div class="news-card"><div class="news-title">加载失败，请刷新页面重试</div></div>';
            }
        }
        
        function displayNews(news) {
            const container = document.getElementById('news-container');
            if (news.length === 0) {
                container.innerHTML = '<div class="news-card"><div class="news-title">暂无新闻数据</div></div>';
                return;
            }
            
            container.innerHTML = news.map(article => {
                return '<div class="news-card">' +
                       '<div class="news-title">' +
                       '<a href="' + article.link + '" target="_blank" class="news-link">' + article.title + '</a>' +
                       '</div>' +
                       '<div class="news-source">来源: ' + article.source + '</div>' +
                       '<div class="news-summary">' + article.summary + '</div>' +
                       '<div style="font-size: 12px; color: #999;">' + new Date(article.timestamp).toLocaleString() + '</div>' +
                       '</div>';
            }).join('');
        }
        
        loadNews();
        setInterval(loadNews, 5 * 60 * 1000);
    </script>
</body>
</html>`;
  
  res.send(html);
});

// 启动时获取一次新闻
fetchAllNews();

// 定时任务：每30分钟更新一次新闻
cron.schedule('*/30 * * * *', () => {
  fetchAllNews();
});

app.listen(PORT, () => {
  console.log(`AI新闻聚合平台运行在 http://localhost:${PORT}`);
  console.log('新闻源配置:', newsSources.map(s => s.name).join(', '));
});