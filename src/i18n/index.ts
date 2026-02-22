import ar from './ar'
import en from './en'

const locales: Record<string, Record<string, string>> = {
  en,
  ar,
}

let currentLocale = 'en'

export function setCurrentLocale(locale: string) {
  currentLocale = locale
}

export function getCurrentLocale(): string {
  return currentLocale
}

/**
 * Translate a key using the current locale.
 * Falls back to English if key is missing in current locale.
 */
export function t(key: string): string {
  const dict = locales[currentLocale] || locales['en']
  return dict[key] || locales['en'][key] || key
}
