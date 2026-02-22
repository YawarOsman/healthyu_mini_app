import { View, Text, Image } from '@tarojs/components'

import { SvgIcons } from '@/assets/icons'

interface DayStreak {
  progress: number // 0-100
}

interface WeeklyCalendarProps {
  /**
   * 7 entries indexed 0-6, where index 3 = today (the center slot).
   * Slots 0-2 are the 3 days before today; slots 4-6 are 3 days after.
   */
  streaks?: (DayStreak | null)[]
  dateLabel?: string
}

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] // Sun=0…Sat=6

/**
 * Build a 7-slot window centered on today.
 * Slot 0 = today - 3 days, slot 3 = today, slot 6 = today + 3 days.
 */
function buildDayWindow(): Date[] {
  const now = new Date()
  return [0, 1, 2, 3, 4, 5, 6].map(i => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (i - 3))
    return d
  })
}

// Today is always the center slot (index 3 out of 0-6)
const TODAY_SLOT = 3
// Arrow always points to the center
const ARROW_LEFT_PERCENT = ((TODAY_SLOT + 0.5) / 7) * 100

export default function WeeklyCalendar({ streaks, dateLabel }: WeeklyCalendarProps) {
  const dayWindow = buildDayWindow()

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Date header — headlineMedium w500 */}
      {dateLabel && (
        <Text
          style={{
            fontSize: '20px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-juana)',
            textAlign: 'center',
            display: 'block',
          }}
        >
          {dateLabel}
        </Text>
      )}

      {/* 120px calendar strip */}
      <View style={{ height: '120px', position: 'relative' }}>

        {/* Dotted top line */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.16) 50%, transparent 50%)',
            backgroundSize: '14px 1px',
            backgroundRepeat: 'repeat-x',
            pointerEvents: 'none',
          }}
        />

        {/* ▼ arrow — always centered (today is always slot 3 = center) */}
        <View
          style={{
            position: 'absolute',
            top: '-18px',
            left: `${ARROW_LEFT_PERCENT}%`,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <Text style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: '1' }}>▼</Text>
        </View>

        {/* Day items row — paddingVertical:16 */}
        <View
          style={{
            position: 'absolute',
            top: '20px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {dayWindow.map((date, i) => {
            const dayOfWeek = date.getDay() // 0=Sun…6=Sat
            const dayLetter = DAY_NAMES[dayOfWeek]
            const isToday = i === TODAY_SLOT
            const isPast = i < TODAY_SLOT

            const letterColor = (isPast || isToday)
              ? 'var(--text-secondary)'
              : 'var(--icon-secondary)'

            const streak = streaks?.[i] ?? null
            const fillPercent = Math.min(100, Math.max(0, streak?.progress ?? 0))
            const isDone = fillPercent >= 100

            return (
              <View
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Text style={{ fontSize: '16px', fontWeight: '500', color: letterColor }}>
                  {dayLetter}
                </Text>

                {/* CircleAvatar radius:17 → 34px diameter */}
                <View
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-inverse)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Progress fill from bottom */}
                  {fillPercent > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: `${fillPercent}%`,
                        backgroundColor: 'var(--primary)',
                        borderBottomLeftRadius: '50px',
                        borderBottomRightRadius: '50px',
                        borderTopLeftRadius: isDone ? '50px' : '0',
                        borderTopRightRadius: isDone ? '50px' : '0',
                      }}
                    />
                  )}

                  {isDone && (
                    <Image
                      src={SvgIcons.check}
                      style={{
                        position: 'relative',
                        width: '18px',
                        height: '18px',
                        zIndex: 1,
                        filter: 'brightness(0) invert(1)',
                      }}
                    />
                  )}
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}
