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
      myPolls: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.getPollList = this.getPollList.bind(this)
  }

  componentDidMount() {
    this.getPollList()
  }

  getPollList() {
    let newPolls = this.state.myPolls
    fetch(`/api/polls/${this.props.author}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((pollJSON) => {
        pollJSON.map((poll) => {
          return newPolls.push(poll)
        })
        this.setState({myPolls: newPolls})
      })
  }

  handleDelete(poll, idx) {
    fetch(`/api/polls/remove/${poll.cuid}`, {
      method: 'delete'
    })
      .then(() => {
        let newPolls = this.state.myPolls
        if (idx > -1) {
          newPolls.splice(idx, 1)
        }
        this.setState({ myPolls: newPolls })
      })
  }

  render() {
    let renderView
    if (this.state.myPolls.length === 0) {
      renderView = (<h4 style={{textAlign: 'center'}}>No polls at this time. Create one!</h4>)
    } else {
      renderView = this.state.myPolls.map((poll, idx) => {
        return (
          <ListItem
            key={idx}
            primaryText={poll.title}
            rightIcon={<DeleteIcon hoverColor={red500} onClick={() => this.handleDelete(poll, idx)} />}
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
