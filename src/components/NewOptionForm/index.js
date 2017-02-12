import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class NewOptionForm extends Component {
  constructor() {
    super()
    this.state = {
      choiceText: '',
      showForm: false
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
        {
          (this.state.showForm) ?
            <form onSubmit={this.handleSubmit}>
              <TextField
                hintText='Additional Option'
                floatingLabelText='Additional Option'
                onChange={this.handleChange}
              />
              <RaisedButton type='submit' label='Vote on new option' primary={true} />
            </form>
          :
            <RaisedButton
              fullWidth
              primary={true}
              label='Make new option'
              onClick={() => this.setState({showForm: true})}
            />
        }
      </div>
    )
  }
}
