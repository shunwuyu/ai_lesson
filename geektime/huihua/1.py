from datasets import load_dataset
dataset = load_dataset("lambdalabs/pokemon-blip-captions", split="train")
from PIL import Image
# 引入display
from IPython.display import display

width, height = 360, 360
new_image = Image.new('RGB', (2*width, 2*height))

new_image.paste(dataset[0]["image"].resize((width, height)), (0, 0))
new_image.paste(dataset[1]["image"].resize((width, height)), (width, 0))
new_image.paste(dataset[2]["image"].resize((width, height)), (0, height))
new_image.paste(dataset[3]["image"].resize((width, height)), (width, height))

for idx in range(4): 
    print(dataset[idx]["text"])
# 写入图片文件
new_image.save("./pokemon.png")
# display(new_image) 