import React from 'react'
import { hydrate } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import theme from './theme'
import { MuiThemeProvider } from 'material-ui/styles'
import App from './App'

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap()

hydrate(
  <BrowserRouter>
    <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
  () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
    const jssStyles = document.getElementById('jss-ssr')
    if (jssStyles && jssStyles.parentNode) { jssStyles.parentNode.removeChild(jssStyles) }
  }
)

if (module.hot) {
  module.hot.accept()
}
