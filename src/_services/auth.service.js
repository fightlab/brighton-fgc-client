import auth0 from 'auth0-js'
import Cookies from 'universal-cookie'

export class AuthService {
  constructor () {
    this.auth0 = new auth0.WebAuth({
      domain: 'mkn-sh.eu.auth0.com',
      clientID: '7cfMMfmUiD4AZean1vz9ln9pT2Y7qRUG',
      redirectUri: 'http://localhost:3000/login',
      audience: 'https://api.hbk.gg',
      responseType: 'token id_token',
      scope: 'openid'
    })
    this.cookies = new Cookies()

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.setSession = this.setSession.bind(this)
  }

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err)
        this.setSession(authResult)
        return resolve(authResult)
      })
    })
  }

  setSession (authResult) {
    console.log(authResult)
    // Set the time that the Access Token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime()
    this.cookies.set('access_token', authResult.accessToken)
    this.cookies.set('id_token', authResult.idToken)
    this.cookies.set('expires_at', expiresAt)
  }

  login () {
    this.auth0.authorize()
  }

  logout (history) {
    this.cookies.remove('access_token')
    this.cookies.remove('id_token')
    this.cookies.remove('expires_at')
    history.replace('/')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = this.cookies.get('expires_at')
    return (new Date().getTime() < Number(expiresAt)) || false
  }
}
