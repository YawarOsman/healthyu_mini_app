import { View, Text, Input, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { useMemo, useState } from 'react'

import calendarIcon from '@/assets/svg/calendar.svg'
import CustomDatePicker from '@/components/CustomDatePicker'
import PaginationDots from '@/components/PaginationDots'
import RefinedAppBar from '@/components/RefinedAppBar'
import { ROUTES } from '@/constants/routes'
import { setRegistrationData } from '@/features/registration/actions'
import { t } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { navigateTo } from '@/utils/navigation'

export default function NameAndDOBEntryScreen() {
  const dispatch = useAppDispatch()

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: ''
    })
  })
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [nameError, setNameError] = useState('')
  const [dobError, setDobError] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)

  const { themeMode, locale } = useAppSelector((state) => state.theme)
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale === 'ar' ? 'ar-IQ' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    [locale],
  )

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const appBarTotalHeight = statusBarHeight + 44

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const [year, month, day] = dateStr.split('-').map(Number)
    return dateFormatter.format(new Date(year, month - 1, day))
  }

  const handleNext = () => {
    if (!name.trim()) {
      setNameError(t('please_enter_your_name'))
      return
    }
    if (!dob) {
      setDobError(t('please_select_date_of_birth'))
      return
    }
    setNameError('')
    setDobError('')
    dispatch(setRegistrationData({ name, dob }))

    navigateTo(ROUTES.REGISTER_SETUP_ACCOUNT)
  }

  return (
    <View className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`} data-theme={themeMode}>
      <RefinedAppBar
        showBack={false}
        title={
          <PaginationDots total={3} current={0} />
        }
      />

      <View
        className='flex-1 flex flex-col px-page'
        style={{ paddingTop: `${appBarTotalHeight + 8}px` }}
      >
        <View className='flex-1'>
          <Text className='block text-section-label mb-2'>{t('registration')}</Text>
          <Text className='block text-page-title mb-6'>{t('now_you_need_an_account')}</Text>

          {/* Full Name */}
          <Text className='block text-field-label mb-2'>{t('full_name')}</Text>
          <Input
            className='input-field'
            placeholderClass='input-field-placeholder'
            placeholder={t('enter_name')}
            value={name}
            onInput={(e) => {
              setName(e.detail.value)
              if (nameError) setNameError('')
            }}
          />
          {nameError && <Text className='block text-error mt-1'>{nameError}</Text>}

          <View style={{ height: '20px' }} />

          {/* Date of Birth */}
          <Text className='block text-field-label mb-2'>{t('date_of_birth')}</Text>
          <View className='picker-trigger' onClick={() => setShowDatePicker(true)}>
            <Image src={calendarIcon} style={{ width: '20px', height: '20px', marginRight: '8px', opacity: 0.6 }} />
            <Text
              style={{
                fontSize: '16px',
                fontFamily: 'var(--font-locale-body)',
                color: dob ? 'var(--text-primary)' : 'rgba(255,255,255,0.24)',
              }}
            >
              {dob ? formatDate(dob) : t('date_of_birth')}
            </Text>
          </View>
          {dobError && <Text className='block text-error mt-1'>{dobError}</Text>}
        </View>

        {/* Next Button */}
        <View className='pb-8'>
          <View className='btn-filled active:opacity-85' onClick={handleNext}>
            <Text className='btn-filled-text'>{t('next')}</Text>
          </View>
        </View>
      </View>

      {/* Custom Date Picker */}
      <CustomDatePicker
        visible={showDatePicker}
        selectedDate={dob || undefined}
        maxYear={new Date().getFullYear()}
        onConfirm={(date) => {
          setDob(date)
          setDobError('')
          setShowDatePicker(false)
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  )
}
