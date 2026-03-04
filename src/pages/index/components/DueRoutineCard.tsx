import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import { useState } from 'react'



import { SvgIcons } from '@/assets/icons'
import DashedBox from '@/components/DashedBox'
import {
  type RoutineEntity,
  getLocalizedProductName,
  getLocalizedDescription
} from '@/features/home/types'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'



export default function DueRoutineCard({ routines }: {routines: RoutineEntity[]}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const locale = useAppSelector((state) => state.theme.locale)
  
  if (!routines || routines.length === 0) return null

  const isCarousel = routines.length > 1
  const showLeftArrow = isCarousel && currentIndex > 0
  const showRightArrow = isCarousel && currentIndex < routines.length - 1

  const handleNext = () => {
    if (currentIndex < routines.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <View
      style={{
        height: '260px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      {/* Blurred circular glow */}
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

      {/* Swiper / Carousel */}
      <Swiper
        current={currentIndex}
        onChange={(e) => setCurrentIndex(e.detail.current)}
        circular={false}
        indicatorDots={false}
        autoplay={false}
        style={{ width: '100%', height: '100%' }}
      >
        {routines.map((routine, idx) => {
          const title = getLocalizedProductName(routine, locale)
          const description = getLocalizedDescription(routine, locale)
          
          return (
            <SwiperItem key={routine.id || idx}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '24px',
                }}
              >
                {/* Top section */}
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                  {/* "Due now" label */}
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

                  {/* DottedBorder */}
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
                        padding: '14px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--background-color)'
                      }}
                    >
                      <Image
                        src={routine.productDisplayImage || SvgIcons.box}
                        style={{
                          width: '100%',
                          height: '100%',
                          filter: 'brightness(0) invert(0.9)'
                        }}
                      />
                    </View>
                  </DashedBox>

                  {/* Product name + description */}
                  <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
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
              
              </View>
            </SwiperItem>
          )
        })}
      </Swiper>

      {/* Navigation Arrows */}
      {showLeftArrow && (
        <View
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <View
            style={{
              width: '10px',
              height: '10px',
              borderLeft: '2px solid var(--text-secondary)',
              borderBottom: '2px solid var(--text-secondary)',
              transform: 'rotate(45deg)',
            }}
          />
        </View>
      )}

      {showRightArrow && (
        <View
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <View
            style={{
              width: '10px',
              height: '10px',
              borderRight: '2px solid var(--text-secondary)',
              borderTop: '2px solid var(--text-secondary)',
              transform: 'rotate(45deg)',
            }}
          />
        </View>
      )}

    </View>
  )
}
