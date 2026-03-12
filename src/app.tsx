import Taro from '@tarojs/taro'

import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { fetchDiscover } from '@/features/discover/actions'
import { fetchHome } from '@/features/home/actions'
import { fetchBox, fetchFutureBoxes, fetchUserBoxes } from '@/features/order/actions'
import { setCurrentLocale } from '@/i18n'
import configStore from '@/store'
import type { RootState } from '@/store'
import { hideHomeButtonSafely, hideNativeTabBarSafely } from '@/utils/ui'

import './app.scss'
import './styles/theme.scss'

const store = configStore()
const getThemeMode = (state: RootState) => state.theme.themeMode
const getLocale = (state: RootState) => state.theme.locale

class App extends Component<PropsWithChildren> {
  componentDidMount() {
  
    // Fetch box data on app load
    store.dispatch(fetchBox())

    // Fetch home page data on app load
    store.dispatch(fetchHome())

    // Fetch discover page data on app load
    store.dispatch(fetchDiscover())

    // Fetch user's active/completed boxes on app load
    store.dispatch(fetchUserBoxes())

    // Fetch future boxes catalogue data on app load
    store.dispatch(fetchFutureBoxes())

    const initialState = store.getState()
    let currentTheme = getThemeMode(initialState)
    let currentLocale = getLocale(initialState)
    setCurrentLocale(currentLocale)

    // Apply theme/locale to document root
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', currentTheme)
      document.documentElement.setAttribute('lang', currentLocale)
    }
    
    // Subscribe to theme/locale changes
    store.subscribe(() => {
      const state = store.getState()
      const nextTheme = getThemeMode(state)
      const nextLocale = getLocale(state)

      if (nextTheme !== currentTheme) {
        currentTheme = nextTheme
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', currentTheme)
        }
      }

      if (nextLocale !== currentLocale) {
        currentLocale = nextLocale
        setCurrentLocale(currentLocale)
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('lang', currentLocale)
        }
      }
      
      // Update navigation bar title on change - DISABLED
      // Taro.setNavigationBarTitle({
      //   title: currentIsFlavie ? 'Flavie' : 'Mann'
      // })
    })

    void hideNativeTabBarSafely()
  }

  componentDidShow() {
    void hideHomeButtonSafely();
    void hideNativeTabBarSafely();
  }

  componentDidHide() {}

  // The render() function in the App class has no actual effect
  // Please do not modify this function
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
