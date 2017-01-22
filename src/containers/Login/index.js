import React from 'react'
import styled from 'styled-components'

const AppWrapper = styled.div`

`

function Login(props) {
    return (
      <AppWrapper>
        <h1>login</h1>
        {React.Children.toArray(props.children)}
      </AppWrapper>
    )
}

Login.propTypes = {
  children: React.PropTypes.node
}

export default Login;
