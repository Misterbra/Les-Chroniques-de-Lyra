import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment variables');
    }

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', body, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 seconds timeout
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la communication avec l\'API Groq:', error);

    if (error instanceof AxiosError) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error?.message || 'Erreur inconnue lors de la communication avec l\'API Groq';
      
      return NextResponse.json(
        { error: errorMessage },
        { status: statusCode }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Une erreur inattendue s\'est produite' },
      { status: 500 }
    );
  }
}