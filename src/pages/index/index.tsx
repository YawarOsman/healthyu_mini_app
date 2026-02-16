import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import Taro, { useDidShow } from '@tarojs/taro'
import { setIsFlavie } from '../../actions/theme'
import { t } from '../../i18n'
import { RootState } from '../../reducers'
import BottomNavBar from '../../components/BottomNavBar'
import cameraIcon from '../../assets/svg/camera.svg'

export default function Index() {
  const [checking, setChecking] = useState(true)
  const { themeMode, isFlavie } = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0

  useDidShow(() => {
    checkOnboarding()
  })

  useEffect(() => {
    checkOnboarding()
  }, [])

  const checkOnboarding = () => {
    try {
      const hasOnboarded = Taro.getStorageSync('hasOnboarded')
      if (!hasOnboarded) {
        Taro.redirectTo({ url: '/pages/onboarding/index' })
      } else {
        setChecking(false)
      }
    } catch (e) {
      Taro.redirectTo({ url: '/pages/onboarding/index' })
    }
  }

  if (checking) {
    return <View className='w-screen h-screen bg-scaffold' />
  }

  return (
    <View
      className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
      data-theme={themeMode}
    >
      {/* App Bar */}
      <View
        style={{
          paddingTop: `${statusBarHeight + 12}px`,
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '12px',
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
            {isFlavie ? 'Flavie' : 'Mann'}
          </Text>
          <Text
            style={{
              fontSize: '11px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-locale-body)',
              marginLeft: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            {isFlavie ? t('for_ladies') : t('for_men')}
          </Text>
        </View>
      </View>

      {/* Body — Selfie Not Taken State */}
      <View
        className='flex-1 flex flex-col items-center justify-center px-page'
        style={{ paddingBottom: '40px' }}
      >
        {/* Camera Icon with dashed border */}
        <View
          style={{
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--primary)',
            borderRadius: '8px',
            marginBottom: '28px',
          }}
        >
          <Image
            src={cameraIcon}
            style={{
              width: '36px',
              height: '36px',
              opacity: 0.9,
            }}
          />
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: '26px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-juana)',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          {t('lets_see_your_smile')}
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          {t('selfie_subtitle')}
        </Text>

        {/* Take a Selfie Button */}
        <View style={{ width: '100%' }}>
          <View className='btn-filled active:opacity-85'>
            <Text className='btn-filled-text'>{t('take_a_selfie')}</Text>
          </View>
        </View>

        {/* Profile Completion */}
        <Text
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          {t('profile_complete').replace('{percent}', '84')}
        </Text>

        {/* Debug buttons */}
        <View style={{ marginTop: '40px', opacity: 0.3 }}>
          <Text
            onClick={() => dispatch(setIsFlavie(!isFlavie))}
            style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-locale-body)',
              textDecoration: 'underline',
            }}
          >
            Switch to {isFlavie ? 'Mann' : 'Flavie'}
          </Text>
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeIndex={0} lockedTabs={true} />
    </View>
  )
}
