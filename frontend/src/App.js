import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';

import AuthContext from './context/AuthContext';
import EventsPage from './pages/Events';
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';

import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ForgotPasswordPage from './pages/ForgotPassword';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    savedToken && setToken(savedToken);
  }, []);

  const login = (token, userId, tokenExpiration) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <Page>
          <Switch>
            {token && <Redirect from="/signup" to="dashboard" exact />}
            {token && <Redirect from="/signin" to="dashboard" exact />}

            {!token && (
              <Route path="/forgot-password" component={ForgotPasswordPage} />
            )}
            {!token && <Route path="/signup" component={SignUpPage} />}
            {!token && <Route path="/signin" component={SignInPage} />}
            {token && <Route path="/dashboard" component={DashboardPage} />}

            <Route path="/events" component={EventsPage} />
            <Route path="/" component={HomePage} />
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
