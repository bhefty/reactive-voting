import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Navigation from '../index';

injectTapEventPlugin()

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MuiThemeProvider>
      <Navigation />
    </MuiThemeProvider>
  , div);
});
