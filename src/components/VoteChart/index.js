import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs'

import Wrapper from './Wrapper'
import UL from './UL'
import LI from './LI'
import P from './P'

export default class VoteChart extends Component {
  constructor() {
    super()
    this.state = {
      legend: ''
    }
  }
  componentDidMount() {
    let legend = this.ref.getChart().generateLegend()
    this.setState({ legend: legend })
  }

  render() {
    let { data, votes } = this.props
    let datasets = data.map((ds, idx) => {
      return <LI key={idx} style={{ border: `solid ${ds.color} 1em` }}><em>{ds.label}</em><P><b>Votes: {votes[idx].numVotes}</b></P></LI>
    })
    return (
      <Wrapper>
        <Doughnut ref={(ref) => this.ref = ref} data={this.props.data} height='300em' width='300em' />
        <UL>
          {datasets}
        </UL>
      </Wrapper>
    )
  }
}
