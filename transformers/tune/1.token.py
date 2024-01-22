from transformers import AutoTokenizer
# 不同的分词 空格分词器 字分词器 词分词器 WordPiece分词器 Byte-Pair Encoding（BPE）分词器
tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
text = "Hello，world!"
tokens = tokenizer.tokenize(text)
print(tokens)