import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import Taro, { useDidShow } from '@tarojs/taro'
import { setIsFlavie } from '../../actions/theme'
import { t } from '../../i18n'
import { RootState } from '../../reducers'
import BottomNavBar from '../../components/BottomNavBar'
import boxIcon from '../../assets/svg/box.svg'
import { ROUTES } from '../../constants/routes'

export default function Index() {
  const [checking, setChecking] = useState(true)
  const { themeMode, isFlavie } = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0

  useDidShow(() => {
    checkOnboarding()
    Taro.setNavigationBarTitle({
      title: ''
    })
    Taro.hideHomeButton()
  })

  useEffect(() => {
    checkOnboarding()
  }, [])

  const checkOnboarding = () => {
    // try {
    //   const hasOnboarded = Taro.getStorageSync('hasOnboarded')
    //   if (!hasOnboarded) {
    //     Taro.redirectTo({ url: ROUTES.ONBOARDING })
    //   } else {
    //     setChecking(false)
    //   }
    // } catch (e) {
    //   Taro.redirectTo({ url: ROUTES.ONBOARDING })
    // }
    setChecking(false) // Bypass onboarding for development
  }

  if (checking) {
    return <View className='w-screen h-screen bg-scaffold' />
  }

  const brandName = isFlavie ? 'Flavie' : 'Mann'

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
            {brandName}
          </Text>
          <Text
            style={{
              fontSize: '12px',
              fontWeight: '400',
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

      {/* Body — User Without Box State */}
      <View
        className='flex-1 flex flex-col items-center justify-center px-page'
        style={{ paddingBottom: '40px' }}
      >
        {/* Box Icon with dashed border */}
        <View
          style={{
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '27px',
            backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
          }}
          className='custom-dashed-border-sm'
        >
          <Image
            src={boxIcon}
            style={{
              width: '32px',
              height: '32px',
            }}
          />
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: '28px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-juana)',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          {t('last_step_lets_get_you_a_box')}
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: '20px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          {t('order_box_subtitle').replace('{brand}', brandName)}
        </Text>

        {/* Start my experience Button */}
        <View style={{ width: '100%' }}>
          <View
            className='btn-filled active:opacity-85'
            onClick={() => {
              Taro.navigateTo({ url: ROUTES.ORDER })
            }}
          >
            <Text className='btn-filled-text'>{t('start_my_experience')}</Text>
          </View>
        </View>

        {/* I already have a box Button */}
        <View
          style={{
            width: '100%',
            marginTop: '12px',
          }}
        >
          <View
            className='btn-dashed active:opacity-85'
            onClick={() => {
              // Navigate to scan box page
              // Taro.navigateTo({ url: ROUTES.SCAN_BOX })
            }}
          >
            <Text
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-locale-body)',
                textAlign: 'center',
              }}
            >
              {t('i_already_have_a_box')}
            </Text>
          </View>
        </View>

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
