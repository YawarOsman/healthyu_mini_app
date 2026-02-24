import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';



import { SvgIcons } from '@/assets/icons'
import { t } from '@/i18n'

interface DownloadOverlayProps {
  downloadText?: string;
  topOffset?: number;
}

export default function DownloadOverlay({ downloadText, topOffset }: DownloadOverlayProps) {
  return (
    <View className='absolute inset-0 z-50 flex flex-col justify-end pointer-events-none'>



      {/* Fading Glassy Background Layer */}
      <View
        className='absolute inset-0 pointer-events-auto'
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 25%, black 50%, black 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 25%, black 50%, black 100%)',
        }}
      />
      
      {/* Button Container Area */}
      <View
        className='relative w-full flex flex-col items-center px-6 pb-16 pt-6 gap-6 pointer-events-auto'
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
          {downloadText || t('download_to_access') || 'Download the app to access this feature'}
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
      
      {/* Spacer to push above BottomNavBar */}
      <View style={{ height: '70px' }} />
    </View>
  )
}
