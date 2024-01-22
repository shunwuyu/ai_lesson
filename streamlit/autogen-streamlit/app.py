import streamlit as st
import asyncio

st.write("""# AutoGen Chat Agents""")

selected_model = None
selected_key = None
user_input = None

with st.sidebar:
    st.header("OpenAI Configuration")
    selected_model = st.selectbox("Model", ['gpt-3.5-turbo', 'gpt-4'], index=0)
    selected_key = st.text_input("API Key", type="password")

with st.container():
    user_input = st.text_input("Type something...")
    if user_input:
        if not selected_key or not selected_model:
            st.warning(
                'You must provide valid OpenAI API key and choose preferred model', icon="⚠️")
            st.stop()