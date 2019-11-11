import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Auth from './pages/Auth';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={null} />
      <Route path="/auth" component={Auth} />
      <Route path="/events" component={null} />
      <Route path="/bookings" component={null} />
    </BrowserRouter>
  );
}

export default App;
