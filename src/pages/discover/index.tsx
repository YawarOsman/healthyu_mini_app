import { ScrollView, Text, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';



import BottomNavBar from '@/components/BottomNavBar'
import DownloadOverlay from '@/components/DownloadOverlay'
import { ROUTES } from '@/constants/routes'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { redirectTo } from '@/utils/navigation'
import { hideHomeButtonSafely } from '@/utils/ui'

import DiscoverContentCard from './components/DiscoverContentCard'
import FeaturedVideoWidget from './components/FeaturedVideoWidget'

export default function DiscoverPage() {
  const themeMode = useAppSelector((state) => state.theme.themeMode)
  const discoverData = useAppSelector((state) => state.discover)
  const { featuredVideo, selfCareItems, loading: isLoading } = discoverData

  useDidShow(() => {
    void hideHomeButtonSafely();
  });

  const handleTabPress = (index: number) => {
    const tabRouteMap = [ROUTES.HOME, ROUTES.BOXES, ROUTES.DISCOVER, ROUTES.ME] as const
    const targetRoute = tabRouteMap[index]
    if (!targetRoute || targetRoute === ROUTES.DISCOVER) {
      return
    }
    redirectTo(targetRoute).catch((error) => {
      console.error('Failed to switch bottom section', { index, targetRoute, error })
    })
  }

  return (
    <View className={`h-screen bg-scaffold flex flex-col overflow-hidden ${themeMode}`} data-theme={themeMode}>
      
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
          {t('discover')}
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
          {t('from_us')}
        </Text>
      </View>

      {/* ── SCROLLABLE BODY ── */}
      <ScrollView
        scrollY
        className='flex-1 overflow-y-auto flex flex-col'
        style={{ paddingInlineStart: '24px', paddingInlineEnd: '24px', boxSizing: 'border-box' }}
      >
        <View style={{ height: '8px' }} />

        {/* Featured Section */}
        <Text
          style={{
            fontFamily: 'var(--font-locale-body)',
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            display: 'block',
          }}
        >
          {t('featured')}
        </Text>

        {isLoading ? (
          <View className='w-full border-2 border-dashed border-[var(--border-disabled)] flex items-center justify-center p-8' style={{ aspectRatio: '2.28' }}>
            <Text className='text-[var(--text-secondary)] font-locale-body'>Loading Featured...</Text>
          </View>
        ) : (
          <FeaturedVideoWidget thumbnailUrl={featuredVideo?.thumbnailUrl} />
        )}

        <View style={{ height: '32px' }} />

        {/* Self-care Section */}
        <Text
          style={{
            fontFamily: 'var(--font-locale-body)',
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            display: 'block',
          }}
        >
          {t('self_care')}
        </Text>

        {isLoading ? (
          <View style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%', height: '220px' }}>
             <View className='border-2 border-dashed border-[var(--border-disabled)] rounded-[var(--radius-xl)] flex items-center justify-center'>
               <Text className='text-[var(--text-secondary)] font-locale-body'>Loading Cards...</Text>
             </View>
          </View>
        ) : (
          <View style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {selfCareItems.map((item) => (
              <DiscoverContentCard 
                key={item.id}
                imageUrl={item.imageUrl} 
                title={item.title} 
              />
            ))}
          </View>
        )}

        <View style={{ height: '32px' }} />
      </ScrollView>

      {/* ── OVERLAY (Full Screen Fading Bottom Sheet) ── */}
      <DownloadOverlay 
        downloadText={t('download_to_discover')}
      />

      {/* ── BOTTOM NAVIGATION ── */}
      <BottomNavBar activeIndex={2} lockedTabs={false} onTabPress={handleTabPress} />
    </View>
  )
}
