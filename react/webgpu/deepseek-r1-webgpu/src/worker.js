// Hugging Face AI社区 AI 模型加载，nlp 任务执行
// 文本生成、翻译、情感分析、问答、摘要
import {
  // 分词
  // 负责文本和 token 之间的双向转换——输入时把聊天消息编码成
  //  token 喂给模型，输出时把模型生成的 token 解码回人读的文字。
  // 调用 OpenAI 是远程 API，服务端帮你做了 
  // tokenize 和 decode，你只管传字符串就行。
  // 但这里模型是直接跑在你浏览器本地的——
  // 没有任何中间服务器，模型只认数字不认文字，
  // 所以你必须自己在代码里完成编码和解码。
  AutoTokenizer,
  // 自动加载模型的类, 负责执行文本生成任务
  // 根据输入的 token
  //  序列逐 token 预测下一个token
  AutoModelForCausalLM,
  // 流式输出回调——模型每生成一个 token
  // 就立即解码并输出，而不是等全部生成完再返回，从
  // 实现打字机式的逐字流式响应。
  TextStreamer,
  // 让 LLM 推理途中能被人为打断
  InterruptableStoppingCriteria,
} from "@huggingface/transformers";

// navigator.gpu 存在不等于有可用的 GPU。
// Worker 里的 requestAdapter()               
// 才是真正向系统请求 GPU                 
// 适配器——如果驱动不兼容、显卡被占用或虚拟环境无
// GPU，adapter 会返回                             
// null。前者是"有没有接口"，后者是"能不能干活"。
async function check() {
  try {
    // 检查 WebGPU 能力
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      // 将错误信息发给catch
      throw new Error("WebGPU is not supported (no adapter found)");
    }
    // fp16_supported = adapter.features.has("shader-f16")
  } catch (e) {
    self.postMessage({
      status: "error",
      data: e.toString(),
    });
  }
}

// 把分词、模型推 理、解码这三步串起来，你传字符串进去，它直接给  
// 生成的文本结果，省去手动组织 token 的处理流程。
// 处理流水线
class TextGenerationPipeline {
  // 模型id
  // ONNX（Open Neural Network
  // Exchange）是一个开放的模型格式标准
  // https://huggingface.co/onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX
  static model_id = "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX";
  // 单例
  static async getInstance(progress_callback = null) {
    //  ??=                                             
  // 是空值合并赋值运算符，ES2021（ES12
    // static 方法里 this 指向类本身， 而不是实例 也是静态属性
    // 第一次为空， 赋值， 异步下载并初始化分词器
    // 之后就不用下载
    // progress_callback 回调， 监听分词器下载进度， 实时更新进度条
    this.tokenizer ??= AutoTokenizer.from_pretrained(this.model_id, {
      progress_callback,
    });
    // 首次调用把下载模型， 之后就不用下载了
    // 800~950MB 
    // progress_callback 回调， 监听模型下载进度， 实时更新进度条
    this.model ??= AutoModelForCausalLM.from_pretrained(this.model_id, {
      dtype: "q4f16",
      device: "webgpu",
      progress_callback,
    });
    // 返回分词器和模型 并发加载 只有两个都加载完才OK 
    return Promise.all([this.tokenizer, this.model]);
  }
}

// 创建一个全局唯一的可中断停止条件实例。
const stopping_criteria = new InterruptableStoppingCriteria();
// 对话通常是多轮追加的，第二轮的 prompt = 第一轮所有内容 + 新输入。
// 如果没有这个缓存，每一轮都要把之前所有
//   token 重新算一遍。有了它，之前算过的 Key 和 Value 矩阵直接存下来复用，新轮次只算新增 token                
//   的注意力，推理速度大幅提升。
let past_key_values_cache = null;

async function load() {
  self.postMessage({
    status: "loading",
    data: "Loading model...",
  });

  // Load the pipeline and save it for future use.
  const [tokenizer, model] = await TextGenerationPipeline.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    // x 的结构大概是这样的
    // {                                                                                                         
    // status: "progress" | "done" | "ready | initiate",
    // name: "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX",
    // file: "model.onnx" | "tokenizer.json" | ...,
    // progress: 42.5,        // 百分比
    // loaded: 420000000,     // 已下载字节数
    // total: 980000000,      // 文件总字节数
    // }
    self.postMessage(x);
  });

  self.postMessage({
    status: "loading",
    data: "Compiling shaders and warming up model...",
  });

  self.postMessage({ status: "ready" });
}

self.addEventListener("message", async (e) => {
  const { type, data } = e.data;
  switch (type) {
    case "check":
      check();
      break;
    case "load":
      load();
      break;
  }
})