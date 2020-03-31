import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './Components/Login.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
