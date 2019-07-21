import React from 'react'
import { Provider } from 'react-redux'
import { hydrate } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import * as serviceWorker from './serviceWorker'
import theme from './theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CookiesProvider } from 'react-cookie'
import { ApolloProvider } from 'react-apollo'

import App from './App'
import { gqlClient as client } from './_constants/api.constants'

import { createstore } from './_store'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap()

const app = (
  <ApolloProvider client={client}>
    <Provider store={createstore(preloadedState)}>
      <CookiesProvider>
        <BrowserRouter>
          <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </ApolloProvider>
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

serviceWorker.register()
