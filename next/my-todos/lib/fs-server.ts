import { promises as fs } from 'fs';
import path from 'path';

export const TMP_ROOT = path.join(process.cwd(), 'tmp');               // 临时根目录
export const CHUNK_ROOT = path.join(TMP_ROOT, 'chunks');               // 分片目录
export const FILE_ROOT = path.join(TMP_ROOT, 'files');                 // 合并后文件目录

export async function ensureDirs() {
  await fs.mkdir(CHUNK_ROOT, { recursive: true });
  await fs.mkdir(FILE_ROOT, { recursive: true });
}

export function sessionChunkDir(sessionId: string) {
  return path.join(CHUNK_ROOT, sessionId);
}

export function finalFilePath(hash: string, filename: string) {
  return path.join(FILE_ROOT, `${hash}__${filename}`);
}
