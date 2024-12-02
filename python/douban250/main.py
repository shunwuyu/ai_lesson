import requests
from requests.exceptions import ReadTimeout, ConnectionError, RequestException
from bs4 import BeautifulSoup


# 爬虫主体
def get_page(url):
    headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Referer': 'https://maoyan.com/board',
    }

    try:
        response = requests.get(url=url, headers=headers).text
        return response
    except ReadTimeout:  # 访问超时的错误
        print('Timeout')
    except ConnectionError:  # 网络中断连接错误
        print('Connect error')
    except RequestException:  # 父类错误
        print('Error')


# 解析网页
def parse_page(html):
    soup = BeautifulSoup(html, 'lxml')
    grid = soup.find(name="ol", attrs={"class": "grid_view"})
    movie_list = grid.find_all("li")
    for movie in movie_list:
        rank = movie.find(name="em").getText()
        name = movie.find(name="span", attrs={"class": "title"}).getText()
        rating_num = movie.find(name="span", attrs={"class": "rating_num"}).getText()
        # bd = movie.find(name="p").getText().strip().replace('   ', '\n').replace('...\n                            ', '...\n').replace(' / ', '\n').split('\n')  # 头皮发麻字符串分解系列，因为练习没用 re，果然原生字符串处理麻烦的一匹，strip去除空格，replace替换，旨在将不同信息分类存储到不同的参数，如导演、主演、上映时间、上映时间和电影类型
        bd = movie.find(name="p").getText().strip().replace('   ', '\n').replace('...\n                            ', '...\n').replace(' / ', '\n').split('\n')  # 头皮发麻字符串分解系列，因为练习没用 re，果然原生字符串处理麻烦的一匹，strip去除空格，replace替换，旨在将不同信息分类存储到不同的参数，如导演、主演、上映时间、上映时间和电影类型

        # 豆瓣有些主演没有。。。贼蛋疼，为了简便只能写个烂代码再增加一次了
        if len(bd) == 4:
            bd.insert(1, '没爬到')
        inq = movie.find(name="span", attrs={"class": "inq"})
        # 处理 inq 为空的情况
        if not inq:
            inq = "暂无"
        else:
            inq = inq.getText()

         # 这里直接存储到字典，方便存到数据库
        douBanDict['rank'] = rank
        douBanDict['name'] = name
        douBanDict['director'] = bd[0]
        douBanDict['actor'] = bd[1]
        douBanDict['release_time'] = bd[2].strip()  # 某些列表有空格，直接strip()去除空格
        douBanDict['country'] = bd[3]
        douBanDict['movie_types'] = bd[4]
        douBanDict['rating_num'] = rating_num
        douBanDict['inq'] = inq
        douBanList.append(str(douBanDict))  # 字典先转为字符串再累加到列表中，否则无法字典值会一直变
    return douBanList

if __name__ == '__main__':
    douBanList = []
    douBanDict = {}
    for start in range(0, 250, 25):
        url = 'https://movie.douban.com/top250?start={}&filter='.format(start)
        html = get_page(url)
        douBanList = parse_page(html)
    print(douBanList)
