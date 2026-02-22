import { Image, Text, View } from '@tarojs/components'

import arrowLeftIcon from '@/assets/svg/arrow_left.svg'
import type { BoxEntity } from '@/features/order/types'
import { getLocalizedHeadline, getLocalizedName } from '@/features/order/types'
import { isArabicLocale } from '@/i18n/locale'
import { useAppSelector } from '@/store/hooks'

interface BoxItemProps {
  box: BoxEntity
  isCompleted?: boolean
  onClick?: () => void
}

export default function BoxItem({ box, isCompleted = false, onClick }: BoxItemProps) {
  const locale = useAppSelector((state) => state.theme.locale)
  const isArabic = isArabicLocale(locale)
  const name = getLocalizedName(box, locale)
  const headline = getLocalizedHeadline(box, locale)

  return (
    <View
      className='flex flex-row gap-3 items-center'
      onClick={onClick}
      style={{ opacity: isCompleted ? 0.6 : 1, cursor: 'pointer' }}
    >
      <Image
        src={box.image || ''}
        className='w-[60px] h-[60px] object-cover rounded flex-shrink-0'
      />
      <View className='flex-1 flex flex-col justify-around overflow-hidden'>
        <Text
          className={`text-base font-medium truncate ${isCompleted ? 'line-through' : ''}`}
          style={{
            fontFamily: 'var(--font-locale-heading)',
            color: 'var(--text-primary)',
          }}
        >
          {name}
        </Text>
        <Text
          className={`text-sm font-normal line-clamp-2 mt-1 ${isCompleted ? 'line-through text-[rgba(255,255,255,0.4)]' : 'text-[var(--text-secondary)]'}`}
          style={{
            fontFamily: 'var(--font-locale-body)',
          }}
        >
          {headline}
        </Text>
      </View>
      <Image
        src={arrowLeftIcon}
        className='w-[14px] h-[14px] flex-shrink-0'
        style={{
          transform: isArabic ? 'scaleX(1)' : 'scaleX(-1)', // flip chevron based on RTL/LTR
          opacity: 0.3,
        }}
      />
    </View>
  )
}
