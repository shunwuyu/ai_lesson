# 安装vanna 
# !pip install vanna
# vanna.remote 提供访问远程的数据库，这个很实用
# import mysql.connector 
import pandas as pd
from vanna.remote import VannaDefault
import pymysql

# 返回vn 实例  
vn = VannaDefault(model='chinook', api_key='81e56ab6fd2049068f720e28444f3b45')



# There's usually a library for connecting to your type of database. Any SQL database will work here -- you just have to use the right library.
# conn_details = {
#     'host': '127.0.0.1',
#     'user': 'admin',
#     'password': '123456',
#     'database': 'xb2'
# }
conn = pymysql.connect(host='127.0.0.1',
                       port=3306,
                       user='root',
                       password='123456',
                       db='xb2',
                       charset='utf8mb4') 

# You define a function that takes in a SQL query as a string and returns a pandas dataframe
def run_sql(sql: str) -> pd.DataFrame:
    df = pd.read_sql_query(sql, conn)
    return df

# This gives the package a function that it can use to run the SQL
vn.run_sql = run_sql
vn.run_sql_is_set = True

# 销售额排名前十的艺术家是？
vn.ask('how many post are there?')
# 执行
from vanna.flask import VannaFlaskApp
VannaFlaskApp(vn).run()
