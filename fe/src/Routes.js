import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import EditContact from './pages/EditContact';
import NewContact from './pages/NewContact';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  );
}

export default Routes;
