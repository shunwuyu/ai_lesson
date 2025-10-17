from modelscope.pipelines import pipeline

pipe = pipeline(task='text-generation', model='ZhipuAI/chatglm3-6b-base')

prompt = "请判断以下句子的情感倾向，仅回答'正面'或'负面'：\n\n句子：遥遥领先"
response = pipe(prompt)
print(response['text'])