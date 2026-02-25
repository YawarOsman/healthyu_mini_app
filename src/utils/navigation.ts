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

const SWITCH_TAB_COOLDOWN_MS = 260
let switchTabCoolingDown = false
let lastSwitchTabUrl = ''
let lastSwitchTabAt = 0
const releaseSwitchTabCooldown = () => {
  setTimeout(() => {
    switchTabCoolingDown = false
  }, SWITCH_TAB_COOLDOWN_MS)
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
  const now = Date.now()
  const isDuplicateInCooldown =
    switchTabCoolingDown &&
    normalizedUrl === lastSwitchTabUrl &&
    now - lastSwitchTabAt < SWITCH_TAB_COOLDOWN_MS

  if (isDuplicateInCooldown) {
    return Promise.resolve()
  }

  switchTabCoolingDown = true
  lastSwitchTabUrl = normalizedUrl
  lastSwitchTabAt = now

  return callNav('switchTab', normalizedUrl).then(
    (res) => {
      releaseSwitchTabCooldown()
      return res
    },
    (error) => {
      releaseSwitchTabCooldown()
      throw error
    },
  )
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
