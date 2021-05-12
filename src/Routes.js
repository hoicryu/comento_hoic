import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import feedMain from './pages/feed/FeedMain/FeedMain';
import feedDetail from './pages/feed/FeedDetail/FeedDetail';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={feedMain} />
        <Route exact path="/detail/:id" component={feedDetail} />
      </Switch>
    </Router>
  );
}

export default Routes;
