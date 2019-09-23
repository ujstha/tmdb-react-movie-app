import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

class AllMovies extends Component {
  render() {
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
          {this.props.allMovieList.map((movie, index) => {
            return (
              <div
                key={index}
                className="col-8 offset-2 offset-md-0 offset-xs-3 col-md-3 p-2"
              >
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={this.props.imageBaseUrl + `${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <br />
                <div style={{ maxWidth: 200 }}>
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

export default AllMovies;
