import { Component, PropsWithChildren } from 'react'
// import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'

import configStore from './store'
import { fetchBox } from './features/order/actions'

import './app.scss'
import './styles/theme.scss'

const store = configStore()

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    // Fetch box data on app load
    store.dispatch(fetchBox() as any)

    // Apply theme to document root
    const state = store.getState()
    const themeState = state && state.theme ? state.theme : null
    const themeMode = themeState && themeState.themeMode ? themeState.themeMode : 'flavie-dark'
    // const isFlavie = themeState && typeof themeState.isFlavie === 'boolean'
    //   ? themeState.isFlavie
    //   : true // Default to true if undefined

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeMode)
    }
    
    // Set initial navigation bar title - DISABLED
    // Taro.setNavigationBarTitle({
    //   title: isFlavie ? 'Flavie' : 'Mann'
    // })

    // Subscribe to theme changes
    store.subscribe(() => {
      const currentState = store.getState()
      const currentThemeState = currentState && currentState.theme ? currentState.theme : null
      const currentTheme = currentThemeState && currentThemeState.themeMode
        ? currentThemeState.themeMode
        : 'flavie-dark'
      // const currentIsFlavie = currentThemeState && typeof currentThemeState.isFlavie === 'boolean'
      //   ? currentThemeState.isFlavie
      //   : true
      
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', currentTheme)
      }
      
      // Update navigation bar title on change - DISABLED
      // Taro.setNavigationBarTitle({
      //   title: currentIsFlavie ? 'Flavie' : 'Mann'
      // })
    })
  }

  componentDidShow() {}

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
