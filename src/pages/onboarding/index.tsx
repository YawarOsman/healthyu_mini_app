import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { useCallback, useState } from 'react'


import flavie1 from '@/assets/images/flavie_onboarding_1.png'
import flavie2 from '@/assets/images/flavie_onboarding_2.png'
import flavie3 from '@/assets/images/flavie_onboarding_3.png'
import mann1 from '@/assets/images/mann_onboarding_1.png'
import mann2 from '@/assets/images/mann_onboarding_2.png'
import mann3 from '@/assets/images/mann_onboarding_3.png'
import PaginationDots from '@/components/PaginationDots'
import { ROUTES } from '@/constants/routes'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { navigateTo } from '@/utils/navigation'

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

export default function Onboarding() {
  const { isFlavie, themeMode } = useAppSelector((state) => state.theme)
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = isFlavie ? flavieSlides : mannSlides
  const isLastSlide = currentIndex === slides.length - 1

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      // Proceed to registration
      navigateTo(ROUTES.REGISTER_NAME_DOB).catch(err => {
        console.error('Navigation failed:', JSON.stringify(err))
        Taro.showToast({ title: 'Nav failed: ' + JSON.stringify(err), icon: 'none', duration: 5000 })
      })
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
    }
  }, [isLastSlide, slides.length])

  const handleSwiperChange = useCallback((e) => {
    const { current } = e.detail
    setCurrentIndex(current)
  }, [])

  return (
    <View className={`w-screen h-screen bg-scaffold flex flex-col overflow-hidden relative ${themeMode}`} data-theme={themeMode}>
      {/* Header */}
      <View 
        className='flex items-center justify-center px-page pb-4 relative z-10 mb-6'
        style={{ 
          paddingTop: `${(Taro.getSystemInfoSync().statusBarHeight || 0) + 20}px`,
        }}
      >
        <PaginationDots total={slides.length} current={currentIndex} />
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
      <View className='px-page pb-0 flex-shrink-0 mb-8'>
        <View className='w-full h-btn border-none bg-button-bg text-button-text text-btn font-semibold flex items-center justify-center transition-opacity active:opacity-85 font-btn rounded-btn' onClick={handleNext}>
          <Text>{isLastSlide ? t('onboarding.finish') : t('onboarding.next')}</Text>
        </View>
      </View>
    </View>
  )
}
