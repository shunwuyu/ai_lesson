# Transformer 
- 2022年底， chatgpt 开启AIGC新纪元。
- GPT全称？
  Generative Pre-Trained Transformer
  - Generative
  代表生成
  - Pre-Trained
  代表预训练
  - Transformer 架构
  AI目前最重要的神经网络架构
  让chatgpt 真正走进了大众视野， 也支撑起了整个的大语言模型

我们学习一下Transformer基础原理，包括它怎么去处理语言，解决序列建模，甚至去推导一下公式。

语言是一个序列（sequence）
所谓每一个词的意义， 都可能依赖上下文。
比如 “我以为今天要放假了”， 老实说 “别做梦了”。
这两句话中， 出现了长距离的语义依赖（梦， 今天放假， 第二句话虽然省略了主语，它指向了第一句话的主语“我”）和情绪转折（极度期待/乐观”到“瞬间清醒/失落）。
需要模型去记住“放假”这个设想， 以及“别做梦了”这个否定态度。
早期的模型里面， 最常见去处理序列问题的，主要是两大类：
- RNN 循环神经网络 Recurrent Neural Network
- LSTM 长短期记忆 Long Short Term Memory

他们天生适合处理语言序列， 但有三个问题：
