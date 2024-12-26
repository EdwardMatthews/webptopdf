'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { Locale } from '@/types/json'

const DEFAULT_LOCALE: Locale = 'en'
const SUPPORTED_LOCALES: Locale[] = ['en', 'zh']

export default function LanguageDetector() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 如果不是根路径，不做任何处理
    if (pathname !== '/') {
      return
    }

    // 如果用户已经有语言偏好，不再询问
    const hasLanguagePreference = localStorage.getItem('languagePreference')
    if (hasLanguagePreference) {
      return
    }

    // 检查浏览器语言
    const browserLang = navigator.language.split('-')[0] as Locale
    
    // 如果浏览器语言是支持的语言且不是默认语言
    if (browserLang !== DEFAULT_LOCALE && SUPPORTED_LOCALES.includes(browserLang)) {
      // 询问用户是否切换到其首选语言
      const userWantsToSwitch = window.confirm(
        `Would you like to view this page in ${browserLang === 'zh' ? '中文' : browserLang}?`
      )
      
      if (userWantsToSwitch) {
        // 保存偏好并重定向
        localStorage.setItem('languagePreference', browserLang)
        router.push(`/${browserLang}`)
      } else {
        // 保存英语偏好
        localStorage.setItem('languagePreference', DEFAULT_LOCALE)
      }
    } else {
      // 如果浏览器语言不受支持，设置默认语言偏好
      localStorage.setItem('languagePreference', DEFAULT_LOCALE)
    }
  }, [router, pathname])

  return null
} 