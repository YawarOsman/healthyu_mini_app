import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { useState } from 'react'

import flavieGender from '@/assets/images/flavie_gender.png' // assuming this exists based on flutter code
import mannGender from '@/assets/images/mann_gender.png'     // assuming this exists based on flutter code
import { ROUTES } from '@/constants/routes'
import { setIsFlavie } from '@/features/theme/actions'
import { t } from '@/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { navigateTo } from '@/utils/navigation'

export default function GenderSelectionScreen() {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector((state) => state.theme.themeMode)

  // Local state for the selected gender during the choosing process
  const [selectedGender, setSelectedGender] = useState<'flavie' | 'mann'>('flavie')

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: ''
    })
  })

  const handleContinue = () => {
    // Dispatch the theme change 
    dispatch(setIsFlavie(selectedGender === 'flavie'))

    // Navigate to Onboarding Next
    navigateTo(ROUTES.ONBOARDING)
  }

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const appBarTotalHeight = statusBarHeight + 44

  return (
    <View className={`w-screen h-screen bg-scaffold flex flex-col overflow-hidden ${themeMode}`} data-theme={themeMode}>
      {/* App Bar */}
      <View
        className='flex items-center justify-center flex-shrink-0'
        style={{
          paddingTop: `${statusBarHeight}px`,
          height: `${appBarTotalHeight}px`,
        }}
      >
        <View className='flex items-center' style={{ gap: '8px' }}>
          <Text
            style={{
              color: 'var(--surface-secondary)',
              fontSize: '12px',
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {t('powered_by') || 'POWERED BY'}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontSize: '24px',
              fontWeight: '600'
            }}
          >
            HealthyU
          </Text>
        </View>
      </View>

      {/* Body Content */}
      <View
        className='flex-1 flex flex-col px-page overflow-hidden'
        style={{ paddingTop: '24px', paddingBottom: '32px' }}
      >
        {/* Header Texts */}
        <View className='flex-1 w-full flex flex-col' style={{ gap: '8px' }}>
          <Text className='text-text-primary font-headline-lg' style={{ fontSize: '40px', fontWeight: '500', lineHeight: '1.2', whiteSpace: 'pre-line' }}>
            {t('it_is_actually_just_one_question')}
          </Text>
          <Text className='text-text-secondary' style={{ fontSize: '20px', fontWeight: '400' }}>
            {t('pick_your_gender')}
          </Text>
        </View>

        <View style={{ height: '40px', flexShrink: 0 }} />

        {/* Gender Options */}
        <View className='flex flex-col flex-shrink-0' style={{ gap: '20px' }}>
          <GenderOptionCard
            name='Flavie'
            imagePath={flavieGender}
            isSelected={selectedGender === 'flavie'}
            onTap={() => {
              setSelectedGender('flavie')
              dispatch(setIsFlavie(true))
            }}
          />
          <GenderOptionCard
            name='Mann'
            imagePath={mannGender}
            isSelected={selectedGender === 'mann'}
            onTap={() => {
              setSelectedGender('mann')
              dispatch(setIsFlavie(false))
            }}
          />
        </View>

        <View style={{ height: '20px', flexShrink: 0 }} />

        {/* Continue Button */}
        <View className='w-full flex-shrink-0'>
          <View className='w-full h-btn border-none bg-button-bg text-button-text text-btn font-semibold flex items-center justify-center transition-opacity active:opacity-85 font-btn rounded-btn' onClick={handleContinue}>
            <Text>{t('continue_txt')}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

function GenderOptionCard({
  name,
  imagePath,
  isSelected,
  onTap
}: {
  name: string
  imagePath: string
  isSelected: boolean
  onTap: () => void
}) {
  const height = isSelected ? '30vh' : '125px'
  // using rough approximations for the theme colors matching Flavie and Mann


  return (
    <View
      onClick={onTap}
      style={{
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
        width: '100%',
      }}
    >
      <View
        style={{
          position: 'relative',
          height,
          transition: 'height 0.3s ease-in-out',
          borderBottom: isSelected ? `3px solid var(--primary)` : '3px solid var(--grey-550)',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <Image
          src={imagePath}
          mode='aspectFill'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '30vh',
            filter: isSelected ? 'none' : 'grayscale(100%)',
            transition: 'filter 0.3s ease-in-out'
          }}
        />

        {/* Dark overlay for unselected */}
        {!isSelected && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }}
          />
        )}

        {/* Selected Glowing Effect */}
        {isSelected && (
          <View
            style={{
              position: 'absolute',
              bottom: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              paddingBottom: '40%',
              backgroundColor: 'var(--primary)',
              filter: 'blur(40px)',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Name & Selected Indicator */}
        <View
          className='flex flex-col items-center w-full'
          style={{
            position: 'absolute',
            bottom: '12px',
            left: 0,
            zIndex: 10
          }}
        >
          <Text
            style={{
              fontSize: '30px',
              fontWeight: '600',
              fontFamily: 'var(--font-heading)',
              color: '#FFFFFF',
              height: '30px'
            }}
          >
            {name}
          </Text>
          
          <View
            style={{
              opacity: isSelected ? 1 : 0,
              transform: isSelected ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.3s ease-out',
            }}
          >
            <Text
              style={{
                fontSize: '16px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.64)'
              }}
            >
              {t('selected_indicator') || '[SELECTED]'}
            </Text>
          </View>
        </View>

        {/* Subtle Selection Overlay */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            transition: 'background-color 0.3s ease-in-out',
            pointerEvents: 'none'
          }}
        />
      </View>
    </View>
  )
}
