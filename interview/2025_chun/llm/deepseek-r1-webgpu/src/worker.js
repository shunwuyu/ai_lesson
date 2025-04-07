// import {
//     // AutoTokenizer：这是一个自动化的分词器类，用于将输入文本转换为模型可以理解的格式
//     AutoTokenizer,
//     // AutoModelForCausalLM：这是一个自动化的语言模型类，用于生成文本
//     AutoModelForCausalLM,
//     // TextStreamer：这是一个文本流类，用于将生成的文本输出到控制台
//     TextStreamer,
//     // InterruptableStoppingCriteria：这是一个可中断的停止准则类，用于停止生成过程
//     InterruptableStoppingCriteria,
// } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0";

import {
    // AutoTokenizer 用于自动选择和加载适合特定预训练模型的分词器，将文本转换为模型可处理的 token 格式。
    AutoTokenizer,
    // AutoModelForCausalLM 用于自动加载适合因果语言建模任务的预训练模型，支持文本生成和上下文理解。
    AutoModelForCausalLM,
    // 用于处理文本流输出的类，通常在生成文本时使用。
    TextStreamer,
    // 用于定义文本生成过程中的停止条件，允许在满足特定条件时中断生成
    InterruptableStoppingCriteria,
} from "@huggingface/transformers";

/**
 * This class uses the Singleton pattern to enable lazy-loading of the pipeline
 */
class TextGenerationPipeline {
    static model_id = "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX";

    static async getInstance(progress_callback = null) {
        // console.log('|||||')
        this.tokenizer ??= AutoTokenizer.from_pretrained(this.model_id, {
            progress_callback,
        });
        

        this.model ??= AutoModelForCausalLM.from_pretrained(this.model_id, {
            dtype: "q4f16",
            device: "webgpu",
            progress_callback,
        });

        return Promise.all([this.tokenizer, this.model]);
    }
}

async function check() {
    try {
        // 找到一个适配器
        const adapter = await navigator.gpu.requestAdapter();
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
    // console.log('a.a..a`')
    self.postMessage({
        status: "loading",
        data: "Loading model...",
    });
     // Load the pipeline and save it for future use.
    const [tokenizer, model] = await TextGenerationPipeline.getInstance((x) => {
        // We also add a progress callback to the pipeline so that we can
        // track model loading.
        console.log(x, '????????????')
        self.postMessage(x);
    });
}

self.addEventListener("message", async (e) => {
    const { type, data } = e.data;
    // console.log('///////|||||', type)
    
    switch (type) {
        case "check":
            check();
            break;
        case "load":
            load();
            break;
        
    
    }
})