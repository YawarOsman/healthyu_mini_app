import Taro from '@tarojs/taro'

type NavMethod = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'
type NavOption = {
  url: string
  success: (res: unknown) => void
  fail: (error: unknown) => void
}

const isInternalPagePath = (url: string) =>
  url.startsWith('/pages/') || url.startsWith('pages/')

const buildAlternatePagePath = (url: string) => {
  if (!isInternalPagePath(url)) {
    return ''
  }
  return url.startsWith('/') ? url.slice(1) : `/${url}`
}

const invokeNav = (method: NavMethod, url: string) => {
  return new Promise((resolve, reject) => {
    const options: NavOption = {
      url,
      success: (res) => resolve(res),
      fail: (error) => reject(error),
    }

    try {
      switch (method) {
        case 'navigateTo':
          Taro.navigateTo(options)
          break
        case 'redirectTo':
          Taro.redirectTo(options)
          break
        case 'reLaunch':
          Taro.reLaunch(options)
          break
        case 'switchTab':
          Taro.switchTab(options)
          break
        default:
          reject(new Error(`[navigation:${method}] API is unavailable`))
      }
    } catch (error) {
      reject(error)
    }
  })
}

const callNav = (method: NavMethod, url: string) => {
  return invokeNav(method, url).catch((firstError) => {
    const alternateUrl = buildAlternatePagePath(url)
    if (!alternateUrl || alternateUrl === url) {
      console.error(`[navigation:${method}] failed`, { url, error: firstError })
      throw firstError
    }
    return invokeNav(method, alternateUrl).catch((secondError) => {
      console.error(`[navigation:${method}] failed after retry`, {
        originalUrl: url,
        retryUrl: alternateUrl,
        firstError,
        secondError,
      })
      throw secondError
    })
  })
}

export const navigateTo = (url: string) => callNav('navigateTo', url)
export const redirectTo = (url: string) => callNav('redirectTo', url)
export const reLaunch = (url: string) => callNav('reLaunch', url)
export const switchTab = (url: string) => callNav('switchTab', url)
