// 导入文件系统的 Promise 版本，让文件操作可以使用 async/await 语法。
import { promises as fs } from 'fs';
import path from 'path';
// 临时根目录
// 获取运行 Node.js 程序时所在的目录路径。
export const TMP_ROOT = path.join(process.cwd(), 'tmp');  
export const CHUNK_ROOT = path.join(TMP_ROOT, 'chunks');
export const FILE_ROOT = path.join(TMP_ROOT, 'files'); 

export async function ensureDirs() {
    await fs.mkdir(CHUNK_ROOT, { recursive: true });
    await fs.mkdir(FILE_ROOT, { recursive: true });
}

export function sessionChunkDir(sessionId: string) {
    return path.join(CHUNK_ROOT, sessionId);
}