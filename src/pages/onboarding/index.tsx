import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { t } from '../../i18n'
 // Keeping for now if there are specific overrides, but mostly moving to tailwind

import flavie1 from '../../assets/images/flavie_onboarding_1.png'
import flavie2 from '../../assets/images/flavie_onboarding_2.png'
import flavie3 from '../../assets/images/flavie_onboarding_3.png'
import mann1 from '../../assets/images/mann_onboarding_1.png'
import mann2 from '../../assets/images/mann_onboarding_2.png'
import mann3 from '../../assets/images/mann_onboarding_3.png'

// Onboarding slide data
const flavieSlides = [
  {
    image: flavie1,
    titleKey: 'onboarding.flavie.title1',
    subtitleKey: 'onboarding.flavie.subtitle1',
  },
  {
    image: flavie2,
    titleKey: 'onboarding.flavie.title2',
    subtitleKey: 'onboarding.flavie.subtitle2',
  },
  {
    image: flavie3,
    titleKey: 'onboarding.flavie.title3',
    subtitleKey: 'onboarding.flavie.subtitle3',
  },
]

const mannSlides = [
  {
    image: mann1,
    titleKey: 'onboarding.mann.title1',
    subtitleKey: 'onboarding.mann.subtitle1',
  },
  {
    image: mann2,
    titleKey: 'onboarding.mann.title2',
    subtitleKey: 'onboarding.mann.subtitle2',
  },
  {
    image: mann3,
    titleKey: 'onboarding.mann.title3',
    subtitleKey: 'onboarding.mann.subtitle3',
  },
]

interface RootState {
  theme: {
    themeMode: string
    isFlavie: boolean
    locale: string
  }
}


export default function Onboarding() {
  const { isFlavie, themeMode } = useSelector((state: RootState) => state.theme)
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = isFlavie ? flavieSlides : mannSlides
  const brandName = isFlavie ? t('onboarding.brandFlavie') : t('onboarding.brandMann')
  const isLastSlide = currentIndex === slides.length - 1

  const handleFinish = useCallback(() => {
    try {
      Taro.setStorageSync('hasOnboarded', 'true')
      // Redirect to home page
      Taro.redirectTo({ url: '/pages/index/index' })
    } catch (e) {
      console.error('Failed to set storage', e)
    }
  }, [])

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      handleFinish()
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
    }
  }, [isLastSlide, handleFinish, slides.length])

  const handleSwiperChange = useCallback((e) => {
    const { current } = e.detail
    setCurrentIndex(current)
  }, [])

  return (
    <View className='w-screen h-screen bg-scaffold flex flex-col overflow-hidden relative' data-theme={themeMode}>
      {/* Header */}
      <View className='flex items-center justify-between px-page pt-6 pb-2 relative z-10'>
        <View className='flex items-center gap-2'>
          <Text className='text-l text-text-primary leading-none'>‹</Text>
          <Text className='text-[24px] font-medium text-text-brand font-heading'>{brandName}</Text>
          
        </View>
        <View className='flex gap-1 items-center'>
          {slides.map((_, idx) => (
            <View
              key={idx}
              className={`w-1 h-1 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-primary' : 'bg-surface-secondary'}`}
            />
          ))}
        </View>
      </View>

      {/* Swiper */}
      <Swiper
        className='flex-1 w-full overflow-hidden'
        current={currentIndex}
        onChange={handleSwiperChange}
        duration={300}
      >
        {slides.map((slide, idx) => (
          <SwiperItem key={idx} className='w-full h-full'>
            <View className='flex flex-col h-full px-page'>
              <View className='w-full flex-1 min-h-0 overflow-hidden mb-2'>
                <Image
                  className='w-full h-full object-cover block'
                  src={slide.image}
                  mode='aspectFill'
                />
              </View>
              <Text className='text-32 font-normal leading-[1.2] text-text-primary mb-1 font-headline-lg whitespace-pre-wrap'>{t(slide.titleKey)}</Text>
              <Text className='text-body-lg font-normal text-text-secondary mb-2 leading-[1.4] font-body-lg'>{t(slide.subtitleKey)}</Text>
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      {/* Bottom Button */}
      <View className='px-page pb-0 flex-shrink-0'>
        <View className='w-full h-btn border-none bg-button-bg text-button-text text-btn font-semibold flex items-center justify-center transition-opacity active:opacity-85 font-btn rounded-btn' onClick={handleNext}>
          <Text>{isLastSlide ? t('onboarding.finish') : t('onboarding.next')}</Text>
        </View>
      </View>
    </View>
  )
}
