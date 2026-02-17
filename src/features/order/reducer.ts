import {
  FETCH_BOX_REQUEST,
  FETCH_BOX_SUCCESS,
  FETCH_BOX_FAILURE,
  SET_CITY,
  SET_STREET_ADDRESS,
  SET_FULL_ADDRESS,
  SUBMIT_SHIPPING_FORM,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
} from './constants'
import type { BoxEntity } from './types'

export interface OrderState {
  // Box data
  box: BoxEntity | null
  loading: boolean
  error: string | null

  // Cities
  cities: string[]
  citiesLoading: boolean

  // Shipping form
  city: string
  streetAddress: string
  fullAddress: string
  isFormSubmitted: boolean
}

const INITIAL_STATE: OrderState = {
  box: null,
  loading: false,
  error: null,

  cities: [],
  citiesLoading: false,

  city: '',
  streetAddress: '',
  fullAddress: '',
  isFormSubmitted: false,
}

export default function order(state = INITIAL_STATE, action: { type: string; payload?: any }): OrderState {
  switch (action.type) {
    case FETCH_BOX_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_BOX_SUCCESS:
      return { ...state, loading: false, box: action.payload, error: null }
    case FETCH_BOX_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case FETCH_CITIES_REQUEST:
      return { ...state, citiesLoading: true }
    case FETCH_CITIES_SUCCESS:
      return { ...state, citiesLoading: false, cities: action.payload }
    case FETCH_CITIES_FAILURE:
      return { ...state, citiesLoading: false }

    case SET_CITY:
      return { ...state, city: action.payload }
    case SET_STREET_ADDRESS:
      return { ...state, streetAddress: action.payload }
    case SET_FULL_ADDRESS:
      return { ...state, fullAddress: action.payload }
    case SUBMIT_SHIPPING_FORM:
      return { ...state, isFormSubmitted: true }

    default:
      return state
  }
}
