import logging
# 字典， 列表
from typing import Dict, List
from urllib.parse import urlencode
# WebDriverWait 用于设置显式等待
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# 根据ID 类名查找
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import random
import time

listurl="https://www.zhipin.com/web/geek/job?{}"

def get_UA():      
    UA_list = [            
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36',    
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4651.0 Safari/537.36',    
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'  
        ]      
    randnum = random.randint(0, len(UA_list) - 1)  
    UA = UA_list[randnum]  
    return UA

def set_cookies(browser):    # 在已登录后的网站页面中获取Cookie信息    
    cookie_string = "ab_guid=4e439f58-05a1-4422-9a45-cbd1ec463831; lastCity=101280600; __g=-; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1744805022,1745552088,1745567903,1746243873; HMACCOUNT=A205425A64C1B17D; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1746345610; __zp_stoken__=3f39fQD3Dk8K7wpXCvzgrAw4RBwY0JTs9MHU8QDE4QEFAPTo%2BP0A9MiA1MMOwwrzCqhMiVsORw5%2FCtUEwOkA9QD04QDY1IDo0wrRAPCXDtMK4wqogKFPDhV7CqMOBLxMPw7%2FDgQ9vw4AKXiwoN8K7QTs9O8OowrzDk8K6w4DCu8OZwrTCtsK%2Bw5bCtjs1GhgnPwwIDAY%2FNUxPXA1DWE5SU08NR0hCIzs5O0Bqwr8jPBAGEA0KDwkPCg0FCwUNCgsFCw4REQcRDAsoNsKUwr7CqcO0wr12w7DEm8KaVcOtSsKWW8KOwp7DtEXCr8KqwolmSGTChklIVsKXQsKzTF3CrMK6SlNGS8K1Y3vDgXLCtV5nbklwem8HfA5TCT0DwpJqw4o%3D; bst=V2RtslEuL_21dgXdJtyRQYKi2w7DnTxw~~|RtslEuL_21dgXdJtyRQYKi2w7DPfxw~~; __c=1746243873; __l=l=%2Fwww.zhipin.com%2Fweb%2Fgeek%2Fjobs%3F%257B%257D&s=3&friend_source=0; __a=78503038.1742195915.1745567903.1746243873.70.5.16.70"    # 拆分cookie字符串为键值对列表    
    cookie_pairs = cookie_string.split("; ")    # 添加cookie    
    for pair in cookie_pairs:      
        key, value = pair.strip().split("=", 1)      # cookie字典      
        cookie = {        
            'domain': '.zhipin.com',        
            'name': key,        
            'value': value,        
            'path': '/'      
            }      
        browser.add_cookie(cookie)      
        time.sleep(3)            # 刷新页面      
        browser.refresh()      
        return browser

def init_driver()->webdriver.Chrome:
    chromedriver_path="/Users/shunwuyu/Downloads/chromedriver-mac-x64/chromedriver"
    # '--verbose',  log_output=sys.stdout,
    service = Service(executable_path=chromedriver_path,
                      service_args=['--headless=new','--no-sandbox',
                                    '--disable-dev-shm-usage',
                                    '--disable-gpu',
                                    '--ignore-certificate-errors',
                                    '--ignore-ssl-errors',
                                   ])

    options = Options()
    options.add_argument('--disable-gpu') # 禁用GPU渲染          
    options.add_argument('--incognito')    # 无痕模式  
    options.add_argument('--ignore-certificate-errors-spki-list')  # 忽略与证书相关的错误  
    options.add_argument('--disable-notifications')  # 禁用浏览器通知和推送API  
    options.add_argument(f'user-agent={get_UA()}')   # 修改用户代理信息  
    options.add_argument('--window-name=huya_test')  # 设置初始窗口用户标题  
    options.add_argument('--window-workspace=1')  # 指定初始窗口工作区  # 
    options.add_argument('--disable-extensions')  # 禁用浏览器扩展  
    options.add_argument('--force-dark-mode')  # 使用暗模式  
    options.add_argument('--start-fullscreen')  # 指定浏览器是否以全屏模式启，与进入浏览器后按F11效果相同  
    options.add_argument('--start-maximized')
    options.add_argument('--proxy-server=http://z976.kdltps.com:15818')
    #path = "D:\\Program Files\\chrome-win64\\chrome.exe"
    #options.binary_location = path
    driver = webdriver.Chrome(options=options,service=service)
    
    return driver
def listjob_by_keyword(keyword:str,page:int=1,size:int=30)->str:
    print("listjob")
    url=listurl.format(urlencode({
        "query":keyword,
         "city":"101020100"
        }))
    print("url: ",url)
    driver=init_driver()
    if driver is None:
        raise Exception("创建无头浏览器失败")
    print("创建无头浏览器成功")
    #driver.maximize_window()

    driver.get(url)
    print("title: ",driver.title)
    #print(driver.get_cookies())
    #driver = set_cookies(driver)
    #all_cookies = driver.get_cookies()    
    #for cookie in all_cookies:      
    #    print(cookie)
    driver.save_screenshot("page_screenshot.png")
    print("title: ",driver.title)
    WebDriverWait(driver, 1000, 0.8).\
        until(EC.presence_of_element_located((By.CSS_SELECTOR,
          '.job-list-box'))) #等待页面加载到出现job-list-box 为止

    li_list=driver.find_elements(By.CSS_SELECTOR,
                              ".job-list-box li.job-card-wrapper")
    jobs=[]
    for li in li_list:
        job_name_list=li.find_elements(By.CSS_SELECTOR,".job-name")
        if len(job_name_list)==0:
            continue
        job={}
        job["job_name"]=job_name_list[0].text
        job_salary_list=li.find_elements(By.CSS_SELECTOR,".job-info .salary")
        if job_salary_list and len(job_salary_list)>0:
            job["job_salary"]=job_salary_list[0].text
        else:
            job["job_salary"]="暂无"
        job_tags_list=li.find_elements(By.CSS_SELECTOR,".job-info .tag-list li")
        if job_tags_list and len(job_tags_list)>0:
            job["job_tags"]=[tag.text for tag in job_tags_list]
        else:
            job["job_tags"]=[]
        com_name=li.find_element(By.CSS_SELECTOR,".company-name")
        if com_name:
            job["com_name"]=com_name.text
        else:
            continue # 
        com_tags_list=li.find_elements(By.CSS_SELECTOR,".company-tag-list li")
        if com_tags_list and len(com_tags_list)>0:
            job["com_tags"]=[tag.text for tag in com_tags_list]
        else:
            job["com_tags"]=[]
        job_tags_list_footer=li.find_elements(By.CSS_SELECTOR,".job-card-footer  li")
        if job_tags_list_footer and len(job_tags_list_footer)>0:
            job["job_tags_footer"]=[tag.text for tag in job_tags_list_footer]
        else:
            job["job_tags_footer"]=[]
        jobs.append(job)
    driver.close()
    job_tpl="""
{}. 岗位名称: {}
公司名称: {}
岗位要求: {}
技能要求: {}
薪资待遇: {}
     """
    ret=""
    if len(jobs)>0:
        for i, job in enumerate(jobs):
            job_desc = job_tpl.format(str(i + 1), job["job_name"],
                                    job["com_name"],
                                    ",".join(job["job_tags"]),
                                    ",".join(job["job_tags_footer"]),
                                    job["job_salary"])
            ret += job_desc + "\n"
        print("完成直聘网分析")
        return ret
    else:
        raise Exception("没有找到任何岗位列表")

if __name__ == "__main__":
    print("listjob")
    ret = listjob_by_keyword("AI应用开发")
    print(ret)