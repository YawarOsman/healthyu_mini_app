import { combineReducers } from 'redux'
import counter from './counter'
import theme from './theme'
import registration from './registration'
import order from '../features/order/reducer'
import auth from '../features/auth/reducer'
import box from './box'

const rootReducer = combineReducers({
  counter,
  theme,
  registration,
  order,
  auth,
  box,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>


