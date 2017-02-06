import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

import VoteChart from '../VoteChart'

export default class PollVote extends Component {
  constructor() {
    super()
    this.state = {
      poll: {},
      selected: ''
    }
    this.getPollInfo = this.getPollInfo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(event) {
    event.preventDefault()
    console.log('Submit', this.state.selected)
  }

  render() {
    const chartData = [
          {
              value: 5,
              color:"#F7464A",
              highlight: "#FF5A5E",
              label: "CUID"
          },
          {
              value: 2,
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "ObjectID"
          },
    ]

    let renderOptions
    if (!this.state.poll.options) {
      renderOptions = (<RadioButton />)
    } else {
      renderOptions = this.state.poll.options.map((option, idx) => {
        return (
          <RadioButton
            key={idx}
            value={option.choice}
            label={option.choice}
            onClick={() => this.setState({selected: option._id})}
          />
        )
      })
    }
    return (
      <div>
        <h2>{this.state.poll.title}</h2>
        <p>by: {this.state.poll.author}</p>
        <Paper zDepth={2}>
          <form onSubmit={this.handleSubmit}>
            <h4>Cast your vote:</h4>
            <RadioButtonGroup name='pollOptions'>
              {renderOptions}
            </RadioButtonGroup>
            <RaisedButton type='submit' backgroundColor='#58B957' labelColor='#fff' label='Submit' />
          </form>
          <VoteChart data={chartData} />
        </Paper>
      </div>
    )
  }
}
