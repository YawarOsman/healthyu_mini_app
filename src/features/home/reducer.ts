import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RoutineEntity, BaseStreakEntity } from './types'

export interface HomeState {
  todayRoutine: RoutineEntity[]
  weeklyStreaks: BaseStreakEntity[]
  loading: boolean
  error: string | null
}

const INITIAL_STATE: HomeState = {
  todayRoutine: [],
  weeklyStreaks: [],
  loading: false,
  error: null,
}

const homeSlice = createSlice({
  name: 'home',
  initialState: INITIAL_STATE,
  reducers: {
    fetchHomeRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchHomeSuccess: (
      state,
      action: PayloadAction<{ todayRoutine: RoutineEntity[]; weeklyStreaks: BaseStreakEntity[] }>
    ) => {
      state.loading = false
      state.todayRoutine = action.payload.todayRoutine
      state.weeklyStreaks = action.payload.weeklyStreaks
      state.error = null
    },
    fetchHomeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setTodayRoutine: (state, action: PayloadAction<RoutineEntity[]>) => {
      state.todayRoutine = action.payload
    },
    setWeeklyStreaks: (state, action: PayloadAction<BaseStreakEntity[]>) => {
      state.weeklyStreaks = action.payload
    },
    markRoutineAsDone: (state, action: PayloadAction<string>) => {
      const routine = state.todayRoutine.find((r) => r.id === action.payload)
      if (routine) {
        routine.timeToRemind.isCompleted = true
      }
    },
  },
})

export const {
  fetchHomeRequest,
  fetchHomeSuccess,
  fetchHomeFailure,
  setTodayRoutine,
  setWeeklyStreaks,
  markRoutineAsDone,
} = homeSlice.actions

export default homeSlice.reducer
