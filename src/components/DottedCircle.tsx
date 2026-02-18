import { View } from '@tarojs/components'
import React from 'react'

interface DottedCircleProps {
  size: number
  color?: string
  strokeWidth?: number
  dotSize?: number
  gap?: number
  children?: React.ReactNode
  style?: React.CSSProperties
}

const DottedCircle: React.FC<DottedCircleProps> = ({
  size,
  color = 'var(--primary)',
  strokeWidth = 2,
  dotSize = 2,
  gap = 6,
  children,
  style,
}) => {
  // SVG Mask Generation
  // We use a mask to allow CSS variables (like var(--primary)) to control the color
  // The mask must be opaque where we want the color to show.
  
  const radius = (size - strokeWidth) / 2
  const dashArray = `${dotSize} ${gap}`

  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
    <circle cx='${size / 2}' cy='${size / 2}' r='${radius}' fill='none' stroke='black' stroke-width='${strokeWidth}' stroke-dasharray='${dashArray}' stroke-linecap='round'/>
  </svg>
  `.replace(/\n/g, '').replace(/\s+/g, ' ')

  const encodedSvg = encodeURIComponent(svg)
  const maskImage = `url("data:image/svg+xml,${encodedSvg}")`

  return (
    <View
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* The Border Layer */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: color,
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          pointerEvents: 'none',
        }}
      />
      {children}
    </View>
  )
}

export default DottedCircle
