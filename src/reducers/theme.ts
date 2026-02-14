import { SET_THEME, SET_IS_FLAVIE, SET_LOCALE } from '../constants/theme'
import type { ThemeMode } from '../styles/themes'

export interface ThemeState {
  themeMode: ThemeMode
  isFlavie: boolean
  locale: string
}

const INITIAL_STATE: ThemeState = {
  themeMode: 'flavie-dark',
  isFlavie: true,
  locale: 'en',
}

export default function theme(state = INITIAL_STATE, action: { type: string; payload?: any }): ThemeState {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        themeMode: action.payload,
      }
    case SET_IS_FLAVIE:
      return {
        ...state,
        isFlavie: action.payload,
        // Auto-switch theme mode based on isFlavie while preserving dark/light
        themeMode: action.payload
          ? (state.themeMode.includes('dark') ? 'flavie-dark' : 'flavie-light')
          : (state.themeMode.includes('dark') ? 'mann-dark' : 'mann-light'),
      }
    case SET_LOCALE:
      return {
        ...state,
        locale: action.payload,
      }
    default:
      return state
  }
}
