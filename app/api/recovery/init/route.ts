import { NextRequest, NextResponse } from 'next/server';
import config, { isAdminAuth } from '@/lib/config';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${config.recaptchaSecretKey}&response=${token}`,
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  const { recaptchaToken, ...body } = await req.json();

  if (!recaptchaToken) {
    return NextResponse.json({ message: 'reCAPTCHA token is missing.' }, { status: 400 });
  }

  const valid = await verifyRecaptcha(recaptchaToken);
  if (!valid) {
    return NextResponse.json({ message: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
  }

  const response = await fetch(`${config.isBaseUrl}/api/users/v2/recovery/password/init`, {
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
