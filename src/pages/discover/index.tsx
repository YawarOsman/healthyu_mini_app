import { ScrollView, Text, View } from '@tarojs/components'

import { useEffect, useState } from 'react'

import BottomNavBar from '@/components/BottomNavBar'
import DownloadOverlay from '@/components/DownloadOverlay'
import { ROUTES } from '@/constants/routes'
import { t } from '@/i18n'
import { fetchDiscoverData, type DiscoverPageResponse } from '@/services/discover'
import { useAppSelector } from '@/store/hooks'
import { redirectTo } from '@/utils/navigation'

import DiscoverContentCard from './components/DiscoverContentCard'
import FeaturedVideoWidget from './components/FeaturedVideoWidget'

export default function DiscoverPage() {
  const themeMode = useAppSelector((state) => state.theme.themeMode)

  const [data, setData] = useState<DiscoverPageResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await fetchDiscoverData()
        if (isMounted) {
          setData(response)
        }
      } catch (error) {
        console.error('Failed to load discover data:', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [])

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
          paddingTop: '10px',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '12px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
          gap: '16px',
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
          {t('discover')}
        </Text>
        <Text
          style={{
            fontFamily: 'var(--font-locale-body)',
            fontSize: '12px',
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
        style={{ paddingLeft: '24px', paddingRight: '24px', boxSizing: 'border-box' }}
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
          <FeaturedVideoWidget thumbnailUrl={data?.featuredVideo.thumbnailUrl} />
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
          <View className='flex flex-row gap-6 w-full h-[220px]'>
             <View className='flex-1 border-2 border-dashed border-[var(--border-disabled)] rounded-[var(--radius-xl)] flex items-center justify-center'>
               <Text className='text-[var(--text-secondary)] font-locale-body'>Loading Cards...</Text>
             </View>
          </View>
        ) : (
          <View className='flex flex-row gap-6'>
            {data?.selfCareItems.map((item) => (
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
      <DownloadOverlay />

      {/* ── BOTTOM NAVIGATION ── */}
      <BottomNavBar activeIndex={2} lockedTabs={false} onTabPress={handleTabPress} />
    </View>
  )
}
