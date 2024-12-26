import type { Locale } from '@/types/json'
import { getTranslations, type TranslationFunction } from '@/i18n'
import type { FAQItem } from '@/types/translations'

interface FAQProps {
  locale: Locale
}

export default async function FAQ({ locale }: FAQProps) {
  const t: TranslationFunction = await getTranslations(locale)
  const items = t('faq.items', { returnObjects: true }) as FAQItem[]

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {items.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.question}
                </h3>
                <p className="text-gray-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 