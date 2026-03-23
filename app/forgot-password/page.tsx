'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import AuthLayout from '../components/AuthLayout';

type Channel = { id: string; type: string; value: string; preferred: boolean };
type Step = 'username' | 'channel';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [step, setStep] = useState<Step>('username');
  const [username, setUsername] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleInit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/recovery/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recaptchaToken,
          claims: [{ uri: 'http://wso2.org/claims/username', value: username }],
          properties: [],
        }),
      });
      const data = await res.json();
      // Reset reCAPTCHA after each attempt
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      if (!res.ok) {
        setError(data.description || data.message || 'Failed to initiate recovery.');
        return;
      }
      const option = Array.isArray(data) ? data[0] : data;
      if (!option) { setError('No recovery options available for this user.'); return; }
      const channelList: Channel[] = option.channelInfo?.channels ?? [];
      const code = option.channelInfo?.recoveryCode ?? '';
      setRecoveryCode(code);
      if (channelList.length === 1) {
        await sendRecover(code, channelList[0].id);
      } else if (channelList.length > 1) {
        setChannels(channelList);
        setStep('channel');
      } else {
        setError('No recovery channels available for this user.');
      }
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  }

  async function sendRecover(code: string, channelId: string) {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/recovery/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryCode: code, channelId, properties: [] }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.description || data.message || 'Failed to send recovery notification.'); return; }
      router.push(`/reset-password?flowConfirmationCode=${encodeURIComponent(data.flowConfirmationCode ?? '')}`);
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your username to receive a recovery code">
      {step === 'username' && (
        <form onSubmit={handleInit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="username">Username</label>
            <input
              id="username" type="text" required value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#FF7300] focus:border-transparent transition"
              placeholder="Enter your username"
            />
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
          />
          {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={loading || !recaptchaToken}
            className="bg-[#FF7300] hover:bg-[#e66800] text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-50 transition-colors mt-1">
            {loading ? 'Sending...' : 'Send Recovery Code'}
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
    </AuthLayout>
  );
}
