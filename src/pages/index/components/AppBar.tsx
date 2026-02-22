import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { SvgIcons } from '@/assets/icons'
import { t } from '@/i18n'

type AppBarProps = {
  isFlavie: boolean
  name: string
  hasBoxes: boolean
}

export default function AppBar({ isFlavie, name, hasBoxes }: AppBarProps) {
  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0

  return (
    <View
      style={{
        paddingTop: `${statusBarHeight + 12}px`,
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingBottom: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View className='flex items-center'>
        <Text
          style={{
            fontSize: '26px',
            fontWeight: '500',
            color: 'var(--primary)',
            fontFamily: 'var(--font-juana)',
          }}
        >
          {t('hey')}, {!isFlavie ? 'Karo' : name ? name.split(' ')[0] : 'User'}
        </Text>
        <Text
          style={{
            fontSize: '12px',
            fontWeight: '400',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-locale-body)',
            marginLeft: '10px',
            textTransform: 'uppercase',
          }}
        >
          {isFlavie ? t('for_ladies') : t('for_men')}
        </Text>
      </View>

      {hasBoxes && (
        <Image src={SvgIcons.calendar} style={{ width: '24px', height: '24px', opacity: 0.8 }} />
      )}
    </View>
  )
}
