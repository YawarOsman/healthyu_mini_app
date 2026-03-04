import type { AppDispatch } from '@/store'

import { fetchDiscoverData } from './api'
import { fetchDiscoverRequest, fetchDiscoverSuccess, fetchDiscoverFailure } from './reducer'

export const fetchDiscover = () => async (dispatch: AppDispatch) => {
  dispatch(fetchDiscoverRequest())
  try {
    const response = await fetchDiscoverData()
    dispatch(
      fetchDiscoverSuccess({
        featuredVideo: response.featuredVideo,
        selfCareItems: response.selfCareItems,
      })
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load discover data'
    dispatch(fetchDiscoverFailure(message))
  }
}
