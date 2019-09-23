import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../credentials';

class SearchMovieByGenre extends Component {
    componentDidMount() {
        axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${this.props.match.params.genre_id}&language=en-US`).then(res => {
            console.log(res.data);
        })

    }
    render() {
        return (
            <div>hello</div>
        )
    }
}

export default SearchMovieByGenre;