import { Text, View } from '@tarojs/components'

import type { BoxEntity } from '@/features/order/types'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

import BoxItem from './BoxItem'


interface BoxesListWidgetProps {
  boxes: BoxEntity[]
  titleKey: string
  isCompleted?: boolean
}

export default function BoxesListWidget({ boxes, titleKey, isCompleted = false }: BoxesListWidgetProps) {
  const themeMode = useAppSelector((state) => state.theme.themeMode)

  if (boxes.length === 0) {
    return null
  }

  const handleBoxClick = (boxId: number) => {
    // We'll navigate to box details if requested later
    console.log('Navigate to box details', boxId)
    // navigateTo(`/pages/box_details/index?id=${boxId}`)
  }

  return (
    <View className='flex flex-col gap-4' data-theme={themeMode}>
      <Text
        style={{
          fontFamily: 'var(--font-locale-body)',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--text-secondary)',
        }}
      >
        {t(titleKey) || (titleKey === 'future_boxes' ? 'Future boxes' : 'Completed boxes')}
      </Text>
      <View className='flex flex-col gap-4'>
        {boxes.map((box) => (
          <BoxItem
            key={box.id}
            box={box}
            isCompleted={isCompleted}
            onClick={() => handleBoxClick(box.id)}
          />
        ))}
      </View>
    </View>
  )
}
