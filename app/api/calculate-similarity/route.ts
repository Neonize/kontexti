import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// IMPORTANT: Ensure that OPENAI_API_KEY is set in your .env.local file
// This API key should never be exposed to the client-side
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { input, target } = await request.json();

  if (!input || !target) {
    return NextResponse.json({ error: 'Input and target words are required' }, { status: 400 });
  }

  try {
    const [inputEmbedding, targetEmbedding] = await Promise.all([
      getEmbedding(input),
      getEmbedding(target)
    ]);

    const similarity = cosineSimilarity(inputEmbedding, targetEmbedding);
    const score = Math.round(similarity * 100);

    return NextResponse.json({ score });
  } catch (error) {
    console.error('Error calculating similarity:', error);
    return NextResponse.json({ error: 'Error calculating similarity' }, { status: 500 });
  }
}

async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });

  return response.data[0].embedding;
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}