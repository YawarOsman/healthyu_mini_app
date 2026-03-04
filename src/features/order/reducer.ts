import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { BoxEntity } from './types'

export interface OrderState {
  // Order catalog
  box: BoxEntity | null
  loading: boolean
  error: string | null

  // User order tracking
  isUserOrderedABox: boolean
  boxes: BoxEntity[]
  futureBoxes: BoxEntity[]
  estimatedDeliveryDate: string | null

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

  isUserOrderedABox: true,
  boxes: [],
  futureBoxes: [],
  estimatedDeliveryDate: null,

  cities: [],
  citiesLoading: false,

  city: '',
  streetAddress: '',
  fullAddress: '',
  isFormSubmitted: false,
}

const orderSlice = createSlice({
  name: 'order',
  initialState: INITIAL_STATE,
  reducers: {
    fetchBoxRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchBoxSuccess: (state, action: PayloadAction<BoxEntity>) => {
      state.loading = false
      state.box = action.payload
      state.error = null
    },
    fetchBoxFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setUserOrderedBox: (state, action: PayloadAction<boolean>) => {
      state.isUserOrderedABox = action.payload
    },
    setUserBoxes: (state, action: PayloadAction<BoxEntity[]>) => {
      state.boxes = action.payload
    },
    setFutureBoxes: (state, action: PayloadAction<BoxEntity[]>) => {
      state.futureBoxes = action.payload
    },
    setEstimatedDelivery: (state, action: PayloadAction<string | null>) => {
      state.estimatedDeliveryDate = action.payload
    },
    fetchCitiesRequest: (state) => {
      state.citiesLoading = true
    },
    fetchCitiesSuccess: (state, action: PayloadAction<string[]>) => {
      state.citiesLoading = false
      state.cities = action.payload
    },
    fetchCitiesFailure: (state) => {
      state.citiesLoading = false
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    setStreetAddress: (state, action: PayloadAction<string>) => {
      state.streetAddress = action.payload
    },
    setFullAddress: (state, action: PayloadAction<string>) => {
      state.fullAddress = action.payload
    },
    submitShippingForm: (state) => {
      state.isFormSubmitted = true
    },
  },
})

export const {
  fetchBoxRequest,
  fetchBoxSuccess,
  fetchBoxFailure,
  setUserOrderedBox,
  setUserBoxes,
  setFutureBoxes,
  setEstimatedDelivery,
  fetchCitiesRequest,
  fetchCitiesSuccess,
  fetchCitiesFailure,
  setCity,
  setStreetAddress,
  setFullAddress,
  submitShippingForm,
} = orderSlice.actions

export default orderSlice.reducer
