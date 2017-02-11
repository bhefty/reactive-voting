import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import AuthService from './utils/AuthService'

import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Welcome from './components/Welcome'
import Polls from './components/Polls'
import PollVote from './components/PollVote'

console.log('process', process.env)
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
const options = {
  container: 'auth-lock',
  theme: {
    primaryColor: '#0088FC',
    logo: 'https://res.cloudinary.com/bhefty/image/upload/v1485070707/react_58px_flncmd.png'
  }
}
const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN, options)

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={App} auth={auth}>
      <IndexRedirect to='/home' />
      <Route path='home' component={Home} onEnter={requireAuth} />
      <Route path='welcome' component={Welcome} />
      <Route path='login' component={Login} />
      <Route path='polls' component={Polls} />
      <Route path='polls/:pollID' component={PollVote} />
    </Route>
  </Router>
)

export default Routes
