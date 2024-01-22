# 一千万内最好SUV
pipe = pipeline("text-classification", model="uer/roberta-base-finetuned-dianping-chinese")
pipe("1000万内最好SUV")