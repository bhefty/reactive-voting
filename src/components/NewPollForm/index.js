import React, { Component } from 'react'
import update from 'immutability-helper'
import TextField from 'material-ui/TextField'
import { blue300 } from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import RaisedButton from 'material-ui/RaisedButton'

import Wrapper from './Wrapper'
import PollName from './PollName'
import Options from './Options'

class NewPollForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: {
        pollName: '',
        opt1: '',
        opt2: ''
      },
      options: [],
      optionIdx: 3
    }
    this.addOption = this.addOption.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  addOption() {
    const idx = this.state.optionIdx
    const newOption = (
      <TextField
        hintText='Option'
        floatingLabelText='Option'
        onChange={(e) => this.handleChange(e, 'opt' + idx)}
      />
    )
    this.setState({
      options: this.state.options.concat(newOption),
      optionIdx: this.state.optionIdx + 1
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.values)
  }

  handleChange(event, ref) {
    this.setState({
      values: update(this.state.values, { [ref]: {$set: event.target.value} })
    })
  }

  render() {
    const styles = {
      errorStyle: {
        color: blue300
      },
      floatingLabelFocusStyle: {
        color: blue300
      },
      submitButtonStyle: {
        margin: '20px auto',
        display: 'block',
        maxWidth: '10em'
      }
    }

    return (
      <Wrapper>
        <h1>New Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <PollName>
            <TextField
              required
              hintText='What is your favorite movie?'
              floatingLabelText='Poll Name'
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              errorText='Poll name required'
              errorStyle={styles.errorStyle}
              onChange={(e) => this.handleChange(e, 'pollName')}
            />
          </PollName>
          <Options>
            <li>
              <TextField
                required
                hintText='Die Hard'
                errorText='Option 1 required'
                errorStyle={styles.errorStyle}
                floatingLabelText='Option'
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={(e) => this.handleChange(e, 'opt1')}
              />
            </li>
            <li>
              <TextField
                required
                hintText='Blazing Saddles'
                errorText='Option 2 required'
                errorStyle={styles.errorStyle}
                floatingLabelText='Option'
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                onChange={(e) => this.handleChange(e, 'opt2')}
                ref='opt2'
              />
            </li>
            {this.state.options.map((option, idx) => {
              return (
                <li key={idx}>{option}</li>
              )
            })}
          </Options>
          <FloatingActionButton mini={true} style={{ margin: '20px' }}>
            <ContentAdd onClick={() => this.addOption()} />
          </FloatingActionButton>
          <RaisedButton type='submit' onClick={this.handleSubmit} style={styles.submitButtonStyle} backgroundColor='#58B957' labelColor='#fff' label='Submit' />
        </form>
      </Wrapper>
    )
  }
}

export default NewPollForm
