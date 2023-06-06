import React from "react";
import { movies } from './getMovies'
import axios from "axios";
import './MovieList.css'
import {keys} from './keys.js'

class MovieList extends React.Component {
    constructor() {
        super();
        this.state = {
            currPage : 1,
            pagesArr : [1],
            movies : []
        }
    }

    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${keys.apiKey}&page=${this.state.currPage}`).then((moviesData) => {
            this.setState({
                movies : [...moviesData.data.results]
            })
        })
    }

    goToNextPage = () => {
        let newPage = this.state.currPage + 1;
        let newMovies = [];
        if(newPage > this.state.pagesArr.length) {
            axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${keys.apiKey}&page=${newPage}`).then((moviesData) => {
                newMovies = moviesData.data.results;
                
                //async function
                this.setState({
                    currPage : this.state.currPage + 1,
                    pagesArr : [...this.state.pagesArr, newPage],
                    movies : newMovies
                })
            })
        }
        else {
            axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${keys.apiKey}&page=${newPage}`).then((moviesData) => {
                newMovies = moviesData.data.results;
                
                this.setState({
                    currPage : this.state.currPage + 1,
                    movies : newMovies
                })
            })
        }
    }

    goToPrevPage = () => {
        let newPage = this.state.currPage - 1;
        let newMovies = [];
        if(newPage >= 1) {
            axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${keys.apiKey}&page=${newPage}`).then((moviesData) => {
                newMovies = moviesData.data.results;

                this.setState({
                    currPage : this.state.currPage - 1,
                    movies : newMovies
                })
            })
        }
    }

    goToCurrPage = (e) => {
        let newPage = Number(e.currentTarget.id);
        let newMovies = [];

        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${keys.apiKey}&page=${newPage}`).then((moviesData) => {
            newMovies = moviesData.data.results;

            this.setState({
                currPage : newPage,
                movies : newMovies
            })
        })
    }
    
    render() {
        let allMovies = this.state.movies;
        return (
                allMovies && allMovies.length > 0 ?
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
                                    <li className="page-item" onClick={this.goToPrevPage}><button className="page-link">Previous</button></li>
                                    {
                                        this.state.pagesArr.map((page) => {
                                            return (
                                                <li className="page-item" id={`${page}`} key={page} onClick={this.goToCurrPage}><button className="page-link">{`${page}`}</button></li>
                                            )
                                        })
                                    }
                                    <li className="page-item" onClick={this.goToNextPage}><button className="page-link">Next</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </> :
                <div className="cards-loader">
                    <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
        )
    }
}

export default MovieList;