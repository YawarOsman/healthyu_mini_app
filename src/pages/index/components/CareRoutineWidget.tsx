import { View, ScrollView } from '@tarojs/components'

import type { RoutineEntity } from '@/features/home/types'
import { getDateLocaleCode } from '@/i18n/locale'
import { useAppSelector } from '@/store/hooks'

import HomeRoutineWidget from './HomeRoutineWidget'
import WeeklyCalendar from './WeeklyCalendar'

interface CareRoutineWidgetProps {
  routines: RoutineEntity[]
  dateLabel?: string
  weeklyStreaks?: ({ progress: number } | null)[]
}

export default function CareRoutineWidget({ routines, dateLabel, weeklyStreaks }: CareRoutineWidgetProps) {
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

        }}
      >
        <WeeklyCalendar
          streaks={weeklyStreaks}
          dateLabel={dateLabel || defaultDateLabel}
        />
      </View>

      {/* ── SCROLLABLE BODY: routine sections ── */}
      <ScrollView
        scrollY
        showScrollbar={false}
        style={{
          flex: 1,
        }}
      >
        <HomeRoutineWidget routines={routines} />
        <View style={{ height: '20px' }} />
      </ScrollView>
    </View>
  )
}
