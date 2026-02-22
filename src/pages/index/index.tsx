import { View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { useState, useEffect } from 'react'

import BottomNavBar from '@/components/BottomNavBar'
import { setUserInfo } from '@/features/auth/actions'
import type { AppDispatch } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { hideHomeButtonSafely } from '@/utils/ui'

// Page-level widget components
import AppBar from './components/AppBar'
import BoxOrderedWidget from './components/BoxOrderedWidget'
import CareRoutineWidget from './components/CareRoutineWidget'
import UserWithoutBoxWidget from './components/UserWithoutBoxWidget'

type MiniAppApi = {
  getAuthCode?: (options: {
    scopes: string[]
    success?: (res: AuthCodeResponse) => void
    fail?: (err: unknown) => void
    complete?: (res: unknown) => void
  }) => void
  getOpenUserInfo?: (options: {
    success?: (res: OpenUserInfoResponse) => void
    fail?: (err: unknown) => void
  }) => void
  getAppIdSync?: () => { appId?: string }
  getSiteInfo?: (options: {
    success?: (res: SiteInfoResponse) => void
    fail?: (err: unknown) => void
  }) => void
}

const MINI_AUTH_INFO_STORAGE_KEY = 'miniAuthInfo'
const REQUESTED_AUTH_SCOPES = ['auth_base','USER_ID', 'HASH_LOGIN_ID', 'USER_LOGIN_ID', 'USER_NAME', 'USER_GENDER']

type UnknownRecord = Record<string, unknown>
type AuthCodeResponse = {
  authCode?: string
  authSuccessScopes?: unknown
  authErrorScopes?: UnknownRecord
}
type OpenUserInfoResponse = {
  response?: string
}
type OpenUserInfo = UnknownRecord & {
  nickName?: string
  nick_name?: string
}
type SiteInfoResponse = UnknownRecord & {
  customerBelongsTo?: string
}
type AuthCodePayload = {
  authCode: string | null
  authSuccessScopes: string[]
  authErrorScopes: UnknownRecord | null
  authErrorMessage: string | null
}
type MiniAuthSnapshot = {
  fetchedAt: number
  requestedScopes: string[]
  authCode: string | null
  authSuccessScopes: string[]
  authErrorScopes: UnknownRecord | null
  authErrorMessage: string | null
  appId: string | null
  customerBelongsTo: string | null
  openUserInfo: OpenUserInfo | null
}

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null

const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  if (isRecord(error)) {
    const errMsg = error.errMsg
    if (typeof errMsg === 'string') {
      return errMsg
    }
    const message = error.message
    if (typeof message === 'string') {
      return message
    }
  }
  return String(error ?? '')
}

const getMiniAppApi = (): MiniAppApi | null => {
  const maybeMy =
    typeof globalThis !== 'undefined'
      ? (globalThis as unknown as { my?: unknown }).my
      : undefined
  if (!isRecord(maybeMy)) {
    return null
  }
  return maybeMy as MiniAppApi
}

const getAuthCode = (myApi: MiniAppApi): Promise<AuthCodePayload> => {
  return new Promise((resolve) => {
    if (typeof myApi.getAuthCode !== 'function') {
      resolve({
        authCode: null,
        authSuccessScopes: [],
        authErrorScopes: null,
        authErrorMessage: 'my.getAuthCode is unavailable',
      })
      return
    }

    myApi.getAuthCode({
      scopes: REQUESTED_AUTH_SCOPES,
      success: (res) => {
        const authSuccessScopes = Array.isArray(res.authSuccessScopes)
          ? res.authSuccessScopes.filter((scope): scope is string => typeof scope === 'string')
          : []
        resolve({
          authCode: typeof res.authCode === 'string' ? res.authCode : null,
          authSuccessScopes,
          authErrorScopes: isRecord(res.authErrorScopes) ? res.authErrorScopes : null,
          authErrorMessage: null,
        })
      },
      fail: (err) => {
        const authErrorScopes =
          isRecord(err) && isRecord(err.authErrorScopes) ? err.authErrorScopes : null
        resolve({
          authCode: null,
          authSuccessScopes: [],
          authErrorScopes,
          authErrorMessage: extractErrorMessage(err),
        })
      },
    })
  })
}

const getSiteInfo = (myApi: MiniAppApi): Promise<SiteInfoResponse | null> => {
  return new Promise((resolve) => {
    if (typeof myApi.getSiteInfo !== 'function') {
      resolve(null)
      return
    }
    myApi.getSiteInfo({
      success: (res) => resolve(res || null),
      fail: () => resolve(null),
    })
  })
}

const getOpenUserInfo = (myApi: MiniAppApi): Promise<OpenUserInfoResponse | null> => {
  return new Promise((resolve) => {
    if (typeof myApi.getOpenUserInfo !== 'function') {
      resolve(null)
      return
    }
    myApi.getOpenUserInfo({
      success: (res) => resolve(res || null),
      fail: () => resolve(null),
    })
  })
}

const parseOpenUserInfoResponse = (raw: OpenUserInfoResponse | null): OpenUserInfo | null => {
  const payload = raw?.response
  if (typeof payload !== 'string' || payload.length === 0) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(payload)
    if (!isRecord(parsed)) {
      return null
    }
    const response = parsed.response
    if (isRecord(response)) {
      return response as OpenUserInfo
    }
    return parsed as OpenUserInfo
  } catch (_e) {
    return null
  }
}

async function fetchMiniAuthInfoOnLoad(dispatch: AppDispatch) {
  const myApi = getMiniAppApi()
  if (!myApi) {
    return
  }

  const appId = myApi.getAppIdSync?.()?.appId || null
  const [siteInfo, authCodePayload] = await Promise.all([
    getSiteInfo(myApi),
    getAuthCode(myApi),
  ])

  if (authCodePayload.authErrorMessage) {
    console.warn('getAuthCode did not return authCode', {
      authErrorMessage: authCodePayload.authErrorMessage,
      authErrorScopes: authCodePayload.authErrorScopes,
    })
  }

  const openUserInfoRaw = await getOpenUserInfo(myApi)
  const openUserInfo = parseOpenUserInfoResponse(openUserInfoRaw)
  const customerBelongsTo = siteInfo?.customerBelongsTo
  const authSnapshot: MiniAuthSnapshot = {
    fetchedAt: Date.now(),
    requestedScopes: REQUESTED_AUTH_SCOPES,
    authCode: authCodePayload.authCode,
    authSuccessScopes: authCodePayload.authSuccessScopes,
    authErrorScopes: authCodePayload.authErrorScopes,
    authErrorMessage: authCodePayload.authErrorMessage,
    appId,
    customerBelongsTo: typeof customerBelongsTo === 'string' ? customerBelongsTo : null,
    openUserInfo,
  }

  Taro.setStorageSync(MINI_AUTH_INFO_STORAGE_KEY, authSnapshot)
  console.log('Mini app auth info fetched:', authSnapshot)

  const nickNameCandidate = openUserInfo?.nickName ?? openUserInfo?.nick_name
  const nickName = typeof nickNameCandidate === 'string' ? nickNameCandidate : ''
  if (nickName) {
    dispatch(setUserInfo({ name: nickName }))
  }
}

export default function HomePage() {
  const [checking, setChecking] = useState(true)
  const [authInfoFetched, setAuthInfoFetched] = useState(false)
  const { themeMode, isFlavie } = useAppSelector((state) => state.theme)
  const { isUserOrderedABox, boxes, estimatedDeliveryDate } = useAppSelector(
    (state) => state.order,
  )
  const { name } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useDidShow(() => {
    checkOnboarding()
    Taro.setNavigationBarTitle({ title: '' })
    void hideHomeButtonSafely()

    if (!authInfoFetched) {
      setAuthInfoFetched(true)
      void fetchMiniAuthInfoOnLoad(dispatch)
    }
  })

  useEffect(() => {
    checkOnboarding()
  }, [])

  const checkOnboarding = () => {
    setChecking(false) // Bypass onboarding for development
  }

  if (checking) {
    return <View className='w-screen h-screen bg-scaffold' />
  }

  const brandName = isFlavie ? 'Flavie' : 'Mann'
  const hasOrderedButNotReceived = isUserOrderedABox && boxes.length === 0
  const hasBoxes = boxes.length > 0

  return (
    <View
      className={`h-screen bg-scaffold flex flex-col overflow-hidden ${themeMode}`}
      data-theme={themeMode}
    >
      {/* App Bar */}
      <AppBar isFlavie={isFlavie} name={name || ''} hasBoxes={hasBoxes} />

      {/* Body — Conditional on state */}
      {hasBoxes ? (
        <CareRoutineWidget boxes={boxes} />
      ) : hasOrderedButNotReceived ? (
        <BoxOrderedWidget estimatedDeliveryDate={estimatedDeliveryDate} />
      ) : (
        <UserWithoutBoxWidget
          brandName={brandName}
          isFlavie={isFlavie}
        />
      )}

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeIndex={0} lockedTabs={!hasBoxes} />
    </View>
  )
}
