import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { SvgIcons } from '@/assets/icons'
import DashedBox from '@/components/DashedBox'
import DottedCircle from '@/components/DottedCircle'
import { ROUTES } from '@/constants/routes'
import { t } from '@/i18n'
import { navigateTo } from '@/utils/navigation'

interface BoxOrderedWidgetProps {
  estimatedDeliveryDate: string | null
}

export default function BoxOrderedWidget({ estimatedDeliveryDate }: BoxOrderedWidgetProps) {
  return (
    <View className='flex-1 flex flex-col px-page' style={{ paddingBottom: '24px' }}>
      {/* Status Cards */}
      <DashedBox
        width='100%'
        dash={6}
        gap={6}
        color='var(--text-primary-16)'
        borderPosition='inside'
        style={{ marginBottom: '40px' }}
      >
        <View style={{ backgroundColor: 'var(--text-primary-4)' }}>

          {/* Box Ordered Card */}
          <View
            className='flex items-center'
            style={{ padding: '16px', gap: '16px' }}
          >
            {/* Box icon */}
            <DottedCircle
              size={56}
              color='var(--primary)'
              gap={6}
              dotSize={2}
              strokeWidth={1.5}
              style={{ minWidth: '56px' }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                }}
              >
                <Image src={SvgIcons.box} style={{ width: '32px', height: '32px', opacity: 0.8 }} />
              </View>
            </DottedCircle>
            <View>
              <Text
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-locale-body)',
                  display: 'block',
                }}
              >
                {t('box_ordered')}
              </Text>
              <Text
                style={{
                  fontSize: '16px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-locale-body)',
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                {t('your_order_will_arrive_in')}{' '}
                <Text
                  style={{
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-locale-body)',
                  }}
                >
                  {estimatedDeliveryDate || t('delivery_date_tbd')}
                </Text>
                .
              </Text>
            </View>
          </View>
        </View>
      </DashedBox>

      {/* QR Section */}
      <View className='flex-1 flex flex-col items-center justify-center' style={{ paddingBottom: '40px' }}>
        {/* QR Icon */}
        <DashedBox
          width='56px'
          height='56px'
          dash={6}
          gap={6}
          color='var(--primary)'
          borderPosition='inside'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '27px',
            backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
          }}
        >
          <Image src={SvgIcons.qr} style={{ width: '32px', height: '32px' }} />
        </DashedBox>

        <Text
          style={{
            fontSize: '28px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-juana)',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          {t('begin_your_journey')}
        </Text>

        <Text
          style={{
            fontSize: '20px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          {t('scan_the_qr_on_the_box')}
        </Text>

        {/* Scan Box Button */}
        <View style={{ width: '100%' }}>
          <View
            className='btn-filled active:opacity-85'
            onClick={() => {
              Taro.scanCode({
                onlyFromCamera: true,
                scanType: ['qrCode', 'barCode'],
                success: (res) => {
                  const boxId = res.result
                  navigateTo(`${ROUTES.SCAN_BOX}?boxId=${boxId}`)
                },
                fail: (err) => {
                  console.error('Scan failed', err)
                },
              })
            }}
          >
            <View className='flex items-center justify-center' style={{ gap: '8px' }}>
              <View
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'var(--button-text)',
                  maskImage: `url(${SvgIcons.qrScan})`,
                  WebkitMaskImage: `url(${SvgIcons.qrScan})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
              <Text className='btn-filled-text'>{t('scan_box')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
