import React from 'react'
import { Provider } from 'react-redux'
import { hydrate } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import theme from './theme'
import { MuiThemeProvider } from 'material-ui/styles'
import { CookiesProvider } from 'react-cookie'
import App from './App'

import { store } from './_store'

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap()

const app = (
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
)

hydrate(
  app,
  document.getElementById('root'),
  () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
    const jssStyles = document.getElementById('jss-ssr')
    if (jssStyles && jssStyles.parentNode) { jssStyles.parentNode.removeChild(jssStyles) }
  }
)

if (module.hot) {
  module.hot.accept()
  module.hot.accept('./App', () => {
    hydrate(
      app,
      document.getElementById('root'),
      () => {
        // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
        const jssStyles = document.getElementById('jss-ssr')
        if (jssStyles && jssStyles.parentNode) { jssStyles.parentNode.removeChild(jssStyles) }
      }
    )
  })
}
