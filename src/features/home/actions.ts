import { t } from '@/i18n'
import type { AppDispatch } from '@/store'

import { fetchHomeData } from './api'
import { fetchHomeFailure, fetchHomeRequest, fetchHomeSuccess } from './reducer'

export const fetchHome = () => async (dispatch: AppDispatch) => {
  dispatch(fetchHomeRequest())
  try {
    const response = await fetchHomeData()
    dispatch(
      fetchHomeSuccess({
        todayRoutine: response.todayRoutine,
        weeklyStreaks: response.weeklyStreaks,
      })
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : t('network_error')
    dispatch(fetchHomeFailure(message))
  }
}
