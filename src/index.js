import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { IntlProvider } from 'react-intl'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from './routes'

import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
  <IntlProvider locale="en">
    <MuiThemeProvider>
      <Routes history={browserHistory} />
    </MuiThemeProvider>
  </IntlProvider>,
  document.getElementById('root')
);
