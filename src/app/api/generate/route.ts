import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/app/lib/imagen';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    
    if (prompt.length > 1000) {
      return NextResponse.json({ error: 'Prompt too long' }, { status: 400 });
    }
    
    const result = await generateImage(prompt);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}