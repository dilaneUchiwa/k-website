import React from 'react';
import { prisma } from '@/lib/prisma';
import MessagesClient from './MessagesClient';

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <MessagesClient messages={messages as any} />;
}
