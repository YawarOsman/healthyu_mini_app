import { Component, PropsWithChildren } from 'react'
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
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeMode)
    }

    // Subscribe to theme changes
    store.subscribe(() => {
      const currentState = store.getState()
      const currentTheme = currentState.theme?.themeMode || 'flavie-dark'
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', currentTheme)
      }
    })
  }

  componentDidShow() {}

  componentDidHide() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App

