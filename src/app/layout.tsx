import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QueryDash - Real-Time Business Intelligence',
  description: 'English queries, live dashboards, smart alerts. 90% cheaper than competitors.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-primary text-white">
        {children}
      </body>
    </html>
  );
}
