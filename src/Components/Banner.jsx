import React from "react";
import './Banner.css'
import {movies} from './getMovies'

class Banner extends React.Component {
    render() {
        let bannerMovie = movies.results[0];
        return(
            bannerMovie ? 
            <div className="card banner-card">
                <img src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`} className="card-img-top" alt={`${bannerMovie.title}`}/>
                <h2 className="card-title banner-title">{`${bannerMovie.title}`}</h2>
                <p className="card-text banner-text">{`${bannerMovie.overview}`}</p>
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