from transformers import AutoTokenizer, AutoModel 
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased") # 加载分词器
model = AutoModel.from_pretrained("bert-base-uncased") # 加载模型

inputs = tokenizer("Hello world!", return_tensors="pt") # 将输入转换为 PyTorch 张量
outputs = model(**inputs) # 传入模型
print(outputs)