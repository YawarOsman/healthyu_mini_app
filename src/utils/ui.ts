import Taro from '@tarojs/taro'

// `hideHomeButton` is not implemented by some mini-program runtimes (including Alipay).
// In Alipay, the equivalent is `my.hideBackHome`.
export const hideHomeButtonSafely = () => {
  const doHide = () => {
    // 1. Try Taro's built-in API (standard across platforms)
    try {
      const taroWithHideHomeButton = Taro as any
      if (typeof taroWithHideHomeButton.hideHomeButton === 'function') {
        taroWithHideHomeButton.hideHomeButton()
      }
    } catch (error) {
      console.warn('[ui] Taro.hideHomeButton failed', error)
    }

    // 2. Try direct Alipay API (my.hideBackHome)
    try {
      const maybeMy = typeof globalThis !== 'undefined' ? (globalThis as any).my : undefined
      if (maybeMy && typeof maybeMy.hideBackHome === 'function') {
        maybeMy.hideBackHome()
      }
    } catch (error) {
      console.warn('[ui] my.hideBackHome failed', error)
    }
  }

  // Execute immediately
  doHide()

  // Execute again after a short delay because some runtimes add the button after showing the page
  setTimeout(doHide, 300)

  return Promise.resolve()
}
