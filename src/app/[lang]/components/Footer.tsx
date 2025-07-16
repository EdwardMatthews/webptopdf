import Link from 'next/link'
import { FaCalendar, FaGithub, FaTwitter } from 'react-icons/fa'
import type { Locale } from '@/types/json'
import { getTranslations, type TranslationFunction } from '@/i18n'

interface FooterProps {
  locale: Locale
}

export default async function Footer({ locale }: FooterProps) {
  const t: TranslationFunction = await getTranslations(locale)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('footer.about.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('footer.about.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/webp2pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://cal.com/edward-umt5ht"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaCalendar className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('footer.links.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.ddstopng.pro/" className="text-gray-600 hover:text-gray-800 transition-colors">
                  {t('footer.links.ddsToPng')}
                </Link>
              </li>
              <li>
                <Link href="https://kimi-k2.ai/" className="text-gray-600 hover:text-gray-800 transition-colors">
                  {t('footer.links.kimik2')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('footer.contact.title')}
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>{t('footer.contact.email')}</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {currentYear} WebP2PDF. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
} 