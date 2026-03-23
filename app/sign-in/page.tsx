'use client'

import { SignIn } from '@asgardeo/nextjs';
import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';

export default function SignInPage() {
  return (
    <AuthLayout title="Sign In" subtitle="Sign in to your account to continue">
      <SignIn />
      <div className="mt-5 flex justify-center gap-6 text-sm text-gray-500">
        <Link href="/forgot-username" className="hover:text-[#FF7300] transition-colors">Forgot username?</Link>
        <span className="text-gray-300">|</span>
        <Link href="/forgot-password" className="hover:text-[#FF7300] transition-colors">Forgot password?</Link>
      </div>
    </AuthLayout>
  );
}
