import { NextResponse } from 'next/server';
import redis from '../../../../lib/upstash';

export async function GET(request, { params }) {
  const { id } = params;
  const data = await redis.hgetall(`reminder:${id}`);

  if (!data) {
    return NextResponse.json({ error: 'Reminder not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}
