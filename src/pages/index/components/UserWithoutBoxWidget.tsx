import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { SvgIcons } from '@/assets/icons'
import DashedBox from '@/components/DashedBox'
import { ROUTES } from '@/constants/routes'
import { setUserHaveBox, setUserOrderedBox } from '@/features/auth/reducer'
import { t } from '@/i18n'
import { useAppDispatch } from '@/store/hooks'
import { redirectTo } from '@/utils/navigation'

interface UserWithoutBoxWidgetProps {
  brandName: string
  isFlavie: boolean
}

export default function UserWithoutBoxWidget({ brandName }: UserWithoutBoxWidgetProps) {
  const dispatch = useAppDispatch()

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
          onClick={() => redirectTo(ROUTES.ORDER)}
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
        color='var(--border-secondary)'
        borderPosition='inside'
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
              success: () => {
                dispatch(setUserOrderedBox(true))
                dispatch(setUserHaveBox(true))
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

    </View>
  )
}
