import requests
from bs4 import BeautifulSoup

def get_zhihu_hot():
    url = 'https://tophub.today/n/mproPpoq6O'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        if response.status_code == 200:
            response.encoding = 'utf-8'
            soup = BeautifulSoup(response.text, 'html.parser')
            items = soup.select('table tbody tr')
            
            if items:
                print('知乎热榜 Top 10:\n')
                for i, item in enumerate(items[:10], 1):
                    title_elem = item.select_one('td.al a')
                    if title_elem:
                        title = title_elem.text.strip()
                        print(f'{i}. {title}')
            else:
                print('未能提取到热榜数据')
        else:
            print(f'请求失败，状态码: {response.status_code}')
    except Exception as e:
        print(f'发生错误: {e}')

if __name__ == '__main__':
    get_zhihu_hot()