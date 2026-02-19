import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import Taro, { useDidShow } from '@tarojs/taro'
import { setIsFlavie } from '../../actions/theme'
import { t } from '../../i18n'
import { RootState } from '../../reducers'
import BottomNavBar from '../../components/BottomNavBar'
import { SvgIcons } from '../../assets/icons'
import DottedCircle from '../../components/DottedCircle'
import { ROUTES } from '../../constants/routes'
import DashedBox from "../../components/DashedBox";
import { navigateTo } from '../../utils/navigation'
import { hideHomeButtonSafely } from '../../utils/ui'

export default function Index() {
  console.log('IndexPage: Rendering...')
  const [checking, setChecking] = useState(true)
  const { themeMode, isFlavie } = useSelector((state: RootState) => state.theme)
  const { isUserOrderedABox, boxes, estimatedDeliveryDate } = useSelector(
    (state: RootState) => state.auth,
  )
  const dispatch = useDispatch()

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0

  useDidShow(() => {
    checkOnboarding()
    Taro.setNavigationBarTitle({
      title: ''
    })
    void hideHomeButtonSafely()
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

  // Determine home state
  const hasOrderedButNotReceived = isUserOrderedABox && boxes.length === 0

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
              marginLeft: '10px',              textTransform: 'uppercase',
            }}
          >
            {isFlavie ? t('for_ladies') : t('for_men')}
          </Text>
        </View>
      </View>

      {/* Body — Conditional on state */}
      {hasOrderedButNotReceived ? (
        <BoxOrderedWidget
          estimatedDeliveryDate={estimatedDeliveryDate}
        />
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

// ─── Box Ordered Widget ───
// Shown when user has ordered a box but hasn't received it yet
function BoxOrderedWidget({
  estimatedDeliveryDate,
}: {
  estimatedDeliveryDate: string | null
}) {
  return (
    <View className='flex-1 flex flex-col px-page' style={{ paddingBottom: '24px' }}>
      {/* Status Cards */}
        <DashedBox
        width="100%"
        dash={6}
        gap={6}
        stroke={1}
        color="var(--text-primary-16)"
        borderPosition="inside"
        style={{
          marginBottom: '40px',
        }}
>
  <View style={{
    backgroundColor: 'var(--text-primary-4)',
  }} >


        {/* Box Ordered Card */}
        <View
          className='flex items-center'
          style={{
            padding: '16px',
            gap: '16px',
          }}
        >
          {/* Box icon */}
          <DottedCircle
            size={56}
            color='var(--primary)'
            gap={6}
            dotSize={2}
            strokeWidth={1.5}
            style={{
              minWidth: '56px',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
              }}
            >
              <Image
                src={SvgIcons.box}
                style={{
                  width: '32px',
                  height: '32px',
                  opacity: 0.8,
                }}
              />
            </View>
          </DottedCircle>
          <View>
            <Text
              style={{
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-locale-body)',
                display: 'block',
              }}
            >
              {t('box_ordered')}
            </Text>
            <Text
              style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-locale-body)',
                display: 'block',
                marginTop: '2px',
              }}
            >
              {t('your_order_will_arrive_in')}{' '}
              <Text
                style={{
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-locale-body)',
                }}
              >
                {estimatedDeliveryDate || 'TBD'}
              </Text>
              .
            </Text>
          </View>
        </View>
      </View>


      </DashedBox>
      {/* QR Section */}
      <View className='flex-1 flex flex-col items-center justify-center' style={{ paddingBottom: '40px' }}>
        {/* QR Icon */}
        <DashedBox
          style={{
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '27px',
            backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
          }}
        >
          <Image
            src={SvgIcons.qr}
            style={{
              width: '32px',
              height: '32px',
            }}
          />
        </DashedBox>

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
          {t('begin_your_journey')}
        </Text>

        <Text
          style={{
            fontSize: '20px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          {t('scan_the_qr_on_the_box')}
        </Text>

        {/* Scan Box Button */}
        <View style={{ width: '100%' }}>
          <View
            className='btn-filled active:opacity-85'
            onClick={() => {
              // Navigate to QR scanner
              console.log('Attempting to navigate to:', ROUTES.SCAN_BOX)
              navigateTo(ROUTES.SCAN_BOX).then(() => {
                console.log('Navigation success')
              }).catch((err) => {
                console.error('Navigation failed', err)
              })
            }}
          >
            <View className='flex items-center justify-center' style={{ gap: '8px' }}>
              <View
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'var(--button-text)',
                  maskImage: `url(${SvgIcons.qrScan})`,
                  WebkitMaskImage: `url(${SvgIcons.qrScan})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
              <Text className='btn-filled-text'>{t('scan_box')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

// ─── User Without Box Widget ───
// Original home screen for users who haven't ordered yet
function UserWithoutBoxWidget({
  brandName,
  isFlavie,
  dispatch,
}: {
  brandName: string
  isFlavie: boolean
  dispatch: any
}) {
  return (
    <View
      className='flex-1 flex flex-col items-center justify-center px-page'
      style={{ paddingBottom: '40px' }}
    >
      {/* Box Icon with dashed border */}
      <DashedBox
        style={{
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '27px',
          backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
        }}
      >
        <Image
          src={SvgIcons.box}
          style={{
            width: '32px',
            height: '32px',

          }}
        />
      </DashedBox>

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
            navigateTo(ROUTES.ORDER)
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
            console.log('Attempting to navigate to:', ROUTES.SCAN_BOX)
            navigateTo(ROUTES.SCAN_BOX).then(() => {
              console.log('Navigation success')
            }).catch((err) => {
              console.error('Navigation failed', err)
            })
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
  )
}
