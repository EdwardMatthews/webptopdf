import type { Locale } from '@/types/json'
import { getTranslations, type TranslationFunction } from '@/i18n'
import type { Step } from '@/types/translations'

interface HowToUseProps {
  locale: Locale
}

export default async function HowToUse({ locale }: HowToUseProps) {
  const t: TranslationFunction = await getTranslations(locale)
  const steps = t('howToUse.steps', { returnObjects: true }) as Step[]

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('howToUse.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center relative"
            >
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center absolute -top-4 left-1/2 transform -translate-x-1/2">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 