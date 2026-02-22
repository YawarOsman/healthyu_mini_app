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

const MOCK_ROUTINE_BOXES: BoxEntity[] = [
  {
    id: 1,
    nameEn: 'Nail Serum',
    nameAr: 'سيروم الأظافر',
    headlineEn: 'Vitamin B7 + Keratin',
    headlineAr: 'فيتامين ب7 + كيراتين',
    videoUrl: null,
    videoThumbnail: null,
    image: '',
    isCurrent: false,
    isOverdue: true,
    isLater: false,
    isCompleted: false,
    genres: [],
    items: [],
  },
  {
    id: 2,
    nameEn: 'Magnesium',
    nameAr: 'مغنيسيوم',
    headlineEn: 'Shines your skin and protects nails.',
    headlineAr: 'يضيء بشرتك ويحمي الأظافر.',
    videoUrl: null,
    videoThumbnail: null,
    image: '',
    isCurrent: true,
    isOverdue: false,
    isLater: false,
    isCompleted: false,
    genres: [],
    items: [],
  },
  {
    id: 3,
    nameEn: 'Nail Serum',
    nameAr: 'سيروم الأظافر',
    headlineEn: 'Vitamin B7 + Keratin',
    headlineAr: 'فيتامين ب7 + كيراتين',
    videoUrl: null,
    videoThumbnail: null,
    image: '',
    isCurrent: false,
    isOverdue: false,
    isLater: true,
    isCompleted: false,
    timeLabel: '3:00 PM',
    genres: [],
    items: [],
  },
  {
    id: 4,
    nameEn: 'Heel Repair Cream',
    nameAr: 'كريم إصلاح الكعب',
    headlineEn: 'Shea Butter',
    headlineAr: 'زبدة الشيا',
    videoUrl: null,
    videoThumbnail: null,
    image: '',
    isCurrent: false,
    isOverdue: false,
    isLater: true,
    isCompleted: false,
    timeLabel: '8:00 PM',
    genres: [],
    items: [],
  },
  {
    id: 5,
    nameEn: 'Nail Serum',
    nameAr: 'سيروم الأظافر',
    headlineEn: 'Vitamin B7 + Keratin',
    headlineAr: 'فيتامين ب7 + كيراتين',
    videoUrl: null,
    videoThumbnail: null,
    image: '',
    isCurrent: false,
    isOverdue: false,
    isLater: false,
    isCompleted: true,
    genres: [],
    items: [],
  },
]

const INITIAL_STATE: OrderState = {
  box: null,
  loading: false,
  error: null,

  isUserOrderedABox: true,
  boxes: MOCK_ROUTINE_BOXES,
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
