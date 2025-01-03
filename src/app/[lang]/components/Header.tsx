import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/types/json'
import LanguageSelector from '@/app/components/LanguageSelector'

export default function Header({ locale }: { locale: Locale }) {
  return (
    <>
      {/* 占位元素，防止内容被固定定位的 header 遮挡 */}
      <div className="h-[72px]" />
      
      {/* 固定定位的 header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {locale === 'en' && (
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl font-semibold text-white">WebP2PDF</span>
              </Link>
            )}
            {locale !== 'en' && (
              <Link href={`/${locale}`} className="flex items-center space-x-2">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl font-semibold text-white">WebP2PDF</span>
              </Link>
            )}
            <LanguageSelector currentLocale={locale} />
          </div>
        </div>
      </header>
    </>
  )
} 