import React, { Component } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { BASE_URL, API_KEY } from "../../credentials";

class PopularMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovieList: [],
      page: 1,
      loading: true
    };
  }
  componentDidMount() {
    axios
      .get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${this.state.page}&language=${this.props.language}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          popularMovieList: res.data.results,
          loading: false
        });
      });
  }
  render() {
    const { popularMovieList, loading } = this.state;

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
          {popularMovieList.map((movie, index) => {
            return (
              <div
                key={index}
                className="col-6 offset-3 offset-md-0 offset-xs-3 col-md-3"
              >
                {movie.title}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PopularMovies;
