import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrape_cursor_changelog():
    url = 'https://www.cursor.com/changelog'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        # 发送GET请求
        print("正在获取页面...")
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # 解析HTML
        print("正在解析页面内容...")
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 获取所有版本更新信息
        content = []
        for section in soup.find_all(['h1', 'h2', 'h3', 'p', 'ul']):
            text = section.get_text().strip()
            if text:  # 只添加非空内容
                content.append(text)
        
        # 生成输出文件名
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'cursor_changelog_{timestamp}.txt'
        
        # 保存到文件
        print(f"正在保存到文件 {filename}...")
        with open(filename, 'w', encoding='utf-8') as f:
            for line in content:
                f.write(line + '\n\n')
        
        print(f"爬取完成！内容已保存到 {filename}")
        return True
        
    except requests.RequestException as e:
        print(f'获取页面时发生错误: {e}')
        return False
    except Exception as e:
        print(f'发生未知错误: {e}')
        return False

if __name__ == '__main__':
    scrape_cursor_changelog() 