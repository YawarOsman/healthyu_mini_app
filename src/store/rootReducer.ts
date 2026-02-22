import { combineReducers } from '@reduxjs/toolkit'

import auth from '@/features/auth/reducer'
import order from '@/features/order/reducer'
import registration from '@/features/registration/reducer'
import theme from '@/features/theme/reducer'

const rootReducer = combineReducers({
  theme,
  registration,
  order,
  auth,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
