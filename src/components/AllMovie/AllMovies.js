import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../credentials';
import { CircularProgress } from "@material-ui/core";

class AllMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      page: 1
    }
  }
  componentDidMount() {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&page=${this.state.page}&language=${this.props.language}`
      )
      .then(res => {
        console.log(res.data.genres);
        this.setState({
          genres: res.data.genres
        });
      });
  }
  render() {
    const { genres } = this.state;
    if (this.props.loading) {
      return (
        <div style={{ position: "absolute", top: "46%", left: "46%" }}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          {this.props.allMovieList.length === 0 ? (
            <div
              className="text-center"
              style={{ marginTop: "25%", width: "100%" }}
            >
              <h2>
                Search Results not found for "
                <span style={{ color: "#f48fb1" }}>{this.props.query}</span>"
              </h2>
            </div>
          ) : (
            this.props.allMovieList.map((movie, index) => {
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
                        <div className="hover-icon">
                          <div className="read-more">
                            <i
                              className="material-icons"
                              style={{ fontSize: 40 }}
                            >
                              menu
                            </i>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="vote-average">{movie.vote_average}</div>
                  </div>
                  <div className="movie-title">
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </div>
                  <div className="genre">
                    <small>
                      {genres.map((genreName, index) => (
                        <Link to={`/genres/${genreName.id}`} key={index}>
                          {movie.genre_ids[0] === genreName.id ||
                          movie.genre_ids[1] === genreName.id ||
                          movie.genre_ids[2] === genreName.id ||
                          movie.genre_ids[3] === genreName.id ||
                          movie.genre_ids[4] === genreName.id ||
                          movie.genre_ids[5] === genreName.id ||
                          movie.genre_ids[6] === genreName.id ? (
                            <span>{(index ? " " : "") + genreName.name}</span>
                          ) : (
                            ""
                          )}
                        </Link>
                      ))}
                    </small>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default AllMovies;
