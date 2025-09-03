// Worker: compute SHA-256 of a File in chunks and report progress

export type HashWorkerIn =
  | { type: 'HASH'; file: File; chunkSize: number }
  | { type: 'TERMINATE' };

export type HashWorkerOut =
  | { type: 'PROGRESS'; progress: number }
  | { type: 'DONE'; hash: string }
  | { type: 'ERROR'; message: string };

async function sha256ArrayBuffer(buf: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buf);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

self.onmessage = async (e: MessageEvent<HashWorkerIn>) => {
  const msg = e.data;
  if (msg.type === 'TERMINATE') {
    self.close();
    return;
  }
  if (msg.type !== 'HASH') return;

  try {
    const { file, chunkSize } = msg;
    const total = Math.ceil(file.size / chunkSize);

    // Read all chunks, concatenate, and hash once; emit progress per chunk
    const chunks: ArrayBuffer[] = [];
    for (let i = 0; i < total; i++) {
      const start = i * chunkSize;
      const end = Math.min(file.size, start + chunkSize);
      const chunk = file.slice(start, end);
      const buf = await chunk.arrayBuffer();
      chunks.push(buf);
      (self as any).postMessage({ type: 'PROGRESS', progress: (i + 1) / total } as HashWorkerOut);
    }

    const whole = new Blob(chunks);
    const hash = await sha256ArrayBuffer(await whole.arrayBuffer());
    (self as any).postMessage({ type: 'DONE', hash } as HashWorkerOut);
  } catch (err: any) {
    (self as any).postMessage({ type: 'ERROR', message: err?.message || 'hash failed' } as HashWorkerOut);
  }
}; 