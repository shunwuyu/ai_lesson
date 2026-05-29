import { NextRequest, NextResponse } from "next/server";
import { readMeta, listUploadedChunks } from "@/lib/upload-server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileHash = searchParams.get("fileHash");
  if (!fileHash) return NextResponse.json({ error: "缺少 fileHash" }, { status: 400 });

  const meta = readMeta(fileHash);
  const uploaded = listUploadedChunks(fileHash);
  return NextResponse.json({ meta, uploaded });
}
