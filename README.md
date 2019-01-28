# Brighton FGC - Client
Brighton Fighting Game Community Website and Resource Client/Frontend
[hbk.gg](https://hbk.gg)

## About
This is the client side, or front-end, to the Brighton Fighting Game Community website and resource. This connects (heavily) to our [API](https://github.com/coldlink/brighton-fgc-api) from where all the data is retrieved from.

You can probably use this client as a start to your own Fighting Game Community website, but it's tailored very specifically to what we do here in Brighton. Hopefully in the future I can separate this out making it easier to implement  for your own use.

This was also very much a learning experience for me in React and Redux, so expect stuff which may not be quite optimal, or messy. I'm still learning.

## Issues
Report issues here or contact me via [email](mailto:maheshmakani@mkn.sh) or [Twitter](https://twitter.com/coldlink_)

## Setting Up

### Technologies/Services
[React](https://reactjs.org/) | [Redux](https://redux.js.org/) | [Material UI](https://material-ui.com/)
Used [create-react-app](https://github.com/facebook/create-react-app) to bootstrap the application initially. 
There is some leftover code, not being used, from when using [Razzle](https://github.com/jaredpalmer/razzle) for Server Side Rendering. I switched back to Client Side Rendering after none of the charting libraries I used would work correctly using SSR.

### Getting Started
Clone somewhere good:
```sh
$ git clone https://github.com/coldlink/brighton-fgc-client.git #https
$ #or
$ git clone git@github.com:coldlink/brighton-fgc-client.git #ssh
```
Change directory:
```sh
$ cd brighton-fgc-client
```
Install the dependencies (I use yarn, but npm also works):
```sh
$ yarn #if using yarn
$ #or
$ npm install #if using npm
```
Next we set up the Environment Variables, copy the `.env.example` file into a `.env` file. If you're working on the Brighton FGC site, and I **trust you**, I'll probably just send you my `.env` file to use for development.
Here's an explanation of the variables you will need:
- `REACT_APP_API_URL` - URL of the API, for development this defaults to http://0.0.0.0:9000
- `REACT_APP_API_URL_VER` - API version, currently only `v1` is available on the API.
- `REACT_APP_AUTH0_DOMAIN` - See the [API](https://github.com/coldlink/brighton-fgc-api) README for more info.
- `REACT_APP_AUTH0_REDIRECT_URI` - See the [API](https://github.com/coldlink/brighton-fgc-api) README for more info.
- `REACT_APP_AUTH0_DOMAIN` - See the [API](https://github.com/coldlink/brighton-fgc-api) README for more info.
- `REACT_APP_AUTH0_CLIENTID` - See the [API](https://github.com/coldlink/brighton-fgc-api) README for more info.
- `REACT_APP_AUTH0_AUDIENCE` - See the [API](https://github.com/coldlink/brighton-fgc-api) README for more info.
- `REACT_APP_ENV_CLIENT_VERSION` - Client version, defaults to `$npm_package_version`

### Commands
`yarn dev` or `npm run dev` - Starts the development server locally.
`yarn test` or `npm run test` - Runs all the  tests. Currently none on the client side. I should change this...
`yarn build` or `npm run build` - Builds a production version of the client ready to be deployed.
`yarn start` or `npm start` - Builds a production version of the client, and starts the production server.
### Adding Data
Log in using Auth0, make yourself an admin through the Auth0 interface. Use the admin panel after logging in to add data. Better explanation coming soon. But for now that should help get started. 