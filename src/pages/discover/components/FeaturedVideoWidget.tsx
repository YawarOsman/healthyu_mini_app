import { Image, View } from '@tarojs/components'

import { SvgIcons } from '@/assets/icons'

interface FeaturedVideoWidgetProps {
  thumbnailUrl: string
}

export default function FeaturedVideoWidget({ thumbnailUrl }: FeaturedVideoWidgetProps) {
  const src =
    thumbnailUrl;
  return (
    <View
      className='w-full relative overflow-hidden flex'
      style={{
        aspectRatio: '2.28',
        backgroundColor: '#1A1A1A'
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
        className='absolute z-20 rounded-full border border-[var(--primary)] cursor-pointer'
        style={{
          display: 'grid',
          placeItems: 'center',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '64px',
          height: '64px',
        }}
      >
        <View style={{ marginLeft: '4px' }}>
          <Image
            src={SvgIcons.play}
            style={{ width: '40px', height: '40px' }}
          />
        </View>
      </View>
    </View>
  )
}