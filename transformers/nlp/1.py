from transformers import pipeline # pipeline是 transfromers的模块，专业安排各种NLP。 
# distilbert-base-uncased-finetuned-sst-2-english  默认是这个
# classifier = pipeline('sentiment-analysis') #安排了情感分析任务
# result = classifier('I love you')[0] #返回情感分析结果 
# result = classifier('thank you')[0]
# result = classifier('shut up')[0]
# 中文模型
classifier = pipeline('sentiment-analysis', model="uer/roberta-base-finetuned-dianping-chinese") 
result = classifier('遥遥领先')[0]  # label: NEGATIVE, with score: 0.8616

print(f"label: {result['label']}, with score: {round(result['score'], 4)}")
