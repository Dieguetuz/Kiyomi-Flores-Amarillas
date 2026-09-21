import type { Metadata, Viewport } from 'next';
import { Lora, Caveat, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const fontSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const fontHandwriting = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Un pequeño jardín para Kiyomi 💛',
  description: 'Hay algunas flores que estaban esperando por ti.',
  applicationName: 'Tu pequeño jardín amarillo',
  authors: [{ name: 'Diego' }],
  creator: 'Diego',
  keywords: ['flores amarillas', 'jardín', 'kiyomi', 'regalo', 'cuento interactivo'],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌼</text></svg>',
  },
  openGraph: {
    title: 'Un pequeño jardín para Kiyomi 💛',
    description: 'Hay algunas flores que estaban esperando por ti.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Tu pequeño jardín amarillo',
  },
  twitter: {
    card: 'summary',
    title: 'Un pequeño jardín para Kiyomi 💛',
    description: 'Hay algunas flores que estaban esperando por ti.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FAF5EB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${fontSerif.variable} ${fontHandwriting.variable} ${fontSans.variable}`}
    >
      <body className="font-sans antialiased bg-[#FAF5EB] text-[#2D261E] min-h-screen">
        {children}
      </body>
    </html>
  );
}