import { View, Text } from '@tarojs/components'

import { t } from '@/i18n'

export const ThemeSwitcher = () => {
  const switchTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <View className='fixed bottom-20 right-4 z-50 flex flex-col gap-2 p-2 bg-surface-primary rounded-lg shadow-lg border border-border-primary'>
      <Text className='text-xs font-bold text-text-primary mb-1'>{t('theme')}</Text>
      
      <View 
        className='px-3 py-1 bg-primary text-text-inverse text-xs rounded-sm text-center'
        onClick={() => switchTheme('flavie-dark')}
      >
        {t('flavie_dark')}
      </View>
      
      <View 
        className='px-3 py-1 bg-surface-secondary text-text-primary text-xs rounded-sm text-center border border-border-secondary'
        onClick={() => switchTheme('mann-dark')}
      >
        {t('mann_dark')}
      </View>

      <View 
        className='px-3 py-1 bg-surface-secondary text-text-primary text-xs rounded-sm text-center border border-border-secondary'
        onClick={() => switchTheme('flavie-light')}
      >
        {t('flavie_light')}
      </View>
    </View>
  )
}
