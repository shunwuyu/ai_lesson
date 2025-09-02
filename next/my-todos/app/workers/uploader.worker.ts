// 消息协议：
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
  | { type: 'ERROR'; message: string  }
  | { type: 'CHUNK'; index: number; blob: Blob }
  | { type: 'HASH_DONE'; hash: string };


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
            // ArrayBuffer 是一个"原始字节数组"，提供了在内存中分配固定大小二进制数据的能力，
            // 常用于处理文件、网络数据、图像处理等需要直接操作字节的场景。
            const perHashes: ArrayBuffer[] = [];
            let processed = 0;
            // 处理每个分片
            for (let i = 0; i < totalChunks; i++) {
                if (stopped) return;
                // 起始位置
                const start = i * chunkSize;
                // 结束位置 
                const end = Math.min(theFile.size, start + chunkSize);
                // 将文件的指定片段转换为二进制数据缓冲区。
                // 将截取的文件片段转换为 ArrayBuffer 对象，用于后续的二进制数据处理。
                const ab = await theFile.slice(start, end).arrayBuffer();
                // SHA-256 是一种密码学哈希函数，能够将任意长度的输入数据转换为固定长度（256位/32字节）的哈希值，具有不可逆性、
                // 计算出的是32字节（256位）的二进制数据，需转为十六进制字符串才是64字符。
                // 1字节 = 8位，32字节 × 8 = 256位。
                const h = await crypto.subtle.digest('SHA-256', ab);
                // 这个片段的hash
                // console.log(h, '/////')
                perHashes.push(h);
                processed += (end - start);
                // 更新hash计算的进度
                // 这个值必须符合这个类型，但保持它原本的类型
                (self as any).postMessage({
                    type: 'HASH_PROGRESS',
                    progress: processed / theFile.size,
                } satisfies WorkerOut);
            }
            //concat
            const concat = concatArrayBuffers(perHashes);
            // crypto 是全局对象 window.crypto 的一部分
            // Web Crypto API 计算 SHA-256 哈希值，这是浏览器原生支持的功能。
            const final = await crypto.subtle.digest('SHA-256', concat);
            // 转成16进制
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
    } catch(err: any) {
        (self as any).postMessage({ type: 'ERROR', message: err?.message || String(err) } satisfies WorkerOut);
    }
}

/**
 * 将多个 ArrayBuffer 合并成一个 ArrayBuffer
 * @param list ArrayBuffer 数组
 * @returns 合并后的 ArrayBuffer
 */
function concatArrayBuffers(list: ArrayBuffer[]) {
    // console.log(list, '////////////');
    // 第一步：计算所有 ArrayBuffer 的总字节长度
    // 使用 reduce 方法遍历数组，累加每个 ArrayBuffer 的 byteLength 属性
    const total = list.reduce((s, ab) => s + ab.byteLength, 0);
    // 第二步：创建一个新的 Uint8Array，大小为所有 ArrayBuffer 的总长度
    // Uint8Array 是 8 位无符号整数数组，每个元素占 1 字节
    const out = new Uint8Array(total);
    // 第三步：逐个复制 ArrayBuffer 到目标数组中
    let offset = 0;// 当前写入位置的偏移量
    for (const ab of list) {
    // 将当前 ArrayBuffer 转换为 Uint8Array 并复制到目标位置
    // set() 方法将源数组的元素复制到目标数组的指定位置
//     offset 作为 out.set(new Uint8Array(ab), offset) 的第二个参数，表示从 out 数组的哪个位置开始写入数据，确保每个分片的数据不覆盖前面的内容，按顺序拼接。
// 代码模式
      out.set(new Uint8Array(ab), offset);
    // 更新偏移量，为下一个 ArrayBuffer 的写入做准备
      offset += ab.byteLength;
    }
    // 第四步：返回合并后的 ArrayBuffer
    // out.buffer 获取 Uint8Array 底层的 ArrayBuffer
    return out.buffer;
}
  
/**
 * 将 Uint8Array 类型的字节数组转换为对应的十六进制（hex）字符串表示
 * 
 * @param bytes - 输入的 Uint8Array 字节数组，每个元素是一个 0-255 的整数
 * @returns 对应的十六进制小写字符串，每字节转为两位十六进制数（如 "a3f1"）
 */
function toHex(bytes: Uint8Array) {
    // 1. Array.from(bytes) - 将 Uint8Array 转换为普通 JavaScript 数组
    //    例如: new Uint8Array([163, 241]) → [163, 241]
    return Array.from(bytes)
        // 2. .map(b => ...) - 遍历数组中的每个字节（b 是一个 0-255 的数字）
        .map(b => 
            // 3. b.toString(16) - 将字节转换为十六进制字符串
            //    例如: 163 → "a3", 15 → "f"
            // 163 = 10×16 + 3，其中10对应字母a，3还是3，所以结果是 a3。

            // 详细计算：
            // 163 ÷ 16 = 10 余 3
            // 10 在十六进制中用 a 表示
            // 所以 163 的十六进制是 a3
            b.toString(16)
            // 4. .padStart(2, '0') - 确保十六进制字符串至少有 2 位
            //    如果只有一位（如 "f"），在前面补 '0' 变成 "0f"
            //    例如: "f" → "0f", "a3" 保持不变
            .padStart(2, '0')
        )
        // 5. .join('') - 将所有两位的十六进制字符串连接成一个完整字符串
        //    例如: ["a3", "0f", "11"] → "a30f11"
        .join('');
}
