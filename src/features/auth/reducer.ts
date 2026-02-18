import {
  SET_USER_INFO,
  SET_SELFIE_SAVED,
  SET_USER_ORDERED_BOX,
  SET_USER_BOXES,
  SET_ESTIMATED_DELIVERY,
} from './constants'
import type { AuthState } from './types'

const INITIAL_STATE: AuthState = {
  name: '',
  phone: '+964 772 128 7272',
  email: '',
  selfiePath: null,
  isSelfieSaved: true, // Mock: assume selfie is saved for dev
  isUserOrderedABox: false,
  boxes: [],
  estimatedDeliveryDate: null,
}

export default function auth(state = INITIAL_STATE, action: { type: string; payload?: any }): AuthState {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, ...action.payload }

    case SET_SELFIE_SAVED:
      return { ...state, isSelfieSaved: true, selfiePath: action.payload }

    case SET_USER_ORDERED_BOX:
      return { ...state, isUserOrderedABox: action.payload }

    case SET_USER_BOXES:
      return { ...state, boxes: action.payload }

    case SET_ESTIMATED_DELIVERY:
      return { ...state, estimatedDeliveryDate: action.payload }

    default:
      return state
  }
}
