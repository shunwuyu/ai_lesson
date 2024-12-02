import { compile } from "html-to-text"
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url"

const url = "https://js.langchain.com/docs/get_started/introduction";

const compiledConvert = compile({ wordwrap: 130});

const loader = new RecursiveUrlLoader(url, {
  extractor: compiledConvert,
  maxDepth: 1,
  excludeDirs: ["https://js.langchain.com/docs/api/"]
});

const docs = await loader.load();

console.log(docs);