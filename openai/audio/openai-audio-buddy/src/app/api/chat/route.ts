import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message as string;
    const base64Audio = body.audio as string;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-audio-preview",
      modalities: ["text", "audio"],
      audio: { voice: "alloy", format: "wav" },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: message },
            { type: "input_audio", input_audio: { data: base64Audio, format: "wav" }}
          ]
        }
      ]
    });

    console.log('usage: ', response.usage);
    const assistantMessage = response.choices[0].message;
    const audioData = assistantMessage.audio?.data;
    const transcript = assistantMessage.audio?.transcript;

    if (audioData) {
      const audioBuffer = Buffer.from(audioData, 'base64');
      const audioFilename = `output_${Date.now()}.wav`;
      const audioFilepath = join(process.cwd(), 'public', 'uploads', audioFilename);
      await writeFile(audioFilepath, audioBuffer);

      return NextResponse.json({
        transcript: transcript,
        audioUrl: `/uploads/${audioFilename}`,
      });
    } else {
      return NextResponse.json({
        transcript: assistantMessage.content,
        audioUrl: null,
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
