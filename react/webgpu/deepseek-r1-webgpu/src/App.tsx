import { 
  useState, // 响应式  
  useRef, // 可变容器对象 
  useEffect
} from 'react'
import Progress from "./components/Progress";
import Chat from "./components/Chat";
import './App.css'

function App() {
  // null、loading  加载模型、ready 模型加载完成
  const [status, setStatus] = useState(null)
  // const [status, setStatus] = useState('ready')
  // 模型文件下载失败 浏览器无 WebGPU 能力 推理报错
  const [error, setError] = useState(null);
  // const [error, setError] = useState('加载失败');
  // 加载信息
  const [loadingMessage, setLoadingMessage] = useState("");
  const textareaRef = useRef(null);
  // 模型是否正在生成回答
  const [isRunning, setIsRunning] = useState(false);
  const [tps, setTps] = useState(null); // 生成tps的速度
  // const [progressItems, setProgressItems] = useState([
  //   {
  //     file: "model.onnx",
  //     progress: 0,
  //     total: 123123,
  //   },
  //   {
  //     file: "say.onnx",
  //     progress: 10,
  //     total: 222121,
  //   }
  // ]);
  const [progressItems, setProgressItems] = useState([]);
  const [messages, setMessages] = useState([
    // {
    //   role: "user",
    //   content: "你好",
    //   answerIndex: 0,
    // },
    // {
    //   role: "assistant",
    //   content: "你好，我是 DeepSeek-R1 WebGPU 模型",
    //   answerIndex: 0,
    // },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null); // none
  // 双重取反!!用来把任意变量强制转换成标准布尔值 true/false。
  // 两个感叹号就是把 navigator.gpu 转成纯粹的 true 或 false。
  // 浏览器有 WebGPU 接口时 navigator.gpu 是真实对象，单个！会变成 false，
  // 再加一个！反转回 true；没有的话它就是 undefined，! 后是 true，再！
  // 就变成 false。简单说！！等于 Boolean ()，专门用来判断浏览器支不支持
  //  WebGPU。
  // if 里能直接判断真假，但变量存的是对象 /undefined，不是纯粹布尔；
  // 用！！转完后变量值只有 true/false，后续赋值、传参、打印都直观，
  // 不会出现 “真值对象” 这种特殊值引发逻辑意外。
  const IS_WEBGPU_AVAILABLE = !!navigator.gpu;
  // setTimeout(() => {
  //   console.log(chatContainerRef.current)
  // }, 2000)

  const worker = useRef(null);
  useEffect(() => {
    resizeInput();
  }, [input]);

  function resizeInput() {
    if (!textareaRef.current) return;

    const target = textareaRef.current;
    target.style.height = "auto";
    const newHeight = Math.min(Math.max(target.scrollHeight, 24), 200);
    target.style.height = `${newHeight}px`;
  }

  function onEnter(message) {
    // 新增一条内容
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setTps(null);
    // 开始生成
    setIsRunning(true);
    // 清空输入框
    setInput("");
  }

  // 生命周期函数
  // 页面加载完后， 
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
      worker.current.postMessage({ type: "check" }); // Do a feature check
      worker.current.addEventListener("message", (e) => {
        switch(e.data.status) {
          case "loading":
            // Model file start load: add a new progress item to the list.
            setStatus("loading");
            setLoadingMessage(e.data.data);
          break;
          // tokenizer, model 文件下载的回调
          case "initiate":
            console.log(e.data);
          setProgressItems((prev) => [...prev, e.data]);
          break;
          case "progress":
          // Model file progress: update one of the progress items.
          setProgressItems((prev) =>
            prev.map((item) => {
              if (item.file === e.data.file) {
                // 更新数据部分
                return { ...item, ...e.data };
              }
              return item;
            }),
          );
          break;

          case "done":
          // Model file loaded: remove the progress item from the list.
          setProgressItems((prev) =>
            // 过滤出不是当前文件的进度项
            prev.filter((item) => item.file !== e.data.file),
          );
          break;

          case "ready":
          // Pipeline ready: the worker is ready to accept messages.
          setStatus("ready");
          break;
          case "error":
            setError(e.data.data);
            break;
          
        }
      });
    }
  }, [])

  return IS_WEBGPU_AVAILABLE ? (
    <div className="flex flex-col h-screen mx-auto items-center justify-end text-gray-800 bg-white ">
      <div className="h-full overflow-auto flex justify-center items-center flex-col relative">
        {/* 任意值语法 */}
        <div className="flex flex-col items-center mb-1 max-w-[400px] text-center">
          <h1 className="text-4xl font-bold mb-1">DeepSeek-R1 WebGPU</h1>
          {/* WebGPU 是浏览器原生硬件图形计算 API，可调用显卡并行算力做渲染、本地 AI 推理。 */}
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
              {/* DeepSeek-R1 的 15 亿参数量蒸馏版，用 Qwen 架构，适合本地轻量推理。
                蒸馏Qwen
              */}
              DeepSeek-R1-Distill-Qwen-1.5B
            </a>
            , a 1.5B parameter reasoning LLM optimized for in-browser
              inference. Everything runs entirely in your browser with{" "}
            {/* Transformers.js 本地运行各类 Transformer 大模型。 
            transformers.js 负责下载、解析、调用这个 1.5B 蒸馏 R1 模型，搭配 WebGPU 在浏览器本地推理。
            */}
            <a
              href="https://huggingface.co/docs/transformers.js"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              🤗&nbsp;Transformers.js
            </a>{" "}
            {/* Open Neural Network Exchange */}
            and ONNX Runtime Web, meaning no data is sent to a server. Once
            loaded, it can even be used offline. The source code for the demo
            is available on{" "}
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
      {status === "ready" && (
        <div
          ref={chatContainerRef}
          className="overflow-y-auto scrollbar-thin w-full flex flex-col items-center h-full"
        >
          <Chat messages={messages} />
        </div>
      )}
      <div className="mt-2 border border-gray-300  rounded-lg w-[600px] max-w-[80%] max-h-[200px] mx-auto relative mb-3 flex">
        <textarea
          ref={textareaRef}
          className="scrollbar-thin w-[550px] dark:bg-gray-700 px-3 py-4 rounded-lg bg-transparent border-none outline-hidden text-gray-800 disabled:text-gray-400  placeholder-gray-500  disabled:placeholder-gray-200 resize-none disabled:cursor-not-allowed"
          placeholder="Type your message..."
          type="text"
          rows={1}
          value={input}
          disabled={status !== "ready"}
          title={status === "ready" ? "Model is ready" : "Model not loaded yet"}
          onKeyDown={(e) => {
            if (
              input.length > 0 &&
              !isRunning &&
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault(); // Prevent default behavior of Enter key
              onEnter(input);
            }
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setInput(target.value)
          }}
        />
      </div>
    </div>
  ):(
    <div></div>
  )
}

export default App
