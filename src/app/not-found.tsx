import Link from 'next/link'
import { getTranslations } from '@/i18n'

export default async function NotFound() {
  const t = await getTranslations('en')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-8">{t('error.notFound')}</h2>
        <p className="text-gray-400 mb-8">{t('error.description')}</p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors"
        >
          {t('error.backHome')}
        </Link>
      </div>
    </div>
  )
} 