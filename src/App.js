import React, { Component } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "./credentials";
import { Tabs, Tab, Typography } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NavBar from "./components/NavBar/NavBar";
import PopularMovies from "./components/Popular/PopularMovies";
import TopRatedMovies from "./components/TopRated/TopRatedMovies";
import UpcomingMovies from "./components/Upcoming/UpcomingMovies";
import AllMovies from "./components/AllMovie/AllMovies";
import "./App.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, "Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listType: "popular",
      movieSearchList: [],
      language: 'en',
      query: "",
      page: 1,
      hide: false
    };
  }

  search = e => {
    e.preventDefault();
    axios
      .get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.state.query}&page=${this.state.page}&language=${this.state.language}`
      )
      .then(res => {
        console.log(res);
        this.setState({
          movieSearchList: res.data.results,
          hide: true
        });
      });
  };

  handleLangChange = e => {
    this.setState({language: e.target.id});
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.value === "") {
      this.setState({hide: false})
    }
  };

  handleChange = (event, listType) => {
    this.setState({ listType });
  };

  render() {
    const { listType, hide, language, query } = this.state;
    
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <NavBar
            language={language}
            query={query}
            onChange={this.onInputChange}
            onSubmit={this.search}
            handleLangChange={this.handleLangChange}
          />
          <div className="container">
            <div
              className="row tab-container"
              style={hide ? {display: 'none'} : {}}
            >
              <Tabs
                value={listType}
                onChange={this.handleChange}
                className="tab-centered"
              >
                <Tab value="popular" label="Popular" />
                <Tab value="top_rated" label="Top Rated" />
                <Tab value="upcoming" label="Upcoming" />
              </Tabs>
            </div>
            {hide === false && listType === "popular" ? (
              <Typography component="div">
                <PopularMovies language={language} />
              </Typography>
            ) : (
              ""
            )}
            {hide === false && listType === "top_rated" ? (
              <Typography component="div">
                <TopRatedMovies language={language} />
              </Typography>
            ) : (
              ""
            )}
            {hide === false && listType === "upcoming" ? (
              <Typography component="div">
                <UpcomingMovies language={language} />
              </Typography>
            ) : (
              ""
            )}
            {hide ? (
              <Typography component="div" style={{marginTop: 85}}>
                <AllMovies query={query} language={language} />
              </Typography>
            ) : (
              ""
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
