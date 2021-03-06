import React from 'react'
import ShareLinks from '../ShareLinks'

import ShareWrapper from './ShareWrapper'

function PollSubmitted(props) {
  const address = `${window.location.origin}/polls/${props.pollID}`
  return (
    <div style={{textAlign: 'center'}}>
      <h1>Congratulations!</h1>
      <p>
        Your poll has been submitted.
      </p>
      <ShareWrapper>
        <ShareLinks link={address} />
      </ShareWrapper>
      <p>
        Or, share the following link!
      </p>
      <p>
        <a href={address} target='_blank'>{address}</a>
      </p>
    </div>
  )
}

export default PollSubmitted
