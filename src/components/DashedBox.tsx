import { View } from '@tarojs/components'
import { CSSProperties, ReactNode } from 'react'

type BorderPosition = 'inside' | 'outside' | 'center'

type DashedBoxProps = {
  width?: number | string
  height?: number | string
  dash?: number
  gap?: number
  stroke?: number
  color?: string
  borderPosition?: BorderPosition
  style?: CSSProperties
  children?: ReactNode
}

function DashedBox({
  width = '100%',
  height = 'auto',
  dash = 5.7,
  gap = 5,
  stroke = 1,
  color = 'var(--primary)',
  borderPosition = 'inside',
  style = {},
  children,
}: DashedBoxProps) {
  // Mini-program runtimes do not expose DOM/ResizeObserver.
  // Keep a cross-platform dashed frame using native border styles.
  const borderStyles: CSSProperties = {
    borderStyle: 'dashed',
    borderColor: color,
    borderWidth: `${stroke}px`,
    borderRadius: '0px',
    boxSizing: 'border-box',
  }

  if (borderPosition === 'outside') {
    borderStyles.outline = `${stroke}px dashed ${color}`
    borderStyles.borderWidth = '0'
  }

  // Keep API compatibility for callers that still pass dash/gap.
  void dash
  void gap

  return (
    <View
      style={{
        position: 'relative',
        width,
        height,
        ...borderStyles,
        ...style,
      }}
    >
      {children}
    </View>
  )
}

export default DashedBox
