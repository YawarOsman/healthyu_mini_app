import { View, Text, Image } from '@tarojs/components'

import { SvgIcons } from '@/assets/icons';
import {
  type RoutineEntity,
  getLocalizedProductName,
  getLocalizedDescription,
  getRoutineTimeframe
} from '@/features/home/types'
import { t } from '@/i18n'
import { getDateLocaleCode } from '@/i18n/locale'
import { useAppSelector } from '@/store/hooks'

import DueRoutineCard from './DueRoutineCard'
import RoutineCard from './RoutineCard'

interface HomeRoutineWidgetProps {
  routines: RoutineEntity[]
}

export default function HomeRoutineWidget({ routines }: HomeRoutineWidgetProps) {
  const locale = useAppSelector((state) => state.theme.locale)
  const localeCode = getDateLocaleCode(locale)
  
  const formatOverdue = (minutes: number) => 
    t('minutes_overdue').replace('{minutes}', String(minutes))

  const formatTimeLabel = (timeStr: string) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':').map(Number)
    const time = new Date()
    time.setHours(hours, minutes, 0, 0)
    return time.toLocaleTimeString(localeCode, { hour: 'numeric', minute: '2-digit' })
  }

  const now = new Date()
  
  const overdueItems: RoutineEntity[] = []
  const dueNowItems: RoutineEntity[] = []
  const laterItems: RoutineEntity[] = []
  const completedItems: RoutineEntity[] = []

  routines.forEach((routine) => {
    const timeframe = getRoutineTimeframe(routine.timeToRemind, now)
    switch (timeframe) {
      case 'overdue':
        overdueItems.push(routine)
        break
      case 'due':
        dueNowItems.push(routine)
        break
      case 'laterToday':
        laterItems.push(routine)
        break
      case 'completed':
        completedItems.push(routine)
        break
    }
  })

  // We order them strictly: Overdue, Due now, Later today, Completed.
  // The UI is the same grouping as before.

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
            {overdueItems.map((item, i) => {
              // Calculate minutes overdue
              const [hours, minutes] = item.timeToRemind.time.split(':').map(Number)
              const routineTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
              const minsOverdue = Math.floor((now.getTime() - routineTime.getTime()) / 60000)
              
              return (
                <RoutineCard
                  key={i}
                  type='overdue'
                  title={getLocalizedProductName(item, locale)}
                  description={getLocalizedDescription(item, locale)}
                  time={formatOverdue(minsOverdue > 0 ? minsOverdue : 1)}
                  imgSrc={item.productDisplayImage}
                />
              )
            })}
          </View>
        )}

        {/* ── Due now (Carousel) ── */}
        {dueNowItems.length > 0 && (
          <DueRoutineCard routines={dueNowItems} />
        )}

        {/* ── Later today ── */}
        {laterItems.length > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <View style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: '8px',
              paddingLeft: '12px',
              borderLeft: '2px solid var(--primary)',
              marginBottom: '6px',
              background: 'linear-gradient(to right, rgba(var(--primary-rgb), 0.15) 0%, transparent 100%)',
              paddingTop: '8px',
              paddingBottom: '8px'
            }}
            >
              <Image src={SvgIcons.morning} style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} />
              <Text style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', display: 'block' }}>
                {t('later_this_morning')}
              </Text>
            </View>
            {laterItems.map((item, i) => (
              <RoutineCard
                key={i}
                type='later'
                title={getLocalizedProductName(item, locale)}
                description={getLocalizedDescription(item, locale)}
                time={formatTimeLabel(item.timeToRemind.time)}
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
                title={getLocalizedProductName(item, locale)}
                description={getLocalizedDescription(item, locale)}
                imgSrc={item.productDisplayImage}
              />
            ))}
          </View>
        )}

      </View>
    </View>
  )
}
