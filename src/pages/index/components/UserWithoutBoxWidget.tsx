import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { t } from '../../../i18n'
import { SvgIcons } from '../../../assets/icons'
import DashedBox from '../../../components/DashedBox'
import { ROUTES } from '../../../constants/routes'
import { navigateTo } from '../../../utils/navigation'
import { setIsFlavie } from '../../../actions/theme'

interface UserWithoutBoxWidgetProps {
  brandName: string
  isFlavie: boolean
  dispatch: any
}

export default function UserWithoutBoxWidget({ brandName, isFlavie, dispatch }: UserWithoutBoxWidgetProps) {
  return (
    <View
      className='flex-1 flex flex-col items-center justify-center px-page'
      style={{ paddingBottom: '40px' }}
    >
      {/* Box Icon with dashed border */}
      <DashedBox
        width={56}
        height={56}
        dash={5}
        gap={6}
        color="var(--primary)"
        borderPosition="inside"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '27px',
          backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
        }}
      >
        <Image src={SvgIcons.box} style={{ width: '32px', height: '32px' }} />
      </DashedBox>

      {/* Title */}
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
        {t('last_step_lets_get_you_a_box')}
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: '20px',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-locale-body)',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        {t('order_box_subtitle').replace('{brand}', brandName)}
      </Text>

      {/* Start my experience Button */}
      <View style={{ width: '100%', marginBottom: '12px' }}>
        <View
          className='btn-filled active:opacity-85'
          onClick={() => navigateTo(ROUTES.ORDER)}
        >
          <Text className='btn-filled-text'>{t('start_my_experience')}</Text>
        </View>
      </View>

      {/* I already have a box Button */}
      <DashedBox
        height={56}
        dash={5}
        gap={6}
        stroke={1}
        color="var(--border-secondary)"
        borderPosition="inside"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
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
          <Text
            style={{
              fontSize: '18px',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-locale-body)',
              textAlign: 'center',
            }}
          >
            {t('i_already_have_a_box')}
          </Text>
        </View>
      </DashedBox>

      {/* Debug buttons */}
      <View style={{ marginTop: '40px', opacity: 0.3 }}>
        <Text
          onClick={() => dispatch(setIsFlavie(!isFlavie))}
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            textDecoration: 'underline',
          }}
        >
          Switch to {isFlavie ? 'Mann' : 'Flavie'}
        </Text>
      </View>
    </View>
  )
}
