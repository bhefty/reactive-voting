import React, { Component, PropTypes as T } from 'react'
import { Link, browserHistory } from 'react-router'
import { Grid, Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import AuthService from '../../utils/AuthService'

class Navigation extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile })
    })

    props.auth.on('profile_removed', () => {
      this.setState({ profile: {} })
    })
  }
  handleRoute() {
    if (this.props.auth.loggedIn()) {
      this.context.router.push('/')
    } else {
      this.context.router.push('/welcome')
    }
  }
  render() {
    const { profile } = this.state

    let isLoggedIn = this.props.auth.loggedIn()
    let renderAuthButton
    if (isLoggedIn) {
      renderAuthButton = (
        <Nav pullRight>
          <NavItem eventKey={1} disabled>Welcome, {profile.name}!</NavItem>
          <LinkContainer to='welcome'>
            <NavItem eventKey={2} onClick={() => this.props.auth.logout()}>Logout</NavItem>
          </LinkContainer>
        </Nav>
      )
    } else {
      renderAuthButton = (
        <Nav pullRight>
          <NavItem eventKey={2} onClick={() => browserHistory.replace('login')}>Login</NavItem>
        </Nav>
      )
    }

    return (
      <div>
        <Navbar staticTop collapseOnSelect={true} >
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link style={{ cursor: 'pointer' }} onClick={this.handleRoute.bind(this)}>Reactive Voting</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to='/polls'>
                  <NavItem>Polls</NavItem>
                </LinkContainer>
              </Nav>
              {renderAuthButton}
            </Navbar.Collapse>
          </Grid>
        </Navbar>
      </div>
    )
  }
}

Navigation.contextTypes = {
  router: T.object
}

Navigation.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
}

export default Navigation
