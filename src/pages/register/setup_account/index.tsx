import { useState, useCallback } from 'react'
import { View, Text, Input, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useSelector } from 'react-redux'
import RefinedAppBar from '../../../components/RefinedAppBar'
import { t } from '../../../i18n'
import { RootState } from '../../../reducers'
import facebookIcon from '../../../assets/svg/facebook_icon.svg'
import googleIcon from '../../../assets/svg/google_icon.svg'
import appleIcon from '../../../assets/svg/apple_icon.svg'

export default function SetupAccountScreen() {
  const [loginMethod, setLoginMethod] = useState(0) // 0 = phone, 1 = email
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')

  const themeMode = useSelector((state: RootState) => state.theme.themeMode)

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const appBarTotalHeight = statusBarHeight + 44

  const handleNext = useCallback(() => {
    if (loginMethod === 0 && !phone.trim()) {
      setPhoneError(t('please_enter_phone'))
      return
    }
    if (loginMethod === 1 && !email.trim()) {
      setEmailError(t('please_enter_email'))
      return
    }
    setPhoneError('')
    setEmailError('')
    if (loginMethod === 0) {
      Taro.navigateTo({ url: `/pages/register/otp_verification/index?phone=${encodeURIComponent(phone)}` })
    } else {
      Taro.navigateTo({ url: `/pages/register/otp_verification/index?email=${encodeURIComponent(email)}` })
    }
  }, [loginMethod, phone, email])

  return (
    <View className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`} data-theme={themeMode}>
      <RefinedAppBar
        actions={
          <View className='flex gap-1 items-center'>
            <View className='w-1.5 h-1.5 rounded-full opacity-40 bg-primary' />
            <View className='w-1.5 h-1.5 rounded-full bg-primary' />
            <View className='w-1.5 h-1.5 rounded-full opacity-40 bg-primary' />
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
          <Text className='block text-page-title mb-6'>{t('how_do_you_want_to_login')}</Text>

          {/* Login Method Tabs */}
          <View className='flex mb-5'>
            <TabButton
              label={t('phone_number')}
              isSelected={loginMethod === 0}
              onTap={() => setLoginMethod(0)}
            />
            <TabButton
              label={t('email')}
              isSelected={loginMethod === 1}
              onTap={() => setLoginMethod(1)}
            />
          </View>

          {/* Phone Number Section */}
          {loginMethod === 0 && (
            <View>
              <Text className='block text-field-label mb-2'>{t('phone_number')}</Text>
              <View className='input-field flex items-center'>
                <Text
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    fontWeight: '500',
                    marginRight: '12px',
                    fontFamily: 'var(--font-locale-body)',
                  }}
                >
                  +964
                </Text>
                <View
                  style={{
                    width: '1px',
                    height: '24px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    marginRight: '12px',
                  }}
                />
                <Input
                  className='flex-1'
                  type='number'
                  placeholder='750 123 ## ##'
                  placeholderClass='input-field-placeholder'
                  value={phone}
                  onInput={(e) => {
                  setPhone(e.detail.value)
                  if (phoneError) setPhoneError('')
                }}
                  style={{
                    fontSize: '16px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-locale-body)',
                    height: '100%',
                    lineHeight: '52px',
                    border: 'none',
                    background: 'transparent',
                  }}
                />
              </View>
              {phoneError && <Text className='block text-error mt-1'>{phoneError}</Text>}
            </View>
          )}

          {/* Email Section */}
          {loginMethod === 1 && (
            <View>
              <Text className='block text-field-label mb-2'>{t('email')}</Text>
              <Input
                className='input-field'
                placeholderClass='input-field-placeholder'
                placeholder={t('enter_email')}
                value={email}
                onInput={(e) => {
                  setEmail(e.detail.value)
                  if (emailError) setEmailError('')
                }}
              />
              {emailError && <Text className='block text-error mt-1'>{emailError}</Text>}
            </View>
          )}

          {/* Or Divider */}
          <View style={{ height: '24px' }} />
          <Text
            className='block text-center'
            style={{
              fontSize: '14px',
              color: 'var(--icon-accent)',
              fontFamily: 'var(--font-locale-body)',
            }}
          >
            {t('or')}
          </Text>
          <View style={{ height: '24px' }} />

          {/* Social Login Buttons */}
          <SocialButton icon={facebookIcon} label={t('sign_in_facebook')} />
          <View style={{ height: '12px' }} />
          <SocialButton icon={googleIcon} label={t('sign_in_google')} />
          <View style={{ height: '12px' }} />
          <SocialButton icon={appleIcon} label={t('sign_in_apple')} />
        </View>

        {/* Next Button */}
        <View className='pb-8'>
          <View className='btn-filled active:opacity-85' onClick={handleNext}>
            <Text className='btn-filled-text'>{t('next')}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// ─── Tab Button ───
function TabButton({ label, isSelected, onTap }: { label: string; isSelected: boolean; onTap: () => void }) {
  return (
    <View
      onClick={onTap}
      style={{
        height: '42px',
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: isSelected ? '2px solid var(--primary)' : '2px solid transparent',
      }}
    >
      <Text
        style={{
          fontSize: '16px',
          fontWeight: '600',
          color: isSelected ? 'var(--text-secondary)' : 'var(--text-inverse)',
          fontFamily: 'var(--font-locale-body)',
        }}
      >
        {label}
      </Text>
    </View>
  )
}

// ─── Social Login Button ───
function SocialButton({ icon, label }: { icon: string; label: string }) {
  return (
    <View
      className='btn-outlined flex items-center active:opacity-85'
      style={{ paddingLeft: '16px', paddingRight: '16px', justifyContent: 'flex-start', borderColor: 'border-secondary' }}
    >
      <Image src={icon} style={{ width: '24px', height: '24px', marginRight: '12px' }} />
      <Text
        style={{
          fontSize: '16px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-locale-body)',
        }}
      >
        {label}
      </Text>
    </View>
  )
}
