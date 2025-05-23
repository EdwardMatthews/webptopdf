import type { Metadata } from 'next'
import { Locale } from '@/types/json'
import { getTranslations, type TranslationFunction } from '@/i18n'
import GoogleAnalytics from '../components/GoogleAnalytics'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }> | undefined
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.lang as Locale
  if (!locale) {
    throw new Error('Locale is required')
  }

  const t: TranslationFunction = await getTranslations(locale)

  return {
    title: t('meta.title') as string,
    description: t('meta.description') as string,
    alternates: {
      canonical: `https://webptopdf.pro/${locale}`,
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

export default async function Layout({ children, params }: LayoutProps) {
  const resolvedParams = await params
  const locale = resolvedParams?.lang as Locale
  if (!locale) {
    throw new Error('Locale is required')
  }

  return (
    <>
      <GoogleAnalytics />
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    </>
  )
} 