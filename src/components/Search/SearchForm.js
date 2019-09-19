import React, { Component } from "react";
import axios from 'axios';
import { API_KEY, BASE_URL } from '../../credentials';

class Search extends Component {
    componentDidMount() {
        axios.get(`https://v2.sg.media-imdb.com/suggestion/a/ashoka`, {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
          }
          })
          .then(res => {
            console.log(res.data);
          })
    }
  render() {
    return (
      <div>
        {console.log(window.host)
        }
        <form>
          <input type="text" name="query" />
        </form>
      </div>
    );
  }
}

export default Search;
