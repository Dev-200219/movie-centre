import React from "react";
import './CSS/Banner.css'
import axios from "axios";

class MovieBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerMovies : [],
        }
    }

    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/trending/${this.props.type}/day?api_key=${process.env.REACT_APP_TMBD_API_KEY}&page=5`).then((moviesData) => {
            this.setState({
                bannerMovies : moviesData.data.results.slice(0, 5)
            })
        })
    }

    //can be used if we want to reuse the component by changing props, to avoid infinite loop we can compare prevProps which we receive as an argument to currProps(this.props), if they are not same then we can update state and re-render the page  
    componentDidUpdate(prevProps) {
        if(prevProps.type === this.props.type) return;
        
        axios.get(`https://api.themoviedb.org/3/trending/${this.props.type}/day?api_key=${process.env.REACT_APP_TMBD_API_KEY}&page=5`).then((moviesData) => {
            this.setState({
                bannerMovies : moviesData.data.results.slice(0, 5)
            })
        })
    }

    //using ref on any element we can click on it by mentioning it in the tag
    activateCarosuel = (e) => {
        setTimeout(() => {
            if(e)
            e.click();
        }, 1500)
    }

    render() {
        let allMovies = this.state.bannerMovies;
        return(
            allMovies.length > 0 ?
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval = '3500'>
                                <div className="card banner-card d-block w-100">
                                    <img src={`https://image.tmdb.org/t/p/original${allMovies[0].backdrop_path}`} className="card-img-top" alt={`${allMovies[0].title ? allMovies[0].title : allMovies[0].name}`}/>
                                    <h2 className="card-title banner-title">{`${allMovies[0].title ? allMovies[0].title : allMovies[0].name}`}</h2>
                                    <p className="card-text banner-text">{`${allMovies[0].overview}`}</p>
                                </div> 
                            </div>
                            <div className={`carousel-item`}  data-bs-interval = '3500'>
                                <div className="card banner-card d-block w-100">
                                    <img src={`https://image.tmdb.org/t/p/original${allMovies[1].backdrop_path}`} className="card-img-top" alt={`${allMovies[1].title ? allMovies[1].title : allMovies[1].name}`}/>
                                    <h2 className="card-title banner-title">{`${allMovies[1].title ? allMovies[1].title : allMovies[1].name}`}</h2>
                                    <p className="card-text banner-text">{`${allMovies[1].overview}`}</p>
                                </div> 
                            </div>
                            <div className={`carousel-item`}  data-bs-interval = '3500'>
                                <div className="card banner-card d-block w-100">
                                    <img src={`https://image.tmdb.org/t/p/original${allMovies[2].backdrop_path}`} className="card-img-top" alt={`${allMovies[2].title ? allMovies[2].title : allMovies[2].name}`}/>
                                    <h2 className="card-title banner-title">{`${allMovies[2].title ? allMovies[2].title : allMovies[2].name}`}</h2>
                                    <p className="card-text banner-text">{`${allMovies[2].overview}`}</p>
                                </div> 
                            </div>
                            <div className={`carousel-item`}  data-bs-interval = '3500'>
                                <div className="card banner-card d-block w-100">
                                    <img src={`https://image.tmdb.org/t/p/original${allMovies[3].backdrop_path}`} className="card-img-top" alt={`${allMovies[3].title ? allMovies[3].title : allMovies[3].name}`}/>
                                    <h2 className="card-title banner-title">{`${allMovies[3].title ? allMovies[3].title : allMovies[3].name}`}</h2>
                                    <p className="card-text banner-text">{`${allMovies[3].overview}`}</p>
                                </div> 
                            </div>
                            <div className={`carousel-item`}  data-bs-interval = '3500'>
                                <div className="card banner-card d-block w-100">
                                    <img src={`https://image.tmdb.org/t/p/original${allMovies[4].backdrop_path}`} className="card-img-top" alt={`${allMovies[4].title ? allMovies[4].title : allMovies[4].name}`}/>
                                    <h2 className="card-title banner-title">{`${allMovies[4].title ? allMovies[4].title : allMovies[4].name}`}</h2>
                                    <p className="card-text banner-text">{`${allMovies[4].overview}`}</p>
                                </div> 
                            </div>
                    </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button ref={this.activateCarosuel} className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
            : 
            <div className="loader">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}

export default MovieBanner;