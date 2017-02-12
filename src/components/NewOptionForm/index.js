import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class NewOptionForm extends Component {
  constructor() {
    super()
    this.state = {
      choiceText: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.choiceText)
  }

  handleChange(event) {
    this.setState({
      choiceText: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            hintText='Additional Option'
            floatingLabelText='Additional Option'
            onChange={this.handleChange}
          />
          <RaisedButton type='submit' label='Add custom option' />
        </form>
      </div>
    )
  }
}
