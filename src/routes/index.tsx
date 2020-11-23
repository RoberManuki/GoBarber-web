import React from 'react';
import { Switch } from 'react-router-dom';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: React.FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/dashboard" exact component={Dashboard} isPrivate />
      </Switch>
    </>
  );
};

export default Routes;
