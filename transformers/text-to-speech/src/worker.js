import { 
    env,  // 配置 AI 模型运行环境
    Tensor, // AI 模型处理数据的基本单位
    AutoTokenizer, // 自动分词器
    SpeechT5ForTextToSpeech,  // 文本转语音模型
    SpeechT5HifiGan  // 语音合成模型
} from '@xenova/transformers';
import { encodeWAV } from './utils';
// 强制从远程服务器下载模型
// Disable local model checks
env.allowLocalModels = false;

// 用户点击"生成语音"时才加载模型
// 避免页面加载时就下载大型 AI 模型
// 确保整个应用只有一个模型实例在运行
// Use the Singleton pattern to enable lazy construction of the pipeline.
class MyTextToSpeechPipeline {
    // 这是 AI 语音模型的数据源地址，用于下载不同说话人的声音特征向量。
    static BASE_URL = 'https://huggingface.co/datasets/Xenova/cmu-arctic-xvectors-extracted/resolve/main/';
    // 文本 → speecht5_tts → 语音特征
    static model_id = 'Xenova/speecht5_tts';
    // 语音特征 → speecht5_hifigan → 音频文件
    static vocoder_id = 'Xenova/speecht5_hifigan';
    // 分词器实例 负责将文本切分成模型可理解的标记
    static tokenizer_instance = null;
    // 存储文本转语音模型实例
    static model_instance = null;
    // 存储语音合成器实例
    static vocoder_instance = null;

    static async getInstance(progress_callback = null) {
        if (this.tokenizer_instance === null) {
            // 自动下载 - 从 Hugging Face 下载分词器文件
            // 进度显示 - 通过 progress_callback 显示下载进度
            // 文本处理 - 将用户输入的文本转换为模型可理解的数字序列
            this.tokenizer = AutoTokenizer.from_pretrained(this.model_id, { progress_callback });
        }

        if (this.model_instance === null) {
            // 模型下载 - 从 Hugging Face 下载语音模型文件
            // 精度设置 - 使用 fp32 平衡精度和性能
            // 进度反馈 - 实时显示模型加载进度
            // 接收文本输入、生成语音特征向量、为后续的音频合成做准备
            this.model_instance = SpeechT5ForTextToSpeech.from_pretrained(this.model_id, {
                dtype: 'fp32',
                progress_callback,
            });
        }

        if (this.vocoder_instance === null) {
            // 加载预训练的语音合成器
            // 高质量音频 - HiFi-GAN 生成自然流畅的语音
            // 模型下载 - 从 Hugging Face 下载合成器文件
            // 进度显示 - 实时反馈加载状态
            this.vocoder_instance = SpeechT5HifiGan.from_pretrained(this.vocoder_id, {
                dtype: 'fp32',
                progress_callback,
            });
        }

        return new Promise(async (resolve, reject) => {
            const result = await Promise.all([
                this.tokenizer,
                this.model_instance,
                this.vocoder_instance,
            ]);
            self.postMessage({
                status: 'ready',
            });
            resolve(result);
        });
    }
    // 获取说话人语音特征向量 的方法
    static async getSpeakerEmbeddings(speaker_id) {
        // e.g., `cmu_us_awb_arctic-wav-arctic_a0001`
        // 拼接基础地址和说话人ID
        const speaker_embeddings_url = `${this.BASE_URL}${speaker_id}.bin`;
        // 下载文件 - 从 Hugging Face 下载 .bin 文件
        // 转换数据 - 将二进制数据转换为 Float32Array
        // 创建张量 - 构建 1×512 维度的特征向量
        const speaker_embeddings = new Tensor(
            'float32',
            new Float32Array(await (await fetch(speaker_embeddings_url)).arrayBuffer()),
            [1, 512]
        )
        return speaker_embeddings;
    }
}

// Mapping of cached speaker embeddings
const speaker_embeddings_cache = new Map();

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    // Load the pipeline
    const [tokenizer, model, vocoder] = await MyTextToSpeechPipeline.getInstance(x => {
        // We also add a progress callback so that we can track model loading.
        self.postMessage(x);
    });

    // Tokenize the input
    const { input_ids } = tokenizer(event.data.text);
    console.log(input_ids, '////???????')

    // Load the speaker embeddings
    let speaker_embeddings = speaker_embeddings_cache.get(event.data.speaker_id);
    // 检查缓存 - 先查找是否已有该说话人的特征向量
    if (speaker_embeddings === undefined) {
        // 下载特征 - 调用 getSpeakerEmbeddings() 从网络下载
        speaker_embeddings = await MyTextToSpeechPipeline.getSpeakerEmbeddings(event.data.speaker_id);
        // 将下载的特征向量存入缓存
        speaker_embeddings_cache.set(event.data.speaker_id, speaker_embeddings);
    }

    // Generate the waveform
    // input_ids - 文本的数字序列（经过分词器处理）
    // speaker_embeddings - 说话人的语音特征向量
    // { vocoder } - 语音合成器实例
    const { waveform } = await model.generate_speech(input_ids, speaker_embeddings, { vocoder });
    console.log(waveform);
    // Encode the waveform as a WAV file
    const wav = encodeWAV(waveform.data);

    // Send the output back to the main thread
    self.postMessage({
        status: 'complete',
        output: new Blob([wav], { type: 'audio/wav' }),
    });
});