import type { Locale } from '@/types/json'
import { getTranslations, type TranslationFunction } from '@/i18n'
import type { Feature } from '@/types/translations'

interface FeaturesProps {
  locale: Locale
}

export default async function Features({ locale }: FeaturesProps) {
  const t: TranslationFunction = await getTranslations(locale)
  const features = t('features.items', { returnObjects: true }) as Feature[]

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 