// import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0"
import { pipeline, env } from "@xenova/transformers"
env.allowLocalModels = false;

class MyTranslationPipeline {
    static task = 'translation';
    static model = 'Xenova/nllb-200-distilled-600M';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }

        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    // console.log(event)
    let translator = await MyTranslationPipeline.getInstance(x => {
        // We also add a progress callback to the pipeline so that we can
        // track model loading.
        self.postMessage(x);
    });

    let output = await translator(event.data.text, {
        tgt_lang: event.data.tgt_lang,
        src_lang: event.data.src_lang,

        // Allows for partial output
        callback_function: x => {
            self.postMessage({
                status: 'update',
                output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
            });
        }
    });

    // Send the output back to the main thread
    self.postMessage({
        status: 'complete',
        output: output,
    });


    
})