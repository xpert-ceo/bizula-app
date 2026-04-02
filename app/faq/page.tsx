'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

const faqs = [
  {
    question: 'How quickly can I setup Bizula?',
    answer: 'Sign up, add your first sale, and start tracking profit in under 3 minutes. No training required.'
  },
  {
    question: 'Can I manage users and reset passwords?',
    answer: 'Yes. Admin role can manage user data, reset passwords, suspend/activate accounts, and audit sales.'
  },
  {
    question: 'How do I track profit by day and month?',
    answer: 'The dashboard computes daily, weekly, and monthly profit automatically and highlights trends vs yesterday.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Your session is stored in HttpOnly cookie, and role-based APIs are enforced server-side for all admin paths.'
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar authenticated={false} />
      <main className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900">FAQ</h1>
        <p className="mt-3 text-lg text-slate-600">Get quick answers to your most common questions about Bizula.</p>

        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer text-lg font-semibold text-slate-800">{faq.question}</summary>
              <p className="mt-2 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-lg text-slate-700">Need more help?</p>
          <Link href="/signup" className="mt-4 inline-flex rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            Create account and start free trial
          </Link>
        </div>
      </main>
    </div>
  );
}
