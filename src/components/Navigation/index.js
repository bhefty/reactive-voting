import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Navigation extends Component {
  render() {
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };

    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          title={<span onClick={() => this.context.router.push('/')} style={styles.title}>Reactive Voting</span>}
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
  location: T.object
}

export default Navigation
