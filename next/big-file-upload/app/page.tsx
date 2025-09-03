"use client";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
// import { sha256File } from "@/lib/hash";
import type { HashWorkerIn, HashWorkerOut } from "./hash.worker";

type InitResp = { complete: boolean; uploaded: number[] };

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_CONCURRENCY = 4;

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("待选择文件");
  const abortRef = useRef<AbortController | null>(null);
  const pausedRef = useRef<boolean>(false);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL("./hash.worker.ts", import.meta.url));
    workerRef.current = worker;
    worker.onmessage = (e: MessageEvent<HashWorkerOut>) => {
      const msg = e.data;
      if (msg.type === "PROGRESS") {
        setStatus(`计算哈希中... ${(msg.progress * 100).toFixed(1)}%`);
      } else if (msg.type === "DONE") {
        setHash(msg.hash);
        setStatus(`哈希：${msg.hash.slice(0, 10)}...`);
      } else if (msg.type === "ERROR") {
        setStatus(`哈希出错：${msg.message}`);
      }
    };
    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const totalChunks = useMemo(() => file ? Math.ceil(file.size / CHUNK_SIZE) : 0, [file]);
  // handleFile 只创建一次，引用恒定。
  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setStatus("计算哈希中...");
    // const h = await sha256File(f, CHUNK_SIZE);
    // setHash(h);
    // setStatus(`哈希：${h.slice(0, 10)}...`);
    workerRef.current?.postMessage({ type: 'HASH', file: f, chunkSize: CHUNK_SIZE } as HashWorkerIn);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) void handleFile(f);
  };

  const initUpload = async (): Promise<InitResp> => {
    const res = await fetch("/api/upload/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileHash: hash,
        fileName: file!.name,
        fileSize: file!.size,
        chunkSize: CHUNK_SIZE,
        totalChunks,
      }),
    });
    return res.json();
  };

  const uploadChunk = async (index: number, signal: AbortSignal) => {
    const start = index * CHUNK_SIZE;
    const end = Math.min(file!.size, start + CHUNK_SIZE);
    const blob = file!.slice(start, end);

    const res = await fetch("/api/upload/chunk", {
      method: "PUT",
      headers: {
        "x-file-hash": hash,
        "x-chunk-index": String(index),
      },
      body: blob,
      signal,
    });
    if (!res.ok) throw new Error(`分片 ${index} 上传失败`);
    return res.json();
  };

  const mergeAll = async () => {
    const res = await fetch("/api/upload/merge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileHash: hash }),
    });
    return res.json();
  };

  const startUpload = async () => {
    if (!file) return;
    setStatus("初始化上传...");
    abortRef.current = new AbortController();
    pausedRef.current = false;

    const init = await initUpload();
    if (init.complete) {
      setProgress(100);
      setStatus("✅ 秒传完成");
      return;
    }

    const uploaded = new Set(init.uploaded ?? []);
    let done = uploaded.size;
    setProgress(Math.floor((done / totalChunks) * 100));

    // 生产待上传队列
    const queue: number[] = [];
    for (let i = 0; i < totalChunks; i++) {
      if (!uploaded.has(i)) queue.push(i);
    }

    // 并发控制
    const workers: Promise<void>[] = [];
    const next = async () => {
      if (pausedRef.current) return; // 暂停时停止抢任务
      const idx = queue.shift();
      if (idx === undefined) return;
      try {
        await uploadChunk(idx, abortRef.current!.signal);
        done++;
        setProgress(Math.floor((done / totalChunks) * 100));
      } finally {
        if (queue.length) await next();
      }
    };
    for (let c = 0; c < Math.min(MAX_CONCURRENCY, queue.length); c++) {
      workers.push(next());
    }

    setStatus("分片上传中...");
    try {
      await Promise.all(workers);
      if (pausedRef.current) {
        setStatus("已暂停");
        return;
      }
      setStatus("合并分片...");
      const r = await mergeAll();
      setStatus(r?.ok ? "✅ 上传完成" : "合并失败");
    } catch (e: any) {
      if (e?.name === "AbortError") {
        setStatus("已暂停");
      } else {
        console.error(e);
        setStatus(e?.message || "上传出错");
      }
    }
  };

  const pause = () => {
    pausedRef.current = true;
    abortRef.current?.abort();
  };

  const resume = async () => {
    if (!file || !hash) return;
    setStatus("继续上传...");
    await startUpload();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">大文件分片上传（Next.js + TS + Tailwind）</h1>

        <label className="block">
          <span className="text-sm text-gray-600">选择文件</span>
          <input
            type="file"
            className="mt-2 block w-full cursor-pointer rounded-lg border p-2"
            onChange={onFileChange}
          />
        </label>

        {file && (
          <div className="rounded-xl border bg-white p-4 shadow">
            <div className="text-sm text-gray-700">文件：{file.name}（{(file.size / (1024*1024)).toFixed(2)} MB）</div>
            <div className="text-sm text-gray-700">分片大小：{(CHUNK_SIZE / (1024*1024))} MB，分片总数：{totalChunks}</div>
            <div className="h-3 w-full overflow-hidden rounded bg-gray-200">
              <div className="h-3 bg-black" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 text-sm text-gray-600">{status}</div>

            <div className="mt-4 flex gap-2">
              <button
                className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
                disabled={!file}
                onClick={startUpload}
              >
                开始上传
              </button>
              <button
                className="rounded-xl border px-4 py-2"
                onClick={pause}
              >
                暂停
              </button>
              <button
                className="rounded-xl border px-4 py-2"
                onClick={resume}
              >
                继续
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500">
          注：示例在本地 <code>/uploads</code> 目录保存分片与最终文件；线上请改为对象存储（S3/OSS/OBS 等）。
        </p>
      </div>
    </main>
  );
}
