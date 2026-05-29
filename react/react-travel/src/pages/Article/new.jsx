import React, { useState, useRef } from 'react';
import styles from './new.module.css';
import {  
  speechToText
} from '../../llm/index'
export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const handleStartRecording = async () => {
    try {
      // 请求获取用户的麦克风权限并获取媒体流 (MediaStream)
      // 这里只请求音频 (audio: true)，不请求视频
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 创建一个 MediaRecorder 实例，用于录制上面获取到的媒体流
      // 将实例存储在 mediaRecorderRef 的 current 属性中，便于后续引用和控制（如开始、停止）
      mediaRecorderRef.current = new MediaRecorder(stream);

      // 初始化一个空数组，用于存放录制过程中产生的数据片段 (chunks)
      // 将数组存储在 chunksRef 的 current 属性中，确保在组件不同渲染间能持久引用和修改同一个数组
      chunksRef.current = [];

    // 为 MediaRecorder 实例设置 'ondataavailable' 事件监听器
    // 当 MediaRecorder 停止录制或调用 requestData() 方法时，会触发此事件，并将录制的数据作为 Blob 对象传递
    mediaRecorderRef.current.ondataavailable = (e) => {
      // 检查事件传递过来的数据 (e.data) 是否有实际内容（大小大于0）
      // 防止将空的 Blob 推入数组
      if (e.data.size > 0) {
        // 如果数据有效，将其推入之前初始化的 chunksRef.current 数组中
        // 这些数据片段将在后续被合并成完整的音频文件
        chunksRef.current.push(e.data);
      }
    };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        // console.log(blob, '/////');
        const base64Audio = await blobToBase64(blob);
        console.log(base64Audio, '????')
        const transcript = await transcribeAudio(base64Audio);
        console.log(transcript);
        setContent((prev) => prev + '\n' + transcript);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('录音失败:', err);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // 只取 base64 数据部分
      reader.readAsDataURL(blob);
    });
  };

  const transcribeAudio = async (base64Audio) => {
    try  {
      const text = await speechToText(base64Audio);
      // console.log(text, '????')
      return text;
    } catch(err) {
      return ""
    }
    // try {
    //   const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
    //     },
    //     body: createFormData(base64Audio),
    //   });
    //   const data = await response.json();
    //   return data.text || '';
    // } catch (err) {
    //   console.error('转文字失败:', err);
    //   return '';
    // }
  };

  

  const handleSaveDraft = () => {
    console.log('保存草稿:', { title, content });
    alert('草稿已保存！');
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert('标题和内容不能为空！');
      return;
    }
    console.log('发布文章:', { title, content });
    alert('文章已发布！');
  };

  return (
    <div className={styles.container}>
      <h2>发表文章</h2>
      <input
        className={styles.input}
        placeholder="请输入标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.textareaWrapper}>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          placeholder="请输入内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={styles.micButton}
          onMouseDown={handleStartRecording}
          onMouseUp={handleStopRecording}
          title="按住录音"
        >
          🎤
        </button>
      </div>
      <div className={styles.buttonGroup}>
        <button className={`${styles.button} ${styles.save}`} onClick={handleSaveDraft}>
          保存草稿
        </button>
        <button className={`${styles.button} ${styles.publish}`} onClick={handlePublish}>
          发布
        </button>
      </div>
    </div>
  );
}
