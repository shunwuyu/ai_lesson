import { Crawler } from 'crawl4ai';
import axios from 'axios';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 补全豆瓣图片URL（处理//开头的相对路径）
const completeImgUrl = (imgUrl) => {
  if (imgUrl?.startsWith('//')) {
    return `https:${imgUrl}`;
  }
  return imgUrl || '';
};

async function getDoubanHighScoreMovies() {
  // 初始化爬虫
  const crawler = new Crawler({
    timeout: 30000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Referer': 'https://movie.douban.com/'
    }
  });

  try {
    // 爬取豆瓣电影排行榜
    const crawlRes = await crawler.crawl('https://movie.douban.com/chart');
    const html = crawlRes.content;

    if (!html) {
      throw new Error('爬取页面内容为空');
    }

    // 调用DeepSeek API提取电影信息
    const deepseekResponse = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `
              严格按照以下要求处理：
              1. 从这段HTML中提取所有电影信息，仅保留评分≥8.0的电影
              2. 返回格式为JSON数组，无任何额外文字、注释或说明
              3. 每个数组元素是对象，包含三个字段：
                 - img: 电影海报完整URL（必须补全//开头的路径为https://）
                 - name: 电影中文名称（仅保留中文名，无其他语言/副标题）
                 - score: 电影评分（数字类型，如8.5，不是字符串）
              HTML内容：
              ${html}
            `.trim()
          }
        ],
        temperature: 0,
        response_format: { type: 'json' }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        timeout: 20000
      }
    );

    // 解析DeepSeek返回的结果
    const rawResult = deepseekResponse.data.choices[0].message.content;
    let movies = JSON.parse(rawResult);

    // 二次校验并修正图片URL（防止AI处理不完整）
    movies = movies.map(movie => ({
      ...movie,
      img: completeImgUrl(movie.img),
      score: Number(movie.score) // 确保评分是数字类型
    })).filter(movie => movie.score >= 8.0); // 兜底过滤

    // 仅输出JSON结果（无任何额外内容）
    console.log(JSON.stringify(movies));
  } catch (err) {
    console.error('执行错误：', err.message);
    // 出错时返回空JSON数组
    console.log(JSON.stringify([]));
  } finally {
    await crawler.close();
  }
}

// 执行主函数
getDoubanHighScoreMovies();