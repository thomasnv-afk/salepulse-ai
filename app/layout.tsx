import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SalesPulse AI - AI-Powered Video Prospecting',
  description: 'Generate personalized AI videos for sales outreach',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
