from langchain import PromptTemplate

template = """\
你是业务咨询顾总。
你给一个销售{product}的电商公司，起一个好的名字？
""" 

prompt = PromptTemplate.from_template(template)
# print(prompt.format(product="手机"))
print(prompt.format(product="鲜花"))