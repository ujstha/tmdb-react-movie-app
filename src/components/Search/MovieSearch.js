import React, { Component } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../credentials";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      listType: 'popular'
    };
  }
  UNSAFE_componentWillUpdate() {
    axios
      .get(`${BASE_URL}/movie/${this.state.listType}?api_key=${API_KEY}&page=${this.state.page}`)
      .then(res => console.log(res));
  }
  render() {
    return (
      <div style={{float: "right"}}>
        <form>
          <input type="text" name="query" />
        </form>
        <button onClick={() => {this.setState({listType: 'top_rated'})}}>+1</button>
      </div>
    );
  }
}

export default Search;
