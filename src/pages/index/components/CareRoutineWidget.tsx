import { View } from '@tarojs/components'

import type { BoxEntity } from '@/features/order/types'

import HomeRoutineWidget from './HomeRoutineWidget'
import WeeklyCalendar from './WeeklyCalendar'

/**
 * Layout:
 *   flex-col filling the remaining screen height (between AppBar and BottomNav)
 *   ┌──────────────────────────────────────┐  ← STICKY: WeeklyCalendar (date + 120px strip)
 *   │  WeeklyCalendar                      │
 *   ├──────────────────────────────────────┤
 *   │  HomeRoutineWidget  (scrolls)        │  ← SCROLLABLE
 *   │  …                                   │
 *   └──────────────────────────────────────┘  ← STICKY: BottomNavBar (rendered by Index)
 */

interface CareRoutineWidgetProps {
  boxes: BoxEntity[]
  dateLabel?: string
  weeklyStreaks?: ({ progress: number } | null)[]
}

export default function CareRoutineWidget({ boxes, dateLabel, weeklyStreaks }: CareRoutineWidgetProps) {
  const today = new Date()
  const defaultDateLabel = today.toLocaleDateString('en-US', {
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
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '24px',
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
          paddingBottom: '120px',   // clears the BottomNavBar
        }}
      >
        <HomeRoutineWidget boxes={boxes} />
        <View style={{ height: '20px' }} />
      </View>
    </View>
  )
}
