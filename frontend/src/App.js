import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthContext from './context/AuthContext';
import EventsPage from './pages/Events';
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';
import InboxPage from './pages/Inbox';

import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ForgotPasswordPage from './pages/ForgotPassword';

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedProfile = JSON.parse(localStorage.getItem('profile'));

    console.log('savedUser: ', savedUser);
    console.log('savedProfile: ', savedProfile);
    savedUser && setUser(savedUser);
    savedProfile && setProfile(savedProfile);
  }, []);

  const editProfile = (data) => {
    console.log(data);
    localStorage.setItem('profile', JSON.stringify(data));

    setProfile(profile);
  };

  const login = (name, token, userId, tokenExpiration) => {
    const user = { userId, token, name };
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{ user, userId, profile, login, logout, editProfile }}
      >
        <Switch>
          {user && <Redirect from="/signup" to="dashboard" exact />}
          {user && <Redirect from="/signin" to="dashboard" exact />}
          {!user && (
            <Route path="/forgot-password" component={ForgotPasswordPage} />
          )}
          {!user && <Route path="/signup" component={SignUpPage} />}
          {!user && <Route path="/signin" component={SignInPage} />}
          {user && <Route path="/dashboard" component={DashboardPage} />}
          {user && <Route path="/inbox" component={InboxPage} />}
          <Route path="/events" component={EventsPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
