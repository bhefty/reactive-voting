import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

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
    const styles = {
      submitButtonStyle: {
        margin: '20px auto',
        display: 'block',
        maxWidth: '10em'
      }
    }
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
        <Paper zDepth={1} rounded={false}>
          <form onSubmit={this.handleSubmit}>
            <RadioButtonGroup name='pollOptions'>
              {renderOptions}
            </RadioButtonGroup>
            <RaisedButton type='submit' style={styles.submitButtonStyle} backgroundColor='#58B957' labelColor='#fff' label='Submit' />
          </form>
        </Paper>
      </div>
    )
  }
}
