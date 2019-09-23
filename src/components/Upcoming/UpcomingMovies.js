import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { BASE_URL, API_KEY } from "../../credentials";

class UpcomingMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingMovieList: [],
      page: 1,
      loading: true
    };
  }
  componentDidMount() {
    axios
      .get(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${this.state.page}&language=${this.props.language}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          upcomingMovieList: res.data.results,
          loading: false
        });
      });
  }
  render() {
    const { upcomingMovieList, loading } = this.state;

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
          {upcomingMovieList.map((movie, index) => {
            return (
              <div
                key={index}
                className="col-8 offset-2 offset-md-0 offset-xs-3 col-md-3 p-2"
              >
                <div className="movie-poster-container">
                  <div className="movie-poster">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        className="poster"
                        src={this.props.imageBaseUrl + `${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </Link>
                  </div>
                  <div className="vote-average">{movie.vote_average}</div>
                </div>
                <div className="movie-title">
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UpcomingMovies;
