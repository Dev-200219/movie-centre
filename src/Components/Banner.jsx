import React from "react";
import './Banner.css'
import {keys} from './keys.js'
import {movies} from './getMovies'
import axios from "axios";

class Banner extends React.Component {
    constructor() {
        super();
        this.state = {
            bannerMovie : ''
        }
    }

    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${keys.apiKey}&page=1`).then((moviesData) => {
            this.setState({
                bannerMovie : moviesData.data.results[0]
            })
        })
    }

    render() {
        return(
            this.state.bannerMovie ? 
            <div className="card banner-card">
                <img src={`https://image.tmdb.org/t/p/original${this.state.bannerMovie.backdrop_path}`} className="card-img-top" alt={`${this.state.bannerMovie.title}`}/>
                <h2 className="card-title banner-title">{`${this.state.bannerMovie.title}`}</h2>
                <p className="card-text banner-text">{`${this.state.bannerMovie.overview}`}</p>
            </div> : 
            <div className="loader">
                <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}

export default Banner;