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
  }
  render() {
    return (
      <Wrapper>
        <H1>My Polls</H1>
        <Paper zDepth={1} rounded={false}>
          <List>
            {this.state.polls.map((poll, idx) => {
              return (
                <ListItem
                  key={idx}
                  primaryText={poll}
                  rightIcon={<DeleteIcon hoverColor={red500}/>}
                />
              )
            })}
          </List>
        </Paper>
      </Wrapper>
    )
  }
}

export default MyPolls
