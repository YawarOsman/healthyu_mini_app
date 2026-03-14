import { View, Text, Image, ScrollView, Video } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { useState } from 'react'

import flaskIcon from '@/assets/svg/boxes.svg'
import PaginationDots from '@/components/PaginationDots'
import RefinedAppBar from '@/components/RefinedAppBar'
import { ROUTES } from '@/constants/routes'
import { getLocalizedHeadline, getLocalizedName, type BoxItem } from '@/features/order/types'
import { t } from '@/i18n'
import { isArabicLocale } from '@/i18n/locale'
import { useAppSelector } from '@/store/hooks'
import { navigateSmart, redirectTo } from '@/utils/navigation'
import { hideHomeButtonSafely } from '@/utils/ui'


export default function OrderPage() {

  const videoId = 'order-box-video'
  const { themeMode, locale } = useAppSelector((state) => state.theme)
  const { box, loading, error } = useAppSelector((state) => state.order)
  const { phone } = useAppSelector((state) => state.auth)
  const [isPlaying, setIsPlaying] = useState(true)

  useDidShow(() => {
    Taro.setNavigationBarTitle({ title: '' })
    void hideHomeButtonSafely()
    // Alipay shows an extra native back arrow; dismiss it explicitly
    const tryHideBack = () => {
      try {
        const my = (globalThis as any).my
        if (my && typeof my.hideBackHome === 'function') my.hideBackHome()
      } catch (_) {}
    }
    tryHideBack()
    setTimeout(tryHideBack, 300)
  })

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const navBarHeight = 44

  // Genre dot colors
  const genreColors = ['#EB9E74', '#5B9BD5', '#7BC67E', '#D4A5D8']

  if (loading) {
    return (
      <View
        className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
        data-theme={themeMode}
      >
        <RefinedAppBar
          showBack
          onBack={() => navigateSmart(ROUTES.HOME)}
          actions={<PaginationDots total={phone ? 2 : 3} current={0} />}
        />
        <View
          className='flex-1 flex items-center justify-center'
          style={{ paddingTop: `${statusBarHeight + navBarHeight}px` }}
        >
          <Text style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-locale-body)', fontSize: '16px' }}>
            {t('loading')}
          </Text>
        </View>
      </View>
    )
  }

  if (error) {
    return (
      <View
        className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
        data-theme={themeMode}
      >
        <RefinedAppBar
          showBack
          onBack={() => navigateSmart(ROUTES.HOME)}
          actions={<PaginationDots total={phone ? 2 : 3} current={0} />}
        />
        <View
          className='flex-1 flex items-center justify-center'
          style={{ paddingTop: `${statusBarHeight + navBarHeight}px` }}
        >
          <Text style={{ color: 'var(--error)', fontFamily: 'var(--font-locale-body)', fontSize: '16px' }}>
            {error}
          </Text>
        </View>
      </View>
    )
  }

  if (!box) {
    return (
      <View
        className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
        data-theme={themeMode}
      >
        <RefinedAppBar
          showBack
          onBack={() => navigateSmart(ROUTES.HOME)}
          actions={<PaginationDots total={phone ? 2 : 3} current={0} />}
        />
        <View
          className='flex-1 flex items-center justify-center'
          style={{ paddingTop: `${statusBarHeight + navBarHeight}px` }}
        >
          <Text style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-locale-body)', fontSize: '16px' }}>
            {t('no_data')}
          </Text>
        </View>
      </View>
    )
  }

  const boxName = getLocalizedName(box, locale)
  const headline = getLocalizedHeadline(box, locale)

  return (
    <View
      className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
      data-theme={themeMode}
    >
      {/* App Bar with back + progress dots */}
      <RefinedAppBar
        showBack
        onBack={() => navigateSmart(ROUTES.HOME)}
        actions={<PaginationDots total={phone ? 2 : 3} current={0} />}
      />

      {/* Scrollable content */}
      <ScrollView
        scrollY
        className='flex-1'
        style={{
          paddingTop: `${statusBarHeight + navBarHeight}px`,
          height: '100vh',
        }}
      >
        <View className='px-page' style={{ paddingBottom: '100px' }}>
          {/* Box label */}
          <Text
            style={{
              fontSize: '16px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-locale-body)',
              marginBottom: '8px',
              display: 'block',
            }}
          >
            {boxName}
          </Text>

          {/* Headline */}
          <Text
            style={{
              fontSize: '26px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-juana)',
              marginBottom: '8px',
              display: 'block',
              lineHeight: '1.2',
            }}
          >
            {headline}
          </Text>

          {/* Genres */}
          <View className='flex items-center' style={{ marginBottom: '16px', gap: '12px' }}>
            {box.genres.map((genre, index) => (
              <View key={genre.id} className='flex items-center' style={{ gap: '6px' }}>
                {genre.imageUrl ? (
                  <Image
                    src={genre.imageUrl}
                    style={{ width: '16px', height: '16px', borderRadius: '50%' }}
                  />
                ) : (
                  <View
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: genreColors[index % genreColors.length],
                    }}
                  />
                )}
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-locale-body)',
                  }}
                >
                  {getLocalizedName(genre, locale)}
                </Text>
              </View>
            ))}
          </View>

          {/* Video Banner */}
          {box.videoUrl ? (
            <View
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#1a1a1a',
                marginBottom: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Video
                id={videoId}
                src={box.videoUrl}
                poster={box.videoThumbnail ?? undefined}
                autoplay
                controls={isPlaying}
                loop={false}
                muted={false}
                showMuteBtn={false}
                objectFit='cover'
                style={{ width: '100%', height: '200px', display: 'block' }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              {/* Tap-to-play overlay – hidden once playing */}
              {!isPlaying && (
                <View
                  onClick={() => {
                    const ctx = Taro.createVideoContext(videoId)
                    ctx.play()
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.25)',
                  }}
                >
                  
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#1a1a1a',
                marginBottom: '16px',
              }}
            />
          )}

          {/* Contents label */}
          <Text
            style={{
              fontSize: '16px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-locale-body)',
              marginBottom: '16px',
              display: 'block',
            }}
          >
            {t('contents')}
          </Text>

          {/* Product list */}
          <View>
            {box.items.map((item) => (
              <BoxProductCard key={item.id} item={item} locale={locale} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '12px 24px',
          paddingBottom: '24px',
          backgroundColor: 'var(--scaffold-bg)',
        }}
      >
        <View
          className='btn-filled active:opacity-85'
          onClick={() => {
            redirectTo(ROUTES.ORDER_SHIPPING)
          }}
        >
          <Text className='btn-filled-text'>{t('interested')}</Text>
        </View>
      </View>
    </View>
  )
}

// ─── Progress Dots Component ───
// ─── Box Product Card Component ───
function BoxProductCard({ item, locale }: { item: BoxItem; locale: string }) {
  const isAr = isArabicLocale(locale)
  const ingredientsText = item.ingredients
    .map(ing => isAr ? ing.nameAr : ing.nameEn)
    .join(' + ')

  return (
    <View
      className='flex items-center active:opacity-85'
      style={{
        height: '64px',
        marginBottom: '8px',
        gap: '16px',
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: '48px',
          height: '48px',
          minWidth: '48px',
          backgroundColor: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={flaskIcon}
          style={{
            width: '24px',
            height: '24px',
            opacity: 0.7,
          }}
        />
      </View>

      {/* Text */}
      <View className='flex-1 flex flex-col justify-center' style={{ gap: '4px' }}>
        <Text
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-locale-body)',
          }}
        >
          {getLocalizedName(item, locale)}
        </Text>
        <Text
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
          }}
        >
          {ingredientsText}
        </Text>
      </View>

      {/* Chevron */}
      <View
        style={{
          width: '18px',
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
          }}
        >
          ›
        </Text>
      </View>
    </View>
  )
}
