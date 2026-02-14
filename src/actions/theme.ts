import { SET_THEME, SET_IS_FLAVIE, SET_LOCALE } from '../constants/theme'
import type { ThemeMode } from '../styles/themes'

export const setTheme = (themeMode: ThemeMode) => ({
  type: SET_THEME,
  payload: themeMode,
})

export const setIsFlavie = (isFlavie: boolean) => ({
  type: SET_IS_FLAVIE,
  payload: isFlavie,
})

export const setLocale = (locale: string) => ({
  type: SET_LOCALE,
  payload: locale,
})
