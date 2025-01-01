# test.py

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import streamlit as st
import re

# 读取CSV文件
try:
    product_categories = pd.read_csv('product-categories.csv')
    customer_age_income = pd.read_csv('customer-age-income.csv')
    sales_data = pd.read_csv('sales-data.csv')
except FileNotFoundError as e:
    st.error(f"File not found: {e}")
    st.stop()

# 解析Data.md文件以获取图表推荐信息
def parse_data_md(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()
        # 假设推荐信息是以Markdown列表的形式提供的
        recommendations = re.findall(r'- \[(.*?)\]\((.*?)\)', content)
        return {rec[0]: rec[1] for rec in recommendations}
    except FileNotFoundError as e:
        st.error(f"File not found: {e}")
        st.stop()
    except Exception as e:
        st.error(f"Error parsing Data.md: {e}")
        st.stop()

chart_recommendations = parse_data_md('Data.md')

# 根据推荐创建图表
def create_chart(data, chart_type):
    plt.figure(figsize=(10, 6))
    if chart_type == 'bar':
        sns.barplot(x=data.columns[0], y=data.columns[1], data=data)
    elif chart_type == 'line':
        sns.lineplot(x=data.columns[0], y=data.columns[1], data=data)
    elif chart_type == 'scatter':
        sns.scatterplot(x=data.columns[0], y=data.columns[1], data=data)
    else:
        st.error(f"Unknown chart type: {chart_type}")
        return None
    plt.title(f'{chart_type.capitalize()} Chart')
    plt.xticks(rotation=45)
    plt.tight_layout()
    return plt

# Streamlit应用
st.title('Data Dashboard')

# 显示产品类别图表
# if 'product-categories' in chart_recommendations:
chart_type = "bar"
st.subheader('Product Categories')
st.write(f'Chart Type: {chart_type}')  # 调试信息
chart = create_chart(product_categories, chart_type)
if chart:
    st.pyplot(chart)

# # 显示客户年龄收入图表
# if 'customer-age-income' in chart_recommendations:
#     chart_type = chart_recommendations['customer-age-income']
#     st.subheader('Customer Age and Income')
#     st.write(f'Chart Type: {chart_type}')  # 调试信息
#     chart = create_chart(customer_age_income, chart_type)
#     if chart:
#         st.pyplot(chart)

# # 显示销售数据图表
# if 'sales-data' in chart_recommendations:
#     chart_type = chart_recommendations['sales-data']
#     st.subheader('Sales Data')
#     st.write(f'Chart Type: {chart_type}')  # 调试信息
#     chart = create_chart(sales_data, chart_type)
#     if chart:
#         st.pyplot(chart)