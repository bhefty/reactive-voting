import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import DeleteIcon from '../DeleteIcon'
import { red500 } from 'material-ui/styles/colors'

import Wrapper from './Wrapper'
import H1 from './H1'

class MyPolls extends Component {
  constructor() {
    super()
    this.state = {
      polls: [
        'Best Coffee?',
        'Best movie?',
        'Best framework?'
      ]
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(poll) {
    let newPolls = this.state.polls
    if (poll > -1) {
      newPolls.splice(poll, 1)
    }
    this.setState({ polls: newPolls })
  }

  render() {
    let renderView
    if (this.state.polls.length === 0) {
      renderView = (<h4 style={{textAlign: 'center'}}>No polls at this time. Create one!</h4>)
    } else {
      renderView = this.state.polls.map((poll, idx) => {
        return (
          <ListItem
            key={idx}
            primaryText={poll}
            rightIcon={<DeleteIcon hoverColor={red500} onClick={() => this.handleDelete(idx)} />}
          />
        )
      })
    }
    return (
      <Wrapper>
        <H1>My Polls</H1>
        <Paper zDepth={1} rounded={false}>
          <List>
            {renderView}
          </List>
        </Paper>
      </Wrapper>
    )
  }
}

export default MyPolls
