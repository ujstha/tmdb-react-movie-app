import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { BASE_URL, API_KEY } from "../../credentials";

class TopRatedMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topRatedMovieList: [],
      page: 1,
      loading: true
    };
  }
  componentDidMount() {
    axios
      .get(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${this.state.page}&language=${this.props.language}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          topRatedMovieList: res.data.results,
          loading: false
        });
      });
  }
  render() {
    const { topRatedMovieList, loading } = this.state;

    if (loading) {
      return (
        <div style={{ position: "absolute", top: "46%", left: "46%" }}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          {topRatedMovieList.map((movie, index) => {
            return (
              <div
                key={index}
                className="col-8 offset-2 offset-md-0 offset-xs-3 col-md-3 p-2"
              >
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={this.props.imageBaseUrl + movie.poster_path}
                    alt={movie.title}
                    width="inherit"
                  />
                </Link>
                <br />
                {movie.title}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TopRatedMovies;
