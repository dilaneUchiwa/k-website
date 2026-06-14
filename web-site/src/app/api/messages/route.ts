import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation error', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const message = await prisma.contactMessage.create({
      data: {
        ...parsed.data,
        status: 'NEW',
      },
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Message POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
