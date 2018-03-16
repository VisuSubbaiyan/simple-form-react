import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router';

import LoginForm from './components/login-form';

/**
 * `App` app container which render all children by router
 * @param {Object} props - Incoming react property
 * 
 * @returns {React.Element} - React component responsible to render children
 */
const App = (props) => (
  <div className="container">
    {/*Header compponent should be placed here*/}
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Redirect to="/login" />
    </Switch>
    {/*Footer compponent should be placed here*/}
  </div>
);

export default App;
