import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { t } from '../../i18n'
import { RootState } from '../../reducers'
import RefinedAppBar from '../../components/RefinedAppBar'
import type { BoxItem } from '../../features/order/types'
import flaskIcon from '../../assets/svg/boxes.svg'
import { ROUTES } from '../../constants/routes'
import { navigateTo } from '../../utils/navigation'


export default function OrderPage() {
  console.log('OrderPage: Rendering...')
  const { themeMode, locale } = useSelector((state: RootState) => state.theme)
  const { box, loading, error } = useSelector((state: RootState) => state.order)

  const isAr = locale === 'ar'

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const navBarHeight = 44

  // Genre dot colors
  const genreColors = ['#EB9E74', '#5B9BD5', '#7BC67E', '#D4A5D8']

  if (loading || !box) {
    return (
      <View
        className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
        data-theme={themeMode}
      >
        <RefinedAppBar
          actions={<ProgressDots current={0} total={3} />}
        />
        <View
          className='flex-1 flex items-center justify-center'
          style={{ paddingTop: `${statusBarHeight + navBarHeight}px` }}
        >
          <Text style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-locale-body)', fontSize: '16px' }}>
            {loading ? 'Loading...' : 'No data'}
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
          actions={<ProgressDots current={0} total={3} />}
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

  const boxName = isAr ? box.nameAr : box.nameEn
  const headline = isAr ? box.headlineAr : box.headlineEn

  return (
    <View
      className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`}
      data-theme={themeMode}
    >
      {/* App Bar with back + progress dots */}
      <RefinedAppBar
        actions={<ProgressDots current={0} total={3} />}
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
                  {isAr ? genre.nameAr : genre.nameEn}
                </Text>
              </View>
            ))}
          </View>

          {/* Video Banner */}
          <View
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#1a1a1a',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Play button overlay */}
            <View
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '2px solid rgba(235, 158, 116, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <View
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '16px solid white',
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  marginLeft: '4px',
                }}
              />
            </View>
          </View>

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
              <BoxProductCard key={item.id} item={item} isAr={isAr} />
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
            navigateTo(ROUTES.ORDER_SHIPPING)
          }}
        >
          <Text className='btn-filled-text'>{t('interested')}</Text>
        </View>
      </View>
    </View>
  )
}

// ─── Progress Dots Component ───
function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <View className='flex items-center' style={{ gap: '6px' }}>
      {[0, 1, 2].slice(0, total).map((i) => (
        <View
          key={i}
          style={{
            width: i === current ? '10px' : '8px',
            height: i === current ? '10px' : '8px',
            borderRadius: '50%',
            backgroundColor: i === current ? 'var(--primary)' : 'var(--text-secondary)',
            opacity: i === current ? 1 : 0.4,
            transition: 'all 0.2s ease',
          }}
        />
      ))}
    </View>
  )
}

// ─── Box Product Card Component ───
function BoxProductCard({ item, isAr }: { item: BoxItem; isAr: boolean }) {
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
          {isAr ? item.nameAr : item.nameEn}
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
