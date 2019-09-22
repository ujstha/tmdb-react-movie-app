import React, { Component } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../credentials";

class TopRatedMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      topRatedMovieList: []
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
          topRatedMovieList: res.data.results
        });
      });
  }
  render() {
    const { topRatedMovieList } = this.state;
    return (
      <div>
        <div className="row">
          {topRatedMovieList.map((movie, index) => {
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

export default TopRatedMovies;
