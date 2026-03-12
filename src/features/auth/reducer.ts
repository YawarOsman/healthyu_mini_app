import { Gender } from './../../core/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { AuthState } from './types'

type UserInfoPatch = Partial<Pick<AuthState, 'name' | 'phone' | 'email'>>

const INITIAL_STATE: AuthState = {
  name: '',
  phone: '+964 772 128 7272',
  gender: Gender.male,
  qiAuthToken: 'asdfasdf',
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
  },
})

export const { setUserInfo, setSelfieSaved } = authSlice.actions
export default authSlice.reducer
