import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apollo Doctors - Find the Best Physicians & Internal Medicine Specialists',
  description: 'Book appointments with the best general physicians and internal medicine specialists. Get online consultations, hospital visits, and expert medical advice.',
  keywords: 'doctors, physicians, general physicians, internal medicine, medical consultation, Apollo healthcare',
  openGraph: {
    title: 'Apollo Doctors - Find the Best Physicians & Internal Medicine Specialists',
    description: 'Book appointments with the best general physicians and internal medicine specialists. Get online consultations, hospital visits, and expert medical advice.',
    url: 'https://www.apollo247.com/specialties/general-physician-internal-medicine',
    siteName: 'Apollo Doctors',
    images: [
      {
        url: 'https://www.apollo247.com/images/social.jpg',
        width: 1200,
        height: 630,
        alt: 'Apollo Doctors',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apollo Doctors - Find the Best Physicians & Internal Medicine Specialists',
    description: 'Book appointments with the best general physicians and internal medicine specialists. Get online consultations, hospital visits, and expert medical advice.',
    images: ['https://www.apollo247.com/images/social.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.apollo247.com/specialties/general-physician-internal-medicine',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}