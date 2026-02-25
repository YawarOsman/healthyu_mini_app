import { Image, ScrollView, Text, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';



import addressIcon from '@/assets/svg/address_icon.svg'
import arrowLeftIcon from '@/assets/svg/arrow_left.svg'
import creditCardIcon from '@/assets/svg/credit_card_icon.svg'
import fingerprintIcon from '@/assets/svg/fingerprint_icon.svg'
import logoutIcon from '@/assets/svg/logout_icon.svg'
import notificationsIcon from '@/assets/svg/notifications_icon.svg'
import profileIcon from '@/assets/svg/profile_icon.svg'
import BottomNavBar from '@/components/BottomNavBar'
import DownloadOverlay from '@/components/DownloadOverlay'
import { ROUTES } from '@/constants/routes'
import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'
import { switchTab } from '@/utils/navigation'
import { hideHomeButtonSafely } from '@/utils/ui'

// ─── Types ───

interface MenuItem {
  icon: string
  label: string
  onTap: () => void
  isDestructive?: boolean
}

interface SectionProps {
  title: string
  items: MenuItem[]
}

// ─── Sub-components ───

function ProfileAvatar({ selfiePath, name }: { selfiePath: string | null; name: string }) {
  return (
    <View className='flex flex-col items-center gap-4 mt-4 mb-6'>
      {/* Octagon-clipped avatar */}
      <View
        style={{
          width: '96px',
          height: '96px',
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      >
        {selfiePath ? (
          <Image
            src={selfiePath}
            style={{ width: '96px', height: '96px', objectFit: 'cover' }}
          />
        ) : (
          <Image
            src={profileIcon}
            style={{
              width: '48px',
              height: '48px',
              opacity: 0.4,
            }}
          />
        )}
      </View>

      {/* Name */}
      {name ? (
        <Text
          style={{
            fontFamily: 'var(--font-locale-heading)',
            fontSize: '22px',
            fontWeight: '500',
            color: 'var(--text-primary)',
          }}
        >
          {name}
        </Text>
      ) : null}
    </View>
  )
}

function ProfileMenuItem({ item }: { item: MenuItem }) {
  const iconTint = item.isDestructive ? 'var(--error)' : 'rgba(255,255,255,0.85)'

  return (
    <View
      className='flex flex-row items-center gap-4'
      onClick={item.onTap}
      style={{ cursor: 'pointer', paddingTop: '2px', paddingBottom: '2px' }}
    >
      {/* Icon container */}
      <View
        style={{
          width: '44px',
          height: '44px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <View
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: iconTint,
            maskImage: `url(${item.icon})`,
            WebkitMaskImage: `url(${item.icon})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
          }}
        />
      </View>

      {/* Label */}
      <Text
        className='flex-1'
        style={{
          fontFamily: 'var(--font-locale-body)',
          fontSize: '16px',
          fontWeight: '600',
          color: item.isDestructive ? 'var(--error)' : 'var(--text-primary)',
        }}
      >
        {item.label}
      </Text>

      {/* Chevron */}
      <View
        className='scale-x-[-1]'
        style={{
          width: '24px',
          height: '24px',
          flexShrink: 0,
          backgroundColor: 'var(--text-accent)',
          maskImage: `url(${arrowLeftIcon})`,
          WebkitMaskImage: `url(${arrowLeftIcon})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />
    </View>
  )
}

function ProfileSection({ title, items }: SectionProps) {
  return (
    <View className='flex flex-col gap-3 mb-6  px-6'>
      <Text
        style={{
            fontFamily: 'var(--font-juana)',
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
        }}
      >
        {title}
      </Text>
      <View className='flex flex-col gap-1'>
        {items.map((item) => (
          <ProfileMenuItem key={item.label} item={item} />
        ))}
      </View>
    </View>
  )
}

// ─── Main Page ───

export default function MePage() {
  useDidShow(() => {
    void hideHomeButtonSafely();
  });

  const themeMode = useAppSelector((state) => state.theme.themeMode);
  const { name, selfiePath } = useAppSelector((state) => state.auth)

  const handleTabPress = (index: number) => {
    const tabRouteMap = [ROUTES.HOME, ROUTES.BOXES, ROUTES.DISCOVER, ROUTES.ME] as const
    const targetRoute = tabRouteMap[index]
    if (!targetRoute || targetRoute === ROUTES.ME) {
      return
    }
 
    switchTab(targetRoute).catch((error) => {
      console.error('Failed to switch bottom section', { index, targetRoute, error })
    })
  }

  const handleSignOut = () => {
    console.log('Sign out requested')
  }

  const aboutItems: MenuItem[] = [
    {
      icon: profileIcon,
      label: t('account_information'),
      onTap: () => console.log('Account Information tapped'),
    },
    {
      icon: fingerprintIcon,
      label: t('password'),
      onTap: () => console.log('Password tapped'),
    },
  ]

  const deliveryItems: MenuItem[] = [
    {
      icon: addressIcon,
      label: t('address'),
      onTap: () => console.log('Address tapped'),
    },
    {
      icon: creditCardIcon,
      label: t('payment'),
      onTap: () => console.log('Payment tapped'),
    },
  ]

  const applicationItems: MenuItem[] = [
    {
      icon: notificationsIcon,
      label: t('notifications'),
      onTap: () => console.log('Notifications tapped'),
    },
    {
      icon: logoutIcon,
      label: t('sign_out'),
      onTap: handleSignOut,
      isDestructive: true,
    },
  ]

  return (
    <View
      className={`h-screen bg-scaffold flex flex-col overflow-hidden ${themeMode}`}
      data-theme={themeMode}
    >
      <ScrollView scrollY className='flex-1 overflow-y-auto'>
        <View style={{ height: `${(Taro.getSystemInfoSync().statusBarHeight || 0) + 12}px` }} />
        <ProfileAvatar selfiePath={selfiePath} name={name || ''} />

        <ProfileSection title={t('about')} items={aboutItems} />
        <ProfileSection title={t('delivery')} items={deliveryItems} />
        <ProfileSection title={t('application')} items={applicationItems} />

        <View style={{ height: '32px' }} />
      </ScrollView>

      <DownloadOverlay downloadText={t('download_to_me')} topOffset={150} />

      <BottomNavBar activeIndex={3} lockedTabs={false} onTabPress={handleTabPress} />
    </View>
  )
}
