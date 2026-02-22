import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { useEffect } from 'react'

import RefinedAppBar from '@/components/RefinedAppBar'
import { ROUTES } from '@/constants/routes'
import { FormField, DropdownField } from '@/core/FormField'
import {
  setCity,
  setStreetAddress,
  setFullAddress,
  submitShippingForm,
  fetchCities,
  setUserOrderedBox,
  setEstimatedDelivery,
} from '@/features/order/actions'
import { t } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { reLaunch } from '@/utils/navigation'

export default function OrderShippingPage() {
  const dispatch = useAppDispatch()
  const { themeMode, locale } = useAppSelector((state) => state.theme)
  const { city, streetAddress, fullAddress, isFormSubmitted, cities } = useAppSelector(
    (state) => state.order,
  )
  const { phone } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(fetchCities())
    }
  }, [cities.length, dispatch])

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const navBarHeight = 44

  const handleCheckout = () => {
    console.log('handleCheckout called')
    Taro.showToast({ title: t('processing'), icon: 'loading' })
    dispatch(submitShippingForm())
    console.log('Form submitted. City:', city, 'Street:', streetAddress)
    
    if (city && streetAddress.trim()) {
      console.log('Validation passed, proceeding to checkout')
      // Mark box as ordered with estimated delivery
      const deliveryDate = new Date()
      deliveryDate.setDate(deliveryDate.getDate() + 7) // ~1 week
      const dateStr = deliveryDate.toLocaleDateString(locale === 'ar' ? 'ar-IQ' : 'en-US', { month: 'short', day: 'numeric' })

      dispatch(setUserOrderedBox(true))
      dispatch(setEstimatedDelivery(dateStr))

      // Go back to home
      console.log('Navigating to home...')
      reLaunch(ROUTES.HOME)
    } else {
      console.log('Validation failed. City or Street is missing.')
    }
  }

  return (
    <View
      className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
      data-theme={themeMode}
    >
      {/* App Bar */}
      <RefinedAppBar
        actions={<ProgressDots current={1} total={3} />}
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

          {/* Phone number notice */}
          <View style={{ marginTop: '24px' }}>
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
          </View>

          <Text
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--primary)',
              fontFamily: 'var(--font-locale-body)',
              marginTop: '8px',
              display: 'block',
              cursor: 'pointer',
            }}
            className='active:opacity-70'
          >
            {t('change_phone_number')}
          </Text>
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
function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <View className='flex items-center' style={{ gap: '6px' }}>
      {[0, 1, 2].slice(0, total).map((i) => (
        <View
          key={i}
          style={{
            width: i === current ? '10px' : '8px',
            height: i === current ? '10px' : '8px',
            borderRadius: '50%',
            backgroundColor: i === current ? 'var(--primary)' : 'var(--text-secondary)',
            opacity: i === current ? 1 : 0.4,
            transition: 'all 0.2s ease',
          }}
        />
      ))}
    </View>
  )
}
