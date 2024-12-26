import { getTranslations, type TranslationFunction } from '@/i18n'
import Header from './[lang]/components/Header'
import Hero from './[lang]/components/Hero'
import Converter from './[lang]/components/Converter'
import Features from './[lang]/components/Features'
import HowToUse from './[lang]/components/HowToUse'
import FAQ from './[lang]/components/FAQ'
import Footer from './[lang]/components/Footer'
import LanguageDetector from './components/LanguageDetector'
import { Locale } from '@/types/json'

const DEFAULT_LOCALE: Locale = 'en'

export default async function RootPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <LanguageDetector />
      <Header locale={DEFAULT_LOCALE} />
      <main className="flex-grow w-full">
        <Hero locale={DEFAULT_LOCALE} />
        <Converter locale={DEFAULT_LOCALE} />
        <Features locale={DEFAULT_LOCALE} />
        <HowToUse locale={DEFAULT_LOCALE} />
        <FAQ locale={DEFAULT_LOCALE} />
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </div>
  )
}
