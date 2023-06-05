import React from "react";
import { movies } from './getMovies'
import './MovieList.css'

class MovieList extends React.Component {
    render() {
        let allMovies = movies.results;
        return (
            allMovies ?
                <>
                    <h3 className="text-center m-3"><strong>Trending</strong></h3>
                    <div className="all-cards-container">
                        {
                            allMovies.map((movie, idx) => {
                                return (
                                    <div className="card single-movie-card mb-4" key={idx}>
                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top"/>
                                        <div className="card-body single-card-body">
                                            <h5 className="card-title">{`${movie.title}`}</h5>
                                            <p className="card-text single-card-text">{`${movie.overview}`}</p>
                                            <button className="btn btn-primary">Add to Favorites</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="page-navigation">
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </> :
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
        )
    }
}

export default MovieList;