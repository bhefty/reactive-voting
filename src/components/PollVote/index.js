import React, { Component } from 'react'

export default class PollVote extends Component {
  constructor() {
    super()
    this.state = {
      poll: {}
    }
    this.getPollInfo = this.getPollInfo.bind(this)
  }

  componentDidMount() {
    this.getPollInfo()
  }

  getPollInfo() {
    fetch(`/api/poll/${this.props.params.pollID}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((poll) => this.setState({poll: poll}))
  }

  render() {
    return (
      <div>
        <h2>{this.state.poll.title}</h2>
      </div>
    )
  }
}
