const ARABIC_LOCALE = 'ar'

export function isArabicLocale(locale: string): boolean {
  return locale === ARABIC_LOCALE
}

export function getDateLocaleCode(locale: string): string {
  return isArabicLocale(locale) ? 'ar-IQ' : 'en-US'
}

