import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BANTAY - National Traffic & Disaster Monitoring',
  description: 'Keeping Filipinos safe through real-time disaster monitoring, emergency preparedness, and community protection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
