import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { DiscoverState, FeaturedVideoData, DiscoverCardData } from './types'

const INITIAL_STATE: DiscoverState = {
  featuredVideo: null,
  selfCareItems: [],
  loading: false,
  error: null,
}

const discoverSlice = createSlice({
  name: 'discover',
  initialState: INITIAL_STATE,
  reducers: {
    fetchDiscoverRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchDiscoverSuccess: (
      state,
      action: PayloadAction<{ featuredVideo: FeaturedVideoData; selfCareItems: DiscoverCardData[] }>
    ) => {
      state.loading = false
      state.featuredVideo = action.payload.featuredVideo
      state.selfCareItems = action.payload.selfCareItems
      state.error = null
    },
    fetchDiscoverFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchDiscoverRequest, fetchDiscoverSuccess, fetchDiscoverFailure } =
  discoverSlice.actions

export default discoverSlice.reducer
