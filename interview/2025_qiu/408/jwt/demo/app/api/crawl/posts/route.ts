import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import {
    crawlJuejin
} from '../../../../lib/crawlJuejin.mjs';

const prisma = new PrismaClient()

export async function GET() {
    const results = await crawlJuejin();
    console.log(results);
}