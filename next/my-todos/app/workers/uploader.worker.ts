type InitMsg = {
    type: 'INIT';
    file: File;
    chunkSize: number;
  };
  type PullMsg = { type: 'PULL'; next: number[] };          // 请求一批分片（下标）
  type StopMsg = { type: 'STOP' };
  type WorkerIn = InitMsg | PullMsg | StopMsg;
  
  type WorkerOut =
    | { type: 'META'; totalChunks: number }
    | { type: 'HASH_PROGRESS'; progress: number }
    | { type: 'HASH_DONE'; hash: string }
    | { type: 'CHUNK'; index: number; blob: Blob }
    | { type: 'DONE' }
    | { type: 'ERROR'; message: string };
  
  let theFile: File | null = null;
  let chunkSize = 0;
  let totalChunks = 0;
  let stopped = false;
  
  self.onmessage = async (e: MessageEvent<WorkerIn>) => {
    const msg = e.data;
    try {
      if (msg.type === 'INIT') {
        theFile = msg.file;
        chunkSize = msg.chunkSize;
        totalChunks = Math.ceil(theFile.size / chunkSize);
        stopped = false;
        (self as any).postMessage({ type: 'META', totalChunks } satisfies WorkerOut);
  
        // 先预计算 chunkedSha256（每个分片 sha256，再 sha256 所有分片哈希拼接）
        const perHashes: ArrayBuffer[] = [];
        let processed = 0;
  
        for (let i = 0; i < totalChunks; i++) {
          if (stopped) return;
          const start = i * chunkSize;
          const end = Math.min(theFile.size, start + chunkSize);
          const ab = await theFile.slice(start, end).arrayBuffer();
          const h = await crypto.subtle.digest('SHA-256', ab);
          perHashes.push(h);
          processed += (end - start);
          (self as any).postMessage({
            type: 'HASH_PROGRESS',
            progress: processed / theFile.size,
          } satisfies WorkerOut);
        }
        // concat
        const concat = concatArrayBuffers(perHashes);
        const final = await crypto.subtle.digest('SHA-256', concat);
        const hex = toHex(new Uint8Array(final));
        (self as any).postMessage({ type: 'HASH_DONE', hash: hex } satisfies WorkerOut);
      }
  
      if (msg.type === 'PULL') {
        if (!theFile) throw new Error('Worker not initialized');
        for (const i of msg.next) {
          if (stopped) return;
          const start = i * chunkSize;
          const end = Math.min(theFile.size, start + chunkSize);
          const blob = theFile.slice(start, end);
          (self as any).postMessage({ type: 'CHUNK', index: i, blob } satisfies WorkerOut);
        }
      }
  
      if (msg.type === 'STOP') {
        stopped = true;
        (self as any).postMessage({ type: 'DONE' } satisfies WorkerOut);
      }
    } catch (err: any) {
      (self as any).postMessage({ type: 'ERROR', message: err?.message || String(err) } satisfies WorkerOut);
    }
  };
  
  function concatArrayBuffers(list: ArrayBuffer[]) {
    const total = list.reduce((s, ab) => s + ab.byteLength, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const ab of list) {
      out.set(new Uint8Array(ab), offset);
      offset += ab.byteLength;
    }
    return out.buffer;
  }
  
  function toHex(bytes: Uint8Array) {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  