import { View } from '@tarojs/components'

interface FeaturedVideoWidgetProps {
  thumbnailUrl?: string
}

export default function FeaturedVideoWidget({ thumbnailUrl }: FeaturedVideoWidgetProps) {
  const src =
    thumbnailUrl ??
    'https://t3.ftcdn.net/jpg/19/09/34/50/240_F_1909345096_Q2fwLPSpjOgCidGapNYxFl8biZzCyZah.jpg'

  return (
    <View
      className='w-full relative overflow-hidden'
      style={{
        aspectRatio: '2.28',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <View className='absolute inset-0 bg-black/45 z-10' />

      {/* Play Button Overlay */}
      <View
        className='absolute z-20 flex items-center justify-center rounded-full border border-[var(--primary)] cursor-pointer'
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '64px',
          height: '64px',
        }}
      >
        <View style={{ marginLeft: '4px' }}>
          <svg width='40' height='40' viewBox='0 0 24 24' fill='white'>
            <path d='M8 5v14l11-7z' />
          </svg>
        </View>
      </View>
    </View>
  )
}