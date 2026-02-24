import { View, Text, Image } from '@tarojs/components'

import { SvgIcons } from '@/assets/icons'
import { t } from '@/i18n'

export interface RoutineCardProps {
  type: 'overdue' | 'later' | 'completed'
  time?: string        // formatted time string e.g. "3:00 PM" or "3 min overdue"
  title: string
  description?: string
  imgSrc?: string      // product image URL
  onMarkDone?: () => void
  onTap?: () => void
}

export default function RoutineCard({ type, title, description, time, imgSrc, onMarkDone, onTap }: RoutineCardProps) {
  const isCompleted = type === 'completed'
  const isOverdue = type === 'overdue'

  // Prioritize time for overdue, description for others
  const subText = isOverdue ? time : description

  return (
    <View
      onClick={onTap}
      style={{
        paddingBottom: '8px',
        minHeight: '48px',
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
            filter: isOverdue ? 'var(--filter-error)' : isCompleted
              ? 'var(--filter-primary)'
              : 'brightness(0) invert(0.9)',
          }}
        />
      </View>

      {/* Text column: Expanded, Column(spaceAround) */}
      <View
        style={{
          flex: 1,
          minHeight: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Product name: bodyMedium w600, linethrough when completed */}
        <Text
          style={{
            fontSize: '16px',
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


        {subText && (
          <Text
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--text-secondary)',
              textDecoration: isCompleted ? 'line-through' : 'none',
              display: 'block',
            }}
          >
            {subText}
          </Text>
        )}
      </View>

      {/* Trailing element */}
      {isCompleted ? (
        // check icon: 14px, color secondaryFixed
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '20px' }}>
          <Image
            src={SvgIcons.check}
            style={{ width: '22px', height: '22px', opacity: 0.5,
            filter: 'var(--filter-secondary)',

             }}
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
            paddingInlineEnd: '6px',
            paddingInlineStart: '6px',
          }}
        >
          {t('mark_as_done')}
        </Text>
      ) : (

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '14px',
          }}
        >
         <Text
           style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              paddingInlineEnd: '6px',
              paddingInlineStart: '6px',
            }}
          >
          {time}
        </Text>
        </View>
      )}
    </View>
  )
}
