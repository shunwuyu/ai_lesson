'use client';
import {
    useState,
    useEffect,
    useRef,
    useMemo
} from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";


const DEFAULT_CHUNK = 2 * 1024 * 1024; // 2MB
type InitResp =
    | { instant: true; fileId: string; url: string }
    | { instant: false; sessionId: string; uploaded: number[] };
const CONCURRENCY = 3;

export default function UploadPage() {

    const [file, setFile] = useState<File | null>(null);
    const [chunkSize, setChunkSize] = useState(DEFAULT_CHUNK);
    const [hash, setHash] = useState<string>('');
    const [sessionId, setSessionId] = useState<string>('');
    const [paused, setPaused] = useState<boolean>(false);
    const [hashProgress, setHashProgress] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [uploaded, setUploaded] = useState<Set<number>>(new Set());
    const [total, setTotal] = useState<number>(0);
    const workerRef = useRef<Worker | null>(null);
    const aborters = useRef<Map<number, AbortController>>(new Map());
    

    useEffect(() => {
        const worker = new Worker(new URL('../workers/uploader.worker.ts', import.meta.url));
        workerRef.current = worker;
        worker.onmessage = (e: MessageEvent<any>) => {
            const msg = e.data;
            if (msg.type === 'META') setTotal(msg.totalChunks);
            if (msg.type === 'HASH_PROGRESS') setHashProgress(msg.progress);
            if (msg.type === 'HASH_DONE') setHash(msg.hash);
            if (msg.type === 'CHUNK') {
                console.log(sessionId, '?????????')
                // 收到分片 -> 立刻上传
                void uploadChunk(msg.index, msg.blob);
            }
        }
        return () => worker.terminate();
    }, [])

    const uploadChunk = async (index: number, blob: Blob) => {
        console.log(index, blob, sessionId, paused, '????????')
        if (!sessionId) return;
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

        } finally {
            aborters.current.delete(index);
            // 继续拉下一批
            pullNextBatch();
            // 全部分片到齐 -> complete
            if (uploaded.size + 1 >= total && !paused) {
                // await complete();
            }
        }
    }

    const onPick = (f: File | null) => {
        setFile(f);
        resetState();
        if (f && workerRef.current) {
            console.log('////////////')
            workerRef.current.postMessage({ type: 'INIT', file: f, chunkSize } as const);
        }
    }

    const resetState = () => {
        setSessionId('');
        setUploaded(new Set());
        setTotal(0);
        setProgress(0);
        setHashProgress(0);
        setPaused(false);
        aborters.current.forEach(a => a.abort());
        aborters.current.clear();
    }

    // 点击开始上传
    const start = async () => {
        if (!file || !hash) return;
        const initRes = await fetch('/api/upload/init', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filename: file.name,
                size: file.size,
                chunkSize,
                // 向上取整
                totalChunks: Math.ceil(file.size / chunkSize),
                hash,
            }),
        }).then(r => r.json() as Promise<InitResp>);

        // if ('instant' in initRes && initRes.instant) {
        //     alert('已秒传！');
        //     setProgress(1);
        //     return;
        // }
        // console.log(initRes.sessionId, '---------')
        setSessionId(initRes.sessionId);
        setUploaded(new Set(initRes.uploaded));
        pullNextBatch();
    }
    const onPause = async () => {
    }
    const onResume = async () => {

    }

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
        // console.log(next, '////////////');
        if (next.length) {
            workerRef.current.postMessage({ type: 'PULL', next } as const);
        }
    }

    // 计算还未上传的分片，按并发数拉取
    const pendingList = useMemo(() => {
        const list: number[] = [];
        for (let i = 0; i < total; i++) if (!uploaded.has(i)) list.push(i);
        return list;
    }, [uploaded, total]);

    // console.log(pendingList, '--------------')

    


    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">大文件上传</h2>
            <p className="text-sm text-muted-foreground">
            支持分片、断点续传、秒传、暂停与恢复
            </p>

            {/* 文件选择 */}
            <div className="space-y-2">
                <Label htmlFor="file-upload">选择文件</Label>
                <Input
                    id="file-upload"
                    type="file"
                    onChange={(e) => onPick(e.target.files?.[0] || null)}
                    className="w-full"
                />
            </div>

            {/* 分片大小设置 */}
            <div className="space-y-2">
                <Label htmlFor="chunk-size">分片大小（字节）</Label>
                <Input
                    id="chunk-size"
                    type="number"
                    value={chunkSize}
                    onChange={(e) => setChunkSize(Number(e.target.value || DEFAULT_CHUNK))}
                    className="w-48"
                />
            </div>
            <div style={{ marginTop: 6 }}>
                <Button onClick={start} disabled={!file || !hash}>
                    开始上传
                </Button>
                <Button onClick={onPause} disabled={!sessionId || paused} variant="outline">
                    暂停
                </Button>
                <Button onClick={onResume} disabled={!sessionId || !paused} variant="secondary">
                    恢复
                </Button>
            </div>
            <div className="space-y-3 mt-6">
                <div className="space-y-1">
                    <Label>Hash 计算进度</Label>
                    <Progress value={hashProgress * 100} className="w-full" />
                    <span className="text-sm text-muted-foreground">
                    {(hashProgress * 100).toFixed(1)}%
                    </span>
                </div>

                <div className="space-y-1">
                    <Label>上传进度</Label>
                    <Progress value={progress * 100} className="w-full" />
                    <span className="text-sm text-muted-foreground">
                    {(progress * 100).toFixed(1)}%
                    </span>
                </div>

                <div>
                    <Label>分片上传情况</Label>
                    <p className="text-sm text-muted-foreground">
                    {uploaded.size} / {total}
                    </p>
                </div>

                <div>
                    <Label>文件指纹（chunkedSha256）</Label>
                    <p
                    className="text-sm font-mono break-all p-2 bg-muted rounded-md"
                    style={{ wordBreak: "break-all" }}
                    >
                    {hash || "(计算中...)"}
                    </p>
                </div>
            </div>
        </div>
    )
}

