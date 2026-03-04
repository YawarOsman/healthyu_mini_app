import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { fetchDiscover } from '@/features/discover/actions'
import { fetchHome } from '@/features/home/actions'
import { fetchBox, fetchFutureBoxes, fetchUserBoxes } from '@/features/order/actions'
import configStore from '@/store'
import type { RootState } from '@/store'
import { hideHomeButtonSafely, hideNativeTabBarSafely } from '@/utils/ui'

import './app.scss'
import './styles/theme.scss'

const store = configStore()
const getThemeMode = (state: RootState) => state.theme.themeMode

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

    // Apply theme to document root
    const themeMode = getThemeMode(store.getState())
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeMode)
    }
    
    // Set initial navigation bar title - DISABLED
    // Taro.setNavigationBarTitle({
    //   title: isFlavie ? 'Flavie' : 'Mann'
    // })

    // Subscribe to theme changes
    store.subscribe(() => {
      const currentTheme = getThemeMode(store.getState())
      
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', currentTheme)
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
