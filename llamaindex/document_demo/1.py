from llama_index import Document
text_list = ["hello", "world"]
documents = [Document(text=t) for t in text_list]
print(documents)