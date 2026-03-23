'use client';

import Link from 'next/link';

function WSO2Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <svg viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
        <text x="0" y="36" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="38" fill="#FF7300">wso2</text>
      </svg>
      <span className={`text-xs font-semibold tracking-widest uppercase ${light ? 'text-white/70' : 'text-gray-400'}`}>
        Identity Server
      </span>
    </div>
  );
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 mt-8 opacity-90">
      {/* Outer shield */}
      <path d="M140 20L60 55V130C60 175 95 215 140 230C185 215 220 175 220 130V55L140 20Z"
        fill="url(#shieldGrad)" opacity="0.15" />
      <path d="M140 20L60 55V130C60 175 95 215 140 230C185 215 220 175 220 130V55L140 20Z"
        stroke="#FF7300" strokeWidth="2" fill="none" />
      {/* Inner shield */}
      <path d="M140 50L90 72V120C90 150 112 176 140 186C168 176 190 150 190 120V72L140 50Z"
        fill="url(#shieldGrad2)" opacity="0.2" />
      {/* Lock body */}
      <rect x="118" y="130" width="44" height="36" rx="6" fill="#FF7300" opacity="0.9" />
      {/* Lock shackle */}
      <path d="M127 130V118C127 108 153 108 153 118V130" stroke="#FF7300" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Keyhole */}
      <circle cx="140" cy="145" r="5" fill="white" opacity="0.9" />
      <rect x="137.5" y="148" width="5" height="8" rx="2" fill="white" opacity="0.9" />
      {/* Orbiting dots */}
      <circle cx="60" cy="100" r="4" fill="#FF7300" opacity="0.6" />
      <circle cx="220" cy="140" r="3" fill="#FF7300" opacity="0.4" />
      <circle cx="80" cy="200" r="5" fill="#7B8FD4" opacity="0.5" />
      <circle cx="200" cy="70" r="3" fill="#7B8FD4" opacity="0.5" />
      {/* Connecting lines */}
      <line x1="64" y1="100" x2="90" y2="110" stroke="#FF7300" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
      <line x1="216" y1="138" x2="190" y2="125" stroke="#FF7300" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
      <line x1="83" y1="196" x2="100" y2="180" stroke="#7B8FD4" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
      <defs>
        <linearGradient id="shieldGrad" x1="60" y1="20" x2="220" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7300" />
          <stop offset="1" stopColor="#7B8FD4" />
        </linearGradient>
        <linearGradient id="shieldGrad2" x1="90" y1="50" x2="190" y2="186" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7300" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#1D1D35] via-[#252550] to-[#1a2a6c] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Orange accent blob */}
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-[#FF7300] opacity-10 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full bg-[#7B8FD4] opacity-10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <WSO2Logo light />
          <div className="mt-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/60 text-xs tracking-widest uppercase">
            v7.2.0
          </div>
          <ShieldIllustration />
          <h2 className="text-white text-xl font-semibold mt-2">Secure by Design</h2>
          <p className="text-white/50 text-sm mt-2 max-w-xs leading-relaxed">
            Enterprise-grade identity &amp; access management for your applications
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <WSO2Logo />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mb-6">{subtitle}</p>}
          <div className={subtitle ? '' : 'mt-6'}>
            {children}
          </div>
        </div>

        <div className="mt-auto pt-12 text-xs text-gray-400 flex items-center gap-1">
          <span>Powered by</span>
          <span className="font-semibold text-[#FF7300]">WSO2 Identity Server</span>
        </div>
      </div>
    </div>
  );
}
