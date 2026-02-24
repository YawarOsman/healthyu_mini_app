import { Image, View } from '@tarojs/components'

interface FeaturedVideoWidgetProps {
  thumbnailUrl: string
}

export default function FeaturedVideoWidget({ thumbnailUrl }: FeaturedVideoWidgetProps) {
  const src =
    thumbnailUrl;

  return (
    <View
      className='w-full relative overflow-hidden'
      style={{
        aspectRatio: '2.28'
      }}
    >
      <Image
        src={src}
        className='w-full'
        style={{ width: '100%', display: 'block' }}
        mode='widthFix'
      />
      
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