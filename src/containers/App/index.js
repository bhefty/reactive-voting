import React from 'react'
import styled from 'styled-components';

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

const AppWrapper = styled.div`
  padding-bottom: 5em;
`

function App(props) {
  let children = null
  if (props.children) {
    children = React.cloneElement(props.children, {
      auth: props.route.auth
    })
  }
    return (
      <AppWrapper>
        <Navigation />
        {children}
        <Footer />
      </AppWrapper>
    )
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App;
