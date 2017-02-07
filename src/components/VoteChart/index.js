import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs'

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
    let { data } = this.props
    let datasets = data.map((ds, idx) => {
      return <li key={idx}><span style={{ backgroundColor: ds.color }}>&nbsp;</span> {ds.label}</li>
    })
    return (
      <div>
        <Doughnut ref={(ref) => this.ref = ref} data={this.props.data} />
        <ul>
          {datasets}
        </ul>
      </div>
    )
  }
}
