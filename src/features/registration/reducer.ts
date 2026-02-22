import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RegistrationState } from './types'

const INITIAL_STATE: RegistrationState = {
  name: '',
  dob: '',
  phone: '',
  email: '',
  loginMethod: 0,
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState: INITIAL_STATE,
  reducers: {
    setRegistrationData: (state, action: PayloadAction<Partial<RegistrationState>>) => {
      Object.assign(state, action.payload)
    },
    clearRegistrationData: () => INITIAL_STATE,
  },
})

export const { setRegistrationData, clearRegistrationData } = registrationSlice.actions
export default registrationSlice.reducer
