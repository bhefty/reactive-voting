import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import AuthService from './utils/AuthService'

import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Welcome from './components/Welcome'

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN)

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/welcome' })
  }
}

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={App} auth={auth}>
      <IndexRedirect to='/home' />
      <Route path='home' component={Home} onEnter={requireAuth} />
      <Route path='welcome' component={Welcome} />
      <Route path='login' component={Login} />
    </Route>
  </Router>
)

export default Routes
