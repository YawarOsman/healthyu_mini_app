import {
  SET_REGISTRATION_DATA,
  CLEAR_REGISTRATION_DATA
} from '../constants/registration'

export const setRegistrationData = (data) => {
  return {
    type: SET_REGISTRATION_DATA,
    payload: data
  }
}

export const clearRegistrationData = () => {
  return {
    type: CLEAR_REGISTRATION_DATA
  }
}
