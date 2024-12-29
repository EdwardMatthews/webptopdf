import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { getTranslations, type TranslationFunction } from '@/i18n'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const t: TranslationFunction = await getTranslations("en")

  return {
    title: t('meta.title') as string,
    description: t('meta.description') as string,
    alternates: {
      canonical: 'https://webptopdf.pro/'
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
      <body className={inter.className}>{children}</body>
    </html>
  )
} 