# 引入streamlit UI库
import streamlit as st
# 引入 ollama
import ollama
# 获取ollama的模型列表
model_list = ollama.list()
# 设置默认模型名字为 llama2:7b-chat
if "model_name" not in st.session_state:
    st.session_state["model_name"] = "llama2:7b-chat"
# 初始化聊天信息数组
if "messages" not in st.session_state:
    st.session_state.messages = []
# 设置边栏
with st.sidebar:
    # 侧边栏的标题
    st.subheader("Settings")
    # 下拉框   选择模型， 默认选中llama2
    option = st.selectbox(
        'Select a model',
        [model['name'] for model in model_list['models']])
    st.write('You selected:', option)
    st.session_state["model_name"] = option
# 页面标题  与llama聊天
st.title(f"Chat with {st.session_state['model_name']}")
# 遍历聊天数组
for message in st.session_state.messages:
    # 根据角色
    with st.chat_message(message["role"]):
        # 输出内容
        st.markdown(message["content"])

if prompt := st.chat_input("What is up?"):
    
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    with st.chat_message("user"):
        st.markdown(prompt)
    
    with st.chat_message("assistant"):
        # 大模型返回后就清空输入框
        message_placeholder = st.empty()
        full_response = ""
        for chunk in ollama.chat(
            model=st.session_state["model_name"],
            messages=[
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.messages
            ],
            # 逐渐打出
            stream=True,
        ):
            if 'message' in chunk and 'content' in chunk['message']:
                full_response += (chunk['message']['content'] or "")
                message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    st.session_state.messages.append({"role": "assistant", "content": full_response})