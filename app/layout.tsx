import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bizula',
  description: 'Instant profit insights for every sale'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
