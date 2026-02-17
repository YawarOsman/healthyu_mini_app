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
import { fetchBoxData, fetchCitiesData } from './api'

// ─── Box Fetch ───
export const fetchBox = () => async (dispatch: any) => {
  dispatch({ type: FETCH_BOX_REQUEST })
  try {
    const response = await fetchBoxData()
    if (response.success && response.data) {
      dispatch({ type: FETCH_BOX_SUCCESS, payload: response.data })
    } else {
      dispatch({ type: FETCH_BOX_FAILURE, payload: response.error || 'Failed to fetch box data' })
    }
  } catch (error: any) {
    dispatch({ type: FETCH_BOX_FAILURE, payload: error.message || 'Network error' })
  }
}

// ─── Cities Fetch ───
export const fetchCities = () => async (dispatch: any) => {
  dispatch({ type: FETCH_CITIES_REQUEST })
  try {
    const response = await fetchCitiesData()
    if (response.success && response.data) {
      dispatch({ type: FETCH_CITIES_SUCCESS, payload: response.data })
    } else {
      dispatch({ type: FETCH_CITIES_FAILURE, payload: response.error || 'Failed to fetch cities' })
    }
  } catch (error: any) {
    dispatch({ type: FETCH_CITIES_FAILURE, payload: error.message || 'Network error' })
  }
}

// ─── Shipping Form ───
export const setCity = (city: string) => ({ type: SET_CITY, payload: city })
export const setStreetAddress = (address: string) => ({ type: SET_STREET_ADDRESS, payload: address })
export const setFullAddress = (address: string) => ({ type: SET_FULL_ADDRESS, payload: address })
export const submitShippingForm = () => ({ type: SUBMIT_SHIPPING_FORM })
