
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

const createFormData = (base64Audio) => {
  const formData = new FormData();
  const blob = base64ToBlob(base64Audio, 'audio/webm');
  formData.append('file', blob, 'audio.webm');
  formData.append('model', 'whisper-1');
  return formData;
};

const base64ToBlob = (base64, type) => {
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type });
};

export const speechToText = async (speech) => {
  try {
    const response = await fetch('https://api.302.ai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_302_API_KEY}`,
      },
      body: createFormData(speech),
    });
    const data = await response.json();
    return data.text || '';
  } catch (err) {
    console.error('转文字失败:', err);
    return '';
  }
}