import { View, Text, Image, Button } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'

import { SvgIcons } from '@/assets/icons'
import { ROUTES } from '@/constants/routes'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { reLaunch } from '@/utils/navigation'
import { hideHomeButtonSafely } from '@/utils/ui'

export default function OrderConfirmedScreen() {
  const { themeMode } = useAppSelector((state) => state.theme)

  useDidShow(() => {
    void hideHomeButtonSafely()
  })


  const handleBackToHome = () => {
    reLaunch(ROUTES.HOME)
  }

  return (
    <View className={`min-h-screen bg-scaffold flex flex-col ${themeMode}`} data-theme={themeMode}>
      

      <View className='flex-1 flex flex-col items-center justify-center px-page' style={{ paddingBottom: '10%' }}>
        <Image 
          src={SvgIcons.orderConfirmed} 
          style={{ width: '40vw', height: '40vw', marginBottom: '32px' }} 
        />
        
        <Text
          style={{
            fontSize: '24px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-juana)',
            textAlign: 'center',
            marginBottom: '13px',
          }}
        >
          {t('order_confirmed')}
        </Text>

        <Text
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          {t('we_will_call_you_when_your_order_arrives')}
        </Text>

        <View style={{ width: '100%', marginTop: '16px' }}>
          <Button
            className='active:opacity-85'
            onClick={handleBackToHome}
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--primary)',
                fontFamily: 'var(--font-locale-body)',
              }}
            >
              {t('back_to_home')}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

