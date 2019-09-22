import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SingleMovie from "./components/SingleMovieByID/SingleMovie";
import Main from "./components/Main";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" exact component={Main}></Route>
          <Route path="/movie/:movie_id" exact component={SingleMovie}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
