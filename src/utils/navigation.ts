import Taro from '@tarojs/taro'

type NavMethod = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'
type NavOption = {
  url: string
  success: (res: unknown) => void
  fail: (error: unknown) => void
}

/**
 * Alipay resolves urls without a leading slash as relative paths
 * (e.g. `pages/boxes/index` from `pages/index/index` becomes
 * `pages/index/pages/boxes/index`).
 *
 * Normalise page urls to absolute app-root paths to prevent that class
 * of navigation errors.
 */
const normalizeMiniUrl = (url: string) => {
  const trimmed = url.trim()
  if (!trimmed) {
    return trimmed
  }
  if (trimmed.startsWith('/')) {
    return trimmed
  }
  if (trimmed.startsWith('pages/')) {
    return `/${trimmed}`
  }
  return trimmed
}

const getTopRoutePath = () => {
  try {
    const pages = Taro.getCurrentPages()
    const top = pages[pages.length - 1]
    const route = top?.route
    if (typeof route === 'string' && route.length > 0) {
      return `/${route.replace(/^\//, '')}`
    }
  } catch (_error) {
    // Ignore route introspection failures in non-mini runtimes.
  }
  return ''
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
  const normalizedUrl = normalizeMiniUrl(url)
  return invokeNav(method, normalizedUrl).catch((error) => {
    console.error(`[navigation:${method}] failed`, { url: normalizedUrl, error })
    throw error
  })
}

export const navigateTo = (url: string) => callNav('navigateTo', url)
export const redirectTo = (url: string) => callNav('redirectTo', url)
export const reLaunch = (url: string) => callNav('reLaunch', url)
export const switchTab = (url: string) => {
  const normalizedUrl = normalizeMiniUrl(url)
  const targetPath = normalizedUrl.split('?')[0]
  const beforePath = getTopRoutePath()
  return callNav('switchTab', normalizedUrl).then((res) => {
    const immediatePath = getTopRoutePath()
    console.log('[navigation:switchTab] success', {
      url: normalizedUrl,
      beforePath,
      immediatePath,
    })

    // Some Alipay runtime/build combinations acknowledge switchTab success
    // without changing the visible page. Verify and force a fallback only
    // when the route is still unchanged shortly after success.
    setTimeout(() => {
      const delayedPath = getTopRoutePath()
      if (targetPath && delayedPath && delayedPath !== targetPath) {
        console.warn('[navigation:switchTab] route did not change, fallback to reLaunch', {
          url: normalizedUrl,
          targetPath,
          delayedPath,
        })
        void callNav('reLaunch', normalizedUrl).catch((error) => {
          console.error('[navigation:switchTab] reLaunch fallback failed', {
            url: normalizedUrl,
            error,
          })
        })
      }
    }, 150)

    return res
  })
}

// Add this export — use it everywhere you currently call redirectTo for tabs
export const navigateSmart = (url: string) => {
  const normalizedUrl = normalizeMiniUrl(url)
  const barePath = normalizedUrl.split('?')[0]
  const TAB_PATHS = new Set([
    '/pages/index/index',
    '/pages/boxes/index',
    '/pages/discover/index',
    '/pages/me/index',
  ])
  return TAB_PATHS.has(barePath)
    ? callNav('switchTab', normalizedUrl)
    : callNav('navigateTo', normalizedUrl)
}
