# Model

基于transformer 架构的
![](https://img0.baidu.com/it/u=2160543110,1851553733&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=737)
- 编码器、解码器
    encoder部分接收输入并构建其完整特征表示，Decoder 部分使用Encoder的编码结果以及其他的输入生成目标序列  
- 由多个transformer Block 堆叠而成
- 由注意力机制和FFN组成。
机器翻译任务而提出的
- 注意力机制是transformer核心机制

- model head
- 哈工大小版本的模型  100M
- 在线加载模型

- 数据集
    https://github.com/SophonPlus/ChineseNlpCorpus
    酒店评论
    