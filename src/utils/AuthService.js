import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain, options) {
    super()
    this.lock = new Auth0Lock(clientId, domain, options, {
      auth: {
        redirectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      }
    })

    this.lock.on('authenticated', this._doAuthentication.bind(this))
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken)
    browserHistory.replace('/home')

    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }

  login() {
    this.lock.show()
  }

  hideLock() {
    this.lock.hide()
  }

  loggedIn() {
    return !!this.getToken()
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
    this.emit('profile_updated', profile)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  getProfile() {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    this.emit('profile_removed')
  }
}
