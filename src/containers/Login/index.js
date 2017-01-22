import React, { Component, PropTypes as T } from 'react'
import styled from 'styled-components'
import AuthService from '../../utils/AuthService'

const AppWrapper = styled.div`

`

class Login extends Component {
  render() {
    return (
      <AppWrapper>
        <h1>login</h1>
      </AppWrapper>
    )
  }
}

Login.propTypes = {
  auth: T.instanceOf(AuthService)
}

export default Login;
