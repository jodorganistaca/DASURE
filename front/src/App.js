import React ,{useEffect} from 'react';
import { createBrowserHistory as createHistory } from "history";
import './App.css';
import Profile from "./Components/Profile";
import Books from "./Components/Books";
import Movies from "./Components/Movies";
import Series from "./Components/Series";
import Workout from "./Components/Workout";
import Form from "./Components/FormCreator";
import HomePage from "./Components/HomePage";
import {loadUser} from "./actions/auth";
//
import Posts from "./Components/posts/Posts"
import Post from "./Components/post/Post"
import {Router, Route, Switch} from "react-router-dom";
import Login from "./Components/auth/Login" 
import Register from "./Components/auth/Register" 
import store from "./store"
import './App.css';
import { Provider } from 'react-redux';
import Checklist from './Components/user/Checklist';
const history = createHistory();
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
        <Router history={history}>
        <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/books" exact component={Books} />
        <Route path="/movies" exact component={Movies} />
        <Route path="/series" exact component={Series} />
        <Route path="/workout" exact component={Workout} />
        <Route path="/form" exact component={Form} />  
        <Route exact path="/signup"component={Register} ></Route>
        <Route exact path="/signin"component={Login} ></Route>
        <Route exact path="/forum"component={Posts} ></Route>
        <Route exact path="/posts/:id"component={Post} ></Route>  
      </Switch>
        </Router>
      </Provider>
  );
}

export default App;
