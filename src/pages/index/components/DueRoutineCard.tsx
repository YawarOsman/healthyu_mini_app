import { View, Text, Image } from '@tarojs/components'

import { SvgIcons } from '@/assets/icons'
import DashedBox from '@/components/DashedBox'
import { t } from '@/i18n'


interface DueRoutineCardProps {
  title: string
  description?: string
  imgSrc?: string
  /** Whether the product has a timed usage (shows Start button if true) */
  hasDuration?: boolean
  onStart?: () => void
  onMarkDone?: () => void
  onTap?: () => void
}

export default function DueRoutineCard({
  title,
  description,
  imgSrc,
  hasDuration = true,
  onStart,
  onMarkDone,
  onTap,
}: DueRoutineCardProps) {
  return (
    <View
      onClick={onTap}
      style={{
        height: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '24px',
        paddingBottom: '24px',
        paddingLeft: '10px',
        paddingRight: '10px',
        position: 'relative',
      }}
    >
      {/* Blurred circular glow — mirrors: Positioned.fill Center Container(200x200 circle, boxShadow) */}
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top section */}
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

        {/* "Due now" label — labelMedium: fontSize:14, w500, color: textSecondary */}
        <Text
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            display: 'block',
          }}
        >
          {t('due_now')}
        </Text>

        {/* DottedBorder 48x48, dashPattern [6,6], color: accent (primary) */}
        <DashedBox
          width={48}
          height={48}
          dash={6}
          gap={6}
          color='var(--primary)'
          borderPosition='inside'
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            marginBottom: '16px',
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              padding: '12px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--background-color)'
            }}
          >
            <Image
              src={imgSrc || SvgIcons.box}
              style={{
                width: '100%',
                height: '100%',
                color: 'var(--primary)',
              }}
            />
          </View>
        </DashedBox>

        {/* Product name + description */}
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          {/* headlineMedium w500: fontSize:20, juana font */}
          <Text
            style={{
              fontSize: '20px',
              fontWeight: '500',
              fontFamily: 'var(--font-juana)',
              color: 'var(--text-primary)',
              textAlign: 'center',
              display: 'block',
            }}
          >
            {title}
          </Text>

          {/* description: labelMedium, color: secondaryFixed (text-secondary) */}
          {description && (
            <Text
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                display: 'block',
              }}
            >
              {description}
            </Text>
          )}
        </View>
      </View>

      {/* Bottom buttons row: Row(center, spacing:12) */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Start button — only if hasDuration: FilledButton height:46, padding:h16, accent bg, fontSize:16 */}
        {hasDuration && (
          <View
            onClick={(e) => { e.stopPropagation?.(); onStart?.() }}
            className='btn-filled active:opacity-85'
            style={{
              height: '46px',
              paddingLeft: '16px',
              paddingRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'auto',
            }}
          >
            <Text style={{ fontSize: '16px', fontWeight: '600', color: 'var(--scaffold-bg)', fontFamily: 'var(--font-juana)' }}>
              {t('start')}
            </Text>
          </View>
        )}

        {/* Mark as Done button — FilledButton height:46, padding:h12, transparent bg, color: secondaryFixed */}
        <View
          onClick={(e) => { e.stopPropagation?.(); onMarkDone?.() }}
          style={{
            height: '46px',
            paddingLeft: '12px',
            paddingRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            {t('mark_as_done')}
          </Text>
        </View>
      </View>
    </View>
  )
}
