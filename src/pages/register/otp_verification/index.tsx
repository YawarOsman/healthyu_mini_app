import { useState, useEffect, useCallback } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro, { useRouter, useDidShow } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import RefinedAppBar from '../../../components/RefinedAppBar'
import { t } from '../../../i18n'
import { RootState } from '../../../reducers'
import { ROUTES } from '../../../constants/routes'

const OTP_LENGTH = 6
const RESEND_SECONDS = 42

export default function OtpVerificationScreen() {
  const router = useRouter()
  const phoneNumber = decodeURIComponent(router.params.phone || '0772 127 0202')
  
  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: ''
    })
  })

  const [otpValue, setOtpValue] = useState('')
  const [otpFocused, setOtpFocused] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_SECONDS)
  const [otpError, setOtpError] = useState('')

  const themeMode = useSelector((state: RootState) => state.theme.themeMode)

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const appBarTotalHeight = statusBarHeight + 44

  // Countdown timer
  useEffect(() => {
    if (secondsRemaining <= 0) return
    const timer = setInterval(() => {
      setSecondsRemaining((s) => {
        if (s <= 1) {
          clearInterval(timer)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsRemaining])

  const formatTimer = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = s % 60
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
  }

  const handleResend = useCallback(() => {
    if (secondsRemaining > 0) return
    setSecondsRemaining(RESEND_SECONDS)
    setOtpValue('')
  }, [secondsRemaining])

  const handleFinish = useCallback(() => {
    if (otpValue.length < OTP_LENGTH) {
      setOtpError(t('please_enter_otp'))
      return
    }
    setOtpError('')

    // Set onboarding complete
    Taro.setStorageSync('hasOnboarded', true)
    
    // Navigate to Home Screen (relaunch clears the stack)
    Taro.reLaunch({ url: ROUTES.HOME })
  }, [otpValue])

  return (
    <View className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`} data-theme={themeMode}>
     <RefinedAppBar
            showBack={false}
            title={
              <View className='flex gap-1 items-center'>
                <View className='w-1.5 h-1.5 rounded-full opacity-40 bg-primary' />
                <View className='w-1.5 h-1.5 rounded-full opacity-40 bg-primary' />
                <View className='w-1.5 h-1.5 rounded-full bg-primary' />
              </View>
            }
          />

      <View
        className='flex-1 flex flex-col px-page'
        style={{ paddingTop: `${appBarTotalHeight + 8}px` }}
      >
        <View className='flex-1'>
          {/* Section Label */}
          <Text className='block text-section-label mb-2'>{t('registration')}</Text>

          {/* Title */}
          <Text className='block text-page-title mb-3'>{t('verify_your_phone')}</Text>

          {/* Subtitle */}
          <Text
            className='block'
            style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-locale-body)',
              lineHeight: '24px',
            }}
          >
            {t('we_sent_otp_to')}
          </Text>
          <Text
            className='block mb-6'
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-locale-body)',
            }}
          >
            {phoneNumber}.
          </Text>

          {/* OTP Verification Label + Resend */}
          <View className='flex justify-between items-center mb-3'>
            <Text className='text-field-label'>{t('otp_verification')}</Text>
            {secondsRemaining > 0 ? (
              <View className='flex items-center' style={{ gap: '4px' }}>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: 'var(--font-locale-body)',
                    color: 'rgba(143, 143, 143, 0.32)',
                  }}
                >
                  {t('resend')}
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: 'var(--font-locale-body)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {formatTimer(secondsRemaining)}
                </Text>
              </View>
            ) : (
              <Text
                onClick={handleResend}
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: 'var(--font-locale-body)',
                  color: 'var(--primary)',
                }}
              >
                {t('resend')}
              </Text>
            )}
          </View>

          {/* OTP Boxes — single hidden input + visual display */}
          <View
            style={{ position: 'relative' }}
            onClick={() => setOtpFocused(true)}
          >
            {/* Hidden real input */}
            <Input
              type='number'
              maxlength={6}
              value={otpValue}
              focus={otpFocused}
              onFocus={() => setOtpFocused(true)}
              onBlur={() => setOtpFocused(false)}
              onInput={(e) => {
                setOtpValue(e.detail.value.slice(0, 6))
                if (otpError) setOtpError('')
              }}
              style={{
                position: 'absolute',
                opacity: 0,
                width: '100%',
                height: '56px',
                zIndex: 10,
              }}
            />
            {/* Visual boxes */}
            <View className='flex' style={{ gap: '10px' }}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const char = otpValue[i] || ''
                const isCurrent = otpFocused && i === otpValue.length && otpValue.length < 6
                const isFilled = char !== ''
                return (
                  <View
                    key={i}
                    className='flex-1'
                    style={{
                      height: '56px',
                      backgroundColor: '#141414',
                      border: isCurrent
                        ? '1px solid var(--primary)'
                        : isFilled
                          ? '1px solid rgba(255,255,255,0.2)'
                          : '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        color: isFilled ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)',
                        fontFamily: 'var(--font-locale-body)',
                      }}
                    >
                      {isFilled ? char : '#'}
                    </Text>
                  </View>
                )
              })}
            </View>
            {otpError && (
              <Text className='block text-error mt-4 text-center' style={{ width: '100%' }}>
                {otpError}
              </Text>
            )}
          </View>
        </View>

        {/* Finish Registration Button */}
        <View className='pb-8'>
          <View className='btn-filled active:opacity-85' onClick={handleFinish}>
            <Text className='btn-filled-text'>{t('finish_registration')}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
