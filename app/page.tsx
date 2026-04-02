'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const valueCards = [
  {
    title: 'Instant profit visibility',
    description: 'See revenue, cost, ad cost, and net profit on every transaction instantly.',
    icon: 'M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z'
  },
  {
    title: 'Data-backed decisions',
    description: 'Get weekly and monthly trend alerts to stop margin leaks before they happen.',
    icon: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h2v-2H7v2zm0 4h2v-2H7v2zm0-8h2V7H7v2zm4 4h6v-2h-6v2zm0 4h6v-2h-6v2zm0-8h6V7h-6v2z'
  },
  {
    title: 'Sales workflow optimization',
    description: 'Quick add sale and one-click corrections to maintain cash flow clarity.',
    icon: 'M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h10v2H7v-2z'
  }
];

const steps = [
  { title: '1. Add a sale', detail: 'Quick entry with product, price, cost, quantity and ad spend.' },
  { title: '2. Track profit instantly', detail: 'Dashboard shows real profit + run rate calculations in seconds.' },
  { title: '3. Improve margins', detail: 'Get alerts for low profit and manual price/cost targets.' }
];

function pushAnalytics(eventType: string, payload = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bizula-analytics', { detail: { eventType, payload, timestamp: new Date().toISOString() } }));
    console.log('Analytics event:', eventType, payload);
  }
}

export default function HomePage() {
  useEffect(() => {
    pushAnalytics('page_view', { page: 'home' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar authenticated={false} />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">New for 2026: dashboard scorecard & alerts</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-6xl">
              Stop guessing profit. Start growing sales with clarity.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Bizula is made for sellers who want a real daily profit engine—add sales in seconds, track margin changes, and unlock weekly opportunities.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                onClick={() => pushAnalytics('signup_click', { source: 'hero' })}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-indigo-500"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                onClick={() => pushAnalytics('login_click', { source: 'hero' })}
                className="rounded-xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100"
              >
                Login
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="rounded-lg bg-white px-3 py-2 shadow-sm">7-day trial</span>
              <span className="rounded-lg bg-white px-3 py-2 shadow-sm">₦2,000/mo</span>
              <span className="rounded-lg bg-white px-3 py-2 shadow-sm">No credit card required</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <div className="absolute -right-28 -top-12 h-56 w-56 animate-spin-slow rounded-full bg-indigo-200/40 blur-3xl" />
            <div className="absolute -left-28 -bottom-16 h-48 w-48 animate-pulse rounded-full bg-cyan-200/40 blur-3xl" />

            <div className="relative h-96 p-5 text-white">
              <div className="font-semibold">Bizula Insights</div>
              <div className="mt-4 text-2xl font-bold">Today’s summary</div>
              <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-white/20 px-3 py-2">Sales 15</div>
                <div className="rounded-lg bg-white/20 px-3 py-2">Revenue ₦540k</div>
                <div className="rounded-lg bg-white/20 px-3 py-2">Profit ₦132k</div>
                <div className="rounded-lg bg-white/20 px-3 py-2">Profit Change +12%</div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <svg width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
                  <circle cx="50" cy="50" r="45" fill="white" fillOpacity="0.12" />
                  <path d="M30 60 L45 40 L60 55 L75 35" stroke="white" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <p className="text-sm text-white">Live profit tracking updates each time you log sales.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-3">
          {valueCards.map((item) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              onMouseEnter={() => pushAnalytics('card_hover', { detail: item.title })}
            >
              <span className="absolute right-4 top-4 opacity-10" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={item.icon} fill="currentColor" />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Trusted by sellers across Africa</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {['Sahara Snooze', 'Amala Mart', 'KaboTech', 'Lagos Lounge'].map((name) => (
              <div key={name} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center text-sm font-semibold text-slate-700">
                {name}
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { text: '“Bizula made our team 30% faster at spotting low-margin items.”', user: 'Olufunke, CEO' },
              { text: '“The daily profit alert is a game changer for inventory decisions.”', user: 'Chinedu, Founder' },
              { text: '“Even our finance team checks Bizula first thing every morning.”', user: 'Aminat, COO' }
            ].map((item) => (
              <blockquote key={item.user} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <p>{item.text}</p>
                <footer className="mt-2 font-semibold text-slate-900">{item.user}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
          <div className="mt-4 space-y-2">
            {[
              {
                q: 'How fast can I setup?',
                a: 'Less than 3 minutes. Input your first sale and Bizula auto-creates profit analytics.'
              },
              {
                q: 'Do I need a subscription to use basic sales tracking?',
                a: 'No. You get a free 7-day trial, then ability to continue with paid plan. Key features remain active with paid tier.'
              },
              {
                q: 'Can I reset user password as admin?',
                a: 'Yes. The admin panel supports password reset, suspend/activate, and role management.'
              }
            ].map((item) => (
              <details key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-4" onClick={() => pushAnalytics('faq_interaction', { question: item.q })}>
                <summary className="cursor-pointer font-semibold text-slate-900">{item.q}</summary>
                <p className="mt-2 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-indigo-50 via-white to-teal-50 p-6 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Ready to make every sale count?</h2>
          <p className="mt-2 text-slate-600">Use Bizula to build a profit-first habit and get daily decisions in your pocket.</p>
          <Link
            href="/signup"
            onClick={() => pushAnalytics('signup_click', { source: 'bottom_cta' })}
            className="mt-4 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-indigo-500"
          >
            Start 7-day trial
          </Link>
        </section>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Bizula · Built for growing merchants and sellers in Africa.
      </footer>
    </div>
  );
}
