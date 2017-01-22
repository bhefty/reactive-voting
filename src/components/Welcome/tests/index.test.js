import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Welcome from '../index';

injectTapEventPlugin()

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <IntlProvider locale="en">
      <MuiThemeProvider>
        <Welcome />
      </MuiThemeProvider>
    </IntlProvider>
  , div);
});
