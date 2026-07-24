# Benchmark 

benchmark 是用标准体给大模型打分的体系。

每次一个新的模型发布， 它的宣传页都会有一堆数字。

- MMLU 多少分？
- GPQA 多少分？
- HumanEval 多少分？

把这次词统一到benchmark 

## 基准测试

给一堆测试标准的题目， 让AI 模型去打分， 模型的高考。

不同的科目有不同的试卷， 靠完了会出一个分数。

- 为什么需要Benchmark？

因为现在大模型太多了， gpt、claude、gemini 、deepseek、qwen\

怎么知道哪个更聪明？需要一个客观标准， Benchmark 就是这个标准。

但我们知道大模型的能力是多维的， Benchmark 也分了很多种类， 

- MMLU 综合知识。

Massive（巨大） Multitask Language Understanding

57 个学科领域选择题， 从初中历史到大学医学， 考的是模型的知识
广度、相当于文理综合卷。

- GPQA Diamond

顶级推理
Graduate-Level Google-Proof Q & A
专门去出研究生级别的物理、化学、生物难题。
为什么叫google-proof, 因为这些题就算你上网搜也很难找到答案。

考的是模型是不是真正能推理， 而不是去背答案。


- HumanEval 代码能力 SWE-bench

HumanEval有164道编程题，让模型写出能够去跑通的代码。
SWE-bench是让模型直接去修真实的github项目的bug.

- MATH/AIME 数学推理
竞赛级的数学题，

AIME 美国数学邀请赛的原题，考模型能不能一步步推导出正确答案
而不是凑结果。

- C-Eval 中文能力

专门针对中文语境， 覆盖了52个学科，4种难度，

## 厂商怎么用Benchmark?

每次大模型发布，会拿出一堆的Benchmark 来说自己特别强。

- openai 4.1 benchmark
  图中是代码能力
- claude  

厂商会去挑表现最好的那几项去重点放大

某个模型再说在xx上第一， 不代表它整体最强。

可能只是在哪一项考试里面拿了最高分。

## Benchmark 作用

Benchmark是一个门槛， 不是排名。

一个模型连benchmark都差， 那大概率能力也差。

但分数高， 不等于一定好用。

第二个， 要看多个维度， 不看单一分数。

比如你需要什么能力， 代码啊，推理啊， 中文啊， 
就看那个的表现， 最终标准还是你自己的实际体验。

## 总结

Benchmark 是用标准体给大模型打分的体系，不同测试集考不同
的能力，知识、推理、代码、数学、中文，厂商会选择展示对自己有利
的数据，也存在数据污染和刷榜问题， 结合自身需求和体验判断。