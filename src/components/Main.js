import React, { Component } from "react";
import axios from "axios";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../credentials";
import { Tabs, Tab, Typography } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import NavBar from "./NavBar/NavBar";
import PopularMovies from "./Popular/PopularMovies";
import TopRatedMovies from "./TopRated/TopRatedMovies";
import UpcomingMovies from "./Upcoming/UpcomingMovies";
import AllMovies from "./AllMovie/AllMovies";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, "Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listType: "popular",
      movieSearchList: [],
      responseData: null,
      language: "en",
      query: "",
      page: 1,
      hide: false,
      loading: true
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
          responseData: res.data,
          hide: true,
          loading: false
        });
      });
  };

  handlePageChange = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handleLangChange = e => {
    this.setState({ language: e.target.id });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === "") {
      this.setState({ hide: false });
    }
  };

  handleChange = (event, listType) => {
    this.setState({ listType });
  };

  render() {
    const {
      listType,
      hide,
      language,
      query,
      movieSearchList,
      loading
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <NavBar
          language={language}
          query={query}
          onChange={this.onInputChange}
          onSubmit={this.search}
          handleLangChange={this.handleLangChange}
        />
        <div>
          <div>
            <div
              className="row tab-container"
              style={hide ? { display: "none" } : {}}
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
                <PopularMovies
                  language={language}
                  imageBaseUrl={IMAGE_BASE_URL}
                />
              </Typography>
            ) : (
              ""
            )}
            {hide === false && listType === "top_rated" ? (
              <Typography component="div">
                <TopRatedMovies
                  language={language}
                  imageBaseUrl={IMAGE_BASE_URL}
                />
              </Typography>
            ) : (
              ""
            )}
            {hide === false && listType === "upcoming" ? (
              <Typography component="div">
                <UpcomingMovies
                  language={language}
                  imageBaseUrl={IMAGE_BASE_URL}
                />
              </Typography>
            ) : (
              ""
            )}
            {hide ? (
              <Typography component="div" style={{ marginTop: 85 }}>
                <AllMovies
                  allMovieList={movieSearchList}
                  loading={loading}
                  imageBaseUrl={IMAGE_BASE_URL}
                />
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

export default Main;
