import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import RaisedButton from 'material-ui/RaisedButton'

export default class ShareLinks extends Component {
  render() {
    return (
      <div>
        <RaisedButton
          fullWidth
          backgroundColor='#4099FF'
          onClick={() => {
            window.open(`http://twitter.com/share?text=Tweet test&url=${this.props.link}`, '',
             'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=300, width=600')
          }}
        >
          <span style={{'color': '#fff'}}><FontAwesome name='twitter' /> Share on Twitter</span>
        </RaisedButton>
      </div>
    )
  }
}
