import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import {List} from 'material-ui/List'

import PollItem from '../PollItem'

import Wrapper from './Wrapper'
import H1 from './H1'

class Polls extends Component {
  constructor() {
    super()
    this.state = {
      polls: []
    }
    this.getPollList = this.getPollList.bind(this)
  }

  componentDidMount() {
    this.getPollList()
  }

  getPollList() {
    let newPolls = this.state.polls
    fetch('/api/polls', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((pollsArray) => {
        pollsArray.map((poll) => {
          return newPolls.push(poll)
        })
        this.setState({polls: newPolls})
      })
  }

  render() {
    let renderView
    if (this.state.polls.length === 0) {
      renderView = (<h4 style={{textAlign: 'center'}}>Loading polls...</h4>)
    } else {
      renderView = this.state.polls.map((poll, idx) => {
        let lastItem = false
        if ((idx + 1) === this.state.polls.length) {
          lastItem = true
        }
        return (
          <PollItem key={idx} poll={poll} final={lastItem} />
        )
      })
    }
    return (
      <Wrapper>
        <Paper zDepth={1} rounded={false}>
          <H1>All Polls</H1>
          <Divider />
          <List>
            {renderView}
          </List>
        </Paper>
      </Wrapper>
    )
  }
}

export default Polls
