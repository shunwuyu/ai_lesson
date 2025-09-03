import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureDirs, sessionChunkDir } from '@/lib/fs-server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs'; // 需要 Node 环境（写文件）

export async function POST(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId');
  const indexStr = req.nextUrl.searchParams.get('index');

  if (!sessionId || indexStr === null) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }
  const index = Number(indexStr);
  if (Number.isNaN(index) || index < 0) {
    return NextResponse.json({ error: 'Bad index' }, { status: 400 });
  }

  const session = await prisma.uploadSession.findUnique({ where: { id: sessionId } });
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

  await ensureDirs();

  const form = await req.formData();
  const blob = form.get('chunk') as File;
  if (!blob) return NextResponse.json({ error: 'No chunk' }, { status: 400 });

  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const dir = sessionChunkDir(sessionId);
  await fs.mkdir(dir, { recursive: true });
  const chunkPath = path.join(dir, `${index}.part`);

  // 幂等：已存在则直接返回 OK
  try {
    await fs.access(chunkPath);
  } catch {
    await fs.writeFile(chunkPath, buffer);
  }

  // 标记分片已上传
  const uploaded = Array.isArray(session.uploadedChunks) ? (session.uploadedChunks as number[]) : [];
  if (!uploaded.includes(index)) uploaded.push(index);

  await prisma.uploadSession.update({
    where: { id: sessionId },
    data: { uploadedChunks: uploaded, paused: false },
  });

  return NextResponse.json({ ok: true, index });
}
