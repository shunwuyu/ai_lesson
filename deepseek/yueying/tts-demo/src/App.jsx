import { useState, useRef } from 'react'

function App() {
  const [prompt, setPrompt] = useState('您好，请问有什么可以帮您？')
  const [status, setStatus] = useState('ready')
  const audioEl = useRef(null)
  function createBlobURL(base64AudioData) {
    var byteArrays = []; 
    var byteCharacters = atob(base64AudioData); 
    for (var offset = 0; offset < byteCharacters.length; offset++) { 
      var byteArray = byteCharacters.charCodeAt(offset); 
      byteArrays.push(byteArray); 
    } 
    var blob = new Blob([new Uint8Array(byteArrays)], { type: 'audio/mp3' }); 
    return URL.createObjectURL(blob);
  }
  const generateAudio = async () => {
    // API访问凭证，用于身份验证
    const token = 'DpdcsDXKL_NIxqhSy1l8mjzmC-VcUvf2';
    // 应用ID，用于标识具体的应用实例
    const appId = '6952157751';
    // 集群ID，指定使用的TTS服务集群
    const clusterId = 'volcano_tts';
// 语音合成的声音类型
// zh: 中文, female: 女声, shuangkuaisisi: 声音名称, moon_bigtts: 模型类型
    // zh_male_sunwukong_mars_bigtts 猴哥
    const voiceName = "zh_male_sunwukong_mars_bigtts";
    const endpoint = '/tts/api/v1/tts';

    const headers = { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer;${token}`, 
    };
    const payload = { 
      app: { 
        appid: appId, 
        token: token, 
        cluster: clusterId, 
      }, 
      user: { uid: 'bearbobo', }, 
      audio: { 
        voice_type: voiceName, 
        encoding: 'ogg_opus', 
        compression_rate: 1, 
        rate: 24000, 
        speed_ratio: 1.0, 
        volume_ratio: 1.0, 
        pitch_ratio: 1.0, 
        emotion: 'happy', 
      }, 
      request: { 
        // 包含了数字和字母
        reqid: Math.random().toString(36).substring(7), 
        text: prompt, 
        text_type: 'plain',
        operation: 'query', silence_duration: '125', with_frontend: '1', frontend_type: 'unitTson', pure_english_opt: '1', 
    }, };
    setStatus('generating')
    const res = await fetch(
      endpoint, { 
        method: 'POST', 
        headers, 
        body: JSON.stringify(payload), 
      });
    const data = await res.json();
    if (!data.data) { throw new Error(JSON.stringify(data)); }
    console.log(data.data, '///////')
    const url = createBlobURL(data.data);
    console.log(url, '/////')
    audioEl.current && (audioEl.current.src = url) 
    audioEl.current?.play(); 
    setStatus('done')
  }
  
  return (
    <div className="container">
      <div>
        <label>Prompt</label>
        <button onClick={generateAudio}>Generate & Play</button>
        <textarea className="input" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
      </div>
      <div className="output">
        <div> {status}</div>
        <audio  ref={audioEl}/>
      </div>
    </div>
  )
}

export default App
