import { useRef, useState } from 'react'
import { Camera, Image, Text, View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { SvgIcons } from '../../assets/icons'
import { ROUTES } from '../../constants/routes'
import { t } from '../../i18n'
import { RootState } from '../../reducers'
import { reLaunch } from '../../utils/navigation'
import { hideHomeButtonSafely } from '../../utils/ui'
import './index.scss'

const CAMERA_ID = 'scan-box-camera'
const SCAN_SUCCESS_COOLDOWN_MS = 1500

export default function ScanBox() {
  const { themeMode } = useSelector((state: RootState) => state.theme)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const cameraContextRef = useRef<Taro.CameraContext | null>(null)
  const lastScanTimestampRef = useRef(0)

  const systemInfo = Taro.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 0
  const safeAreaBottom = systemInfo.safeArea
    ? Math.max(0, systemInfo.screenHeight - systemInfo.safeArea.bottom)
    : 0

  const syncCameraPermissionState = () => {
    return Taro.getSetting()
      .then((settingRes) => {
        const authSetting = settingRes && settingRes.authSetting ? settingRes.authSetting : {}
        const cameraGranted = authSetting['scope.camera']
        if (cameraGranted === false) {
          setCameraError(t('please_grant_camera_permission_for_scan'))
          setCameraReady(false)
          return
        }
        setCameraError('')
      })
      .catch(() => {
        // Some environments can fail silently for getSetting before first permission request.
        setCameraError('')
      })
  }

  useDidShow(() => {
    void syncCameraPermissionState()
    Taro.setNavigationBarTitle({
      title: t('qr_scan'),
    })
    void hideHomeButtonSafely()
  })

  const handleBack = () => {
    if (Taro.getCurrentPages().length > 1) {
      Taro.navigateBack()
      return
    }
    reLaunch(ROUTES.HOME)
  }

  const handleCameraReady = () => {
    setCameraReady(true)
    setCameraError('')
    cameraContextRef.current = Taro.createCameraContext(CAMERA_ID)
  }

  const handleCameraError = (event: any) => {
    const detail = event && event.detail ? event.detail : {}
    const errMsg = detail.errMsg || t('please_grant_camera_permission_for_scan')
    setCameraError(errMsg)
    setCameraReady(false)
  }

  const handleScanCode = (event: any) => {
    const detail = event && event.detail ? event.detail : {}
    const result = detail.result || detail.fullResult
    if (!result) {
      return
    }

    const now = Date.now()
    if (now - lastScanTimestampRef.current < SCAN_SUCCESS_COOLDOWN_MS) {
      return
    }

    lastScanTimestampRef.current = now
    Taro.showToast({
      title: t('qr_detected'),
      icon: 'none',
      duration: 1200,
    })
    console.log('ScanBoxPage: QR scan result =>', result)
  }

  const handleOpenSettings = () => {
    Taro.openSetting()
      .then(() => {
        setCameraError('')
        return syncCameraPermissionState()
      })
      .catch(() => {
        Taro.showToast({
          title: t('please_grant_camera_permission_for_scan'),
          icon: 'none',
        })
      })
  }

  const showCameraOverlay = !cameraReady && !cameraError

  return (
    <View
      className={`scan-box-page ${themeMode}`}
      data-theme={themeMode}
      style={{
        paddingTop: `${statusBarHeight + 8}px`,
        paddingBottom: `${Math.max(safeAreaBottom, 12)}px`,
      }}
    >
      <Text className='scan-box-page__title'>{t('qr_scan')}</Text>

      <View className='scan-box-page__panel'>
        {!cameraError && (
          <Camera
            id={CAMERA_ID}
            className='scan-box-camera'
            mode='scanCode'
            devicePosition='back'
            flash='off'
            frameSize='large'
            onReady={handleCameraReady}
            onError={handleCameraError}
            onScanCode={handleScanCode}
          />
        )}

        <View className='scan-box-panel__overlay' />
        <View className='scan-box-panel__vignette' />

        <View className='scan-box-panel__content'>
          <View className='scan-box-panel__top-row'>
            <View className='scan-box-panel__back' onClick={handleBack}>
              <Image
                className='scan-box-panel__back-icon'
                src={SvgIcons.arrowLeft}
                mode='aspectFit'
              />
            </View>

            <View className='scan-box-panel__dots'>
              <View className='scan-box-panel__dot scan-box-panel__dot--active' />
              <View className='scan-box-panel__dot' />
            </View>
          </View>

          <View className='scan-box-panel__copy'>
            <Text className='scan-box-panel__kicker'>{t('box_registration')}</Text>
            <Text className='scan-box-panel__heading'>{t('fit_qr_code_within_box')}</Text>
          </View>

          <View className='scan-box-panel__target' />

          <Text
            className='scan-box-panel__hint'
            style={{ bottom: `${Math.max(24, safeAreaBottom + 10)}px` }}
          >
            {t('scan_the_qr_on_the_box')}
          </Text>
        </View>

        {showCameraOverlay && (
          <View className='scan-box-panel__state scan-box-panel__state--loading'>
            <Text className='scan-box-panel__state-title'>{t('opening_camera')}</Text>
            <Text className='scan-box-panel__state-subtitle'>{t('align_qr_with_frame')}</Text>
          </View>
        )}

        {!!cameraError && (
          <View className='scan-box-panel__state scan-box-panel__state--error'>
            <Text className='scan-box-panel__state-title'>{t('camera_permission_required')}</Text>
            <Text className='scan-box-panel__state-subtitle'>{cameraError}</Text>
            <View className='scan-box-panel__settings-btn' onClick={handleOpenSettings}>
              <Text className='scan-box-panel__settings-text'>{t('settings')}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
