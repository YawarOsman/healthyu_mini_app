import { View, Text, Image } from '@tarojs/components'

import { SvgIcons } from '@/assets/icons'
import { t } from '@/i18n'

export interface RoutineCardProps {
  type: 'overdue' | 'later' | 'completed'
  time?: string        // formatted time string e.g. "3:00 PM" or "3 min overdue"
  title: string
  imgSrc?: string      // product image URL
  onMarkDone?: () => void
  onTap?: () => void
}

export default function RoutineCard({ type, time, title, imgSrc, onMarkDone, onTap }: RoutineCardProps) {
  const isCompleted = type === 'completed'
  const isOverdue = type === 'overdue'

  return (
    <View
      onClick={onTap}
      style={{
        paddingBottom: '8px',
        height: '48px',
        boxSizing: 'content-box',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {/* Product image container: 48x48, padding 14px, color surfaceContainer */}
      <View
        style={{
          width: '48px',
          height: '48px',
          minWidth: '48px',
          backgroundColor: 'var(--surface-container, var(--surface-inverse))',
          padding: '14px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={imgSrc || SvgIcons.box}
          style={{
            width: '100%',
            height: '100%',
            // colorFilter: completed → primary, else → onSurface
            filter: isCompleted
              ? 'brightness(0) saturate(100%) invert(72%) sepia(30%) saturate(600%) hue-rotate(350deg) brightness(95%) contrast(85%)'
              : 'brightness(0) invert(0.9)',
          }}
        />
      </View>

      {/* Text column: Expanded, Column(spaceAround) */}
      <View
        style={{
          flex: 1,
          height: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          overflow: 'hidden',
        }}
      >
        {/* Product name: bodyMedium w600, linethrough when completed */}
        <Text
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            textDecoration: isCompleted ? 'line-through' : 'none',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Text>

        {/* Time / overdue text: bodyMedium w600, color secondaryFixed, linethrough when completed */}
        {time && (
          <Text
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: isOverdue ? 'var(--error)' : 'var(--text-secondary)',
              textDecoration: isCompleted ? 'line-through' : 'none',
              display: 'block',
            }}
          >
            {time}
          </Text>
        )}
      </View>

      {/* Trailing element */}
      {isCompleted ? (
        // check icon: 14px, color secondaryFixed
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '20px' }}>
          <Image
            src={SvgIcons.check}
            style={{ width: '14px', height: '14px', opacity: 0.5 }}
          />
        </View>
      ) : isOverdue ? (
        // TextButton "Mark as Done": bodyMedium w700, color error
        <Text
          onClick={(e) => { e.stopPropagation?.(); onMarkDone?.() }}
          style={{
            fontSize: '14px',
            fontWeight: '700',
            color: 'var(--error)',
            whiteSpace: 'nowrap',
            paddingLeft: '8px',
            paddingRight: '8px',
          }}
        >
          {t('mark_as_done')}
        </Text>
      ) : (
        // ChevronRight / ArrowLeftIcon(flip:true): 14px, color outline
        <View
          style={{
            width: '14px',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '14px',
          }}
        >
          <View
            style={{
              width: '6px',
              height: '6px',
              borderRight: '1.5px solid var(--text-secondary)',
              borderTop: '1.5px solid var(--text-secondary)',
              transform: 'rotate(45deg)',
            }}
          />
        </View>
      )}
    </View>
  )
}
