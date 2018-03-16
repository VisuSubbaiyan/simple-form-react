import React from 'react';
import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from '../app';

const Routes = () => (
  <Router history={createBrowserHistory()}>
    <App />
  </Router>
);

export default Routes;
