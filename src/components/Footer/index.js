import React from 'react'
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome'

import A from './A';
import Wrapper from './Wrapper';
import LinkWrapper from './LinkWrapper';
import messages from './messages';

const SpanWrapper = styled.span`
  color: #999;
`;

function Footer() {
  return (
    <Wrapper className='container-fluid row'>
      <span className='hidden-xs'>
        <FormattedMessage {...messages.connectMessage} />
      </span>

      <SpanWrapper>
        <LinkWrapper>
          <FormattedMessage
            {...messages.socialMessage}
            values={{
              social: <A href='https://github.com/bhefty'><FontAwesome name='github-square'/> GitHub</A>,
            }}
          />
        </LinkWrapper>

        <FormattedMessage {...messages.pipeMessage} />

        <LinkWrapper>
          <FormattedMessage
            {...messages.socialMessage}
            values={{
              social: <A href='https://twitter.com/billhefty'><FontAwesome name='twitter-square'/> Twitter</A>,
            }}
          />
        </LinkWrapper>

        <FormattedMessage {...messages.pipeMessage} />

        <LinkWrapper>
          <FormattedMessage
            {...messages.socialMessage}
            values={{
              social: <A href='https://www.linkedin.com/in/bill-hefty-6b973689'><FontAwesome name='linkedin-square'/> LinkedIn</A>,
            }}
          />
        </LinkWrapper>

        <span className='hidden-xs'>
          <FormattedMessage {...messages.pipeMessage} />
        </span>

        <br className='visible-xs-block'/>

        <LinkWrapper>
          <FormattedMessage
            {...messages.socialMessage}
            values={{
              social: <A href='https://www.freecodecamp.com/bhefty'><FontAwesome name='fire'/> FreeCodeCamp</A>,
            }}
          />
        </LinkWrapper>

        <FormattedMessage {...messages.pipeMessage} />

        <LinkWrapper>
          <FormattedMessage
            {...messages.socialMessage}
            values={{
              social: <A href='mailto:billhefty@gmail.com'><FontAwesome name='envelope'/> billhefty@gmail.com</A>,
            }}
          />
        </LinkWrapper>
      </SpanWrapper>
    </Wrapper>
  )
}

export default Footer
