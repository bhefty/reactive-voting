import React, { PropTypes as T } from 'react'
// import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import FontAwesome from 'react-fontawesome'
import AuthService from '../../utils/AuthService'


import H1 from './H1'
import P from './P'
import Wrapper from './Wrapper';
import ButtonWrapper from './ButtonWrapper'
import MessageWrapper from './MessageWrapper'
import messages from './messages';


function Welcome(props) {
  return (
    <div>
      <Wrapper>
        <H1>
          <FormattedMessage {...messages.welcomeHeader} />
        </H1>
        <P>
          <FormattedMessage {...messages.welcomeMessage} />
        </P>
        <ButtonWrapper>
          <RaisedButton fullWidth backgroundColor='#58B957' labelColor='#fff' onClick={props.auth.login} label='Signup' />
        </ButtonWrapper>
      </Wrapper>

      <MessageWrapper>
        <div className='row'>
          <div className='col-md-4'>
            <FontAwesome name='bolt' size='5x' style={{ color: '#FBEB6A' }} />
            <h3>
              <FormattedMessage {...messages.instantHeader} />
            </h3>
            <p>
              <FormattedMessage {...messages.instantMessage} />
            </p>
          </div>
          <div className='col-md-4'>
            <FontAwesome name='globe' size='5x' style={{ color: '#58B957' }} />
            <h3>
              <FormattedMessage {...messages.adaptiveHeader} />
            </h3>
            <p>
              <FormattedMessage {...messages.adaptiveMessage} />
            </p>
          </div>
          <div className='col-md-4'>
            <FontAwesome name='twitter' size='5x' style={{ color: '#3F92BB' }} />
            <h3>
              <FormattedMessage {...messages.socialHeader} />
            </h3>
            <p>
              <FormattedMessage {...messages.socialMessage} />
            </p>
          </div>
        </div>
      </MessageWrapper>
    </div>
  )
}

Welcome.propTypes = {
  auth: T.instanceOf(AuthService)
}

export default Welcome
