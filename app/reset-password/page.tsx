'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';

type Step = 'otp' | 'reset' | 'done';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState<Step>('otp');
  const [flowConfirmationCode, setFlowConfirmationCode] = useState('');
  const [otp, setOtp] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [resetFlowCode, setResetFlowCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const code = searchParams.get('flowConfirmationCode');
    if (code) setFlowConfirmationCode(code);
  }, [searchParams]);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/recovery/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmationCode: flowConfirmationCode, otp, properties: [] }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.description || data.message || 'Invalid or expired OTP.'); return; }
      setResetCode(data.resetCode);
      setResetFlowCode(data.flowConfirmationCode ?? flowConfirmationCode);
      setStep('reset');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/recovery/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetCode, flowConfirmationCode: resetFlowCode, password, properties: [] }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.description || data.message || 'Failed to reset password.'); return; }
      setStep('done');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  }

  const stepTitles = { otp: 'Enter OTP', reset: 'Set New Password', done: 'Password Reset' };
  const stepSubtitles = {
    otp: 'Enter the OTP sent to your email address',
    reset: 'Choose a strong new password',
    done: undefined,
  };

  return (
    <AuthLayout title={stepTitles[step]} subtitle={stepSubtitles[step]}>
      {step === 'otp' && (
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="otp">OTP Code</label>
            <input
              id="otp" type="text" required value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#FF7300] focus:border-transparent transition tracking-widest text-center text-lg font-mono"
              placeholder="• • • • • •"
              maxLength={6}
            />
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-[#FF7300] hover:bg-[#e66800] text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-50 transition-colors mt-1">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <Link href="/sign-in" className="text-sm text-center text-gray-500 hover:text-[#FF7300] transition-colors mt-1">
            ← Back to Sign In
          </Link>
        </form>
      )}
      {step === 'reset' && (
        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">New Password</label>
            <input
              id="password" type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#FF7300] focus:border-transparent transition"
              placeholder="Enter new password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword" type="password" required value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#FF7300] focus:border-transparent transition"
              placeholder="Confirm new password"
            />
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-[#FF7300] hover:bg-[#e66800] text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-50 transition-colors mt-1">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
      {step === 'done' && (
        <div className="flex flex-col gap-5 text-center py-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-green-500" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Password reset successfully</p>
            <p className="text-sm text-gray-500 mt-1">You can now sign in with your new password.</p>
          </div>
          <button onClick={() => router.push('/sign-in')}
            className="bg-[#FF7300] hover:bg-[#e66800] text-white rounded-lg py-2.5 text-sm font-semibold transition-colors">
            Sign In
          </button>
        </div>
      )}
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return <Suspense><ResetPasswordForm /></Suspense>;
}
