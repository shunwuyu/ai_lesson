import { NextRequest, NextResponse } from "next/server";
import { saveChunk, readMeta, writeMeta, listUploadedChunks } from "@/lib/upload-server";

export const runtime = "nodejs";

export async function PUT(req: NextRequest) {
  const fileHash = req.headers.get("x-file-hash")!;
  const chunkIndex = Number(req.headers.get("x-chunk-index"));
  if (!fileHash || Number.isNaN(chunkIndex)) {
    return NextResponse.json({ error: "缺少 x-file-hash 或 x-chunk-index" }, { status: 400 });
  }

  const buf = Buffer.from(await req.arrayBuffer());
  await saveChunk(fileHash, chunkIndex, buf);

  // 更新 meta
  const meta = readMeta(fileHash);
  if (meta) {
    const set = new Set([...(meta.uploadedChunks ?? []), chunkIndex]);
    meta.uploadedChunks = Array.from(set).sort((a, b) => a - b);
    writeMeta(fileHash, meta);
  }

  return NextResponse.json({ ok: true, uploaded: listUploadedChunks(fileHash) });
}
