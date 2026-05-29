export async function sha256File(file: File, chunkSize = 5 * 1024 * 1024): Promise<string> {
    const digests: ArrayBuffer[] = [];
    const total = Math.ceil(file.size / chunkSize);
  
    for (let i = 0; i < total; i++) {
      const start = i * chunkSize;
      const end = Math.min(file.size, start + chunkSize);
      const chunk = file.slice(start, end);
      const buf = await chunk.arrayBuffer();
      digests.push(buf);
    }
  
    // 简单做法：对整文件做 digest（可逐块拼接）
    const whole = new Blob(digests);
    const hashBuffer = await crypto.subtle.digest("SHA-256", await whole.arrayBuffer());
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }
  