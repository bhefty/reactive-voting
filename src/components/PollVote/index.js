import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

import VoteChart from '../VoteChart'
import ShareLinks from '../ShareLinks'

export default class PollVote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: {},
      selected: '',
      hasVoted: false,
      chartData: [],
      profile: props.auth.getProfile(),
      alert: false
    }
    this.getPollInfo = this.getPollInfo.bind(this)
    this.getVoteStatus = this.getVoteStatus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setChartData = this.setChartData.bind(this)
    this.dynamicColors = this.dynamicColors.bind(this)
    this.handleOpenAlert = this.handleOpenAlert.bind(this)
    this.handleCloseAlert = this.handleCloseAlert.bind(this)
  }

  componentDidMount() {
    this.getPollInfo()
  }

  handleOpenAlert() {
    this.setState({ alert: true })
  }

  handleCloseAlert() {
    this.setState({ alert: false })
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
      .then(() => this.getVoteStatus())
  }

  getVoteStatus() {
    fetch(`/api/poll/${this.props.params.pollID}/${this.state.profile.user_id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((status) => this.setState({ hasVoted: status }))
      .then(() => {
        if (this.state.hasVoted) {
          this.setChartData()
        } else {
          // TODO: add placeholder render of chartData until user votes
        }
      })
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
    if (!this.state.hasVoted) {
      let userInfo = {
        userID: this.state.profile.user_id
      }
      fetch(`/api/poll/${this.props.params.pollID}/${this.state.selected}`, {
        method: 'post',
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => this.getPollInfo())
    } else {
      this.handleOpenAlert()
    }
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

    const alertActions = [
      <RaisedButton
        label='Dismiss'
        primary={true}
        onTouchTap={this.handleCloseAlert}
      />
    ]
    return (
      <div>
        <h2>{this.state.poll.title}</h2>
        <p>by: {this.state.poll.author}</p>
        <Paper zDepth={2}>
          <Dialog
            actions={alertActions}
            modal={false}
            open={this.state.alert}
            onRequestClose={this.handleCloseAlert}
          >
            Sorry, only one vote per user!
          </Dialog>
          <form onSubmit={this.handleSubmit}>
            <h4>Cast your vote:</h4>
            <RadioButtonGroup name='pollOptions'>
              {renderOptions}
            </RadioButtonGroup>
            <RaisedButton type='submit' backgroundColor='#58B957' labelColor='#fff' label='Submit' />
          </form>
          <VoteChart data={this.state.chartData} />
          <ShareLinks link={window.location.href} />
        </Paper>
      </div>
    )
  }
}
