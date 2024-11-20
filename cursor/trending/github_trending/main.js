const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchDoubanMovieChart() {
    const url = 'https://movie.douban.com/chart';

    try {
        // 发送HTTP请求获取网页内容
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // 解析电影信息
        const movies = [];
        $('.pl2').each((index, element) => {
            const title = $(element).find('a').text().trim();
            const link = $(element).find('a').attr('href');
            const rating = $(element).parent().find('.rating_nums').text().trim();
            const coverUrl = $(element).parent().find('img').attr('src');

            movies.push({ title, coverUrl, rating, link });
        });

        // 将数据保存到 JSON 文件中
        fs.writeFileSync('movie.json', JSON.stringify(movies, null, 2));
        console.log('电影数据已成功保存到 movie.json 文件中');
    } catch (error) {
        console.error('获取豆瓣电影排行榜数据时出错:', error);
    }
}

fetchDoubanMovieChart();