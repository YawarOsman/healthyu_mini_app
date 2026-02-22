import Taro from '@tarojs/taro'

// `hideHomeButton` is not implemented by some mini-program runtimes (including Alipay).
export const hideHomeButtonSafely = () => {
  const taroWithHideHomeButton = Taro as typeof Taro & {
    hideHomeButton?: () => Promise<unknown> | void
  }
  const hideHomeButton = taroWithHideHomeButton.hideHomeButton
  if (typeof hideHomeButton !== 'function') {
    return Promise.resolve()
  }

  try {
    return Promise.resolve(hideHomeButton()).catch((error) => {
      console.warn('[ui] hideHomeButton is unavailable in this runtime', error)
    })
  } catch (error) {
    console.warn('[ui] hideHomeButton is unavailable in this runtime', error)
    return Promise.resolve()
  }
}
