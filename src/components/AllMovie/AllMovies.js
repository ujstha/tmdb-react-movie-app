import React, { Component } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { BASE_URL, API_KEY } from "../../credentials";

class AllMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMovieList: [],
      page: 1,
      loading: true
    };
  }
  componentDidMount() {
    axios
      .get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.props.query}&page=${this.state.page}&language=${this.props.language}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          allMovieList: res.data.results,
          loading: false
        });
      });
  }
  render() {
    const { allMovieList, loading } = this.state;

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
          {allMovieList.map((movie, index) => {
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

export default AllMovies;
