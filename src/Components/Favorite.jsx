import React from "react";
import './Favorite.css'
import { movies } from './getMovies'

class Favorite extends React.Component {
    constructor() {
        super();
        this.state = {
            genres : ['All Genres', 'Action', 'Comedy', 'Thriller'],
            currGenre : 'All Genres'
        }
    }

    changeGenre = (genre) => {
        if(genre === this.state.currGenre) return;

        this.setState({
            currGenre : genre
        })
    }

    render() {
        let allMovies = movies.results.slice(0, 5);
        
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

        return (
            <>
                <div className="row" style={{ width: "100%" }}>
                    <div className="col-3 genre-list-cont">
                        <ul className="list-group">
                            {
                                this.state.genres.map((genre) => {
                                    return (
                                        this.state.currGenre === genre ?
                                        <li className="list-group-item active" onClick={() => this.changeGenre(genre)}>{`${genre}`}</li> : 
                                        <li className="list-group-item" onClick={() => this.changeGenre(genre)}>{`${genre}`}</li> 
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className="col-9 mt-5">
                        <div className="row">
                            <input type="text" className="col" placeholder="Search"/>
                            <input type="number" className="col" placeholder="Row Count"/>
                        </div>
                        <div className="row">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Popularity</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        allMovies.map((movie, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <th scope="row">
                                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}/>
                                                        {movie.title}
                                                    </th>
                                                    <td>{genreids[movie.genre_ids[0]]}</td>
                                                    <td>{movie.popularity}</td>
                                                    <td>{movie.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger">Delete</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link">Previous</a></li>
                                    <li className="page-item"><a className="page-link">1</a></li>
                                    <li className="page-item"><a className="page-link">2</a></li>
                                    <li className="page-item"><a className="page-link">3</a></li>
                                    <li className="page-item"><a className="page-link">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Favorite;