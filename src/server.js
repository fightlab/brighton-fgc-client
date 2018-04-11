import App from './App'
import React from 'react'
import express from 'express'
import theme from './theme'
import jss from './styles'
import { SheetsRegistry, JssProvider } from 'react-jss'
import { MuiThemeProvider } from 'material-ui/styles'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import cookiesMiddleware from 'universal-cookie-express'
import { Provider } from 'react-redux'
import { store } from './_store'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cookiesMiddleware())
  .get('/*', (req, res) => {
    const context = {}
    // This is needed in order to deduplicate the injection of CSS in the page.
    const sheetsManager = new WeakMap()
    // This is needed in order to inject the critical CSS.
    const sheetsRegistry = new SheetsRegistry()

    const markup = renderToString(
      <Provider store={store}>
        <CookiesProvider cookies={req.universalCookies}>
          <StaticRouter context={context} location={req.url}>
            <JssProvider registry={sheetsRegistry} jss={jss}>
              <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
                <App />
              </MuiThemeProvider>
            </JssProvider>
          </StaticRouter>
        </CookiesProvider>
      </Provider>
    )
    const css = sheetsRegistry.toString()
    res.send(
      `<!doctype html>
<html lang="">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Habrewken - Brighton FGC</title>
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500">
    ${assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : ''}
    ${css ? `<style id='jss-ssr'>${css}</style>` : ''}
      ${process.env.NODE_ENV === 'production'
    ? `<script src="${assets.client.js}" defer></script>`
    : `<script src="${assets.client.js}" defer crossorigin></script>`}
    <style>
    body {background-color: ${theme.palette.background.default};}
    </style> 
  </head>
  <body>
    <div id="root" class="box">${markup}</div>
  </body>
</html>`
    )
  })

export default server
