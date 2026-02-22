import { Image, ScrollView, Text, View } from '@tarojs/components'

import clockIcon from '@/assets/svg/clock.svg'
import BottomNavBar from '@/components/BottomNavBar'
import { ROUTES } from '@/constants/routes'
import { getLocalizedName } from '@/features/order/types'
import { t } from '@/i18n'
import { isArabicLocale } from '@/i18n/locale'
import { useAppSelector } from '@/store/hooks'
import { redirectTo } from '@/utils/navigation'

import BoxesListWidget from './components/BoxesListWidget'

export default function BoxesPage() {
  const themeMode = useAppSelector((state) => state.theme.themeMode)
  const locale = useAppSelector((state) => state.theme.locale)
  const isArabic = isArabicLocale(locale)
  const boxes = useAppSelector((state) => state.order.boxes)
  const isFlavie = useAppSelector((state) => state.theme.isFlavie)

  const currentBox = boxes.find((box) => box.isCurrent)
  const currentBoxIndex = boxes.findIndex((box) => box.isCurrent)
  const futureBoxes = boxes.filter((box) => !box.isCompleted && !box.isCurrent)
  const completedBoxes = boxes.filter((box) => box.isCompleted)

  const handleTabPress = (index: number) => {
    const tabRouteMap = [ROUTES.HOME, ROUTES.BOXES, ROUTES.ANSWERS, ROUTES.ME] as const
    const targetRoute = tabRouteMap[index]
    if (!targetRoute || targetRoute === ROUTES.BOXES) {
      return
    }
    redirectTo(targetRoute).catch((error) => {
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
      <View className='flex-shrink-0 pt-12 pb-4 flex flex-row items-center gap-2 px-6'>
        <Text
          style={{
            fontFamily: 'var(--font-locale-heading)',
            fontSize: '24px',
            fontWeight: '500',
            color: 'var(--primary)',
          }}
        >
          {t('boxes')}
        </Text>
      </View>

      {/* ── SCROLLABLE BODY ── */}
      <ScrollView
        scrollY
        className='flex-1 overflow-y-auto px-6 pb-8 flex flex-col'
      >
        {/* Current Box Section */}
        {currentBox && (
          <View className='flex flex-col items-center mt-6 mb-10 w-full'>
            <Text
              style={{
                fontFamily: 'var(--font-locale-body)',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
              }}
            >
              {t('current_box') || 'Current Box'}
            </Text>

            <View style={{ height: '43px' }} />

            <Image
              src={currentBox.image || ''}
              style={{ width: '20vw', height: '20vw', objectFit: 'cover' }}
              className='focus:outline-none'
            />

            <View style={{ height: '16px' }} />

            <Text
              style={{
                fontFamily: 'var(--font-locale-body)',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
              }}
            >
              {isFlavie ? t('flavie_box') || 'Flavie Box' : t('mann_box') || 'Mann Box'} {(currentBoxIndex !== -1 ? currentBoxIndex : 0) + 1}
            </Text>

            <View style={{ height: '8px' }} />

            <Text
              style={{
                fontFamily: 'var(--font-locale-heading)',
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                textAlign: 'center',
              }}
            >
              {getLocalizedName(currentBox, locale)}
            </Text>

            <View style={{ height: '16px' }} />

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
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {isArabic ? genre.nameAr : genre.nameEn}
                  </Text>
                </View>
              ))}
            </View>

            <View style={{ height: '24px' }} />

            {/* Actions */}
            <View
              className='flex flex-row items-center justify-center gap-2 cursor-pointer'
              onClick={handleEditReminders}
              style={{ padding: '8px 16px' }}
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
            </View>
          </View>
        )}

          <View style={{ height: '30px' }} />
          <BoxesListWidget boxes={futureBoxes} titleKey='future_boxes' />
          <View style={{ height: '25px' }} />
          <BoxesListWidget
            boxes={completedBoxes}
            titleKey='completed_boxes'
            isCompleted
          />
          <View style={{ height: '32px' }} />
      </ScrollView>

      {/* ── BOTTOM NAVIGATION ── */}
      <BottomNavBar activeIndex={1} lockedTabs={false} onTabPress={handleTabPress} />
    </View>
  )
}
