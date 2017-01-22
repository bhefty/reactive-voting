import React, { Component, PropTypes as T } from 'react'
import styled from 'styled-components'
import Paper from 'material-ui/Paper';
import AuthService from '../../utils/AuthService'

const AppWrapper = styled.div`
  text-align: center;
`

class Login extends Component {
  componentDidMount() {
    this.props.auth.login()
    const headerDiv = document.getElementsByClassName("auth0-lock-header-bg auth0-lock-blur-support")[0]
    if (headerDiv.length !== 0) {
      headerDiv.className = ''
    }
    const lockName = document.getElementsByClassName('auth0-lock-name')[0]
    if (lockName.length !== 0) {
      lockName.innerHTML = 'Reactive Voting'
    }
  }

  componentWillUnmount() {
    this.props.auth.hideLock()
  }

  render() {
    const style = {
      maxWidth: 300,
      margin: '20px auto',
    };
    return (
      <AppWrapper>
        <h1>Login or Create and Account</h1>
        <Paper style={style} zDepth={3}>
          <div id='auth-lock'></div>
        </Paper>
      </AppWrapper>
    )
  }
}

Login.propTypes = {
  auth: T.instanceOf(AuthService)
}

export default Login;
