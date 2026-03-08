import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { useCallback } from 'react'

import RefinedAppBar from '@/components/RefinedAppBar'
import { ROUTES } from '@/constants/routes'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { navigateTo } from '@/utils/navigation'

export default function SetupAccountScreen() {
  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: ''
    })
  })

  const themeMode = useAppSelector((state) => state.theme.themeMode)

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const appBarTotalHeight = statusBarHeight + 44

  const handleNext = useCallback(() => {

    // TODO: Ideally put email register logic here and then route to home
    Taro.setStorageSync('hasOnboarded', true)
    
    // Navigate to Home directly for now
    navigateTo(ROUTES.HOME)
  }, [])

  return (
    <View className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`} data-theme={themeMode}>
    <RefinedAppBar
      showBack
    />
      <View
        className='flex-1 flex flex-col px-page'
        style={{ paddingTop: `${appBarTotalHeight + 8}px` }}
      >
        <View className='flex-1'>
          {/* Section Label */}
          <Text className='block text-section-label mb-2'>{t('registration')}</Text>

          {/* Login Content Removed per user request */}

        
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


