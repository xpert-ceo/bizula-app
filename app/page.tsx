'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Wallet,
  ShieldCheck,
  Activity,
} from 'lucide-react';

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

const steps = [
  {
    title: 'Track a sale',
    detail:
      'Add product cost, selling price, quantity and ad spend in seconds.',
  },
  {
    title: 'Monitor profit instantly',
    detail:
      'Bizula calculates live net profit and business performance automatically.',
  },
  {
    title: 'Scale with confidence',
    detail:
      'Use intelligent alerts and insights to improve margins over time.',
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
    <div className="min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-900">
      <Navbar authenticated={false} />

      {/* SEO TEXT */}
      <div className="sr-only">
        Bizula is a modern African sales and profit tracking software platform
        for merchants, ecommerce brands, sellers and growing businesses.
      </div>

      {/* BACKGROUND LIGHTING */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[380px] w-[380px] rounded-full bg-violet-100/30 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-[300px] w-[300px] rounded-full bg-cyan-100/30 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-12 md:px-8 lg:py-20">
        {/* HERO */}
        <section className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-sm font-semibold tracking-tight text-slate-700">
                New for 2026 — AI margin alerts & business intelligence
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-900 sm:text-6xl lg:text-7xl">
              Profit clarity
              <br />
              for modern
              <span className="text-blue-600"> African sellers.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Bizula helps businesses track sales, monitor margins, detect
              profit leaks and make smarter daily decisions with elegant
              financial visibility.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                onClick={() =>
                  pushAnalytics('signup_click', { source: 'hero' })
                }
                className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500"
              >
                Start Free Trial
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="/login"
                onClick={() =>
                  pushAnalytics('login_click', { source: 'hero' })
                }
                className="rounded-2xl border border-white/60 bg-white/70 px-7 py-4 text-sm font-semibold text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-2xl transition-all duration-300 hover:bg-white"
              >
                Login
              </Link>
            </div>

            {/* TRUST */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                '7-day free trial',
                'No credit card required',
                'Built for African businesses',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            {/* FLOATING GLASS UI */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/65 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-3xl">
              {/* reflections */}
              <div className="absolute inset-0 bg-white/[0.08]" />
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />

              <div className="relative">
                {/* TOP */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Today’s business overview
                    </p>

                    <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                      ₦132,400
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                      +12.4% profit increase
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-xl">
                    <Wallet className="h-7 w-7 text-blue-600" />
                  </div>
                </div>

                {/* STATS */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    {
                      label: 'Sales',
                      value: '15',
                    },
                    {
                      label: 'Revenue',
                      value: '₦540k',
                    },
                    {
                      label: 'Ad Spend',
                      value: '₦64k',
                    },
                    {
                      label: 'Net Margin',
                      value: '24%',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/50 bg-white/50 p-4 backdrop-blur-2xl"
                    >
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <h4 className="mt-2 text-xl font-bold text-slate-900">
                        {item.value}
                      </h4>
                    </div>
                  ))}
                </div>

                {/* AI ALERT */}
                <div className="mt-6 rounded-3xl border border-violet-100 bg-violet-50/70 p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-white p-3 shadow-sm">
                      <Bell className="h-5 w-5 text-violet-600" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900">
                          AI Margin Alert
                        </h4>

                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700">
                          LIVE
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        Your electronics category dropped 8% in profit margin
                        this week due to increased ad spend.
                      </p>
                    </div>
                  </div>
                </div>

                {/* LIVE ACTIVITY */}
                <div className="mt-6 rounded-3xl border border-white/50 bg-white/50 p-5 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Live Activity
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        Business updates in real time
                      </p>
                    </div>

                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      'New sale added — ₦48,000',
                      'Profit target reached for today',
                      'Inventory margin alert detected',
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        <p className="text-sm text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE SECTION */}
        <section className="grid gap-6 md:grid-cols-3">
          {valueCards.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                onMouseEnter={() =>
                  pushAnalytics('card_hover', {
                    detail: item.title,
                  })
                }
                className="group relative overflow-hidden rounded-[28px] border border-white/50 bg-white/60 p-7 shadow-[0_15px_50px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-100/20 blur-3xl transition-all duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-blue-50 shadow-sm">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        {/* HOW IT WORKS */}
        <section className="rounded-[32px] border border-white/50 bg-white/60 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-3xl">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Designed for clarity,
              <span className="text-blue-600"> not complexity.</span>
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Bizula removes spreadsheet chaos and gives businesses a calm,
              modern system for understanding profit performance.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/50 bg-[#fafcff] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
                  {step.title.split('.')[0]}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              text:
                'Bizula helped us identify our most profitable products within the first week.',
              user: 'Aminat — Ecommerce Founder',
            },
            {
              text:
                'The clean dashboard and alerts changed how we monitor daily operations.',
              user: 'Chinedu — Retail Operator',
            },
            {
              text:
                'This feels more premium than most accounting tools we tested.',
              user: 'Samuel — Brand Owner',
            },
          ].map((item) => (
            <blockquote
              key={item.user}
              className="rounded-[28px] border border-white/50 bg-white/60 p-7 shadow-[0_15px_50px_rgba(15,23,42,0.05)] backdrop-blur-2xl"
            >
              <p className="text-lg leading-relaxed text-slate-700">
                “{item.text}”
              </p>

              <footer className="mt-6 font-semibold text-slate-900">
                {item.user}
              </footer>
            </blockquote>
          ))}
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/50 bg-blue-600 px-8 py-14 text-center shadow-[0_30px_80px_rgba(37,99,235,0.25)]">
          <div className="absolute inset-0 bg-white/[0.04]" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-2xl">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-white">
              Make smarter profit decisions.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-blue-100">
              Join modern African businesses using Bizula to gain financial
              visibility and operational clarity every day.
            </p>

            <Link
              href="/signup"
              onClick={() =>
                pushAnalytics('signup_click', {
                  source: 'bottom_cta',
                })
              }
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-blue-700 shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Start Your Free Trial
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/30 bg-white/50 py-10 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 md:flex-row md:px-8">
          <p>
            © {new Date().getFullYear()} Bizula. Modern profit intelligence for
            African businesses.
          </p>

          <div className="flex items-center gap-5">
            <Link href="/faq" className="hover:text-slate-900">
              FAQ
            </Link>

            <Link href="/login" className="hover:text-slate-900">
              Login
            </Link>

            <Link href="/signup" className="hover:text-slate-900">
              Get Started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
