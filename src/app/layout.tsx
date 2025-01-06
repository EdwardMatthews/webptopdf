import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { getTranslations, type TranslationFunction } from '@/i18n'
import GoogleAnalytics from './components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const t: TranslationFunction = await getTranslations("en")

  return {
    title: t('meta.title') as string,
    description: t('meta.description') as string,
    alternates: {
      canonical: 'https://webptopdf.pro/',
      languages: {
        'en': 'https://webptopdf.pro/',
        'zh': 'https://webptopdf.pro/zh'
      }
    },
    icons: {
      icon: '/favicon.ico',
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 