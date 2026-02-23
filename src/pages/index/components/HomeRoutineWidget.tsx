import { View, Text } from '@tarojs/components'

import { getLocalizedName, getItemsFromBoxes, type BoxEntity } from '@/features/order/types'
import { t } from '@/i18n'
import { getDateLocaleCode } from '@/i18n/locale'
import { useAppSelector } from '@/store/hooks'

import DueRoutineCard from './DueRoutineCard'
import RoutineCard from './RoutineCard'


interface HomeRoutineWidgetProps {
  boxes: BoxEntity[]
}

export default function HomeRoutineWidget({ boxes }: HomeRoutineWidgetProps) {
  const locale = useAppSelector((state) => state.theme.locale)
  const localeCode = getDateLocaleCode(locale)
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

  // Derive items from all boxes, carrying each box's scheduling flags
  const allItems = getItemsFromBoxes(boxes)

  const overdueItems   = allItems.filter(item => item.isOverdue === true)
  const dueNowItems    = allItems.filter(item => item.isCurrent === true && !item.isCompleted)
  const laterItems     = allItems.filter(item => item.isLater === true)
  const completedItems = allItems.filter(item => item.isCompleted === true)

  const hasAny = overdueItems.length > 0 || dueNowItems.length > 0 || laterItems.length > 0 || completedItems.length > 0
  if (!hasAny) return null

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '20px', paddingRight: '20px' }}>
      <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* ── Overdue ── */}
        {overdueItems.length > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <View style={{ paddingBottom: '6px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', display: 'block' }}>
                {t('overdue')}
              </Text>
            </View>
            {overdueItems.map((item, i) => (
              <RoutineCard
                key={i}
                type='overdue'
                title={getLocalizedName(item, locale)}
                time={formatOverdue(3)}
                imgSrc={item.productDisplayImage}
              />
            ))}
          </View>
        )}

        {/* ── Due now (no header) ── */}
        {dueNowItems.map((item, i) => (
          <DueRoutineCard
            key={i}
            title={getLocalizedName(item, locale)}
            imgSrc={item.productDisplayImage}
            hasDuration
          />
        ))}

        {/* ── Later today ── */}
        {laterItems.length > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <View style={{ paddingBottom: '6px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', display: 'block' }}>
                {t('later_today')}
              </Text>
            </View>
            {laterItems.map((item, i) => (
              <RoutineCard
                key={i}
                type='later'
                title={getLocalizedName(item, locale)}
                time={formatTimeLabel(item.timeLabel)}
                imgSrc={item.productDisplayImage}
              />
            ))}
          </View>
        )}

        {/* ── Completed ── */}
        {completedItems.length > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <View style={{ paddingBottom: '6px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', display: 'block' }}>
                {t('completed')}
              </Text>
            </View>
            {completedItems.map((item, i) => (
              <RoutineCard
                key={i}
                type='completed'
                title={getLocalizedName(item, locale)}
                imgSrc={item.productDisplayImage}
              />
            ))}
          </View>
        )}

      </View>
    </View>
  )
}
