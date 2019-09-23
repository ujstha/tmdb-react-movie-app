import React, { Component } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { BASE_URL, API_KEY } from "../../credentials";

class SingleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleMovieDetail: null,
      images: [],
      credits: [],
      loading: true
    };
  }
  componentDidMount() {
    const BASE_LINK = `${BASE_URL}/movie/${this.props.match.params.movie_id}`;
    axios
      .get(`${BASE_LINK}?api_key=${API_KEY}&language=${this.props.language}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          singleMovieDetail: res.data,
          loading: false
        });
      });
    axios
      .get(`${BASE_LINK}/images?api_key=${API_KEY}&language=${null}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          images: res.data,
          loading: false
        });
      });
      axios
      .get(`${BASE_LINK}/credits?api_key=${API_KEY}&language=${null}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          credits: res.data,
          loading: false
        });
      });
  }
  render() {
    const { singleMovieDetail, loading } = this.state;

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
          <div
            key={singleMovieDetail.id}
            className="col-6 offset-3 offset-md-0 offset-xs-3 col-md-3"
          >
            {singleMovieDetail.title}
            {singleMovieDetail.tagline}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleMovie;
