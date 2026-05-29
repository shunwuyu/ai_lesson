import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureDirs, finalFilePath, sessionChunkDir } from '@/lib/fs-server';
import { promises as fs } from 'fs';
import path from 'path';
import { computeChunkedSha256FromDir } from '@/lib/hash-server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  if (!sessionId) return NextResponse.json({ error: 'No sessionId' }, { status: 400 });

  const session = await prisma.uploadSession.findUnique({ where: { id: sessionId } });
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

  await ensureDirs();
  const dir = sessionChunkDir(sessionId);

  // 校验分片完整性
  const uploaded: number[] = Array.isArray(session.uploadedChunks) ? (session.uploadedChunks as number[]) : [];
  if (uploaded.length !== session.totalChunks) {
    return NextResponse.json({ error: 'Chunks not complete', uploaded }, { status: 400 });
  }

  // 计算 hash（二次校验）
  const serverHash = await computeChunkedSha256FromDir(dir, session.totalChunks);
  if (serverHash !== session.hash) {
    return NextResponse.json({ error: 'Hash mismatch', serverHash, clientHash: session.hash }, { status: 400 });
  }

  // 合并分片
  const finalPath = finalFilePath(session.hash, session.filename);
  const handle = await fs.open(finalPath, 'w');
  try {
    for (let i = 0; i < session.totalChunks; i++) {
      const p = path.join(dir, `${i}.part`);
      const data = await fs.readFile(p);
      await handle.write(data);
    }
  } finally {
    await handle.close();
  }

  // 建立/更新 File 记录
  const file = await prisma.file.upsert({
    where: { hash: session.hash },
    update: {
      filename: session.filename,
      size: session.size,
      chunkSize: session.chunkSize,
      totalChunks: session.totalChunks,
      storagePath: finalPath,
      status: 'COMPLETED',
    },
    create: {
      filename: session.filename,
      size: session.size,
      chunkSize: session.chunkSize,
      totalChunks: session.totalChunks,
      hash: session.hash,
      storagePath: finalPath,
      status: 'COMPLETED',
    },
  });

  // 绑定会话
  await prisma.uploadSession.update({
    where: { id: sessionId },
    data: { fileId: file.id },
  });

  return NextResponse.json({ ok: true, fileId: file.id, url: `/api/upload/file?hash=${file.hash}` });
}
