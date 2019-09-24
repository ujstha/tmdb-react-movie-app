import React, { Component } from "react";
import axios from "axios";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../credentials";
import { Tabs, Tab } from "@material-ui/core";
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

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const searchParam = query.get("query");
    this.setState({ query: searchParam });

    if (searchParam === "" || this.props.location.search === "") {
      return this.props.history.push(``);
    } else {
      axios
        .get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchParam}&page=${this.state.page}&language=${this.state.language}`
        )
        .then(res => {
          console.log(res);
          this.setState({
            movieSearchList: res.data.results,
            responseData: res.data,
            hide: true,
            loading: false
          });
          console.log(this.props);
        });
    }
  }

  search = e => {
    e.preventDefault();
    this.props.history.push(`/?query=${this.state.query}`);
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
        console.log(this.props);
      });
  };

  handleLangChange = e => {
    this.setState({ language: e.target.id });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === "") {
      this.setState({ hide: false });
      this.props.history.push(`/`);
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
              <PopularMovies
                language={language}
                imageBaseUrl={IMAGE_BASE_URL}
              />
            ) : (
              ""
            )}
            {hide === false && listType === "top_rated" ? (
              <TopRatedMovies
                language={language}
                imageBaseUrl={IMAGE_BASE_URL}
              />
            ) : (
              ""
            )}
            {hide === false && listType === "upcoming" ? (
              <UpcomingMovies
                language={language}
                imageBaseUrl={IMAGE_BASE_URL}
              />
            ) : (
              ""
            )}
            {hide ? (
              <AllMovies
                allMovieList={movieSearchList}
                query={query}
                loading={loading}
                language={language}
                imageBaseUrl={IMAGE_BASE_URL}
              />
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
