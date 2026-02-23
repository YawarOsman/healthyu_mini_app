import { Image, ScrollView, Text, View } from '@tarojs/components'

import { SvgIcons } from '@/assets/icons'
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
      <View
        style={{
          paddingTop: '10px',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '12px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Text
          style={{
            fontFamily: 'var(--font-juana)',
            fontSize: '26px',
            fontWeight: '500',
            color: 'var(--primary)',
          }}
        >
          {t('boxes')}
        </Text>
      </View>

      {/* ── SCROLLABLE BODY ── */}
      <View className='flex-1 relative'>
        <ScrollView
          scrollY={false}
          className='absolute inset-0 z-0 overflow-hidden flex flex-col pointer-events-none'
          style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px' }}
        >
        {/* Current Box Section */}
        {currentBox && (
          <View className='flex flex-col items-center mt-6 mb-4 w-full'>
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

          <View style={{ height: '10px' }} />

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
            </View>
          </View>
        )}

          <BoxesListWidget boxes={futureBoxes} titleKey='future_boxes' />
          <View style={{ height: '25px' }} />
          <BoxesListWidget
            boxes={completedBoxes}
            titleKey='completed_boxes'
            isCompleted
          />
          <View style={{ height: '32px' }} />
      </ScrollView>

        {/* ── OVERLAY (Full Screen Fading Bottom Sheet) ── */}
        <View className='absolute inset-0 z-50 flex flex-col justify-end pointer-events-none'>
          
          {/* Fading Glassy Background Layer */}
          <View
            className='absolute inset-0 pointer-events-auto'
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              // 1 & 2 (~0-33%): transparent
              // 3 (~33-50%): fade transparent -> black
              // 4, 5, 6 (50-100%): solid black
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 20%, transparent 20%, black 60%, black 70%, black 90%)',
              maskImage: 'linear-gradient(to bottom, transparent 20%, transparent 20%, black 60%, black 70%, black 90%)',
            }}
          />
          
          {/* Button Container Area */}
          <View
            className='relative w-full flex flex-col items-center px-6 pb-6 pt-6 gap-6 pointer-events-auto'
            style={{ boxSizing: 'border-box' }}
          >
            <Text
              style={{
                fontFamily: 'var(--font-juana)',
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                textAlign: 'center',
              }}
            >
              {t('download_to_access') || 'Download the app to access this feature'}
            </Text>

            <View className='flex flex-col w-full gap-2 max-w-[280px]' style={{ boxSizing: 'border-box' }}>
              
              {/* Apple App Store Button */}
              <View
                className='flex flex-row items-center justify-center gap-3 w-full bg-black cursor-pointer'
                style={{ 
                  padding: '10px 16px', 
                  boxSizing: 'border-box',
                  border: '1px solid rgba(255,255,255,0.2)' 
                }}
                onClick={() => window.open('https://apps.apple.com/us/app/bourse-%D8%A8%DB%86%D8%B1%D8%B3%DB%95-%D8%A7%D9%84%D8%A8%D9%88%D8%B1%D8%B5%D8%A9/id6749684112', '_blank')}
              >
                <Image src={SvgIcons.appleIcon} style={{ width: '30px', height: '30px' }} />
                <View className='flex flex-col items-start'>
                  <Text
                    style={{
                      fontFamily: 'var(--font-locale-body)',
                      fontSize: '11px',
                      fontWeight: '500',
                      color: 'white',
                      lineHeight: '1.2',
                    }}
                  >
                    Download on the
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'var(--font-locale-body)',
                      fontSize: '20px',
                      fontWeight: '700',
                      color: 'white',
                      lineHeight: '1.2',
                    }}
                  >
                    App Store
                  </Text>
                </View>
              </View>

              {/* Google Play Button */}
              <View
                className='flex flex-row items-center justify-center gap-3 w-full bg-black cursor-pointer'
                style={{ 
                  padding: '10px 16px', 
                  boxSizing: 'border-box',
                  border: '1px solid rgba(255,255,255,0.2)' 
                }}
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.architech.bourse', '_blank')}
              >
                <Image src={SvgIcons.googleIcon} style={{ width: '28px', height: '28px' }} />
                <View className='flex flex-col items-start'>
                  <Text
                    style={{
                      fontFamily: 'var(--font-locale-body)',
                      fontSize: '11px',
                      fontWeight: '500',
                      color: 'white',
                      lineHeight: '1.2',
                      textTransform: 'uppercase',
                    }}
                  >
                    GET IT ON
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'var(--font-locale-body)',
                      fontSize: '20px',
                      fontWeight: '700',
                      color: 'white',
                      lineHeight: '1.2',
                    }}
                  >
                    Google Play
                  </Text>
                </View>
              </View>

            </View>
          </View>
        </View>
      </View>

      {/* ── BOTTOM NAVIGATION ── */}
      <BottomNavBar activeIndex={1} lockedTabs={false} onTabPress={handleTabPress} />
    </View>
  )
}
