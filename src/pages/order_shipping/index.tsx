import { View, Text, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { useEffect, useState } from 'react'

import PaginationDots from '@/components/PaginationDots'
import RefinedAppBar from '@/components/RefinedAppBar'
import { ROUTES } from '@/constants/routes'
import { FormField, DropdownField } from '@/core/FormField'
import { setUserOrderedBox } from '@/features/auth/reducer'
import {
  setCity,
  setStreetAddress,
  setFullAddress,
  submitShippingForm,
  fetchCities,
  setEstimatedDelivery,
} from '@/features/order/actions'
import { t } from '@/i18n'
import { getDateLocaleCode } from '@/i18n/locale'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { navigateTo, reLaunch, redirectTo } from '@/utils/navigation'
import { hideHomeButtonSafely } from '@/utils/ui'

export default function OrderShippingPage() {
  const dispatch = useAppDispatch()
  const { themeMode, locale } = useAppSelector((state) => state.theme)
  const localeCode = getDateLocaleCode(locale)
  const { city, streetAddress, fullAddress, isFormSubmitted, cities } = useAppSelector(
    (state) => state.order,
  )
  const { phone } = useAppSelector((state) => state.auth)

  useDidShow(() => {
    Taro.setNavigationBarTitle({ title: '' })
    void hideHomeButtonSafely()
    const tryHideBack = () => {
      try {
        const my = (globalThis as any).my
        if (my && typeof my.hideBackHome === 'function') my.hideBackHome()
      } catch (_) {}
    }
    tryHideBack()
    setTimeout(tryHideBack, 300)
  })

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(fetchCities())
    }
  }, [cities.length, dispatch])

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const navBarHeight = 44

  const [phoneNumber, setPhoneNumber] = useState(phone || '')
  
  const handleCheckout = () => {
    console.log('handleCheckout called')
    Taro.showToast({ title: t('processing'), icon: 'loading' })
    dispatch(submitShippingForm())
    
    // Require phone number
    if (!city || !streetAddress.trim() || !phoneNumber.trim()) {
      console.log('Validation failed. City, Street, or Phone is missing.')
      return
    }

    console.log('Validation passed, proceeding to checkout')
    // Mark box as ordered with estimated delivery
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 7) // ~1 week
    const dateStr = deliveryDate.toLocaleDateString(localeCode, { month: 'short', day: 'numeric' })

    dispatch(setUserOrderedBox(true))
    dispatch(setEstimatedDelivery(dateStr))

    if (!phone) {
      // Go to OTP Verification
      console.log('Navigating to OTP verification...')
      navigateTo(`${ROUTES.OTP_VERIFICATION}?phone=${encodeURIComponent(phoneNumber)}`)
    } else {
      // Phone already exists, skip OTP
      console.log('Phone exists, skipping OTP and navigating to Order Confirmed...')
      reLaunch(ROUTES.ORDER_CONFIRMED)
    }
  }

  return (
    <View
      className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
      data-theme={themeMode}
    >
      {/* App Bar */}
      <RefinedAppBar
        showBack
        onBack={() => redirectTo(ROUTES.ORDER)}
        actions={<PaginationDots total={phone ? 2 : 3} current={1} />}
      />

      {/* Content */}
      <View
        className='flex-1 flex flex-col'
        style={{ paddingTop: `${statusBarHeight + navBarHeight}px` }}
      >
        <View
          className='flex-1 px-page'
          style={{ paddingTop: '8px', paddingBottom: '16px', overflowY: 'auto' }}
        >
          {/* Subtitle */}
          <Text
            style={{
              fontSize: '16px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-locale-body)',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            {t('box_registration')}
          </Text>

          {/* Heading */}
          <Text
            style={{
              fontSize: '26px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-juana)',
              display: 'block',
              marginBottom: '24px',
              lineHeight: '1.2',
            }}
          >
            {t('lovely_you_will_look_great')}
          </Text>

          {/* Form Row: City + Street */}
          <View className='flex' style={{ gap: '16px', marginBottom: '24px' }}>
            <DropdownField
              label={t('city')}
              value={city}
              placeholder={t('select_city')}
              options={cities}
              onSelect={(c) => dispatch(setCity(c))}
              error={isFormSubmitted && !city ? t('please_select_a_city') : null}
            />
            <FormField
              label={t('street')}
              value={streetAddress}
              placeholder={t('street_address')}
              onInput={(v) => dispatch(setStreetAddress(v))}
              error={isFormSubmitted && !streetAddress.trim() ? t('please_enter_street') : null}
            />
          </View>

          {/* Full Address */}
          <FormField
            label={t('full_address')}
            value={fullAddress}
            placeholder={t('complete_address')}
            onInput={(v) => dispatch(setFullAddress(v))}
          />

          {/* Phone number notice or input */}
          <View style={{ marginTop: '24px' }}>
            {!phone ? (
              <FormField
                label={t('phone_number')}
                value={phoneNumber}
                placeholder={t('enter_phone_number')}
                keyboardType='phone-pad'
                onInput={(v) => setPhoneNumber(v)}
                error={isFormSubmitted && !phoneNumber.trim() ? t('please_enter_phone') : null}
              />
            ) : (
              <>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-locale-body)',
                    lineHeight: '1.5',
                  }}
                >
                  {t('we_will_call')}
                  {'  '}
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-locale-body)',
                  }}
                >
                  {phone}
                </Text>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-locale-body)',
                  }}
                >
                  {'  '}
                  {t('on_delivery')}
                </Text>
              </>
            )}
          </View>

        </View>

        {/* Bottom Checkout Button */}
        <View
          style={{
            padding: '12px 24px',
            paddingBottom: '24px',
            backgroundColor: 'var(--scaffold-bg)',
          }}
        >
          <Button
            className='btn-filled active:opacity-85'
            onClick={handleCheckout}
            style={{
              border: 'none',
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              borderRadius: '0px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text className='btn-filled-text'>{t('checkout')}</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

// ─── Progress Dots ───
