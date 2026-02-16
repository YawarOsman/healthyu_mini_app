import { SET_REGISTRATION_DATA, CLEAR_REGISTRATION_DATA } from '../constants/registration'

const INITIAL_STATE = {
  name: '',
  dob: '',
  phone: '',
  email: '',
  loginMethod: 0 // 0 = phone, 1 = email
}

export default function registration (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_REGISTRATION_DATA:
      return {
        ...state,
        ...action.payload
      }
    case CLEAR_REGISTRATION_DATA:
      return INITIAL_STATE
    default:
      return state
  }
}
