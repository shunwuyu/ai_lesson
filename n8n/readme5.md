# Nano Banana的n8n图像编辑工作流

## Nano Banana Gemini 2.5 Flash image
个人形象设计、发型设计、装修设计、动漫设计。


- 开始节点 on form submission
  表单触发节点
  images 弹吉他的女孩和耳机
  prompt The girl wears the earphone.
  - Form Title
    Edit Image
  - Form Description
    Generate or Edit Images with Nano Banan
  - Add Form Element
    Images
    File
  - Add Form Element
    Prompt
    Text
- 添加一个代码节点, 取名为Extract Images Base64 Data
  图片文件的二进制转成Base64编码的数据
  ```
  const images = [];

  console.log($input.all(), '/////');
  for (const items of $input.all()) {
    for (const key of Object.keys(items.binary)) {
      images.push(items.binary[key])
    }
  }

  return images
  ```
  base64编码格式
    
- 再添加一个代码节点 取名为 Build Request Body
  ```
  const prompt = $("On form submission").all()[0].json.Prompt;
const requestBody = {
  "model":"gemini-2.5-flash-image",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": prompt
        }
      ]
    }
  ]
}

for (const item of $input.all()) {
  const json = item.json
  requestBody.messages[0].content.push({
    "type": "image_url",
    "image_url": {
      "url": "data:" + json.mimeType + ";base64,"+json.data
    }
  })
}
  ```

- 添加一个HTTP Request 节点
  - Method POST
  - URL https://www.dmxapi.cn/v1/images/generations
  - Predefined Credential Type
  - Bearer Auth 
  - Bearer Auth account
  - send Body
  - JSON use JSON 
  - {{ $json.requestBody }}
