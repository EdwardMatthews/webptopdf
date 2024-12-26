import { createInstance } from 'i18next';
import type { Locale } from '@/types/json';

let i18nInstance: ReturnType<typeof createInstance> | null = null;

export const SUPPORTED_LOCALES: Locale[] = ['en', 'zh'];
export const SUPPORTED_LOCALES_NOEN: Locale[] = ['zh'];
export const DEFAULT_LOCALE: Locale = 'en';

export const initI18next = async (locale: Locale) => {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  if (!i18nInstance) {
    i18nInstance = createInstance();
  }

  // 使用绝对路径导入翻译文件
  let translations;
  try {
    translations = (await import(`@/app/locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    throw new Error(`Failed to load translations for locale: ${locale}`);
  }

  await i18nInstance.init({
    lng: locale,
    resources: {
      [locale]: {
        common: translations
      }
    },
    defaultNS: 'common',
    fallbackLng: false,
    interpolation: {
      escapeValue: false
    },
    returnNull: false,
    returnEmptyString: false,
    returnObjects: true
  });

  return i18nInstance;
};

export async function getTranslations(locale: Locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  try {
    const instance = await initI18next(locale);
    
    return function translate(key: string, options?: Record<string, unknown>): string | any[] {
      const translated = instance.t(key, { ...options, lng: locale });
      return translated;
    };
  } catch (error) {
    console.error(`Failed to initialize translations for locale: ${locale}`, error);
    throw error;
  }
}

export type TranslationFunction = (key: string, options?: Record<string, unknown>) => string | any[];