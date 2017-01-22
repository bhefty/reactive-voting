import React from 'react'
import styled from 'styled-components';

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

const AppWrapper = styled.div`
  padding-bottom: 5em;
`

function App(props) {
    return (
      <AppWrapper>
        <Navigation />
        {React.Children.toArray(props.children)}
        <Footer />
      </AppWrapper>
    )
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App;
