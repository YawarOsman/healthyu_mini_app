import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { Gender } from '@/core/types'

import type { AuthState } from './types'

type UserInfoPatch = Partial<Pick<AuthState, 'name' | 'phone' | 'email'>>

const INITIAL_STATE: AuthState = {
  name: 'Lana',
  phone: '+964 772 128 7272',
  gender: Gender.male,
  qiAuthToken: '',
  isUserOrderedABox: false,
  // todo remove it on production
  isUserHaveBox: false,
  email: '',
  selfiePath: 'https://stockcake.com/i/sunset-profile-portrait_1906287_1281672',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoPatch>) => {
      Object.assign(state, action.payload)
    },
    setSelfieSaved: (state, action: PayloadAction<string>) => {
      state.selfiePath = action.payload
    },
    setUserOrderedBox: (state, action: PayloadAction<boolean>) => {
      state.isUserOrderedABox = action.payload
    },
    setUserHaveBox: (state, action: PayloadAction<boolean>) => {
      state.isUserHaveBox = action.payload
    },
    setQiAuthToken: (state, action: PayloadAction<string>) => {
      state.qiAuthToken = action.payload
    },
  },
})

export const { setUserInfo, setSelfieSaved, setUserOrderedBox, setUserHaveBox, setQiAuthToken } = authSlice.actions
export default authSlice.reducer
