import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'

import App from './containers/App'
import Login from './containers/Login'
import Welcome from './components/Welcome'

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={App}>
      <IndexRedirect to='/welcome' />
      <Route path='/welcome' component={Welcome} />
      <Route path='login' component={Login} />
    </Route>
  </Router>
)

export default Routes
