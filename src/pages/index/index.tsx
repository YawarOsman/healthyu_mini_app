import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import Taro, { useDidShow } from '@tarojs/taro'
import { setUserInfo } from '../../features/auth/actions'
import { t } from '../../i18n'
import { RootState } from '../../reducers'
import BottomNavBar from '../../components/BottomNavBar'
import { SvgIcons } from '../../assets/icons'
import { hideHomeButtonSafely } from '../../utils/ui'

// Page-level widget components
import CareRoutineWidget from './components/CareRoutineWidget'
import BoxOrderedWidget from './components/BoxOrderedWidget'
import UserWithoutBoxWidget from './components/UserWithoutBoxWidget'

type MiniAppApi = {
  getAuthCode?: (options: {
    scopes: string[]
    success?: (res: any) => void
    fail?: (err: any) => void
    complete?: (res: any) => void
  }) => void
  getOpenUserInfo?: (options: {
    success?: (res: any) => void
    fail?: (err: any) => void
  }) => void
  getAppIdSync?: () => { appId?: string }
  getSiteInfo?: (options: {
    success?: (res: any) => void
    fail?: (err: any) => void
  }) => void
}

const MINI_AUTH_INFO_STORAGE_KEY = 'miniAuthInfo'
const REQUESTED_AUTH_SCOPES = ['auth_base', 'USER_NAME']

type AuthCodePayload = {
  authCode: string | null
  authSuccessScopes: string[]
  authErrorScopes: Record<string, string> | null
  authErrorMessage: string | null
}

const getMiniAppApi = (): MiniAppApi | null => {
  const globalObj = typeof globalThis !== 'undefined' ? (globalThis as any) : {}
  const maybeMy = globalObj.my
  if (!maybeMy || typeof maybeMy !== 'object') {
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
        resolve({
          authCode: res?.authCode || null,
          authSuccessScopes: Array.isArray(res?.authSuccessScopes) ? res.authSuccessScopes : [],
          authErrorScopes: res?.authErrorScopes || null,
          authErrorMessage: null,
        })
      },
      fail: (err) => {
        resolve({
          authCode: null,
          authSuccessScopes: [],
          authErrorScopes: err?.authErrorScopes || null,
          authErrorMessage: String(err?.errMsg || err?.message || err || ''),
        })
      },
    })
  })
}

const getSiteInfo = (myApi: MiniAppApi): Promise<any> => {
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

const getOpenUserInfo = (myApi: MiniAppApi): Promise<any> => {
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

const parseOpenUserInfoResponse = (raw: any): any => {
  const payload = raw?.response
  if (!payload || typeof payload !== 'string') {
    return null
  }

  try {
    const parsed = JSON.parse(payload)
    return parsed?.response || parsed
  } catch (_e) {
    return null
  }
}

async function fetchMiniAuthInfoOnLoad(dispatch: any) {
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
  const authSnapshot = {
    fetchedAt: Date.now(),
    requestedScopes: REQUESTED_AUTH_SCOPES,
    authCode: authCodePayload.authCode,
    authSuccessScopes: authCodePayload.authSuccessScopes,
    authErrorScopes: authCodePayload.authErrorScopes,
    authErrorMessage: authCodePayload.authErrorMessage,
    appId,
    customerBelongsTo: siteInfo?.customerBelongsTo || null,
    openUserInfo,
  }

  Taro.setStorageSync(MINI_AUTH_INFO_STORAGE_KEY, authSnapshot)
  console.log('Mini app auth info fetched:', authSnapshot)

  const nickName = openUserInfo?.nickName || openUserInfo?.nick_name || ''
  if (nickName) {
    dispatch(setUserInfo({ name: nickName }))
  }
}

export default function Index() {
  console.log('IndexPage: Rendering...')
  const [checking, setChecking] = useState(true)
  const [authInfoFetched, setAuthInfoFetched] = useState(false)
  const { themeMode, isFlavie } = useSelector((state: RootState) => state.theme)
  const { isUserOrderedABox, boxes, estimatedDeliveryDate, name } = useSelector(
    (state: RootState) => state.auth,
  )
  const dispatch = useDispatch()

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0

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
      <View
        style={{
          paddingTop: `${statusBarHeight + 12}px`,
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View className='flex items-center'>
          <Text
            style={{
              fontSize: '26px',
              fontWeight: '500',
              color: 'var(--primary)',
              fontFamily: 'var(--font-juana)',
            }}
          >
            {t('hey')}, {!isFlavie ? 'Karo' : name ? name.split(' ')[0] : 'User'}
          </Text>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: '400',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-locale-body)',
              marginLeft: '10px',
              textTransform: 'uppercase',
            }}
          >
            {isFlavie ? t('for_ladies') : t('for_men')}
          </Text>
        </View>

        {hasBoxes && (
          <View className='flex items-center gap-4' style={{ gap: '16px' }}>
            <Image src={SvgIcons.calendar} style={{ width: '24px', height: '24px', opacity: 0.8 }} />
            <Image src={SvgIcons.qrScan} style={{ width: '24px', height: '24px', opacity: 0.8 }} />
          </View>
        )}
      </View>

      {/* Body — Conditional on state */}
      {hasBoxes ? (
        <CareRoutineWidget boxes={boxes} />
      ) : hasOrderedButNotReceived ? (
        <BoxOrderedWidget estimatedDeliveryDate={estimatedDeliveryDate} />
      ) : (
        <UserWithoutBoxWidget
          brandName={brandName}
          isFlavie={isFlavie}
          dispatch={dispatch}
        />
      )}

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeIndex={0} lockedTabs={true} />
    </View>
  )
}
