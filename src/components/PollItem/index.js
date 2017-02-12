import React from 'react'
import { ListItem } from 'material-ui/List'
import { Link } from 'react-router'
import Divider from 'material-ui/Divider'

const PollItem = (props) => {
  return (
    <div>
      <ListItem
        primaryText={props.poll.title}
        containerElement={<Link to={`/polls/${props.poll._id}`} />}
      />
      { (!props.final) ? <Divider /> : '' }
    </div>
  )
}

export default PollItem
