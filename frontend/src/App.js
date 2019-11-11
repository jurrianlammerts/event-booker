import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import Nav from './components/Navigation/MainNavigation';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Page>
        <Switch>
          <Redirect from="/" to="auth" exact />
          <Route path="/auth" component={Auth} />
          <Route path="/events" component={Events} />
          <Route path="/bookings" component={Bookings} />
        </Switch>
      </Page>
    </BrowserRouter>
  );
}

export default App;

const Page = styled.main`
  margin: 4rem 2.5rem;
`;
