import { combineReducers } from 'redux'
import counter from './counter'
import theme from './theme'
import registration from './registration'

const rootReducer = combineReducers({
  counter,
  theme,
  registration,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

