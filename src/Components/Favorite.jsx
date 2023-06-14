import React from "react";
import './CSS/Favorite.css'
import { keys} from "./keys";

class Favorite extends React.Component {
    constructor() {
        super();
        this.state = {
            favMovies : [],
            currGenre : 'All Genre',
            genres : [],
            currText : '',
            rowsPerPage : 5,
            currPage : 1,
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
            currPage : 1
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

    handleRows = (e) => {
        if(!Number(e.currentTarget.value) || Number(e.currentTarget.value) <= 0) {
            alert(`Not a valid value for rows`);
            return;
        }

        this.setState({
            rowsPerPage : e.currentTarget.value
        })
    }

    goToNextPage = (pagesArr) => {
        let newPage = this.state.currPage + 1;
        if(newPage > pagesArr.length) {     
            
        }
        else {
            this.setState({
                currPage : this.state.currPage + 1,
            })
        }
    }

    goToPrevPage = () => {
        let newPage = this.state.currPage - 1;
        if(newPage >= 1) {
            this.setState({
                currPage : this.state.currPage - 1,
            })
        }
    }

    goToCurrPage = (e) => {
        let newPage = Number(e.currentTarget.id.split('-')[2]);
        this.setState({
            currPage : newPage,
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
        let genreids = keys.genreids;
        let genres = this.state.genres;

        let favoriteMovies = this.state.favMovies.filter((movie) => {
            return genreids[movie.genre_ids[0]] === this.state.currGenre || this.state.currGenre === 'All Genre';
        });

        favoriteMovies = favoriteMovies.filter((movie) => {
            let title = movie.title ? movie.title : movie.name;
            return title.toLowerCase().includes(this.state.currText.toLowerCase());
        })

        let pages = Math.ceil(favoriteMovies.length/this.state.rowsPerPage);
        let pagesArr = [];
        
        for(let i = 1; i <= pages; i++){
            pagesArr.push(i);
        }

        let si = (this.state.currPage - 1) * Number(this.state.rowsPerPage);
        let ei = si + Number(this.state.rowsPerPage);
        favoriteMovies = favoriteMovies.slice(si, ei);

        return (
            genres.length > 1 ?
            <>
                <div className="row" style={{ width: "100%" }}>
                    <div className="col-md-3 col-sm-12 genre-list-cont">
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

                    <div className="mobile-view col-md-9 col-sm-4 mt-5">
                        <div className="row">
                            <input type="text" className="col" placeholder="Search" value={this.state.currText} onChange={this.handleSearchBar}/>
                            <input type="number" className="col" placeholder="Row Count" value={this.state.rowsPerPage} onChange={this.handleRows}/>
                        </div>
                        <div className="row" style={{overflow:'auto'}}>
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
                                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt = {`${movie.title ? movie.title : movie.name}`}/>
                                                        {movie.title ? movie.title : movie.name}
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
                                    <li className="page-item" onClick={this.goToPrevPage}><button className="page-link">Previous</button></li>
                                    {
                                        pagesArr.map((page) => {
                                            return (
                                                <li className="page-item" id={`fav-page-${page}`} key={page} onClick={this.goToCurrPage}><button className="page-link">{`${page}`}</button></li>
                                            )
                                        })
                                    }
                                    <li className="page-item" onClick={() => this.goToNextPage(pagesArr)}><button className="page-link">Next</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </> :
            <div className="no-favorite">
                <h1>No Item in Favorites</h1>
            </div>
        )
    }
}

export default Favorite;