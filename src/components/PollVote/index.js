import React, { Component } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import cuid from 'cuid'

import VoteChart from '../VoteChart'
import ShareLinks from '../ShareLinks'
import NewOptionForm from '../NewOptionForm'

import Wrapper from './Wrapper'
import VoteWrapper from './VoteWrapper'
import OptionWrapper from './OptionWrapper'
import H2 from './H2'
import H4 from './H4'
import P from './P'

export default class PollVote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll: {},
      selected: '',
      hasVoted: false,
      chartData: [],
      profile: props.auth.getProfile(),
      authedUser: props.auth.loggedIn(),
      alert: false
    }
    this.getPollInfo = this.getPollInfo.bind(this)
    this.getVoteStatus = this.getVoteStatus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setChartData = this.setChartData.bind(this)
    this.dynamicColors = this.dynamicColors.bind(this)
    this.handleOpenAlert = this.handleOpenAlert.bind(this)
    this.handleCloseAlert = this.handleCloseAlert.bind(this)
    this.addCustom = this.addCustom.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    if (!this.state.authedUser) {
      if (!localStorage.getItem('anonUserID')) {
        localStorage.setItem('anonUserID', cuid())
      }
    }
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
    const user_id = this.state.profile.user_id || localStorage.getItem('anonUserID')
    fetch(`/api/poll/${this.props.params.pollID}/${user_id}`, {
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
        userID: this.state.profile.user_id || localStorage.getItem('anonUserID')
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

  addCustom(choiceText) {
    if (!this.state.hasVoted) {
      const newOption = {
        _id: cuid(),
        choice: choiceText,
        numVotes: 0
      }
      fetch(`/api/polls/addoption/${this.props.params.pollID}`, {
        method: 'post',
        body: JSON.stringify(newOption),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => {
          let userInfo = {
            userID: this.state.profile.user_id || localStorage.getItem('anonUserID')
          }
          fetch(`/api/poll/${this.props.params.pollID}/${newOption._id}`, {
            method: 'post',
            body: JSON.stringify(userInfo),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(() => this.getPollInfo())
        })
    } else {
      this.handleOpenAlert()
    }
  }

  handleDelete() {
    fetch(`/api/polls/remove/${this.props.params.pollID}`, {
      method: 'delete'
    })
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
      <Wrapper>
        <H2>{this.state.poll.title}</H2>
        <P>by: {this.state.poll.author}</P>
        <Paper zDepth={2} style={{'backgroundColor': '#f8f8f8'}}>
          <VoteWrapper>
            <Dialog
              actions={alertActions}
              modal={false}
              open={this.state.alert}
              onRequestClose={this.handleCloseAlert}
            >
              Sorry, only one vote per user!
            </Dialog>
            <form onSubmit={this.handleSubmit}>
              <H4>Cast your vote:</H4>
              <OptionWrapper>
                <RadioButtonGroup name='pollOptions'>
                  {renderOptions}
                </RadioButtonGroup>
              </OptionWrapper>
              <RaisedButton type='submit' backgroundColor='#58B957' labelColor='#fff' label='Submit' />
            </form>
            { this.state.authedUser ? <NewOptionForm onSubmit={this.addCustom} /> : ''}
            <VoteChart data={this.state.chartData} />
            <ShareLinks link={window.location.href} />
            {
              (this.state.profile.user_id === this.state.poll.authorID) ?
                <RaisedButton
                  backgroundColor='red'
                  labelColor='#fff'
                  label='Delete this Poll'
                  onClick={this.handleDelete}
                  containerElement={<Link to='/' />}
                />
                : ''
            }
          </VoteWrapper>
        </Paper>
      </Wrapper>
    )
  }
}
