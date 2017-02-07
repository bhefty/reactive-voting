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
      selected: '',
      chartData: []
    }
    this.getPollInfo = this.getPollInfo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setChartData = this.setChartData.bind(this)
    this.dynamicColors = this.dynamicColors.bind(this)
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
      .then(() => this.setChartData())
  }

  setChartData() {
    let data = this.state.poll.options.map((option) => {
      let rgb = this.dynamicColors()
      return {
        value: option.numVotes,
        label: option.choice,
        color: rgb.color,
        highlight: rgb.highlight
      }
    })

    this.setState({
      chartData: data
    })
  }

  dynamicColors() {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)

    let rH = Math.floor(r + ((255 - r) * 0.25))
    let gH = Math.floor(g + ((255 - g) * 0.25))
    let bH = Math.floor(b + ((255 - b) * 0.25))

    return {
      color: `rgb(${r},${g},${b})`,
      highlight: `rgb(${rH},${gH},${bH})`
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch(`/api/poll/${this.props.params.pollID}/${this.state.selected}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(() => this.getPollInfo())
  }

  render() {
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
          <VoteChart data={this.state.chartData} />
        </Paper>
      </div>
    )
  }
}
