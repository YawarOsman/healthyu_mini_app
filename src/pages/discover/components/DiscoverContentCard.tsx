import { Image, Text, View } from '@tarojs/components'

import { t } from '@/i18n'

interface DiscoverContentCardProps {
  imageUrl: string
  title: string
  onTap?: () => void
}

export default function DiscoverContentCard({ imageUrl, title, onTap }: DiscoverContentCardProps) {
  return (
    <View 
      className='flex flex-col flex-1 cursor-pointer' 
      onClick={onTap}
      style={{ gap: '12px' }}
    >
      {/* Image with 1:1 aspect ratio and dark overlay */}
      <View 
        className='relative w-full overflow-hidden'
        style={{ backgroundColor: '#1A1A1A', paddingTop: '100%' }}
      >
        <Image 
          src={imageUrl} 
          mode='aspectFill'
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
        />
      </View>

      {/* Title */}
      <Text
        style={{
          fontFamily: 'var(--font-locale-body)',
          fontSize: '16px',
          fontWeight: '400',
          color: 'var(--text-primary)',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </Text>

      {/* Watch Video link */}
      <View className='flex flex-row items-center gap-1'>
        <Text
          style={{
            fontFamily: 'var(--font-locale-body)',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--primary)',
          }}
        >
          {t('watch_video')}
        </Text>
        {/* Right Arrow SVG */}
        <View>
          <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='var(--primary)' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='9 18 15 12 9 6'></polyline>
          </svg>
        </View>
      </View>
    </View>
  )
}
