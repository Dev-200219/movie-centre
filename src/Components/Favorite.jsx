import React from "react";
import './Favorite.css'
import { keys} from "./keys";

class Favorite extends React.Component {
    constructor() {
        super();
        this.state = {
            favMovies : [],
            currGenre : 'All Genre',
            genres : [],
            currText : ''
        }
    }

    componentDidMount() {
        let favoriteMovies = JSON.parse(localStorage.getItem('favorite-movies') || '[]');
        let favMovieGenre = [];

        favoriteMovies.map((movie) => {
            if(!favMovieGenre.includes(keys.genreids[movie.genre_ids[0]])) {
                favMovieGenre.push(keys.genreids[movie.genre_ids[0]])
            }
        });

        favMovieGenre.unshift('All Genre');

        this.setState({
            favMovies : favoriteMovies,
            currGenre : 'All Genre',
            genres : favMovieGenre
        })
    }

    changeGenre = (genre) => {
        if(genre === this.state.currGenre) return;
        
        this.setState({
            currGenre : genre,
        })
    }

    removeFromFavorite = (movie) => {
        let newFavMovies = this.state.favMovies.filter((singleMovie) => singleMovie.id !== movie.id)
        let storageMovies = JSON.parse(localStorage.getItem('favorite-movies') || '[]');

        let favMovieGenre = [];

        newFavMovies.map((movie) => {
            if(!favMovieGenre.includes(keys.genreids[movie.genre_ids[0]])) {
                favMovieGenre.push(keys.genreids[movie.genre_ids[0]])
            }
        });

        favMovieGenre.unshift('All Genre');

        storageMovies = storageMovies.filter((movieObj) => {
            return movieObj.id !== movie.id;
        })

        this.setState({
            favMovies : [...newFavMovies],
            genres : favMovieGenre
        })   
        
        localStorage.setItem('favorite-movies', JSON.stringify(storageMovies));
    }

    handleSearchBar = (e) => {
        this.setState({
            currText : e.currentTarget.value
        })
    }

    sortDesc = (property) => {
        let sortedArr = this.state.favMovies;
        sortedArr.sort((a, b) => {
            return b[property] - a[property];
        })

        this.setState({
            favMovies : sortedArr
        })
    }
    
    sortAsce = (property) => {
        let sortedArr = this.state.favMovies;
        sortedArr.sort((a, b) => {
            return a[property] - b[property];
        })

        this.setState({
            favMovies : sortedArr
        })
    }

    render() {
        let favoriteMovies = this.state.favMovies.filter((movie) => {
            return keys.genreids[movie.genre_ids[0]] === this.state.currGenre || this.state.currGenre === 'All Genre';
        });

        favoriteMovies = favoriteMovies.filter((movie) => {
            return movie.title.toLowerCase().includes(this.state.currText.toLowerCase());
        })

        let genres = this.state.genres;
        let genreids = keys.genreids;

        return (
            genres.length > 0 ?
            <>
                <div className="row" style={{ width: "100%" }}>
                    <div className="col-3 genre-list-cont">
                        <ul className="list-group">
                            {
                                genres.map((genre, idx) => {
                                    return (
                                        this.state.currGenre === genre ?
                                        <li className="list-group-item active" key={idx} onClick={() => this.changeGenre(genre)}>{`${genre}`}</li> : 
                                        <li className="list-group-item" key={idx} onClick={() => this.changeGenre(genre)}>{`${genre}`}</li> 
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className="col-9 mt-5">
                        <div className="row">
                            <input type="text" className="col" placeholder="Search" value={this.state.currText} onChange={this.handleSearchBar}/>
                            <input type="number" className="col" placeholder="Row Count"/>
                        </div>
                        <div className="row">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i className="fa-solid fa-sort-up" onClick={() => {
                                            this.sortDesc('popularity')
                                        }}/>Popularity<i className="fa-solid fa-sort-down" onClick={() => {
                                            this.sortAsce('popularity')
                                        }}/></th>
                                        <th scope="col"><i className="fa-solid fa-sort-up" onClick={() => {
                                            this.sortDesc('vote_average')
                                        }}/>Rating<i className="fa-solid fa-sort-down" onClick={() => {
                                            this.sortAsce('vote_average')
                                        }}/></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        favoriteMovies.map((movie, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <th scope="row">
                                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}/>
                                                        {movie.title}
                                                    </th>
                                                    <td>{genreids[movie.genre_ids[0]]}</td>
                                                    <td>{movie.popularity}</td>
                                                    <td>{movie.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={()=>this.removeFromFavorite(movie)}>Delete</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><button className="page-link">Previous</button></li>
                                    <li className="page-item"><button className="page-link">1</button></li>
                                    <li className="page-item"><button className="page-link">2</button></li>
                                    <li className="page-item"><button className="page-link">3</button></li>
                                    <li className="page-item"><button className="page-link">Next</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </> :
            <div>Not loaded</div>
        )
    }
}

export default Favorite;