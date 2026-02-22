import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import rootReducer from './rootReducer'

import type { RootState } from './rootReducer'

declare const process: {
  env?: {
    NODE_ENV?: string
  }
}

const isDev = process.env?.NODE_ENV === 'development'

const createAppStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: isDev,
    middleware: (getDefaultMiddleware) =>
      isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
  })

export type AppStore = ReturnType<typeof createAppStore>
export type AppDispatch = AppStore['dispatch']
export type { RootState }

export default function configStore() {
  return createAppStore()
}
