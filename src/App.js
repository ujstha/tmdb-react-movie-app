import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SingleMovie from "./components/SingleMovieByID/SingleMovie";
import Main from "./components/Main";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Main}></Route>
            <Route path="/movie/:movie_id" component={SingleMovie}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
