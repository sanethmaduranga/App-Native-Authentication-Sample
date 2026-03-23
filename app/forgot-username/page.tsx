'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';

type Channel = { id: string; type: string; value: string; preferred: boolean };
type Step = 'email' | 'channel' | 'sent';

export default function ForgotUsernamePage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleInit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/recovery/username-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claims: [{ uri: 'http://wso2.org/claims/emailaddress', value: email }],
          properties: [],
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.description || data.message || 'Failed to initiate recovery.'); return; }
      const option = Array.isArray(data) ? data[0] : data;
      if (!option) { setError('No account found for this email address.'); return; }
      const channelList: Channel[] = option.channelInfo?.channels ?? [];
      const code = option.channelInfo?.recoveryCode ?? '';
      setRecoveryCode(code);
      if (channelList.length === 1) {
        await sendRecover(code, channelList[0].id);
      } else if (channelList.length > 1) {
        setChannels(channelList);
        setStep('channel');
      } else {
        setError('No recovery channels available for this account.');
      }
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  }

  async function sendRecover(code: string, channelId: string) {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/recovery/username-recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryCode: code, channelId, properties: [] }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.description || data.message || 'Failed to send recovery notification.'); return; }
      setStep('sent');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  }

  return (
    <AuthLayout title="Forgot Username" subtitle="Enter your email and we'll send your username">
      {step === 'email' && (
        <form onSubmit={handleInit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
            <input
              id="email" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#FF7300] focus:border-transparent transition"
              placeholder="Enter your email address"
            />
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-[#FF7300] hover:bg-[#e66800] text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-50 transition-colors mt-1">
            {loading ? 'Sending...' : 'Send Username'}
          </button>
          <Link href="/sign-in" className="text-sm text-center text-gray-500 hover:text-[#FF7300] transition-colors mt-1">
            ← Back to Sign In
          </Link>
        </form>
      )}
      {step === 'channel' && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 mb-1">Select a recovery channel:</p>
          {channels.map((ch) => (
            <button key={ch.id} onClick={() => sendRecover(recoveryCode, ch.id)} disabled={loading}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-left hover:border-[#FF7300] hover:bg-orange-50 disabled:opacity-50 transition-colors flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#FF7300] text-xs font-bold">
                {ch.type[0]}
              </span>
              <div>
                <p className="font-medium text-gray-800">{ch.type}</p>
                {ch.value && <p className="text-gray-400 text-xs">{ch.value}</p>}
              </div>
            </button>
          ))}
          {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        </div>
      )}
      {step === 'sent' && (
        <div className="flex flex-col gap-5 text-center py-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#FF7300]" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Check your email</p>
            <p className="text-sm text-gray-500 mt-1">Your username has been sent to your email address.</p>
          </div>
          <Link href="/sign-in"
            className="bg-[#FF7300] hover:bg-[#e66800] text-white rounded-lg py-2.5 text-sm font-semibold transition-colors">
            Back to Sign In
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
