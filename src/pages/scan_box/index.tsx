import { Image, Text, View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import FlavieOnboarding1 from '@/assets/images/flavie_onboarding_1.png'
import { ROUTES } from '@/constants/routes'
import { getLocalizedHeadline, getLocalizedName } from '@/features/order/types'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { hideHomeButtonSafely } from '@/utils/ui'

export default function ScanBoxPage() {
  const { themeMode, locale } = useAppSelector((state) => state.theme)
  const { box } = useAppSelector((state) => state.order)
  const boxName = box ? getLocalizedName(box, locale) : t('scan_box_default_name')
  const boxHeadline = box ? getLocalizedHeadline(box, locale) : t('scan_box_default_headline')
  const genreLabels = box?.genres?.length
    ? box.genres.slice(0, 2).map((genre) => getLocalizedName(genre, locale))
    : [t('scan_box_default_genre_1'), t('scan_box_default_genre_2')]
  const firstGenre = genreLabels[0] || t('scan_box_default_genre_1')
  const secondGenre = genreLabels[1] || t('scan_box_default_genre_2')

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const safeAreaBottom = systemInfo.safeArea
    ? Math.max(0, systemInfo.screenHeight - systemInfo.safeArea.bottom)
    : 0

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: '',
    })
    void hideHomeButtonSafely()
  })

  const handleSetupRoutine = () => {
    // Navigate to setup or home, logic TBD
    // For now, go back to home or a specific setup page if exists
    Taro.reLaunch({ url: ROUTES.HOME })
  }

  return (
    <View className={`min-h-screen flex flex-col bg-black px-6 box-border relative overflow-hidden text-white ${themeMode}`}>
      {/* Background gradients */}
      <View
        className='absolute inset-0 pointer-events-none'
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.06), transparent 48%)',
          zIndex: 1,
        }}
      />
      <View
        className='absolute inset-0 pointer-events-none'
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 36%, rgba(0,0,0,0.48) 66%, rgba(0,0,0,0.84) 100%)',
          zIndex: 2,
        }}
      />
      <View
        className='absolute -inset-[20%] pointer-events-none'
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.04) 20%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,0.95) 100%)',
          zIndex: 3,
        }}
      />

      <View
        className='absolute inset-0 z-[10] flex flex-col box-border px-6'
        style={{
          paddingTop: `${statusBarHeight + 44 + 12}px`,
          paddingBottom: `${Math.max(24, safeAreaBottom + 12)}px`,
        }}
      >

        {/* Content */}
        <View className='flex-1 flex flex-col items-center w-full'>
          <Text className='text-base text-white/70 font-medium font-body self-start mb-2'>
            {t('box_registration')}
          </Text>
          <Text className='text-[32px] font-medium leading-[1.2] text-white font-juana self-start mb-10'>
            {t('congratulations_on_your_purchase')}
          </Text>

          {/* Product Image Placeholder */}
          <View className='w-[200px] h-[200px] flex items-center justify-center mb-6'>
             <Image
               src={FlavieOnboarding1}
               className='w-full h-full object-contain'
               mode='aspectFit'
             />
          </View>

          <Text className='text-base text-white/70 text-center mb-2'>
            {boxName}
          </Text>
          <View className='flex flex-col items-center mb-6'>
             <Text className='text-[24px] font-medium text-white font-juana'>
               {boxHeadline}
             </Text>
          </View>

          <View className='flex flex-col gap-3 mb-auto'>
            <View className='flex items-center gap-2'>
              <View className='w-4 h-4 rounded-full bg-[#E4D589]' /> {/* Placeholder color/icon */}
              <Text className='text-base text-white/70'>{firstGenre}</Text>
            </View>
            <View className='flex items-center gap-2'>
              <View className='w-4 h-4 rounded-full bg-[#3B82F6]' /> {/* Placeholder color/icon */}
              <Text className='text-base text-white/70'>{secondGenre}</Text>
            </View>
          </View>

          {/* Button */}
          <View
            className='w-full h-[56px] bg-[#E29B72] flex items-center justify-center active:opacity-90'
            onClick={handleSetupRoutine}
          >
            <Text className='text-[#000000] text-lg font-semibold font-juana'>
              {t('setup_routine')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
