import type { Locale } from '@/types/json'
import Header from './components/Header'
import Hero from './components/Hero'
import Converter from './components/Converter'
import Features from './components/Features'
import HowToUse from './components/HowToUse'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

interface PageProps {
  params: { lang: string }
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const locale = lang as Locale
  if (!locale) {
    throw new Error('Locale is required')
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header locale={locale} />
      <main className="flex-grow w-full">
        <Hero locale={locale} />
        <Converter locale={locale} />
        <Features locale={locale} />
        <HowToUse locale={locale} />
        <FAQ locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
} 