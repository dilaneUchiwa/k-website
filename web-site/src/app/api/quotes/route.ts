import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { quoteSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation error', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        ...parsed.data,
        status: 'NEW',
      },
    });

    return NextResponse.json({ quote }, { status: 201 });
  } catch (error) {
    console.error('Quote POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
