import Link from 'next/link'
import { getTranslations } from '@/i18n'
import { Locale } from '@/types/json'

interface NotFoundProps {
  params: { lang: string }
}

export default async function NotFound({ params = { lang: 'en' } }: NotFoundProps) {
  const { lang } = params
  const locale = lang as Locale
  const t = await getTranslations(locale)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-8">{t('error.notFound')}</h2>
        <p className="text-gray-400 mb-8">{t('error.description')}</p>
        <Link 
          href={locale === 'en' ? '/' : `/${locale}`}
          className="inline-block px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors"
        >
          {t('error.backHome')}
        </Link>
      </div>
    </div>
  )
} 