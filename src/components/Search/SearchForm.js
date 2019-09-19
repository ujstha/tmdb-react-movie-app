import React, { Component } from "react";
import axios from 'axios';
import { API_KEY, BASE_URL } from '../../credentials';

class Search extends Component {
    componentDidMount() {
        axios.get(`https://v2.sg.media-imdb.com/suggestion/a/ashoka.json`)
          .then(res => {
            console.log(res.data);
          })
    }
  render() {
    return (
      <div>
        <form>
          <input type="text" name="query" />
        </form>
      </div>
    );
  }
}

export default Search;
