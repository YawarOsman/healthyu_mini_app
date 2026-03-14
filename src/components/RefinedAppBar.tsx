import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { ReactNode } from 'react'

import arrowLeft from '@/assets/svg/arrow_left.svg'


interface RefinedAppBarProps {
  title?: string | ReactNode
  actions?: ReactNode
  showBack?: boolean
  onBack?: () => void
  backgroundColor?: string
  textColor?: string
  centerActions?: boolean
}

export default function RefinedAppBar({
  title,
  actions,
  showBack = false,
  centerActions = true,
  onBack,
  backgroundColor = 'transparent',
  textColor = 'text-text-primary'
}: RefinedAppBarProps) {
  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const navBarHeight = 44 // Standard nav bar height

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      const pages = Taro.getCurrentPages()
      if (pages.length > 1) {
        Taro.navigateBack()
      }
    }
  }

  return (
    <View 
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${backgroundColor}`}
      style={{ paddingTop: `${statusBarHeight}px`, height: `${statusBarHeight + navBarHeight}px` }}
    >
      <View className='relative w-full h-full flex items-center px-page' style={{ gap: '16px' }}>
        {/* Left: Back Button */}
        {showBack && (
          <View 
            className='h-full flex items-center justify-center cursor-pointer'
            onClick={handleBack}
          >
            <View
              className={`${textColor} w-5 h-5`}
              style={{
                backgroundColor: 'currentColor',
                maskImage: `url(${arrowLeft})`,
                WebkitMaskImage: `url(${arrowLeft})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            />
          </View>
        )}

        {/* Title (left-aligned, same rhythm as onboarding) */}
        {typeof title === 'string' ? (
          <Text className={`font-headline-lg ${textColor} font-medium`}>
            {title}
          </Text>
        ) : (
          title
        )}

        {/* Center: actions */}
        {centerActions && actions && (
          <View className='absolute left-1/2 -translate-x-1/2 flex items-center'>
            {actions}
          </View>
        )}

        {/* Right: Actions (only when not centered) */}
        {!centerActions && actions && (
          <View className='absolute right-0 h-full flex items-center'>
            {actions}
          </View>
        )}
      </View>
    </View>
  )
}
