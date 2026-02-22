import { View } from '@tarojs/components'

import type { BoxEntity } from '@/features/order/types'
import { getDateLocaleCode } from '@/i18n/locale'
import { useAppSelector } from '@/store/hooks'

import HomeRoutineWidget from './HomeRoutineWidget'
import WeeklyCalendar from './WeeklyCalendar'


interface CareRoutineWidgetProps {
  boxes: BoxEntity[]
  dateLabel?: string
  weeklyStreaks?: ({ progress: number } | null)[]
}

export default function CareRoutineWidget({ boxes, dateLabel, weeklyStreaks }: CareRoutineWidgetProps) {
  const locale = useAppSelector((state) => state.theme.locale)
  const localeCode = getDateLocaleCode(locale)
  const today = new Date()
  const defaultDateLabel = today.toLocaleDateString(localeCode, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',   // outer must NOT scroll
      }}
    >
      {/* ── STICKY HEADER: date label + weekly calendar strip ── */}
      <View
        style={{
          flexShrink: 0,
          paddingTop: '10px',
          paddingBottom: '0px',
          backgroundColor: 'var(--scaffold-bg)',
          zIndex: 10,
        }}
      >
        <WeeklyCalendar
          streaks={weeklyStreaks}
          dateLabel={dateLabel || defaultDateLabel}
        />
      </View>

      {/* ── SCROLLABLE BODY: routine sections ── */}
      <View
        style={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <HomeRoutineWidget boxes={boxes} />
        <View style={{ height: '20px' }} />
      </View>
    </View>
  )
}
