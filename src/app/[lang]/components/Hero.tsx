import type { Locale } from '@/types/json'
import { getTranslations, type TranslationFunction } from '@/i18n'

interface HeroProps {
  locale: Locale
}

export default async function Hero({ locale }: HeroProps) {
  const t: TranslationFunction = await getTranslations(locale)

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {t('header.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('header.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
} 