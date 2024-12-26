'use client'

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useRouter, usePathname } from 'next/navigation'
import { SUPPORTED_LOCALES } from '@/i18n'
import type { Locale } from '@/types/json'

const languages: Record<Locale, { name: string; native: string; flag: string }> = {
  en: { 
    name: 'English', 
    native: 'English',
    flag: '🇺🇸'
  },
  zh: { 
    name: 'Chinese', 
    native: '中文',
    flag: '🇨🇳'
  },
}

export default function LanguageSelector({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    // 保存语言偏好
    localStorage.setItem('languagePreference', newLocale)

    // 构建新路径
    const segments = pathname.split('/')
    if (newLocale === 'en') {
      // 如果切换到英文，移除语言代码部分
      if (SUPPORTED_LOCALES.includes(segments[1] as Locale)) {
        segments.splice(1, 1)
      }
    } else {
      // 对于其他语言
      if (SUPPORTED_LOCALES.includes(segments[1] as Locale)) {
        segments[1] = newLocale
      } else {
        segments.splice(1, 0, newLocale)
      }
    }
    const newPath = segments.join('/') || '/'

    // 导航到新路径
    router.push(newPath)
  }

  return (
    <Listbox value={currentLocale} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="relative w-10 h-10 cursor-pointer rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <span className="block text-xl leading-10">
            {languages[currentLocale].flag}
          </span>
          <span className="sr-only">
            {languages[currentLocale].native}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 mt-2 w-40 overflow-auto rounded-lg bg-gray-800 border border-gray-700 py-1 text-base shadow-lg focus:outline-none sm:text-sm">
            {SUPPORTED_LOCALES.map((locale) => (
              <Listbox.Option
                key={locale}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-700' : ''
                  } text-white`
                }
                value={locale}
              >
                {({ selected }) => (
                  <>
                    <span className={`flex items-center gap-2 ${selected ? 'font-medium' : 'font-normal'}`}>
                      <span className="text-xl">{languages[locale].flag}</span>
                      <span>{languages[locale].native}</span>
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/60">
                        <span className="h-2 w-2 rounded-full bg-white/60"></span>
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
} 