# !pip install vanna

from vanna.remote import VannaDefault
vn = VannaDefault(model='chinook', api_key='75723a772e0e4546bca1052b856ca9f9')
vn.connect_to_sqlite('https://vanna.ai/Chinook.sqlite')
vn.ask('What are the top 10 artists by sales?')

from vanna.flask import VannaFlaskApp
VannaFlaskApp(vn).run()