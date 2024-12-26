'use client'

import { useState, useEffect } from 'react'
import { getTranslations, type TranslationFunction } from '@/i18n'
import type { Locale } from '@/types/json'

export function useTranslations(locale: Locale) {
  const [t, setT] = useState<TranslationFunction>(() => {
    // 始终返回临时翻译函数作为初始状态
    const tempTranslate = ((key: string, options?: Record<string, unknown>) => {
      if (options?.returnObjects) {
        return [] as Array<Record<string, string>>;
      }
      return key;
    }) as TranslationFunction;
    
    return tempTranslate;
  });

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