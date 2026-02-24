import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'


import { t } from '@/i18n'

type AppBarProps = {
  isFlavie: boolean
  name: string
  hasBoxes: boolean
}

export default function AppBar({ isFlavie, name }: AppBarProps) {
  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const greetingName = name ? name.split(' ')[0] : t('hello_fallback_name')

  return (
    <View
      style={{
        paddingTop: `${statusBarHeight + 12}px`,
        paddingInlineStart: '24px',
        paddingInlineEnd: '24px',
        paddingBottom: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View className='flex items-center'>
        <Text
          style={{
            fontSize: '22px',
            fontWeight: '500',
            color: 'var(--primary)',
            fontFamily: 'var(--font-juana)',
          }}
        >
          {t('hey')}, {greetingName}
        </Text>
        <Text
          style={{
            fontSize: '11px',
            fontWeight: '400',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            marginInlineStart: '10px',
            textTransform: 'uppercase',
          }}
        >
          {isFlavie ? t('for_ladies') : t('for_men')}
        </Text>
      </View>

    </View>
  )
}
