import { View, Text } from '@tarojs/components'
import RoutineCard from './RoutineCard'
import DueRoutineCard from './DueRoutineCard'

/**
 * Mirrors Flutter's HomeRoutineWidget.
 *
 * Timeframe grouping order: overdue → due → laterToday → completed
 * Spacing: Column(spacing:14) outer, Column(spacing:10) within each group
 * Section headers: bodyMedium size (14px/500) with bodySmall color (text-secondary) + Padding(bottom:6)
 * "due" group has NO section header.
 */

interface Box {
  id: number
  nameEn: string
  headlineEn?: string
  timeLabel?: string
  isCurrent?: boolean
  isOverdue?: boolean
  isLater?: boolean
  isCompleted?: boolean
  productDisplayImage?: string
  [key: string]: any
}

interface HomeRoutineWidgetProps {
  boxes: Box[]
}

export default function HomeRoutineWidget({ boxes }: HomeRoutineWidgetProps) {
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
                Overdue
              </Text>
            </View>
            {overdueBoxes.map((box, i) => (
              <RoutineCard
                key={i}
                type="overdue"
                title={box.nameEn}
                time="3 minutes overdue"
                imgSrc={box.productDisplayImage}
              />
            ))}
          </View>
        )}

        {/* ── Due now (no header) ── */}
        {dueNowBoxes.map((box, i) => (
          <DueRoutineCard
            key={i}
            title={box.nameEn}
            description={box.headlineEn}
            imgSrc={box.productDisplayImage}
            hasDuration={true}
          />
        ))}

        {/* ── Later today ── */}
        {laterBoxes.length > 0 && (
          <View style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <View style={{ paddingBottom: '6px' }}>
              <Text style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', display: 'block' }}>
                Later today
              </Text>
            </View>
            {laterBoxes.map((box, i) => (
              <RoutineCard
                key={i}
                type="later"
                title={box.nameEn}
                time={box.timeLabel ?? ''}
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
                Completed
              </Text>
            </View>
            {completedBoxes.map((box, i) => (
              <RoutineCard
                key={i}
                type="completed"
                title={box.nameEn}
                imgSrc={box.productDisplayImage}
              />
            ))}
          </View>
        )}

      </View>
    </View>
  )
}
