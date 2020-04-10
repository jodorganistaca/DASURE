import React from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'
import { createBrowserHistory as createHistory } from "history";
import './App.css';
import Login from './Components/Login.js';
import Home from "./Components/Home";
import NavBar from "./Components/CustomNavBar";
import Books from "./Components/Books";
import Movies from "./Components/Movies";
import Workout from "./Components/Workout";
import Form from "./Components/FormCreator";
import HomePage from "./Components/HomePage";
import TopBar from "./Components/TopBar";

const history = createHistory();

function App() {
  return (
      <div className="App">
        <Router history={history}>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/custom-nav-bar" exact component={NavBar} />
          <Route path="/books" exact component={Books} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/workout" exact component={Workout} />
          <Route path="/form" exact component={Form} />
        </Router>
      </div>
  );
}

export default App;
