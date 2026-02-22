import type { AppDispatch } from '@/store'

import { fetchBoxData, fetchCitiesData } from './api'
import {
  fetchBoxRequest,
  fetchBoxSuccess,
  fetchBoxFailure,
  fetchCitiesRequest,
  fetchCitiesSuccess,
  fetchCitiesFailure,
  setCity,
  setStreetAddress,
  setFullAddress,
  submitShippingForm,
  setUserOrderedBox,
  setUserBoxes,
  setEstimatedDelivery,
} from './reducer'

// ─── Box Fetch ───
export const fetchBox = () => async (dispatch: AppDispatch) => {
  dispatch(fetchBoxRequest())
  try {
    const response = await fetchBoxData()
    if (response.success && response.data) {
      dispatch(fetchBoxSuccess(response.data))
    } else {
      dispatch(fetchBoxFailure(response.error || 'Failed to fetch box data'))
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Network error'
    dispatch(fetchBoxFailure(message))
  }
}

// ─── Cities Fetch ───
export const fetchCities = () => async (dispatch: AppDispatch) => {
  dispatch(fetchCitiesRequest())
  try {
    const response = await fetchCitiesData()
    if (response.success && response.data) {
      dispatch(fetchCitiesSuccess(response.data))
    } else {
      dispatch(fetchCitiesFailure())
    }
  } catch (_error: unknown) {
    dispatch(fetchCitiesFailure())
  }
}

export {
  setCity,
  setStreetAddress,
  setFullAddress,
  submitShippingForm,
  setUserOrderedBox,
  setUserBoxes,
  setEstimatedDelivery,
}
