import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureDirs, finalFilePath } from '@/lib/fs-server';
import { promises as fs } from 'fs';

export async function POST(req: NextRequest) {
  const { filename, size, chunkSize, totalChunks, hash } = await req.json();

  if (!filename || !size || !chunkSize || !totalChunks || !hash) {
    return NextResponse.json({ error: 'Bad params' }, { status: 400 });
  }

  await ensureDirs();

  // 1) 秒传：已有完整文件
  const existed = await prisma.file.findUnique({ where: { hash } });
  if (existed && existed.status === 'COMPLETED') {
    const path = finalFilePath(hash, existed.filename);
    try {
      await fs.access(path);
      return NextResponse.json({
        instant: true,
        fileId: existed.id,
        url: `/api/upload/file?hash=${hash}`, // 简易下载接口（演示用）
      });
    } catch {
      // 文件丢失则继续走重传逻辑
    }
  }

  // 2) 查找同 hash 的历史会话，拿到已上传分片（用于断点续传）
  const prev = await prisma.uploadSession.findFirst({
    where: { hash },
    orderBy: { updatedAt: 'desc' },
  });

  const uploadedChunks: number[] = Array.isArray(prev?.uploadedChunks)
    ? (prev!.uploadedChunks as number[])
    : [];

  // 3) 创建新会话
  const session = await prisma.uploadSession.create({
    data: {
      filename,
      size: BigInt(size),
      chunkSize,
      totalChunks,
      hash,
      uploadedChunks,
      paused: false,
    },
  });

  // 4) 返回会话 + 已上传分片（便于直接跳过，继续秒传/断点续传）
  return NextResponse.json({
    instant: false,
    sessionId: session.id,
    uploaded: uploadedChunks,
  });
}
