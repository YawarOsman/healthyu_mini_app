import Taro from '@tarojs/taro'

// `hideHomeButton` is not implemented by some mini-program runtimes (including Alipay).
export const hideHomeButtonSafely = () => {
  const hideHomeButton = (Taro as any).hideHomeButton
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
