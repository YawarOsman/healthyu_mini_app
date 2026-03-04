import { t } from '@/i18n'
import type { AppDispatch } from '@/store'

import { fetchBoxData, fetchCitiesData, fetchFutureBoxesData, fetchUserBoxesData } from './api'
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
  setFutureBoxes,
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
      dispatch(fetchBoxFailure(response.error || t('failed_to_fetch_box_data')))
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : t('network_error')
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

export const fetchUserBoxes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetchUserBoxesData()
    if (response.success && response.data) {
      dispatch(setUserBoxes(response.data))
    }
  } catch (_error: unknown) {
    // Keep current state on failure; do not interrupt the app flow.
  }
}

export const fetchFutureBoxes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetchFutureBoxesData()
    if (response.success && response.data) {
      dispatch(setFutureBoxes(response.data))
    }
  } catch (_error: unknown) {
    // Keep current state on failure; this list is optional UI content.
  }
}

export {
  setCity,
  setStreetAddress,
  setFullAddress,
  submitShippingForm,
  setUserOrderedBox,
  setUserBoxes,
  setFutureBoxes,
  setEstimatedDelivery,
}
