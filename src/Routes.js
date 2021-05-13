import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import FeedMain from './pages/feed/FeedMain/FeedMain';
import FeedDetail from './pages/feed/FeedDetail/FeedDetail';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FeedMain} />
        <Route exact path="/detail/:id" component={FeedDetail} />
      </Switch>
    </Router>
  );
}

export default Routes;
