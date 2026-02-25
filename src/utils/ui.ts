import Taro from '@tarojs/taro'

const HOME_BUTTON_REPEAT_DELAY_MS = 300
const TAB_BAR_HIDE_THROTTLE_MS = 280
let lastHideTabBarAt = 0

// `hideHomeButton` is not implemented by some mini-program runtimes (including Alipay).
// In Alipay, the equivalent is `my.hideBackHome`.
export const hideHomeButtonSafely = () => {
  const doHide = () => {
    // Prefer Taro API. Fall back to Alipay API only when unavailable.
    try {
      const taroWithHideHomeButton = Taro as any
      if (typeof taroWithHideHomeButton.hideHomeButton === 'function') {
        taroWithHideHomeButton.hideHomeButton()
        return
      }
      const maybeMy = typeof globalThis !== 'undefined' ? (globalThis as any).my : undefined
      if (maybeMy && typeof maybeMy.hideBackHome === 'function') maybeMy.hideBackHome()
    } catch (error) {
      console.warn('[ui] hide home button failed', error)
    }
  }

  // Execute immediately
  doHide()

  // Execute again after a short delay because some runtimes add the button after showing the page
  setTimeout(doHide, HOME_BUTTON_REPEAT_DELAY_MS)

  return Promise.resolve()
}

// Keep tabBar config for switchTab registration, but hide the native
// bar so only the custom React bottom bar is visible.
export const hideNativeTabBarSafely = () => {
  const now = Date.now()
  if (now - lastHideTabBarAt < TAB_BAR_HIDE_THROTTLE_MS) {
    return Promise.resolve()
  }
  lastHideTabBarAt = now

  const doHide = () => {
    try {
      const taroWithHideTabBar = Taro as any
      if (typeof taroWithHideTabBar.hideTabBar === 'function') {
        taroWithHideTabBar.hideTabBar({ animation: false })
        return
      }
      const maybeMy = typeof globalThis !== 'undefined' ? (globalThis as any).my : undefined
      if (maybeMy && typeof maybeMy.hideTabBar === 'function') maybeMy.hideTabBar()
    } catch (error) {
      console.warn('[ui] hide tab bar failed', error)
    }
  }

  doHide()
  setTimeout(doHide, 120)

  return Promise.resolve()
}
