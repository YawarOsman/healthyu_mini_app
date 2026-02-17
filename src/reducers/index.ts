import { combineReducers } from 'redux'
import counter from './counter'
import theme from './theme'
import registration from './registration'
import order from '../features/order/reducer'

const rootReducer = combineReducers({
  counter,
  theme,
  registration,
  order,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>


