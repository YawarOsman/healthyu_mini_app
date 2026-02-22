import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { AuthState } from './types'

type UserInfoPatch = Partial<Pick<AuthState, 'name' | 'phone' | 'email'>>

const INITIAL_STATE: AuthState = {
  name: '',
  phone: '+964 772 128 7272',
  email: '',
  selfiePath: null,
  isSelfieSaved: true, // Mock: assume selfie is saved for dev
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoPatch>) => {
      Object.assign(state, action.payload)
    },
    setSelfieSaved: (state, action: PayloadAction<string>) => {
      state.isSelfieSaved = true
      state.selfiePath = action.payload
    },
  },
})

export const { setUserInfo, setSelfieSaved } = authSlice.actions
export default authSlice.reducer
