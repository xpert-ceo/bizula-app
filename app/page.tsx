'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

/* =========================
   INLINE SVG ICON SYSTEM
   (NO EXTERNAL LIBS)
========================= */

const Wallet = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2H3V7Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 9h18v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9Z" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const TrendingUp = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Activity = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 12h4l3-7 4 14 3-7h4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Bell = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CheckCircle2 = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Sparkles = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ArrowUpRight = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 7h8v8" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

/* ========================= */

const valueCards = [
  {
    title: 'Real-time profit intelligence',
    description:
      'Track revenue, cost, ad spend and net profit instantly across every sale.',
    icon: Wallet,
  },
  {
    title: 'Smart business insights',
    description:
      'AI-powered trend alerts help you detect margin leaks before they hurt growth.',
    icon: TrendingUp,
  },
  {
    title: 'Operational clarity',
    description:
      'Fast workflows, quick corrections and centralized sales visibility.',
    icon: Activity,
  },
];

/* ========================= */

function pushAnalytics(eventType: string, payload = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('bizula-analytics', {
        detail: {
          eventType,
          payload,
          timestamp: new Date().toISOString(),
        },
      })
    );
  }
}

/* ========================= */

export default function HomePage() {
  useEffect(() => {
    pushAnalytics('page_view', { page: 'home' });
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-900">

      <Navbar authenticated={false} />

      {/* SEO TEXT (SAFE FOR INDEXING) */}
      <div className="sr-only">
        Bizula is a modern profit tracking and sales analytics software for African businesses.
        It helps merchants track revenue, monitor profit margins, detect losses and improve business decisions.
      </div>

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[380px] w-[380px] rounded-full bg-violet-100/30 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-[300px] w-[300px] rounded-full bg-cyan-100/30 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-14 md:px-8">

        {/* ================= HERO ================= */}
        <section className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-sm font-semibold">
                AI-powered profit intelligence for 2026
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              Profit clarity for modern
              <span className="text-blue-600"> African sellers</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              Bizula helps businesses track sales, monitor margins, detect profit leaks and
              make smarter decisions with real-time financial intelligence.
            </p>

            {/* CTA */}
            <div className="mt-10 flex gap-4">
              <Link
                href="/signup"
                onClick={() => pushAnalytics('signup_click', { source: 'hero' })}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-500"
              >
                Start Free Trial
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-6 py-3"
              >
                Login
              </Link>
            </div>

          </div>

          {/* RIGHT - DASHBOARD PREVIEW */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <h3 className="text-lg font-semibold text-slate-500">
              Today’s Profit
            </h3>

            <p className="mt-2 text-4xl font-black">₦132,400</p>

            <p className="mt-2 text-sm text-emerald-600 font-semibold">
              +12.4% growth today
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: 'Sales', value: '15' },
                { label: 'Revenue', value: '₦540k' },
                { label: 'Ad Spend', value: '₦64k' },
                { label: 'Margin', value: '24%' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-slate-50 p-3"
                >
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* ALERT */}
            <div className="mt-6 rounded-xl bg-violet-50 p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-violet-600" />
                <span className="text-sm font-semibold">AI Alert</span>
              </div>

              <p className="mt-2 text-sm text-slate-600">
                Electronics margin dropped 8% due to rising ad costs.
              </p>
            </div>

          </div>
        </section>

        {/* ================= VALUE CARDS ================= */}
        <section className="grid gap-6 md:grid-cols-3">
          {valueCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
              >
                <Icon className="h-6 w-6 text-blue-600" />

                <h3 className="mt-4 font-bold">{item.title}</h3>

                <p className="mt-2 text-sm text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </section>

      </main>
    </div>
  );
}
