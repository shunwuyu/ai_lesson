import { NextRequest, NextResponse } from "next/server";
import { ensureUploadDirs, listUploadedChunks, readMeta, writeMeta, fileAlreadyExists } from "@/lib/upload-server";

export async function POST(req: NextRequest) {
  const { fileHash, fileName, fileSize, chunkSize, totalChunks } = await req.json();

  ensureUploadDirs(fileHash);

  // 秒传：如果最终文件已存在，直接返回 complete=true
  if (fileAlreadyExists(fileHash, fileName)) {
    return NextResponse.json({ complete: true, uploaded: [], message: "秒传：文件已存在" });
  }

  // 初始化/更新 meta
  const existed = readMeta(fileHash);
  const uploaded = listUploadedChunks(fileHash);
  const meta = {
    fileName,
    fileSize,
    chunkSize,
    totalChunks,
    uploadedChunks: uploaded,
    complete: false,
  };
  writeMeta(fileHash, { ...(existed || {}), ...meta });

  return NextResponse.json({ complete: false, uploaded, message: "初始化成功" });
}
