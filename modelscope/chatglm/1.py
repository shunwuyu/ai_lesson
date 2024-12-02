# 魔搭社区
# ModelScope旨在打造下一代开源的模型即服务共享平台,为泛AI开发者提供灵活
# 易用、低成本的一站式模型服务产品,让模型应用更简单。
# pipeline 管道
from modelscope.pipelines import pipeline
# 常量
from modelscope.utils.constant import Tasks
# 文本分类任务 
# 达摩院  支持中文的情感分类模型
semantic_cls = pipeline(Tasks.text_classification, 'damo/nlp_structbert_sentiment-classification_chinese-base')
# result = semantic_cls(input='shut up')
# result = semantic_cls(input='thank you')
semantic_cls(input='遥遥领先')