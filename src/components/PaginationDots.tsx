import { View } from '@tarojs/components'

interface PaginationDotsProps {
  total: number
  current: number
  className?: string
  activeColor?: string
  inactiveColor?: string
}

export default function PaginationDots({ 
  total, 
  current, 
  className = '',
  activeColor = 'bg-primary',
  inactiveColor = 'bg-white/50'
}: PaginationDotsProps) {
  return (
    <View className={`flex gap-1 items-center justify-center ${className}`}>
      {Array.apply(null, Array(total)).map((_, idx) => (
        <View
          key={idx}
          className={`w-1 h-1 rounded-full transition-colors duration-300 ${
            idx === current ? activeColor : inactiveColor
          }`}
        />
      ))}
    </View>
  )
}
