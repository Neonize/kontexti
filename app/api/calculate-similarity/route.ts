import { NextResponse } from 'next/server';

const JINA_API_URL = 'https://api.jina.ai/v1/embeddings';
const JINA_API_KEY = process.env.JINA_API_KEY;

if (!JINA_API_KEY) {
  throw new Error('JINA_API_KEY is not set in the environment variables');
}

async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetch(JINA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JINA_API_KEY}`
    },
    body: JSON.stringify({
      model: 'jina-embeddings-v3',
      task: 'text-matching',
      dimensions: 1024,
      late_chunking: false,
      embedding_type: 'float',
      input: texts.map(text => text.toLowerCase()) // Ensure all inputs are lowercase
    })
  });

  if (!response.ok) {
    throw new Error(`Jina API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.data.map((item: { embedding: number[] }) => item.embedding);
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export async function POST(request: Request) {
  try {
    const { input, target } = await request.json();

    if (!input || !target) {
      return NextResponse.json({ error: 'Input and target words are required' }, { status: 400 });
    }

    // Convert input and target to lowercase
    const lowercaseInput = input.trim().toLowerCase();
    const lowercaseTarget = target.trim().toLowerCase();

    const [inputEmbedding, targetEmbedding] = await getEmbeddings([lowercaseInput, lowercaseTarget]);
    const similarity = cosineSimilarity(inputEmbedding, targetEmbedding);
    const score = Math.round(similarity * 100);

    return NextResponse.json({ score });
  } catch (error) {
    console.error('Error calculating similarity:', error);
    return NextResponse.json({ error: 'Error calculating similarity' }, { status: 500 });
  }
}