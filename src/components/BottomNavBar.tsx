import { View, Text } from '@tarojs/components'
import { useSelector } from 'react-redux'
import careIcon from '../assets/svg/care.svg'
import boxesIcon from '../assets/svg/boxes.svg'
import answersIcon from '../assets/svg/answers.svg'
import profileIcon from '../assets/svg/profile.svg'
import { t } from '../i18n'
import { RootState } from '../reducers'

interface BottomNavBarProps {
  activeIndex?: number
  lockedTabs?: boolean // blur tabs 1-3
}

const tabs = [
  { icon: careIcon, labelKey: 'care' },
  { icon: boxesIcon, labelKey: 'products' },
  { icon: answersIcon, labelKey: 'answers' },
  { icon: profileIcon, labelKey: 'me' },
]

export default function BottomNavBar({ activeIndex = 0, lockedTabs = true }: BottomNavBarProps) {
  const themeMode = useSelector((state: RootState) => state.theme.themeMode)

  return (
    <View
      style={{
        width: '100%',
        height: '64px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'var(--scaffold-bg)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      data-theme={themeMode}
    >
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex
        const isLocked = lockedTabs && i > 0

        return (
          <View
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: '22px',
                height: '22px',
                filter: isLocked ? 'blur(3px)' : 'none',
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                  maskImage: `url(${tab.icon})`,
                  WebkitMaskImage: `url(${tab.icon})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: '11px',
                fontWeight: isActive ? '600' : '400',
                color: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-locale-body)',
                filter: isLocked ? 'blur(3px)' : 'none',
              }}
            >
              {t(tab.labelKey)}
            </Text>

            {/* Blur overlay for locked tabs */}
            {isLocked && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  zIndex: 5,
                }}
              />
            )}
          </View>
        )
      })}
    </View>
  )
}
