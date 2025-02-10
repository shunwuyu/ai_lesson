import {
  AutoTokenizer, // 分词
  AutoModelForCausalLM, // 模型
  TextStreamer, // 流式输出
  InterruptableStoppingCriteria, // 可中断的停止条件
} from "@huggingface/transformers";

async function check() {
  // self.postMessage({
  //   status: "error",
  //   data: '不支持GPUAdapter',
  // });
  try {
    // navigator.gpu.requestAdapter() 是一个异步函数，它返回一个 Promise，
    // 该 Promise 在成功时解析为一个 GPUAdapter 对象，或者在失败时解析为 null。
    const adapter = await navigator.gpu.requestAdapter();
    console.log(adapter);
    if (!adapter) {
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

async function load() {
  self.postMessage({
    status: "loading",
    data: "Loading model...",
  });

  // Load the pipeline and save it for future use.
  const [tokenizer, model] = await TextGenerationPipeline.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x);
  });

  self.postMessage({
    status: "loading",
    data: "Compiling shaders and warming up model...",
  });

  // Run model with dummy input to compile shaders
  const inputs = tokenizer("a");
  await model.generate({ ...inputs, max_new_tokens: 1 });
  self.postMessage({ status: "ready" });
}

const stopping_criteria = new InterruptableStoppingCriteria();
let past_key_values_cache = null;
async function generate(messages) {
  // Retrieve the text-generation pipeline.
  const [tokenizer, model] = await TextGenerationPipeline.getInstance();
  const inputs = tokenizer.apply_chat_template(messages, {
    add_generation_prompt: true,
    return_dict: true,
  });

  // 151648: <think>
  // 151649: </think>
  const [START_THINKING_TOKEN_ID, END_THINKING_TOKEN_ID] = tokenizer.encode(
    "<think></think>",
    { add_special_tokens: false },
  );
  let state = "thinking"; // 'thinking' or 'answering'
  let startTime;
  let numTokens = 0;
  let tps;
  const token_callback_function = (tokens) => {
    startTime ??= performance.now();

    if (numTokens++ > 0) {
      tps = (numTokens / (performance.now() - startTime)) * 1000;
    }
    if (tokens[0] == END_THINKING_TOKEN_ID) {
      state = "answering";
    }
  };
  const callback_function = (output) => {
    self.postMessage({
      status: "update",
      output,
      tps,
      numTokens,
      state,
    });
  };

  const streamer = new TextStreamer(tokenizer, {
    skip_prompt: true,
    skip_special_tokens: true,
    callback_function,
    token_callback_function,
  });

  // Tell the main thread we are starting
  self.postMessage({ status: "start" });

  const { past_key_values, sequences } = await model.generate({
    ...inputs,
    // TODO: Add back when fixed
    // past_key_values: past_key_values_cache,

    // Sampling
    do_sample: false,
    // repetition_penalty: 1.1,
    // top_k: 3,
    // temperature: 0.2,

    max_new_tokens: 2048,
    streamer,
    stopping_criteria,
    return_dict_in_generate: true,
  });
  past_key_values_cache = past_key_values;

  const decoded = tokenizer.batch_decode(sequences, {
    skip_special_tokens: true,
  });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: decoded,
  });
}

/**
 * 文本生成管道类，用于加载和管理文本生成模型及其分词器。
 * 该类使用单例模式，确保模型和分词器只被加载一次。
 */
class TextGenerationPipeline {
  // 定义模型的ID，用于从Hugging Face模型库中加载模型。
  static model_id = "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX";

  /**
   * 获取文本生成管道的实例。
   * 如果实例尚未创建，则加载模型和分词器。
   * @param {Function} progress_callback - 可选的进度回调函数，用于跟踪模型加载进度。
   * @returns {Promise<[AutoTokenizer, AutoModelForCausalLM]>} 一个Promise，解析为包含分词器和模型的数组。
   */
  static async getInstance(progress_callback = null) {
    // 如果分词器尚未初始化，则从预训练模型中加载分词器。
    this.tokenizer ??= AutoTokenizer.from_pretrained(this.model_id, {
      progress_callback, // 传递进度回调函数
    });

    // 如果模型尚未初始化，则从预训练模型中加载模型。
    this.model ??= AutoModelForCausalLM.from_pretrained(this.model_id, {
      dtype: "q4f16", // 指定数据类型为量化的半精度浮点数
      device: "webgpu", // 指定设备为WebGPU
      progress_callback, // 传递进度回调函数
    });

    // 返回一个Promise，等待分词器和模型都加载完成。
    return Promise.all([this.tokenizer, this.model]);
  }
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
    case "generate":
      stopping_criteria.reset();
      generate(data);
      break;
    
  }
})