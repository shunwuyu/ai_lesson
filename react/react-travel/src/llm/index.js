
const BAIDU_IMAGE_API_URL = "https://api.302.ai/302/image/generate";

export const generateAvatar = async (prompt) => {
  // console.log(import.meta.env.DALLE_IMAGE_API_URL, '////')
  try {
    const response = await fetch(BAIDU_IMAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_302_API_KEY}`
      },
      body: JSON.stringify({
        "prompt": prompt,
        model: "baidu-irag-t2i",
        n: 1,
        size: '128x128'
      })
      
    })
    const data = await response.json();
    const imageUrl = data["image_url"] || '';
    console.log(imageUrl) 
    if (imageUrl) {
      return {
        status: 0,
        avatar: imageUrl
      }
    } else {
      return {
        status: 1,
        msg: '生成头像失败'
      }
    }
  } catch(e) {
    return {
      status: 1,
      msg: '生成头像失败'
    }
  }
}

const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';

export const chat = async (messages) => {
  try {
     const response = await fetch(DEEPSEEK_CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          messages,
          model: "deepseek-chat",
          stream: false
        })
    })
    const data = await response.json();
    console.log(data);
    return {
      code: 0,
      content: data.choices[0].message.content
    }
  } catch(err) {
    return {
      code: 1,
      message: '出错了， 请重试'
    }
  }

}