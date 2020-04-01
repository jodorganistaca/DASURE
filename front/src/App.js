import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './Components/Login.js';
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Books from "./Components/Books";
import Movies from "./Components/Movies";
import Workout from "./Components/Workout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/Home" component={Home} exact />
        <Route path="/Navbar" component={NavBar}/>
        <Route path="/books" component={Books}/>
        <Route path="/movies" component={Movies}/>
        <Route path="/workout" component={Workout}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
