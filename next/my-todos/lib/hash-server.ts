import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

/** 读取分片文件，计算 chunkedSha256 */
export async function computeChunkedSha256FromDir(dir: string, totalChunks: number) {
  const perChunkHashes: Buffer[] = [];
  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(dir, `${i}.part`);
    const data = await fs.readFile(chunkPath);
    const h = createHash('sha256').update(data).digest(); // per-chunk
    perChunkHashes.push(h);
  }
  const concat = Buffer.concat(perChunkHashes);
  const final = createHash('sha256').update(concat).digest('hex');
  return final;
}
