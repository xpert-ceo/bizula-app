'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

/* =========================
   INLINE SVG ICONS
========================= */

const Sparkles = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"
      stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ArrowUpRight = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 7h8v8" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Wallet = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 7h18v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Z"
      stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 7V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v1"
      stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const TrendingUp = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Activity = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 12h4l3-7 4 14 3-7h4"
      stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const Bell = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z"
      stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 20a2 2 0 0 0 4 0"
      stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CheckCircle2 = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M20 6L9 17l-5-5"
      stroke="currentColor" strokeWidth="1.8" />
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
      'Detect margin leaks early using trend visibility and structured tracking.',
    icon: TrendingUp,
  },
  {
    title: 'Operational clarity',
    description:
      'Fast workflows and centralized sales visibility for daily decisions.',
    icon: Activity,
  },
];

const steps = [
  {
    title: 'Track a sale',
    detail:
      'Add product cost, selling price, quantity and ad spend in seconds.',
  },
  {
    title: 'Monitor profit instantly',
    detail:
      'Bizula calculates live net profit automatically.',
  },
  {
    title: 'Scale with confidence',
    detail:
      'Use insights to improve margins and reduce losses.',
  },
];

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

export default function HomePage() {
  useEffect(() => {
    pushAnalytics('page_view', { page: 'home' });
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 overflow-hidden">

      <Navbar authenticated={false} />

      {/* SEO */}
      <div className="sr-only">
        Bizula is a profit tracking software for African businesses helping sellers
        monitor revenue, cost, margin and sales performance in real time.
      </div>

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[380px] w-[380px] rounded-full bg-violet-100/30 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-[300px] w-[300px] rounded-full bg-cyan-100/30 blur-3xl" />
      </div>

      <main className="relative mx-auto w-full max-w-7xl px-4 py-14 md:px-8 space-y-24">

        {/* HERO */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-semibold">
                Business intelligence for modern sellers
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight sm:text-6xl">
              Profit clarity for
              <span className="text-blue-600"> African businesses</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              Track sales, monitor margins, and understand your real profit without spreadsheets.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl"
                onClick={() => pushAnalytics('signup_click')}
              >
                Start Free Trial <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link href="/login" className="px-6 py-3 rounded-xl border">
                Login
              </Link>
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-sm text-slate-500">Today</h3>
            <h2 className="text-3xl font-bold mt-2">₦132,400</h2>
            <p className="text-green-600 mt-1">+12.4% growth</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { label: 'Sales', value: '15' },
                { label: 'Revenue', value: '₦540k' },
                { label: 'Cost', value: '₦64k' },
                { label: 'Margin', value: '24%' },
              ].map((i) => (
                <div key={i.label} className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-xs text-slate-500">{i.label}</p>
                  <p className="font-bold">{i.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-violet-50 p-4 rounded-xl flex gap-3">
              <Bell className="w-5 h-5 text-violet-600" />
              <p className="text-sm">
                Margin alert: Electronics dropped 8% this week.
              </p>
            </div>
          </div>
        </section>

        {/* VALUE */}
        <section className="grid md:grid-cols-3 gap-6">
          {valueCards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="bg-white p-6 rounded-2xl shadow-sm">
                <Icon className="w-6 h-6 text-blue-600" />
                <h3 className="mt-4 font-bold">{c.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{c.description}</p>
              </div>
            );
          })}
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white rounded-3xl p-8">
          <h2 className="text-3xl font-bold">
            How Bizula works
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-slate-50 p-6 rounded-2xl">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              text: 'Bizula helped us understand our real profit in days.',
              user: 'Aminat',
            },
            {
              text: 'We finally stopped guessing our margins.',
              user: 'Chinedu',
            },
            {
              text: 'Very clean and simple system.',
              user: 'Samuel',
            },
          ].map((t) => (
            <div key={t.user} className="bg-white p-6 rounded-2xl">
              <p className="text-slate-700">“{t.text}”</p>
              <p className="mt-4 font-bold">{t.user}</p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-3xl p-8">
          <h2 className="text-3xl font-bold">FAQ</h2>

          <div className="mt-6 space-y-4">
            {[
              {
                q: 'How do I start?',
                a: 'Create an account and begin adding sales immediately.',
              },
              {
                q: 'Do I need training?',
                a: 'No. Bizula is simple and works out of the box.',
              },
              {
                q: 'Is my data safe?',
                a: 'Yes. Your data is stored securely.',
              },
            ].map((f) => (
              <details key={f.q} className="bg-slate-50 p-4 rounded-xl">
                <summary className="font-semibold cursor-pointer">
                  {f.q}
                </summary>
                <p className="mt-2 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold">Start improving your profit today</h2>
          <p className="mt-3 text-blue-100">
            Join businesses already using Bizula.
          </p>

          <Link
            href="/signup"
            className="inline-flex mt-6 bg-white text-blue-600 px-6 py-3 rounded-xl"
          >
            Get Started
          </Link>
        </section>

      </main>

      <footer className="text-center py-10 text-sm text-slate-500">
        © {new Date().getFullYear()} Bizula
      </footer>
    </div>
  );
}
