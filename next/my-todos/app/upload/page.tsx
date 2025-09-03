'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type StatusResp = { uploaded: number[]; totalChunks?: number; paused?: boolean };
type InitResp =
  | { instant: true; fileId: string; url: string }
  | { instant: false; sessionId: string; uploaded: number[] };

const CONCURRENCY = 3;
const DEFAULT_CHUNK = 2 * 1024 * 1024; // 2MB

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [chunkSize, setChunkSize] = useState(DEFAULT_CHUNK);
  const [hash, setHash] = useState<string>('');
  const sessionIdRef = useRef<string>("");
  const [uploaded, setUploaded] = useState<Set<number>>(new Set());
  const [total, setTotal] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [hashProgress, setHashProgress] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const aborters = useRef<Map<number, AbortController>>(new Map());
  const workerRef = useRef<Worker | null>(null);

  // 初始化 worker
  useEffect(() => {
    const worker = new Worker(new URL('../workers/uploader.worker.ts', import.meta.url));
    workerRef.current = worker;
    worker.onmessage = (e: MessageEvent<any>) => {
      const msg = e.data;
      if (msg.type === 'META') setTotal(msg.totalChunks);
      if (msg.type === 'HASH_PROGRESS') setHashProgress(msg.progress);
      if (msg.type === 'HASH_DONE') setHash(msg.hash);
      if (msg.type === 'CHUNK') {
        // 收到分片 -> 立刻上传
        void uploadChunk(msg.index, msg.blob);
      }
    };
    return () => worker.terminate();
  }, []);

  // 选择文件后，worker 计算 hash
  const onPick = (f: File | null) => {
    setFile(f);
    resetState();
    if (f && workerRef.current) {
      workerRef.current.postMessage({ type: 'INIT', file: f, chunkSize } as const);
    }
  };

  const resetState = () => {
    sessionIdRef.current = "";
    setUploaded(new Set());
    setTotal(0);
    setProgress(0);
    setHashProgress(0);
    setPaused(false);
    aborters.current.forEach(a => a.abort());
    aborters.current.clear();
  };

  // 点击开始上传
  const start = async () => {
    if (!file || !hash) return;

    // 秒传/断点续传 init
    const initRes = await fetch('/api/upload/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        size: file.size,
        chunkSize,
        totalChunks: Math.ceil(file.size / chunkSize),
        hash,
      }),
    }).then(r => r.json() as Promise<InitResp>);

    if ('instant' in initRes && initRes.instant) {
      alert('已秒传！');
      setProgress(1);
      return;
    }

    sessionIdRef.current = initRes.sessionId;
    setUploaded(new Set(initRes.uploaded));

    // 拉取一批需要的分片
    pullNextBatch();
  };

  // 计算还未上传的分片，按并发数拉取
  const pendingList = useMemo(() => {
    const list: number[] = [];
    for (let i = 0; i < total; i++) if (!uploaded.has(i)) list.push(i);
    return list;
  }, [uploaded, total]);

  useEffect(() => {
    const done = uploaded.size;
    if (total > 0) setProgress(done / total);
  }, [uploaded, total]);

  const pullNextBatch = () => {
    if (!workerRef.current || !file) return;
    if (paused) return;

    const inFlight = aborters.current.size;
    const capacity = Math.max(0, CONCURRENCY - inFlight);
    if (capacity === 0) return;

    const next: number[] = [];
    for (const idx of pendingList) {
      if (next.length >= capacity) break;
      if (!aborters.current.has(idx)) next.push(idx);
    }
    if (next.length) {
      workerRef.current.postMessage({ type: 'PULL', next } as const);
    }
  };

  // 上传单个分片
  const uploadChunk = async (index: number, blob: Blob) => {
    console.log(sessionIdRef.current, '????????????????');
    if (!sessionIdRef.current) return;
    if (paused) return;

    const fd = new FormData();
    fd.append('chunk', blob);

    const ctrl = new AbortController();
    aborters.current.set(index, ctrl);

    try {
      const res = await fetch(`/api/upload/chunk?sessionId=${sessionId}&index=${index}`, {
        method: 'POST',
        body: fd,
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error('upload failed');
      setUploaded(prev => new Set(prev).add(index));
    } catch (e) {
      // 暂停会触发 AbortError，这里忽略
    } finally {
      aborters.current.delete(index);
      // 继续拉下一批
      pullNextBatch();

      // 全部分片到齐 -> complete
      if (uploaded.size + 1 >= total && !paused) {
        await complete();
      }
    }
  };

  const complete = async () => {
    if (!sessionIdRef.current) return;
    const r = await fetch('/api/upload/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId:sessionIdRef.current }),
    }).then(r => r.json());
    if (r.ok) {
      alert('上传完成！');
    } else {
      alert('合并失败：' + (r.error || ''));
    }
  };

  const onPause = () => {
    setPaused(true);
    aborters.current.forEach(a => a.abort());
    aborters.current.clear();
  };

  const onResume = async () => {
    if (!file) return;
    setPaused(false);

    // 再查一次状态（断点续传）
    const st = await fetch(`/api/upload/status?sessionId=${sessionId}`).then(r => r.json() as Promise<StatusResp>);
    setUploaded(new Set(st.uploaded));

    pullNextBatch();
  };

  return (
    <div style={{ padding: 20, maxWidth: 720 }}>
      <h2>大文件上传（分片 / 断点续传 / 秒传 / 暂停恢复）</h2>

      <div style={{ marginTop: 10 }}>
        <input type="file" onChange={e => onPick(e.target.files?.[0] || null)} />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>分片大小（字节）：</label>
        <input
          type="number"
          value={chunkSize}
          onChange={e => setChunkSize(Number(e.target.value || DEFAULT_CHUNK))}
          style={{ width: 160 }}
        />
      </div>

      <div style={{ marginTop: 6 }}>
        <button onClick={start} disabled={!file || !hash}>开始上传</button>
        <button onClick={onPause} disabled={!sessionIdRef.current || paused} style={{ marginLeft: 8 }}>暂停</button>
        <button onClick={onResume} disabled={!sessionIdRef.current || !paused} style={{ marginLeft: 8 }}>恢复</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div>Hash 计算进度：{(hashProgress * 100).toFixed(1)}%</div>
        <div>上传进度：{(progress * 100).toFixed(1)}%</div>
        <div>分片：{uploaded.size} / {total}</div>
        <div style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>文件指纹（chunkedSha256）：{hash || '(计算中...)'}</div>
      </div>
    </div>
  );
}
