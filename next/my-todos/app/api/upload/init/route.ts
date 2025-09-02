import { NextRequest, NextResponse } from 'next/server';
import { ensureDirs } from '@/lib/fs-server';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const { filename, size, chunkSize, totalChunks, hash } = await req.json();

    if (!filename || !size || !chunkSize || !totalChunks || !hash) {
        return NextResponse.json({ error: 'Bad params' }, { status: 400 });
    }

    await ensureDirs();

    const uploadedChunks: number[] = [];

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

    return NextResponse.json({
        instant: false,
        sessionId: session.id,
        uploaded: uploadedChunks,
    });

}