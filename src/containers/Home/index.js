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
  constructor() {
    super()
    this.state = {
      dashboardView: 'newPollForm'
    }
    this.handleView = this.handleView.bind(this)
  }


  handleView(view) {
    if (view === 'newPollForm' || view === 'myPolls') {
      this.setState({
        dashboardView: view
      })
    }
  }
  render() {
    let renderView
    if (this.state.dashboardView === 'newPollForm') {
      renderView = (
        <NewPollForm />
      )
    } else if (this.state.dashboardView === 'myPolls') {
      renderView = (
        <MyPolls />
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
        <MyPolls />
      </div>
    )
  }
}

Home.propTypes = {
  children: React.PropTypes.node
}

export default Home;
