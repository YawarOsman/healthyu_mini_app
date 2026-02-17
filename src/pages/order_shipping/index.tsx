import { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { t } from '../../i18n'
import { RootState } from '../../reducers'
import RefinedAppBar from '../../components/RefinedAppBar'
import { FormField, DropdownField } from '../../core/FormField'
import {
  setCity,
  setStreetAddress,
  setFullAddress,
  submitShippingForm,
  fetchCities,
} from '../../features/order/actions'

export default function OrderShippingPage() {
  const dispatch = useDispatch()
  const { themeMode } = useSelector((state: RootState) => state.theme)
  const { city, streetAddress, fullAddress, isFormSubmitted, cities } = useSelector(
    (state: RootState) => state.order,
  )

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(fetchCities() as any)
    }
  }, [])

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const navBarHeight = 44

  // Mock phone number (would come from auth state in real app)
  const phoneNumber = '+964 772 128 7272'

  const handleCheckout = () => {
    dispatch(submitShippingForm())
    if (city && streetAddress.trim()) {
      // Navigate to bank account / next step
      // Taro.navigateTo({ url: ROUTES.ORDER_BANK_ACCOUNT })
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
              {phoneNumber}
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
          <View
            className='btn-filled active:opacity-85'
            onClick={handleCheckout}
          >
            <Text className='btn-filled-text'>{t('checkout')}</Text>
          </View>
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
