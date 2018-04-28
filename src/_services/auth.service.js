import auth0 from 'auth0-js'
import Cookies from 'universal-cookie'
import { get, find } from 'lodash'

export class AuthService {
  constructor () {
    this.auth0 = new auth0.WebAuth({
      domain: 'mkn-sh.eu.auth0.com',
      clientID: '7cfMMfmUiD4AZean1vz9ln9pT2Y7qRUG',
      redirectUri: process.env.RAZZLE_AUTH0_REDIRECT_URI || 'http://localhost:3000/login',
      audience: 'https://api.hbk.gg',
      responseType: 'token id_token',
      scope: 'openid profile email'
    })

    this.cookies = new Cookies()
    this.profile = null

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.setSession = this.setSession.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  getAccessToken () {
    const accessToken = this.cookies.get('access_token')
    return accessToken
  }

  getProfile () {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken()

      if (accessToken) {
        this.auth0.client.userInfo(accessToken, (err, profile) => {
          if (err) return reject(err)
          this.profile = profile
          return resolve(profile)
        })
      } else {
        return resolve()
      }
    })
  }

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash(async (err, authResult) => {
        if (err) return reject(err)
        this.setSession(authResult)
        const profile = await this.getProfile()
        const isAdmin = await this.isAdmin()
        return resolve({
          valid: true,
          access_token: this.cookies.get('access_token'),
          id_token: this.cookies.get('id_token'),
          expires_at: this.cookies.get('expires_at'),
          profile,
          isAdmin
        })
      })
    })
  }

  setSession (authResult) {
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
    this.profile = null
    history && history.replace('/')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = this.cookies.get('expires_at')

    if (new Date().getTime() < Number(expiresAt)) {
      return {
        valid: true,
        access_token: this.cookies.get('access_token'),
        id_token: this.cookies.get('id_token'),
        expires_at: this.cookies.get('expires_at')
      }
    }
    return {
      valid: false
    }
  }

  async isAdmin () {
    if (!this.profile) {
      await this.getProfile()
    }

    if (!this.profile) {
      return false
    }

    const keys = Object.keys(this.profile)
    const key = find(keys, v => v.indexOf('roles') !== -1) || ''
    const roles = get(this.profile, key, ['user'])
    return !!find(roles, role => role === 'admin', false)
  }
}
