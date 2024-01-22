
import requests
from PIL import Image # python 最常用的图像处理库
from transformers import pipeline # 用于加载模型

url = "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/coco_sample.png"
image_data = requests.get(url, stream=True).raw # 获取图片数据
image = Image.open(image_data)

object_detector = pipeline("object-detection") # 加载模型
detections = object_detector(image)
# print(detections)
# 如何把object_detector应用到image上？
# 1. 用object_detector对image进行预测
# 2. 用image.show()显示image
# 3. 用object_detector返回的结果对image进行标注
for detection in detections:
    box = detection["box"]
    # x, y, w, h = box
    label = detection["label"]
    image.text(label)
    # 给image画框
    # print(label, x, y, w, h)
        # 用image.draw_rectangle()对image进行标注
        # 用image.draw_text()对image进行标注
# 4. 用image.show()显示image

