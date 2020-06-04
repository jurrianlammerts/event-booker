import React, { useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Nav from './components/Navigation/MainNavigation';
import AuthContext from './context/AuthContext';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <Nav />
        <Page>
          <Switch>
            {token && <Redirect from="/" to="events" exact />}
            {token && <Redirect from="/auth" to="events" exact />}
            {!token && <Route path="/auth" component={AuthPage} />}
            <Route path="/events" component={EventsPage} />
            {token && <Route path="/bookings" component={BookingsPage} />}
            {!token && <Redirect to="/auth" exact />}
          </Switch>
        </Page>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;

const Page = styled.main`
  margin: 4rem 2.5rem;
`;
