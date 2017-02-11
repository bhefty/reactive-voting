import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'

import NewPollForm from '../../components/NewPollForm'
import MyPolls from '../../components/MyPolls'
import PollSubmitted from '../../components/PollSubmitted'

import Wrapper from './Wrapper'
import H1 from './H1'
import P from './P'
import ButtonWrapper from './ButtonWrapper'
import messages from './messages'




class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dashboardView: 'newPollForm',
      profile: props.auth.getProfile()
    }
    this.handleView = this.handleView.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(formData) {
    const pollData = {
      author: this.state.profile.name,
      authorID: this.state.profile.user_id,
      title: formData.pollName
    }
    let choices = Object.values(formData).splice(1)
    pollData.options = choices.map((choice) => {
      return { choice: choice }
    })
    fetch('/api/polls', {
      method: 'post',
      body: JSON.stringify(pollData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => this.handleView('pollSubmitted'))
  }

  handleView(view) {
    if (view === 'newPollForm' || view === 'myPolls' || view === 'pollSubmitted') {
      this.setState({
        dashboardView: view
      })
    }
  }
  render() {
    let renderView
    if (this.state.dashboardView === 'newPollForm') {
      renderView = (
        <NewPollForm onSubmit={this.onSubmit} />
      )
    } else if (this.state.dashboardView === 'myPolls') {
      renderView = (
        <MyPolls authorID={this.state.profile.user_id}/>
      )
    } else if (this.state.dashboardView === 'pollSubmitted') {
      renderView = (
        <PollSubmitted />
      )
    }
    return (
      <div>
        <Wrapper>
          <H1>
            <FormattedMessage {...messages.dashboardHeader} />
          </H1>
          <P>
            <FormattedMessage {...messages.dashboardMessage} />
          </P>
          <ButtonWrapper>
            <RaisedButton onClick={() => this.handleView('newPollForm')} backgroundColor='#58B957' labelColor='#fff' label='New Poll' />
          </ButtonWrapper>
          <ButtonWrapper>
            <RaisedButton onClick={() => this.handleView('myPolls')} backgroundColor='#3E8ACC' labelColor='#fff' label='My Polls' />
          </ButtonWrapper>
        </Wrapper>
        {renderView}
      </div>
    )
  }
}

Home.propTypes = {
  children: React.PropTypes.node
}

export default Home;
