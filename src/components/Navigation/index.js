import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AuthService from '../../utils/AuthService'

class Navigation extends Component {
  handleRoute() {
    if (this.props.auth.loggedIn()) {
      this.context.router.push('/')
    } else {
      this.context.router.push('/welcome')
    }
  }
  render() {
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };
    if (this.props.auth.loggedIn()) {
      console.log('logged in')
    }

    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          title={<span onClick={this.handleRoute.bind(this)} style={styles.title}>Reactive Voting</span>}
          iconElementRight={<FlatButton containerElement={<Link to="/login" />}>Login</FlatButton>}
        />
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
