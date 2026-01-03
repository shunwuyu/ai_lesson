## Embedding 文本嵌入
  把文本转换为向量表示，捕捉文本的语义信息。
  ![](https://static001.geekbang.org/resource/image/32/7a/32db77431433da86d9f818037752bd7a.png?wh=1600x1320)

## Document Loaders

LangChain 需要 Document Loaders 是因为大模型不能直接读取 PDF、Word、网页等原始文件。Document Loaders 负责把这些文件转换成统一格式：包含 page_content（文本内容）和 metadata（如页码、来源、时间等元信息）。这样后续的切分、嵌入、检索才能标准化处理，
## Emebedding

- 猫会抓老鼠、小猫喜欢抓老鼠。虽然词不完全一样，但含义很接近
- 而 “汽车跑得快” 的向量会离上面比较远

- Embedding 就是把自然语言文本转换成数值向量（一个数组），这组数字可以反映出文本的语义含义（意思），而不仅仅是字面词汇。