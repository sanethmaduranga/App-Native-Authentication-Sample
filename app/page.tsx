// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { SignedIn, SignedOut, SignInButton, SignOutButton, User, UserDropdown, UserProfile } from '@asgardeo/nextjs';

function AppNativeIllustration() {
  return (
    <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
      {/* Background blobs */}
      <ellipse cx="260" cy="160" rx="240" ry="140" fill="url(#bgGrad)" opacity="0.07" />
      {/* Phone frame */}
      <rect x="190" y="40" width="140" height="240" rx="18" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="196" y="56" width="128" height="208" rx="10" fill="#f9fafb" />
      {/* Phone notch */}
      <rect x="228" y="44" width="64" height="8" rx="4" fill="#e5e7eb" />
      {/* App screen content */}
      <rect x="206" y="66" width="108" height="14" rx="4" fill="#FF7300" opacity="0.15" />
      <rect x="216" y="68" width="50" height="10" rx="3" fill="#FF7300" opacity="0.7" />
      {/* Login form inside phone */}
      <rect x="206" y="92" width="108" height="40" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      <rect x="212" y="100" width="60" height="6" rx="2" fill="#d1d5db" />
      <rect x="212" y="114" width="40" height="6" rx="2" fill="#d1d5db" />
      <rect x="206" y="140" width="108" height="22" rx="6" fill="#FF7300" />
      <rect x="230" y="147" width="60" height="8" rx="3" fill="white" opacity="0.8" />
      {/* Shield on the left */}
      <g transform="translate(60, 80)">
        <path d="M50 5L10 22V55C10 78 28 98 50 105C72 98 90 78 90 55V22L50 5Z"
          fill="url(#shieldMini)" opacity="0.15" />
        <path d="M50 5L10 22V55C10 78 28 98 50 105C72 98 90 78 90 55V22L50 5Z"
          stroke="#FF7300" strokeWidth="1.5" fill="none" />
        <rect x="34" y="62" width="32" height="26" rx="5" fill="#FF7300" opacity="0.85" />
        <path d="M41 62V53C41 46 59 46 59 53V62" stroke="#FF7300" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="73" r="4" fill="white" opacity="0.9" />
        <rect x="48" y="76" width="4" height="6" rx="1.5" fill="white" opacity="0.9" />
      </g>
      {/* Server on the right */}
      <g transform="translate(360, 90)">
        <rect x="0" y="0" width="90" height="25" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
        <circle cx="14" cy="12" r="5" fill="#22c55e" opacity="0.8" />
        <rect x="26" y="8" width="40" height="4" rx="2" fill="#d1d5db" />
        <rect x="26" y="15" width="24" height="3" rx="1.5" fill="#e5e7eb" />
        <rect x="0" y="32" width="90" height="25" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
        <circle cx="14" cy="44" r="5" fill="#FF7300" opacity="0.8" />
        <rect x="26" y="40" width="40" height="4" rx="2" fill="#d1d5db" />
        <rect x="26" y="47" width="24" height="3" rx="1.5" fill="#e5e7eb" />
        <rect x="0" y="64" width="90" height="25" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
        <circle cx="14" cy="76" r="5" fill="#7B8FD4" opacity="0.8" />
        <rect x="26" y="72" width="40" height="4" rx="2" fill="#d1d5db" />
        <rect x="26" y="79" width="24" height="3" rx="1.5" fill="#e5e7eb" />
        {/* WSO2 label */}
        <text x="45" y="108" textAnchor="middle" fontSize="8" fill="#FF7300" fontWeight="bold" fontFamily="Arial">WSO2 IS</text>
      </g>
      {/* Connection arrows */}
      <path d="M190 160 C160 160 155 120 125 120" stroke="#FF7300" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow)" opacity="0.6" />
      <path d="M330 150 C360 150 360 135 360 135" stroke="#FF7300" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow)" opacity="0.6" />
      {/* Auth token badge */}
      <rect x="215" y="178" width="90" height="22" rx="11" fill="#1D1D35" />
      <text x="260" y="193" textAnchor="middle" fontSize="8" fill="#FF7300" fontWeight="bold" fontFamily="Arial">ACCESS TOKEN</text>
      {/* Labels */}
      <text x="105" y="205" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="Arial">Shield Auth</text>
      <text x="405" y="205" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="Arial">Identity Server</text>
      <defs>
        <linearGradient id="bgGrad" x1="20" y1="20" x2="500" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7300" />
          <stop offset="1" stopColor="#7B8FD4" />
        </linearGradient>
        <linearGradient id="shieldMini" x1="10" y1="5" x2="90" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7300" />
          <stop offset="1" stopColor="#7B8FD4" />
        </linearGradient>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#FF7300" opacity="0.6" />
        </marker>
      </defs>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] via-white to-[#fff7f0]">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
            <text x="0" y="26" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="28" fill="#FF7300">wso2</text>
          </svg>
          <span className="text-gray-300 text-lg">|</span>
          <span className="text-sm font-medium text-gray-600">Identity Server</span>
        </div>
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserDropdown />
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </nav>

      {/* Hero section */}
      <main className="flex flex-col items-center px-6 pt-16 pb-12">
        <SignedOut>
          {/* Badge */}
          <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[#FF7300] text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FF7300] animate-pulse" />
            App-Native Authentication
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 max-w-2xl leading-tight">
            Application Native<br />
            <span className="text-[#FF7300]">Authentication</span> Testing
          </h1>
          <p className="mt-5 text-gray-500 text-center max-w-lg text-base leading-relaxed">
            Test WSO2 Identity Server&apos;s app-native authentication flows directly from your Next.js application — no browser redirects.
          </p>

          {/* Illustration */}
          <div className="mt-10 w-full max-w-xl">
            <AppNativeIllustration />
          </div>
        </SignedOut>

        {/* Signed-in user section */}
        <SignedIn>
          <div className="mt-8 w-full max-w-md">
            <User>
              {(user) => (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#FF7300] font-bold text-lg uppercase">
                      {(user.userName || user.username || user.sub || 'U')[0]}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">Signed in as</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{user.userName || user.username || user.sub}</p>
                </div>
              )}
            </User>
            <div className="mt-4">
              <UserProfile />
            </div>
          </div>
        </SignedIn>

        {/* Feature pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm text-gray-500 max-w-xl">
          {['Password Recovery', 'Username Recovery', 'OTP via Email', 'Secure Sessions', 'OIDC / OAuth 2.0'].map((f) => (
            <span key={f} className="px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-medium">
              {f}
            </span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">
        Powered by <span className="font-semibold text-[#FF7300]">WSO2 Identity Server</span>
      </footer>
    </div>
  );
}