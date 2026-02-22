import { View, Text } from '@tarojs/components'

import type { BoxEntity } from '@/features/order/types'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

import DueRoutineCard from './DueRoutineCard'
import RoutineCard from './RoutineCard'

/**
 * Mirrors Flutter's HomeRoutineWidget.
 *
 * Timeframe grouping order: overdue → due → laterToday → completed
 * Spacing: Column(spacing:14) outer, Column(spacing:10) within each group
 * Section headers: bodyMedium size (14px/500) with bodySmall color (text-secondary) + Padding(bottom:6)
 * "due" group has NO section header.
 */

interface HomeRoutineWidgetProps {
  boxes: BoxEntity[]
}

export default function HomeRoutineWidget({ boxes }: HomeRoutineWidgetProps) {
  const locale = useAppSelector((state) => state.theme.locale)
  const isAr = locale === 'ar'

  const getBoxName = (box: BoxEntity) => (isAr ? box.nameAr : box.nameEn)
  const getBoxHeadline = (box: BoxEntity) => (isAr ? box.headlineAr : box.headlineEn)
  const localeCode = isAr ? 'ar-IQ' : 'en-US'
  const formatOverdue = (minutes: number) => t('minutes_overdue').replace('{minutes}', String(minutes))
  const formatTimeLabel = (timeLabel?: string) => {
    if (!timeLabel) return ''
    const match = timeLabel.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i)
    if (!match) return timeLabel

    const hour12 = Number(match[1])
    const minute = Number(match[2])
    const isPm = match[3].toUpperCase() === 'PM'
    const normalizedHour = (hour12 % 12) + (isPm ? 12 : 0)
    const time = new Date()
    time.setHours(normalizedHour, minute, 0, 0)

    return time.toLocaleTimeString(localeCode, { hour: 'numeric', minute: '2-digit' })
  }

  const overdueBoxes = boxes.filter(b => b.isOverdue === true)
  const dueNowBoxes = boxes.filter(b => b.isCurrent === true && !b.isCompleted)
  const laterBoxes = boxes.filter(b => b.isLater === true)
  const completedBoxes = boxes.filter(b => b.isCompleted === true)

  const hasAny = overdueBoxes.length > 0 || dueNowBoxes.length > 0 || laterBoxes.length > 0 || completedBoxes.length > 0
  if (!hasAny) return null

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '20px', paddingRight: '20px' }}>
      <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* ── Overdue ── */}
        {overdueBoxes.length > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <View style={{ paddingBottom: '6px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', display: 'block' }}>
                {t('overdue')}
              </Text>
            </View>
            {overdueBoxes.map((box, i) => (
              <RoutineCard
                key={i}
                type='overdue'
                title={getBoxName(box)}
                time={formatOverdue(3)}
                imgSrc={box.productDisplayImage}
              />
            ))}
          </View>
        )}

        {/* ── Due now (no header) ── */}
        {dueNowBoxes.map((box, i) => (
          <DueRoutineCard
            key={i}
            title={getBoxName(box)}
            description={getBoxHeadline(box)}
            imgSrc={box.productDisplayImage}
            hasDuration
          />
        ))}

        {/* ── Later today ── */}
        {laterBoxes.length > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <View style={{ paddingBottom: '6px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', display: 'block' }}>
                {t('later_today')}
              </Text>
            </View>
            {laterBoxes.map((box, i) => (
              <RoutineCard
                key={i}
                type='later'
                title={getBoxName(box)}
                time={formatTimeLabel(box.timeLabel)}
                imgSrc={box.productDisplayImage}
              />
            ))}
          </View>
        )}

        {/* ── Completed ── */}
        {completedBoxes.length > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <View style={{ paddingBottom: '6px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', display: 'block' }}>
                {t('completed')}
              </Text>
            </View>
            {completedBoxes.map((box, i) => (
              <RoutineCard
                key={i}
                type='completed'
                title={getBoxName(box)}
                imgSrc={box.productDisplayImage}
              />
            ))}
          </View>
        )}

      </View>
    </View>
  )
}
