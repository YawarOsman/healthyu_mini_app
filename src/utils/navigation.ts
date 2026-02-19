import Taro from '@tarojs/taro'

type NavMethod = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'

const isInternalPagePath = (url: string) =>
  url.startsWith('/pages/') || url.startsWith('pages/')

const buildAlternatePagePath = (url: string) => {
  if (!isInternalPagePath(url)) {
    return ''
  }
  return url.startsWith('/') ? url.slice(1) : `/${url}`
}

const invokeNav = (method: NavMethod, url: string) => {
  const api = (Taro as any)[method]
  if (typeof api !== 'function') {
    return Promise.reject(new Error(`[navigation:${method}] API is unavailable`))
  }

  return new Promise((resolve, reject) => {
    try {
      api({
        url,
        success: (res: unknown) => resolve(res),
        fail: (error: unknown) => reject(error),
      })
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
