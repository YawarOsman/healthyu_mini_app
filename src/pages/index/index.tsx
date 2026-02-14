import { useEffect, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import Taro, { useDidShow } from '@tarojs/taro'
import { setIsFlavie } from '../../actions/theme'


interface RootState {
  theme: {
    themeMode: string
    isFlavie: boolean
  }
}

export default function Index() {
  const [checking, setChecking] = useState(true)
  const { themeMode, isFlavie } = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  useDidShow(() => {
    checkOnboarding()
  })

  useEffect(() => {
    checkOnboarding()
  }, [])

  const checkOnboarding = () => {
    try {
      const hasOnboarded = Taro.getStorageSync('hasOnboarded')
      if (!hasOnboarded) {
        Taro.redirectTo({ url: '/pages/onboarding/index' })
      } else {
        setChecking(false)
      }
    } catch (e) {
      // Fallback: assume not onboarded if error
      Taro.redirectTo({ url: '/pages/onboarding/index' })
    }
  }

  const handleToggleTheme = () => {
    dispatch(setIsFlavie(!isFlavie))
  }

  const handleClearCache = () => {
    Taro.removeStorageSync('hasOnboarded')
    Taro.redirectTo({ url: '/pages/onboarding/index' })
  }

  if (checking) {
    return <View className='w-screen h-screen bg-scaffold' />
  }

  return (
    <View className='w-screen h-screen bg-scaffold text-text-primary flex flex-col items-center justify-center' data-theme={themeMode}>
      <View className='p-5 flex flex-col gap-4'>
        <Text className='text-text-primary text-2xl font-bold'>Welcome Home!</Text>
        <Text className='text-text-secondary'>You have completed onboarding.</Text>
        
        <Button onClick={handleToggleTheme} className='mt-5'>
          Switch to {isFlavie ? 'Mann' : 'Flavie'} Theme
        </Button>

        <Button onClick={handleClearCache} className='mt-2.5 bg-surface-secondary'>
          Reset Onboarding (Debug)
        </Button>
      </View>
    </View>
  )
}
