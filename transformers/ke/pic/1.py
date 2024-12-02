# 零样本目标检测
!pip install transformers
import requests   # 引入请求库
from PIL import Image # Python Image Library  存储 显示 和处理
url = "https://unsplash.com/photos/oj0zeY2Ltk4/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTR8fHBpY25pY3xlbnwwfHx8fDE2Nzc0OTE1NDk&force=true&w=640"
im = Image.open(requests.get(url, stream=True).raw)
im

from transformers import pipeline  
# 图像分类任务  google 开源
# "pipeline" 是 Hugging Face 公司开发的一个 Python 库 "transformers" 中的一个类，它提供了一种方便的方式，可以使用预训练的模型来执行各种自然语言处理（NLP）任务。该库中提供了多个预定义的 pipeline 类，每个类都对应于一个特定的 NLP 任务，例如文本分类、命名实体识别、生成摘要等
checkpoint = "google/owlvit-base-patch32"
# 零样本目标检测
detector = pipeline(model=checkpoint, task="zero-shot-object-detection")

predictions = detector(
    im,
    # 传的参数
    candidate_labels=["hat", "sunglasses", "book"],
)
predictions

from PIL import ImageDraw

draw = ImageDraw.Draw(im)

for prediction in predictions:
    box = prediction["box"]
    label = prediction["label"]
    score = prediction["score"]
    xmin, ymin, xmax, ymax = box.values()
    draw.rectangle((xmin, ymin, xmax, ymax), outline="red", width=1)
    draw.text((xmin, ymin), f"{label}: {round(score,2)}", fill="red")

im