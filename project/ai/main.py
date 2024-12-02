# 安装vanna 
# !pip install vanna
# vanna.remote 提供访问远程的数据库，这个很实用
from vanna.remote import VannaDefault
# 返回vn 实例  
vn = VannaDefault(model='chinook', api_key='75723a772e0e4546bca1052b856ca9f9')
# 连接数据库  
vn.connect_to_sqlite('https://vanna.ai/Chinook.sqlite')
# 销售额排名前十的艺术家是？
vn.ask('What are the top 10 artists by sales?')
# 执行
from vanna.flask import VannaFlaskApp
VannaFlaskApp(vn).run()
