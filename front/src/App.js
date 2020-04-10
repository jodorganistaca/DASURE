import React from 'react';
import { Route, Router } from 'react-router-dom'
import { createBrowserHistory as createHistory } from "history";
import './App.css';
import Login from './Components/Login.js';
import Books from "./Components/Books";
import Movies from "./Components/Movies";
import Series from "./Components/Series";
import Workout from "./Components/Workout";
import Form from "./Components/FormCreator";
import HomePage from "./Components/HomePage";

const history = createHistory();

function App() {
  return (
      <div className="App">
        <Router history={history}>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/books" exact component={Books} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/series" exact component={Series} />
          <Route path="/workout" exact component={Workout} />
          <Route path="/form" exact component={Form} />
        </Router>
      </div>
  );
}

export default App;
