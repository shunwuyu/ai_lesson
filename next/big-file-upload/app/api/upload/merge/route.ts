import { NextRequest, NextResponse } from "next/server";
import { mergeChunks, readMeta, writeMeta } from "@/lib/upload-server";

export async function POST(req: NextRequest) {
  const { fileHash } = await req.json();
  const meta = readMeta(fileHash);

  if (!meta) return NextResponse.json({ error: "找不到 meta" }, { status: 404 });

  const { fileName, totalChunks } = meta;
  const finalPath = await mergeChunks(fileHash, fileName, totalChunks);

  meta.complete = true;
  meta.finalPath = finalPath;
  writeMeta(fileHash, meta);

  return NextResponse.json({ ok: true, finalPath });
}
