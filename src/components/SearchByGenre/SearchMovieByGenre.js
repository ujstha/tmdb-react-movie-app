import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../../credentials";
import { CircularProgress } from "@material-ui/core";

class SearchMovieByGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieListByGenre: [],
      genres: [],
      loading: true,
      page: 1
    };
  }
  componentDidMount() {
    axios
      .get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${this.props.match.params.genre_id}&language=en-US`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ movieListByGenre: res.data.results, loading: false });
      });
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&page=${this.state.page}&language=en-US`
      )
      .then(res => {
        console.log(res.data.genres);
        this.setState({
          genres: res.data.genres,
          loading: false
        });
      });
  }
  UNSAFE_componentWillUpdate() {
    axios
      .get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${this.props.match.params.genre_id}&language=en-US`
      )
      .then(res => {
        this.setState({ movieListByGenre: res.data.results, loading: false });
      });
  }
  render() {
    const { movieListByGenre, genres, loading } = this.state;

    if (loading) {
      return (
        <div style={{ position: "absolute", top: "46%", left: "46%" }}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    return (
      <div>
        {genres.map((genreName, index) => (
          <Link to={`/genres/${genreName.id}`} key={index}>
            {Number(this.props.match.params.genre_id) === genreName.id
              ? genreName.name
              : ""}
          </Link>
        ))}
        <div className="row">
          {movieListByGenre.map((movie, index) => {
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
                        src={IMAGE_BASE_URL + `${movie.poster_path}`}
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
          })}
        </div>
      </div>
    );
  }
}

export default SearchMovieByGenre;
