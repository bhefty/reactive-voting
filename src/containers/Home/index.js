import React from 'react'
import styled from 'styled-components'

const AppWrapper = styled.div`

`

function Home(props) {
    return (
      <AppWrapper>
        <h1>Home</h1>
        {React.Children.toArray(props.children)}
      </AppWrapper>
    )
}

Home.propTypes = {
  children: React.PropTypes.node
}

export default Home;
