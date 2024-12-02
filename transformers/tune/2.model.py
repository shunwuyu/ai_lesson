from transformers import AutoTokenizer, AutoModelForSequenceClassification
tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
model = AutoModelForSequenceClassification.from_pretrained('bert-base-uncased')
text = "Hello world!"
# 给大模型的输入
inputs = tokenizer(text, return_tensors='pt')
# 大模型的输出
outputs = model(**inputs)
outputs