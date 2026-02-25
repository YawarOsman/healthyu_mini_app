import { Image, ScrollView, Text, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';




import clockIcon from '@/assets/svg/clock.svg'
import BottomNavBar from '@/components/BottomNavBar'
import DownloadOverlay from '@/components/DownloadOverlay'
import { ROUTES } from '@/constants/routes'
import { getLocalizedName } from '@/features/order/types'
import { t } from '@/i18n'
import { isArabicLocale } from '@/i18n/locale'
import { useAppSelector } from '@/store/hooks'
import { switchTab } from '@/utils/navigation'
import { hideHomeButtonSafely, hideNativeTabBarSafely } from '@/utils/ui'

import BoxesListWidget from './components/BoxesListWidget'

export default function BoxesPage() {
  useDidShow(() => {
    void hideHomeButtonSafely();
    void hideNativeTabBarSafely();
  });
  const themeMode = useAppSelector((state) => state.theme.themeMode)
  const locale = useAppSelector((state) => state.theme.locale)
  const isArabic = isArabicLocale(locale)
  const boxes = useAppSelector((state) => state.order.boxes)
  const isFlavie = useAppSelector((state) => state.theme.isFlavie)

  const currentBox = boxes.find((box) => box.isCurrent)
  const currentBoxIndex = boxes.findIndex((box) => box.isCurrent)
  
  // Dummy 6 "Future Boxes" just for this paywalled screen
  const futureBoxes = Array.from({ length: 6 }).map((_, i) => ({
    id: 1000 + i,
    nameEn: `Future Box ${i + 1}`,
    nameAr: `صندوق مستقبلي ${i + 1}`,
    headlineEn: 'Unlock to view contents',
    headlineAr: 'افتح لعرض المحتويات',
    image: `https://picsum.photos/seed/future${i}/200`,
    videoUrl: null,
    videoThumbnail: null,
    isCurrent: false,
    isOverdue: false,
    isLater: true,
    isCompleted: false,
    genres: [],
    items: [],
  }))
  
  const completedBoxes = boxes.filter((box) => box.isCompleted)

  const handleTabPress = (index: number) => {
    const tabRouteMap = [ROUTES.HOME, ROUTES.BOXES, ROUTES.DISCOVER, ROUTES.ME] as const
    const targetRoute = tabRouteMap[index]
    if (!targetRoute || targetRoute === ROUTES.BOXES) {
      return
    }
    switchTab(targetRoute).catch((error) => {
      console.error('Failed to switch bottom section', { index, targetRoute, error })
    })
  }

  const handleEditReminders = () => {
    console.log('Navigate to edit reminders')
  }

  return (
    <View
      className={`h-screen bg-scaffold flex flex-col overflow-hidden ${themeMode}`}
      data-theme={themeMode}
    >
        
      {/* ── APP BAR ── */}
      <View
        style={{
          paddingTop: `${(Taro.getSystemInfoSync().statusBarHeight || 0) + 12}px`,
          paddingInlineStart: '24px',
          paddingInlineEnd: '24px',
          paddingBottom: '12px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
          gap: '10px',
          flexShrink: 0,
        }}
      >
        <Text
          style={{
            fontFamily: 'var(--font-juana)',
            fontSize: '22px',
            fontWeight: '500',
            color: 'var(--primary)',
          }}
        >
          {t('boxes')}
        </Text>
        <Text
          style={{
            fontFamily: 'var(--font-locale-body)',
            fontSize: '11px',
            fontWeight: '400',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}
        >
          {t('catalogue')}
        </Text>
      </View>

      {/* ── SCROLLABLE BODY ── */}
      <ScrollView
        scrollY
        className='flex-1 flex flex-col pointer-events-none mt-4'
        style={{ paddingInlineStart: '24px', paddingInlineEnd: '24px', boxSizing: 'border-box', overflow: 'hidden' }}
      >
        <View style={{ height: '8px' }} />
        {/* Current Box Section */}
        {currentBox && (
          <View className='flex flex-col items-center mb-4 w-full'>
            <Text
              style={{
                fontFamily: 'var(--font-locale-body)',
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
              }}
            >
              {t('current_routine') || 'Current Routine'}
            </Text>

            <View style={{ height: '43px' }} />

            <Image
              src={currentBox.image || ''}
              style={{ width: '16vw', height: '16vw', objectFit: 'cover' }}
              className='focus:outline-none'
            />

            <View style={{ height: '16px' }} />

            <Text
              style={{
                fontFamily: 'var(--font-locale-body)',
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
              }}
            >
              {isFlavie ? t('flavie_box') || 'Flavie Box' : t('mann_box') || 'Mann Box'} {(currentBoxIndex !== -1 ? currentBoxIndex : 0) + 1}
            </Text>

            <View style={{ height: '8px' }} />

            <Text
              style={{
                fontFamily: 'var(--font-juana)',
            fontSize: '24px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            textAlign: 'center',
              }}
            >
              {getLocalizedName(currentBox, locale)}
            </Text>

            <View style={{ height: '16px' }} />

            {currentBox.genres.length > 0 && (
              <>
                <View className='flex flex-row flex-wrap justify-center gap-x-3 gap-y-[6px]'>
                  {currentBox.genres.map((genre) => (
                    <View key={genre.id} className='flex flex-row items-center gap-1'>
                      {genre.imageUrl && (
                        <Image
                          src={genre.imageUrl}
                          style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                        />
                      )}
                      <Text
                        style={{
                          fontFamily: 'var(--font-locale-body)',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {isArabic ? genre.nameAr : genre.nameEn}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={{ height: '24px' }} />
              </>
            )}

          <View style={{ height: '24px' }} />

            {/* Actions */}
            <View
              className='flex flex-row items-center justify-start gap-1 cursor-pointer w-full'
              onClick={handleEditReminders}
            >
              <Image
                src={clockIcon}
                style={{ width: '18px', height: '18px' }}
                className='primary-icon'
              />
              <Text
                style={{
                  fontFamily: 'var(--font-locale-body)',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--primary)',
                }}
              >
                {t('edit_reminders') || 'Edit Reminders'}
              </Text>
          <View style={{ height: '32px' }} />

            </View>
          </View>
        )}

          <BoxesListWidget boxes={futureBoxes} titleKey='future_boxes' />
          <BoxesListWidget
            boxes={completedBoxes}
            titleKey='completed_boxes'
            isCompleted
          />
          <View style={{ height: '32px' }} />
      </ScrollView>

      <DownloadOverlay />

      {/* ── BOTTOM NAVIGATION ── */}
      <BottomNavBar activeIndex={1} lockedTabs={false} onTabPress={handleTabPress} />
    </View>
  )
}
