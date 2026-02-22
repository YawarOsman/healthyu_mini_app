import { Text, View } from '@tarojs/components'

import BottomNavBar from '@/components/BottomNavBar'
import { ROUTES } from '@/constants/routes'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { redirectTo } from '@/utils/navigation'

export default function MePage() {
  const themeMode = useAppSelector((state) => state.theme.themeMode)

  const handleTabPress = (index: number) => {
    const tabRouteMap = [ROUTES.HOME, ROUTES.BOXES, ROUTES.ANSWERS, ROUTES.ME] as const
    const targetRoute = tabRouteMap[index]
    if (!targetRoute || targetRoute === ROUTES.ME) {
      return
    }
    redirectTo(targetRoute).catch((error) => {
      console.error('Failed to switch bottom section', { index, targetRoute, error })
    })
  }

  return (
    <View className={`h-screen bg-scaffold flex flex-col overflow-hidden ${themeMode}`} data-theme={themeMode}>
      <View className='flex-1 flex items-center justify-center px-6 text-center'>
        <Text
          style={{
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-locale-heading)',
            fontSize: '28px',
            fontWeight: '500',
          }}
        >
          {t('me')}
        </Text>
      </View>
      <BottomNavBar activeIndex={3} lockedTabs={false} onTabPress={handleTabPress} />
    </View>
  )
}
