import { combineReducers } from 'redux'
import counter from './counter'
import theme from './theme'
import registration from './registration'
import order from '../features/order/reducer'
import auth from '../features/auth/reducer'

const rootReducer = combineReducers({
  counter,
  theme,
  registration,
  order,
  auth,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>


