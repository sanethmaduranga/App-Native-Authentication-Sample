import { NextRequest, NextResponse } from 'next/server';
import config, { isAdminAuth } from '@/lib/config';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await fetch(`${config.isBaseUrl}/api/users/v2/recovery/username/init`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${isAdminAuth()}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
