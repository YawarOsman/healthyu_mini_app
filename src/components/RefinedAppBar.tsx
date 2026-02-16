import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ReactNode } from 'react'
import arrowLeft from '../assets/svg/arrow_left.svg'


interface RefinedAppBarProps {
  title?: string | ReactNode
  actions?: ReactNode
  showBack?: boolean
  onBack?: () => void
  backgroundColor?: string
  textColor?: string
}

export default function RefinedAppBar({
  title,
  actions,
  showBack = true,
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
      <View className='relative w-full h-full flex items-center justify-center px-4'>
        
        {/* Left: Back Button */}
        {showBack && (
          <View 
            className='absolute left-2 h-full flex items-center justify-center cursor-pointer'
            onClick={handleBack}
          >
            {/* Simple Back Arrow SVG or Icon */}
            {/* Back Arrow SVG */}
            <View 
              className={`${textColor} w-4 h-4`}
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

        {/* Center: Title */}
        <View className='flex items-center justify-center'>
          {typeof title === 'string' ? (
            <Text className={`font-headline-sm ${textColor} font-bold`}>
              {title}
            </Text>
          ) : (
            title
          )}
        </View>

        {/* Right: Actions */}
        {actions && (
          <View className='absolute right-4 h-full flex items-center'>
            {actions}
          </View>
        )}
      </View>
    </View>
  )
}
