import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import { Link } from 'react-router'

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
        return (
          <ListItem
            key={idx}
            primaryText={poll.title}
            containerElement={<Link to={`/polls/${poll._id}`} />}
          />
        )
      })
    }
    return (
      <div>
        <Paper zDepth={1} rounded={false}>
          <List>
            {renderView}
          </List>
        </Paper>
      </div>
    )
  }
}

export default Polls
