import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const hash = req.nextUrl.searchParams.get('hash');
  const sessionId = req.nextUrl.searchParams.get('sessionId');

  if (!hash && !sessionId) {
    return NextResponse.json({ error: 'hash or sessionId required' }, { status: 400 });
  }

  const session = sessionId
    ? await prisma.uploadSession.findUnique({ where: { id: sessionId } })
    : await prisma.uploadSession.findFirst({ where: { hash }, orderBy: { updatedAt: 'desc' } });

  if (!session) return NextResponse.json({ uploaded: [] });

  return NextResponse.json({
    uploaded: Array.isArray(session.uploadedChunks) ? (session.uploadedChunks as number[]) : [],
    totalChunks: session.totalChunks,
    paused: session.paused,
  });
}
