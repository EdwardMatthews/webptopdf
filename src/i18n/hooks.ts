import { useEffect, useState } from 'react'
import type { Locale } from '@/types/json'
import { getTranslations, type TranslationFunction } from '.'

export function useTranslations(locale: Locale) {
  const [t, setT] = useState<TranslationFunction>(() => 
    // 返回一个临时翻译函数，在真正的翻译加载完成前使用
    (key: string) => key
  )

  useEffect(() => {
    let mounted = true

    async function loadTranslations() {
      const translate = await getTranslations(locale)
      if (mounted) {
        setT(() => translate)
      }
    }

    loadTranslations()

    return () => {
      mounted = false
    }
  }, [locale])

  return t
} 