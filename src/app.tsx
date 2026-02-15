import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'

import configStore from './store'

import './app.scss'
import './styles/theme.scss'

const store = configStore()

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    // Apply theme to document root
    const state = store.getState()
    const themeMode = state.theme?.themeMode || 'flavie-dark'
    const isFlavie = state.theme?.isFlavie ?? true // Default to true if undefined

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeMode)
    }
    
    // Set initial navigation bar title
    Taro.setNavigationBarTitle({
      title: isFlavie ? 'Flavie' : 'Mann'
    })

    // Subscribe to theme changes
    store.subscribe(() => {
      const currentState = store.getState()
      const currentTheme = currentState.theme?.themeMode || 'flavie-dark'
      const currentIsFlavie = currentState.theme?.isFlavie ?? true
      
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', currentTheme)
      }
      
      // Update navigation bar title on change
      Taro.setNavigationBarTitle({
        title: currentIsFlavie ? 'Flavie' : 'Mann'
      })
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

