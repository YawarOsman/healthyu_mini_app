import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { ThemeMode } from '@/styles/themes'

import type { ThemeState } from './types'

const INITIAL_STATE: ThemeState = {
  themeMode: 'flavie-dark',
  isFlavie: true,
  locale: 'en',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: INITIAL_STATE,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload
    },
    setIsFlavie: (state, action: PayloadAction<boolean>) => {
      state.isFlavie = action.payload
      const isDark = state.themeMode.includes('dark')
      state.themeMode = action.payload
        ? isDark
          ? 'flavie-dark'
          : 'flavie-light'
        : isDark
          ? 'mann-dark'
          : 'mann-light'
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload
    },
  },
})

export const { setTheme, setIsFlavie, setLocale } = themeSlice.actions
export default themeSlice.reducer
