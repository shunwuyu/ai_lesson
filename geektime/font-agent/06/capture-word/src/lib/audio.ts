/**
 * 将 Base64 编码的 MP3 音频数据转换为可用于音频播放的 Blob URL
 * @param base64AudioData - 纯 Base64 编码的音频字符串（不含 data:audio/mp3;base64, 前缀）
 * @returns 临时的 Blob URL（可直接赋值给 audio 标签的 src 属性）
 * @throws {DOMException} 若 Base64 数据无效或创建 Blob/URL 失败时可能抛出异常
 */
function createBlobURL(base64AudioData: string): string {
    // 存储解码后的音频字节数据
    const byteArrays: number[] = [];

    // 核心步骤1：解码 Base64 字符串为原始二进制字符（atob 是 window 对象的原生方法）
    // atob 会将 Base64 编码的 ASCII 字符串转换为原始的 8 位二进制数据
    const byteCharacters = atob(base64AudioData);

    // 核心步骤2：遍历解码后的二进制字符，转换为 Uint8 格式的字节数组
    // 因为 Blob 构造函数需要 Uint8Array 类型的二进制数据，而非原始字符
    for (let offset = 0; offset < byteCharacters.length; offset++) {
        // charCodeAt 获取字符的 Unicode 编码（此处对应 8 位字节值，范围 0-255）
        const byteValue = byteCharacters.charCodeAt(offset);
        // 将单个字节值存入数组
        byteArrays.push(byteValue);
    }

    // 核心步骤3：创建 Blob 对象（二进制大对象）
    // 1. 将普通数字数组转换为 Uint8Array（符合 Blob 要求的二进制类型）
    // 2. 指定 MIME 类型为 audio/mp3，确保浏览器能正确识别音频格式
    const audioBlob = new Blob([new Uint8Array(byteArrays)], { 
        type: 'audio/mp3' 
    });

    // 核心步骤4：创建 Blob URL（临时本地 URL）
    // URL.createObjectURL 会生成一个指向内存中 Blob 对象的临时 URL，可直接用于音频播放
    // 注意：使用完后建议调用 URL.revokeObjectURL() 释放内存，避免内存泄漏
    const blobURL = URL.createObjectURL(audioBlob);

    // 返回临时 URL，供 audio 标签或音频播放 API 使用
    return blobURL;
}

export const generateAudio = async (text: string) => {
    const token = import.meta.env.VITE_AUDIO_ACCESS_TOKEN;
    const appId = import.meta.env.VITE_AUDIO_APP_ID;
    const clusterId = import.meta.env.VITE_AUDIO_CLUSTER_ID;
    const voiceName = import.meta.env.VITE_AUDIO_VOICE_NAME;

    const endpoint = '/tts/api/v1/tts';
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer;${token}`,
    };

    const payload = {
        app: {
            appid: appId,
            token,
            cluster: clusterId,
        },
        user: {
            uid: 'bearbobo',
        },
        audio: {
            voice_type: voiceName,
            encoding: 'ogg_opus',
            compression_rate: 1,
            rate: 24000,
            speed_ratio: 1.0,
            volume_ratio: 1.0,
            pitch_ratio: 1.0,
            emotion: 'happy',
            // language: 'cn',
        },
        request: {
            reqid: Math.random().toString(36).substring(7),
            text,
            text_type: 'plain',
            operation: 'query',
            silence_duration: '125',
            with_frontend: '1',
            frontend_type: 'unitTson',
            pure_english_opt: '1',
        },
    };

    const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!data.data) {
        throw new Error(JSON.stringify(data));
    }
    return createBlobURL(data.data);
}