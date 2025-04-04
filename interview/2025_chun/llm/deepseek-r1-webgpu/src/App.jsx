import { useEffect, useState, useRef } from "react";
const IS_WEBGPU_AVAILABLE = !!navigator.gpu;
import Progress from "./components/Progress";

function App() {
   // Model loading and progress
   
   // model 
  const [status, setStatus] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState(null);
  const [progressItems, setProgressItems] = useState([]);
  // chat
  const [messages, setMessages] = useState([]);
  // worker 进程对象
  const worker = useRef(null);

  // We use the `useEffect` hook to setup the worker as soon as the `App` component is mounted.
  useEffect(() => {
    console.log(worker.current, '?11??')
    if (!worker.current) {
      // console.log('////')
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
      worker.current.postMessage({ type: "check" }); // Do a feature check
    }
    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      console.log(e, '+++++')
      switch (e.data.status) {
        case "loading":
          setStatus("loading");
          setLoadingMessage(e.data.data);
        break;
        case "initiate":
          setProgressItems((prev) => [...prev, e.data]);
          break;
          case "progress":
            // Model file progress: update one of the progress items.
            setProgressItems((prev) =>
              prev.map((item) => {
                if (item.file === e.data.file) {
                  return { ...item, ...e.data };
                }
                return item;
              }),
            );
          break;
          case "done":
            // Model file loaded: remove the progress item from the list.
            setProgressItems((prev) =>
              prev.filter((item) => item.file !== e.data.file),
            );
            break;
  
          case "ready":
            // Pipeline ready: the worker is ready to accept messages.
            setStatus("ready");
            break;
            case "start":
              {
                // Start generation
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: "" },
                ]);
              }
              break;
      }
    }
    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);


  }, [])
  
  return (
    IS_WEBGPU_AVAILABLE ? (
      <div className="flex flex-col h-screen mx-auto items justify-end text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
        {/* 大模型未加载 */}
        {status === null && messages.length === 0 && (
          <div className="h-full overflow-auto scrollbar-thin flex justify-center items-center flex-col relative">
            <div className="flex flex-col items-center mb-1 max-w-[400px] text-center">
              <img
                src="logo.png"
                width="80%"
                height="auto"
                className="block drop-shadow-lg bg-transparent"
              />
              <h1 className="text-4xl font-bold mb-1">DeepSeek-R1 WebGPU</h1>
              <h2 className="font-semibold">
              A next-generation reasoning model that runs locally in your
              browser with WebGPU acceleration.
              </h2>
            </div>
            <div className="flex flex-col items-center px-4">
              <p className="max-w-[510px] mb-4">
                <br />
                You are about to load{" "}
                <a
                  href="https://huggingface.co/onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline"
                >
                  DeepSeek-R1-Distill-Qwen-1.5B
                </a>
                , a 1.5B parameter reasoning LLM optimized for in-browser
              inference. Everything runs entirely in your browser with{" "}
                <a
                  href="https://huggingface.co/docs/transformers.js"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  🤗&nbsp;Transformers.js
                </a>{" "}
                and ONNX Runtime Web, meaning no data is sent to a server. Once
                loaded, it can even be used offline. The source code for the demo
                is available on{" "}
                <a
                  href="https://github.com/huggingface/transformers.js-examples/tree/main/deepseek-r1-webgpu"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline"
                >
                GitHub
                </a>
                .
              </p>
              {error && (
                <div className="text-red-500 text-center mb-2">
                  <p className="mb-1">
                    Unable to load model due to the following error:
                  </p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <button
                className="border px-4 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 disabled:bg-blue-100 cursor-pointer disabled:cursor-not-allowed select-none"
                onClick={() => {
                  worker.current.postMessage({ type: "load" });
                  setStatus("loading");
                }}
                disabled={status !== null || error !== null}
              >
                Load model
              </button>
            </div>
          </div>
        )}
        {/* 大模型加载中 */}
        {status === "loading" && (
          <>
            <div className="w-full max-w-[500px] text-left mx-auto p-4 bottom-0 mt-auto">
              <p className="text-center mb-1">{loadingMessage}</p> 
              {progressItems.map(({ file, progress, total }, i) => (
                <Progress
                  key={i}
                  text={file}
                  percentage={progress}
                  total={total}
                />
              ))}
            </div>
          </>
        )}
        {/* 大模型加载完成 */}
        {status === "ready" && (
          <div>

          </div>
        )}
      </div>
    ): (
      <div className="fixed w-screen h-screen bg-black z-10 bg-opacity-[92%] text-white text-2xl font-semibold flex justify-center items-center text-center">
        WebGPU is not supported
        <br />
        by this browser :&#40;
      </div>
    )
  )
}

export default App;